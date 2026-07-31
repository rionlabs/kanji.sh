import path from 'node:path';

import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import { floor, times } from 'lodash';

import { registerNodeFonts } from './fonts';
import { PageFooter } from './footer';
import { PageHeader } from './header';
import { readKanjiVgSvg, SquareGuide } from './svg';
import { getKanjiImageFileName, mmToPt } from './utils';
import { Config } from '../../config';

type KanaTemplateConfig = {
    borderColor: string;
    borderWidthPx: number;
    title: string;
    cellSizeMm: number;
    freeCellSizeMm: number;
    squareGuidePatternType: 'none' | 'plus' | 'asterisk';
    squareGuideColor: string;
    squareGuideStrokeWidthPx: number;
    kvgStrokeBasePath: string;
    kvgTraceBasePath: string;
};

type KanaTemplateProps = {
    characters: string[][];
    config?: Partial<KanaTemplateConfig>;
};

type SectionData = {
    character: string;
    kvgFileName: string;
    strokeSvgPath: string;
    traceSvgPath: string;
};

const DEFAULT_CONFIG: KanaTemplateConfig = {
    borderColor: '#777777',
    borderWidthPx: 0.75,
    cellSizeMm: 15,
    freeCellSizeMm: 10,
    title: 'Kana Worksheet',
    squareGuidePatternType: 'plus',
    squareGuideColor: '#EEEEEE',
    squareGuideStrokeWidthPx: 0.8,
    kvgStrokeBasePath: Config.outStrokePath,
    kvgTraceBasePath: Config.outTracerPath
};

const joinFilePath = (basePath: string, fileName: string): string => {
    if (!basePath) {
        return '';
    }
    return path.join(basePath, fileName);
};

// Register font
registerNodeFonts();

/**
       |     Header     | (20mm)
 (10mm)|                | (10mm)
       |     Footer     | (15mm)
 */
const pageWidth = 210; // A4 width in mm
const pageHeight = 297; // A4 height in mm

const pagePaddingTop = 20;
const pagePaddingBottom = 15;
const pagePaddingHorizontal = 10;
const sectionGap = 8;
const characterReductionRatio = 0.85;

const kanjiBoxCount = 1;
const traceBoxPerColumnCount = 2;

const contentAreaWidthMm = pageWidth - 2 * pagePaddingHorizontal; // 10mm padding on each side
const contentAreaHeightMm = pageHeight - pagePaddingTop - pagePaddingBottom; // 20mm header, 15mm footer

const traceBoxPerRowCount =
    floor(contentAreaWidthMm / DEFAULT_CONFIG.cellSizeMm) - kanjiBoxCount * 2;

const sectionWidthMm = (kanjiBoxCount * 2 + traceBoxPerRowCount) * DEFAULT_CONFIG.cellSizeMm;

const sectionHeightMm = DEFAULT_CONFIG.cellSizeMm * traceBoxPerColumnCount;

/**
| Big  | small | .. as per fit
| Cell | small | .. as per fit
 */

const createStyles = (cfg: KanaTemplateConfig) =>
    StyleSheet.create({
        page: {
            paddingTop: `${pagePaddingTop}mm`, // Header
            paddingBottom: `${pagePaddingBottom}mm`, // Footer
            paddingHorizontal: `${pagePaddingHorizontal}mm`, // Size Padding
            fontFamily: 'Montserrat',
            fontSize: '16px',
            backgroundColor: '#FFFFFF',
            position: 'relative'
        },
        contentArea: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '8mm'
        },
        section: {
            borderColor: cfg.borderColor,
            borderWidth: cfg.borderWidthPx
        },
        sectionBodyRow: {
            display: 'flex',
            flexDirection: 'row',
            width: mmToPt(sectionWidthMm)
        },
        kanjiCell: {
            width: mmToPt(cfg.cellSizeMm * 2),
            height: mmToPt(cfg.cellSizeMm * 2),
            minWidth: mmToPt(cfg.cellSizeMm * 2),
            borderRightColor: cfg.borderColor,
            borderRightWidth: cfg.borderWidthPx,
            justifyContent: 'center',
            alignItems: 'center'
        },
        kanjiSquareGuideWrap: {
            width: mmToPt(cfg.cellSizeMm * 2),
            height: mmToPt(cfg.cellSizeMm * 2),
            minWidth: mmToPt(cfg.cellSizeMm * 2),
            minHeight: mmToPt(cfg.cellSizeMm * 2),
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        },
        kanjiSvgWrap: {
            width: mmToPt(cfg.cellSizeMm * 2),
            height: mmToPt(cfg.cellSizeMm * 2),
            justifyContent: 'center',
            alignItems: 'center'
        },
        traceSquareGuideWrap: {
            width: mmToPt(cfg.cellSizeMm),
            height: mmToPt(cfg.cellSizeMm),
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        },
        traceGrid: {
            width: mmToPt(traceBoxPerRowCount * cfg.cellSizeMm) * 2,
            display: 'flex',
            flexDirection: 'column'
        },
        topTraceGridRow: {
            display: 'flex',
            flexDirection: 'row',
            height: mmToPt(cfg.cellSizeMm),
            minHeight: mmToPt(cfg.cellSizeMm),
            borderBottomColor: cfg.borderColor,
            borderBottomWidth: cfg.borderWidthPx
        },
        bottomTraceGridRow: {
            display: 'flex',
            flexDirection: 'row',
            height: mmToPt(cfg.cellSizeMm),
            minHeight: mmToPt(cfg.cellSizeMm)
        },
        gridCell: {
            width: mmToPt(cfg.cellSizeMm),
            height: mmToPt(cfg.cellSizeMm),
            minHeight: mmToPt(cfg.cellSizeMm),
            justifyContent: 'center',
            alignItems: 'center',
            borderRightColor: cfg.borderColor,
            borderRightWidth: cfg.borderWidthPx
        },
        gridCellLast: {
            borderRightWidth: 0
        },
        kvgHint: {
            fontSize: 7,
            color: '#777777'
        },
        overlaySvg: {
            position: 'absolute',
            top: mmToPt((cfg.cellSizeMm * (1 - characterReductionRatio)) / 2),
            left: mmToPt((cfg.cellSizeMm * (1 - characterReductionRatio)) / 2)
        }
    });

const KanaSection = ({
    section,
    config,
    styles
}: {
    section: SectionData;
    config: KanaTemplateConfig;
    styles: ReturnType<typeof createStyles>;
}) => {
    const writingCells = Array.from({ length: traceBoxPerRowCount }, (_, index) => index);

    const kanjiStrokeSvg = readKanjiVgSvg(section.strokeSvgPath, {
        size: mmToPt(config.cellSizeMm * 2 * characterReductionRatio),
        strokeColor: '#000000',
        fillColor: '#000000',
        strokeWidth: 3
    });

    const darkTraceSvg = readKanjiVgSvg(section.traceSvgPath, {
        size: mmToPt(config.cellSizeMm * characterReductionRatio),
        strokeColor: '#808080',
        fillColor: '#808080',
        strokeWidth: 1
    });

    const lightTraceSvg = readKanjiVgSvg(section.traceSvgPath, {
        size: mmToPt(config.cellSizeMm * characterReductionRatio),
        strokeColor: '#BBBBBB',
        fillColor: '#BBBBBB',
        strokeWidth: 1
    });

    return (
        <View style={styles.section} wrap={false}>
            <View style={styles.sectionBodyRow}>
                <View style={styles.kanjiCell}>
                    <View style={styles.kanjiSquareGuideWrap}>
                        <SquareGuide
                            sizePx={mmToPt(config.cellSizeMm) * 2}
                            patternType={config.squareGuidePatternType}
                            color={config.squareGuideColor}
                            strokeWidthPx={config.squareGuideStrokeWidthPx}
                        />
                        <View style={styles.kanjiSvgWrap}>{kanjiStrokeSvg}</View>
                    </View>
                </View>

                <View style={styles.traceGrid}>
                    <View style={styles.topTraceGridRow}>
                        {writingCells.map((cellIndex) => (
                            <View
                                key={`top-${section.character}-${cellIndex}`}
                                style={
                                    cellIndex === traceBoxPerRowCount - 1
                                        ? [styles.gridCell, styles.gridCellLast]
                                        : styles.gridCell
                                }>
                                <View style={styles.traceSquareGuideWrap}>
                                    <SquareGuide
                                        sizePx={mmToPt(config.cellSizeMm)}
                                        patternType={config.squareGuidePatternType}
                                        color={config.squareGuideColor}
                                        strokeWidthPx={config.squareGuideStrokeWidthPx}
                                    />
                                    <View style={styles.overlaySvg}>{darkTraceSvg}</View>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={styles.bottomTraceGridRow}>
                        {writingCells.map((cellIndex) => (
                            <View
                                key={`middle-${section.character}-${cellIndex}`}
                                style={
                                    cellIndex === traceBoxPerRowCount - 1
                                        ? [styles.gridCell, styles.gridCellLast]
                                        : styles.gridCell
                                }>
                                <View style={styles.traceSquareGuideWrap}>
                                    <SquareGuide
                                        sizePx={mmToPt(config.cellSizeMm)}
                                        patternType={config.squareGuidePatternType}
                                        color={config.squareGuideColor}
                                        strokeWidthPx={config.squareGuideStrokeWidthPx}
                                    />
                                    <View style={styles.overlaySvg}>{lightTraceSvg}</View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
};

type FreePracticeSectionProps = {
    availableHeightMm: number;
    availableWidthMm: number;
    cellSizeMm: number;
    config: KanaTemplateConfig;
};

const FreePracticeSection = ({
    availableHeightMm,
    availableWidthMm,
    cellSizeMm,
    config
}: FreePracticeSectionProps) => {
    const rows = floor(availableHeightMm / cellSizeMm);
    const columns = floor(availableWidthMm / cellSizeMm);
    if (rows < 1 || columns < 1) {
        console.warn(
            `Not enough space for free practice section. Available height: ${availableHeightMm}mm, width: ${availableWidthMm}mm, cell size: ${cellSizeMm}mm`
        );
        return null;
    }

    const cellSizePx = mmToPt(cellSizeMm);

    const styles = StyleSheet.create({
        grid: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: mmToPt(cellSizeMm * columns),
            borderTopWidth: config.borderWidthPx,
            borderLeftWidth: config.borderWidthPx,
            borderColor: config.borderColor
        },
        gridRow: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            height: mmToPt(cellSizeMm)
        },
        gridCell: {
            width: cellSizePx,
            height: cellSizePx,
            borderRightWidth: config.borderWidthPx,
            borderBottomWidth: config.borderWidthPx,
            borderColor: config.borderColor,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        }
    });

    return (
        <View style={styles.grid}>
            {times(rows, (rowIndex) => (
                <View key={`practice-row-${rowIndex}`} style={styles.gridRow}>
                    {times(columns, (colIndex) => (
                        <View key={`practice-cell-${rowIndex}-${colIndex}`} style={styles.gridCell}>
                            <SquareGuide
                                sizePx={cellSizePx}
                                patternType={config.squareGuidePatternType}
                                color={config.squareGuideColor}
                                strokeWidthPx={config.squareGuideStrokeWidthPx}
                            />
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
};

export type KanaPageTemplateProps = {
    pageIndex: number;
    characters: string[];
    pageConfig: KanaTemplateConfig;
    styles: ReturnType<typeof createStyles>;
};

export const KanaPageTemplate = ({
    pageIndex,
    characters,
    pageConfig,
    styles
}: KanaPageTemplateProps) => {
    const availableHeightForFreePractice =
        contentAreaHeightMm - (sectionHeightMm + sectionGap) * characters.length - sectionGap;
    return (
        <Page key={`page-${pageIndex}`} size="A4" orientation="portrait" style={styles.page}>
            <PageHeader title={pageConfig.title} pageNumber={pageIndex + 1} />

            <View style={styles.contentArea}>
                {characters.map((character) => {
                    const kvgFileName = getKanjiImageFileName(character);
                    const section: SectionData = {
                        character,
                        kvgFileName,
                        strokeSvgPath: joinFilePath(pageConfig.kvgStrokeBasePath, kvgFileName),
                        traceSvgPath: joinFilePath(pageConfig.kvgTraceBasePath, kvgFileName)
                    };

                    return (
                        <KanaSection
                            key={`${section.character}-${section.kvgFileName}-${pageIndex}`}
                            section={section}
                            config={pageConfig}
                            styles={styles}
                        />
                    );
                })}
                <FreePracticeSection
                    availableWidthMm={sectionWidthMm}
                    availableHeightMm={availableHeightForFreePractice}
                    cellSizeMm={pageConfig.freeCellSizeMm}
                    config={pageConfig}
                />
            </View>

            <PageFooter />
        </Page>
    );
};

export const KanaTemplate = ({ characters = [], config = {} }: Partial<KanaTemplateProps> = {}) => {
    const cfg: KanaTemplateConfig = { ...DEFAULT_CONFIG, ...config };
    const styles = createStyles(cfg);

    return (
        <Document>
            {characters.map((pageSections, pageIndex) => (
                <KanaPageTemplate
                    key={`page-${pageIndex}`}
                    pageIndex={pageIndex}
                    characters={pageSections}
                    pageConfig={cfg}
                    styles={styles}
                />
            ))}
        </Document>
    );
};
