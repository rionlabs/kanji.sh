import React from 'react';

import { readFileSync } from 'node:fs';
import path from 'node:path';

import { Document, Font, Link, Page, Path, StyleSheet, Svg, Text, View } from '@react-pdf/renderer';

import { Config } from '../../config';

function getKanjiImageFileName(kanji: string): string {
    return `${kanji.charCodeAt(0).toString(16).padStart(5, '0')}.svg`;
}

type KanaTemplateConfig = {
    sectionsPerRowCount: number;
    pagePaddingMm: number;
    sectionGapMm: number;
    borderColor: string;
    borderWidthPx: number;
    cellSizePx: number;
    writingCellCount: number;
    title: string;
    titleSizePx: number;
    characterSizePx: number;
    gridCharacterSizePx: number;
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

type SvgAttributes = Record<string, string>;

type SvgRenderOptions = {
    width: number;
    height: number;
    strokeColor: string;
    fillColor: string;
};

const DEFAULT_CONFIG: KanaTemplateConfig = {
    sectionsPerRowCount: 1,
    pagePaddingMm: 24,
    sectionGapMm: 12,
    borderColor: '#777777',
    borderWidthPx: 0.75,
    cellSizePx: 30,
    writingCellCount: 16,
    title: 'Kana Worksheet',
    titleSizePx: 12,
    characterSizePx: 34,
    gridCharacterSizePx: 22,
    squareGuidePatternType: 'plus',
    squareGuideColor: '#D6D6D6',
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

const parseAttributes = (tag: string): SvgAttributes => {
    const attributes: SvgAttributes = {};
    const matches = tag.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)="([^"]*)"/g);
    for (const match of matches) {
        const [, key, value] = match;
        attributes[key] = value;
    }
    return attributes;
};

const normalizeColor = (value: string | undefined, fallback: string): string | undefined => {
    if (!value) {
        return undefined;
    }

    const normalized = value.trim().toLowerCase();
    if (normalized === 'none') {
        return 'none';
    }

    if (normalized === '#000' || normalized === '#000000' || normalized === 'black') {
        return fallback;
    }

    return value;
};

const extractViewBox = (svgMarkup: string): string => {
    const viewBoxMatch = svgMarkup.match(/viewBox="([^"]+)"/i);
    if (viewBoxMatch?.[1]) {
        return viewBoxMatch[1];
    }

    const widthMatch = svgMarkup.match(/width="([0-9.]+)"/i);
    const heightMatch = svgMarkup.match(/height="([0-9.]+)"/i);
    const width = Number(widthMatch?.[1] ?? 109);
    const height = Number(heightMatch?.[1] ?? 109);

    return `0 0 ${Number.isFinite(width) ? width : 109} ${Number.isFinite(height) ? height : 109}`;
};

const readKanjiVgSvg = (filePath: string, options: SvgRenderOptions): JSX.Element | null => {
    if (!filePath) {
        return null;
    }

    let svgMarkup: string;
    try {
        svgMarkup = readFileSync(filePath, { encoding: 'utf-8' });
    } catch {
        return null;
    }

    const viewBox = extractViewBox(svgMarkup);
    const pathTags = [...svgMarkup.matchAll(/<path\b([^>]*)\/?>(?:<\/path>)?/gi)];

    if (pathTags.length === 0) {
        return null;
    }

    return (
        <Svg
            viewBox={viewBox}
            width={options.width}
            height={options.height}
            preserveAspectRatio="xMidYMid meet"
            style={{ position: 'absolute' }}>
            {pathTags.map((match, index) => {
                const attrs = parseAttributes(match[1]);
                const d = attrs.d;
                if (!d) {
                    return null;
                }

                const stroke =
                    normalizeColor(attrs.stroke, options.strokeColor) ?? options.strokeColor;
                const fill = normalizeColor(attrs.fill, options.fillColor) ?? 'none';
                const strokeWidth = attrs['stroke-width']
                    ? Number(attrs['stroke-width'])
                    : undefined;
                const strokeLinecap = attrs['stroke-linecap'] as
                    | 'butt'
                    | 'round'
                    | 'square'
                    | undefined;
                const strokeLinejoin = attrs['stroke-linejoin'] as
                    | 'miter'
                    | 'round'
                    | 'bevel'
                    | undefined;
                const opacity = attrs.opacity ? Number(attrs.opacity) : undefined;
                const transform = attrs.transform;

                return (
                    <Path
                        key={`${filePath}-${index}`}
                        d={d}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                        strokeLinecap={strokeLinecap}
                        strokeLinejoin={strokeLinejoin}
                        opacity={opacity}
                        transform={transform}
                    />
                );
            })}
        </Svg>
    );
};

const SquareGuide = ({
    sizePx,
    patternType,
    color,
    strokeWidthPx
}: {
    sizePx: number;
    patternType: KanaTemplateConfig['squareGuidePatternType'];
    color: string;
    strokeWidthPx: number;
}) => {
    if (patternType === 'none') {
        return null;
    }

    return (
        <Svg
            width={sizePx}
            height={sizePx}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ position: 'absolute', top: 0, left: 0 }}>
            <Path d="M 50 0 L 50 100" stroke={color} strokeWidth={strokeWidthPx} fill="none" />
            <Path d="M 0 50 L 100 50" stroke={color} strokeWidth={strokeWidthPx} fill="none" />
            {patternType === 'asterisk' ? (
                <>
                    <Path
                        d="M 0 0 L 100 100"
                        stroke={color}
                        strokeWidth={strokeWidthPx}
                        fill="none"
                    />
                    <Path
                        d="M 100 0 L 0 100"
                        stroke={color}
                        strokeWidth={strokeWidthPx}
                        fill="none"
                    />
                </>
            ) : null}
        </Svg>
    );
};

// https://github.com/vercel/next.js/pull/86480
const absolutePathTo = (fontFile: string) => {
    const fontFilePath = path.resolve(Config.assetsDirPath, 'fonts', fontFile);
    console.log(`fontFilePath ${fontFilePath}`);
    // console.log(`__dirname ${__dirname}`);
    // const projectRootPath = process.cwd();
    // console.log(`projectRootPath ${projectRootPath}`);
    // return fontFilePath.replace('/ROOT', projectRootPath);
    return fontFilePath;
};

Font.register({
    family: 'Montserrat',
    src: absolutePathTo('Montserrat-VariableFont.ttf')
});

const createStyles = (cfg: KanaTemplateConfig) =>
    StyleSheet.create({
        page: {
            padding: cfg.pagePaddingMm,
            fontFamily: 'Montserrat',
            backgroundColor: '#FFFFFF',
            position: 'relative'
        },
        header: {
            position: 'absolute',
            left: 0,
            top: '1cm',
            width: '100%',
            textAlign: 'center'
        },
        headerTitle: {
            fontSize: cfg.titleSizePx,
            display: 'flex',
            gap: '8px',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        headerPageNumber: {
            fontSize: cfg.titleSizePx,
            color: '#777777'
        },
        footer: {
            position: 'absolute',
            left: 0,
            bottom: '1cm',
            width: '100%',
            textAlign: 'center',
            fontSize: cfg.titleSizePx,
            color: '#999999'
        },
        footerLink: {
            color: '#777777',
            textDecoration: 'none'
        },
        contentArea: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1.5cm',
            marginBottom: '1.5cm'
        },
        sectionList: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: cfg.sectionGapMm
        },
        section: {
            borderColor: cfg.borderColor,
            borderWidth: cfg.borderWidthPx,
            width: (cfg.writingCellCount + 2) * cfg.cellSizePx,
            marginBottom: cfg.sectionGapMm
        },
        topBodyRow: {
            display: 'flex',
            flexDirection: 'row',
            height: cfg.cellSizePx * 2
        },
        bigCell: {
            width: cfg.cellSizePx * 2,
            height: cfg.cellSizePx * 2,
            borderRightColor: cfg.borderColor,
            borderRightWidth: cfg.borderWidthPx,
            justifyContent: 'center',
            alignItems: 'center'
        },
        bigSvgWrap: {
            width: cfg.cellSizePx * 2,
            height: cfg.cellSizePx * 2,
            justifyContent: 'center',
            alignItems: 'center'
        },
        squareGuideWrap: {
            width: cfg.cellSizePx,
            height: cfg.cellSizePx,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        },
        bigSquareGuideWrap: {
            width: cfg.cellSizePx * 2,
            height: cfg.cellSizePx * 2,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        },
        mainCharacter: {
            fontSize: cfg.characterSizePx,
            textAlign: 'center'
        },
        rightGrid: {
            width: cfg.writingCellCount * cfg.cellSizePx,
            display: 'flex',
            flexDirection: 'column'
        },
        topGridRow: {
            display: 'flex',
            flexDirection: 'row',
            height: cfg.cellSizePx,
            borderBottomColor: cfg.borderColor,
            borderBottomWidth: cfg.borderWidthPx
        },
        middleGridRow: {
            display: 'flex',
            flexDirection: 'row',
            height: cfg.cellSizePx
        },
        bottomGridRow: {
            display: 'flex',
            flexDirection: 'row',
            height: cfg.cellSizePx,
            borderTopColor: cfg.borderColor,
            borderTopWidth: cfg.borderWidthPx
        },
        gridCell: {
            width: cfg.cellSizePx,
            justifyContent: 'center',
            alignItems: 'center',
            borderRightColor: cfg.borderColor,
            borderRightWidth: cfg.borderWidthPx
        },
        gridCellLast: {
            borderRightWidth: 0
        },
        gridCharacter: {
            fontSize: cfg.gridCharacterSizePx,
            color: '#BBBBBB'
        },
        kvgHint: {
            marginTop: 4,
            fontSize: 7,
            color: '#777777'
        },
        overlaySvg: {
            position: 'absolute',
            top: cfg.cellSizePx * 0.1,
            left: cfg.cellSizePx * 0.1
        }
    });

const KanaSection = ({
    section,
    cfg,
    styles
}: {
    section: SectionData;
    cfg: KanaTemplateConfig;
    styles: ReturnType<typeof createStyles>;
}) => {
    const writingCells = Array.from({ length: cfg.writingCellCount }, (_, index) => index);
    const blankCells = Array.from({ length: cfg.writingCellCount + 2 }, (_, index) => index);
    const smallGuideSvgSize = cfg.cellSizePx * 0.7;

    console.log(`Reading stroke SVG from: ${section.strokeSvgPath}`);
    console.log(`Reading trace SVG from: ${section.traceSvgPath}`);

    const bigStrokeSvg = readKanjiVgSvg(section.strokeSvgPath, {
        width: cfg.cellSizePx * 1.6,
        height: cfg.cellSizePx * 1.6,
        strokeColor: '#000000',
        fillColor: '#000000'
    });

    const darkTraceSvg = readKanjiVgSvg(section.traceSvgPath, {
        width: smallGuideSvgSize,
        height: smallGuideSvgSize,
        strokeColor: '#808080',
        fillColor: '#808080'
    });

    const lightTraceSvg = readKanjiVgSvg(section.traceSvgPath, {
        width: smallGuideSvgSize,
        height: smallGuideSvgSize,
        strokeColor: '#BBBBBB',
        fillColor: '#BBBBBB'
    });

    return (
        <View style={styles.section} wrap={false}>
            <View style={styles.topBodyRow}>
                <View style={styles.bigCell}>
                    <View style={styles.bigSquareGuideWrap}>
                        <SquareGuide
                            sizePx={cfg.cellSizePx * 2}
                            patternType={cfg.squareGuidePatternType}
                            color={cfg.squareGuideColor}
                            strokeWidthPx={cfg.squareGuideStrokeWidthPx}
                        />
                        {bigStrokeSvg ? (
                            <View style={styles.bigSvgWrap}>{bigStrokeSvg}</View>
                        ) : (
                            <Text style={styles.mainCharacter}>{section.character}</Text>
                        )}
                    </View>
                </View>

                <View style={styles.rightGrid}>
                    <View style={styles.topGridRow}>
                        {writingCells.map((cellIndex) => (
                            <View
                                key={`top-${section.character}-${cellIndex}`}
                                style={
                                    cellIndex === cfg.writingCellCount - 1
                                        ? [styles.gridCell, styles.gridCellLast]
                                        : styles.gridCell
                                }>
                                <View style={styles.squareGuideWrap}>
                                    <SquareGuide
                                        sizePx={cfg.cellSizePx}
                                        patternType={cfg.squareGuidePatternType}
                                        color={cfg.squareGuideColor}
                                        strokeWidthPx={cfg.squareGuideStrokeWidthPx}
                                    />
                                    {darkTraceSvg ? (
                                        <View style={styles.overlaySvg}>{darkTraceSvg}</View>
                                    ) : (
                                        <Text style={styles.gridCharacter}>
                                            {section.character}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={styles.middleGridRow}>
                        {writingCells.map((cellIndex) => (
                            <View
                                key={`middle-${section.character}-${cellIndex}`}
                                style={
                                    cellIndex === cfg.writingCellCount - 1
                                        ? [styles.gridCell, styles.gridCellLast]
                                        : styles.gridCell
                                }>
                                <View style={styles.squareGuideWrap}>
                                    <SquareGuide
                                        sizePx={cfg.cellSizePx}
                                        patternType={cfg.squareGuidePatternType}
                                        color={cfg.squareGuideColor}
                                        strokeWidthPx={cfg.squareGuideStrokeWidthPx}
                                    />
                                    {lightTraceSvg ? (
                                        <View style={styles.overlaySvg}>{lightTraceSvg}</View>
                                    ) : null}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            <View style={styles.bottomGridRow}>
                {blankCells.map((cellIndex) => (
                    <View
                        key={`bottom-${section.character}-${cellIndex}`}
                        style={
                            cellIndex === blankCells.length - 1
                                ? [styles.gridCell, styles.gridCellLast]
                                : styles.gridCell
                        }>
                        <View style={styles.squareGuideWrap}>
                            <SquareGuide
                                sizePx={cfg.cellSizePx}
                                patternType={cfg.squareGuidePatternType}
                                color={cfg.squareGuideColor}
                                strokeWidthPx={cfg.squareGuideStrokeWidthPx}
                            />
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export const KanaTemplate = ({ characters = [], config = {} }: Partial<KanaTemplateProps> = {}) => {
    const cfg: KanaTemplateConfig = { ...DEFAULT_CONFIG, ...config };
    const styles = createStyles(cfg);

    return (
        <Document>
            {characters.map((pageSections, pageIndex) => (
                <Page key={`page-${pageIndex}`} size="A4" style={styles.page}>
                    <View style={styles.header} fixed>
                        <View style={styles.headerTitle}>
                            <Text>{cfg.title} </Text>
                            <Text style={styles.headerPageNumber}>Page {pageIndex + 1}</Text>
                        </View>
                    </View>

                    <View style={styles.contentArea}>
                        <View style={styles.sectionList}>
                            {pageSections.map((character) => {
                                const kvgFileName = getKanjiImageFileName(character);
                                const section: SectionData = {
                                    character,
                                    kvgFileName,
                                    strokeSvgPath: joinFilePath(cfg.kvgStrokeBasePath, kvgFileName),
                                    traceSvgPath: joinFilePath(cfg.kvgTraceBasePath, kvgFileName)
                                };

                                return (
                                    <KanaSection
                                        key={`${section.character}-${section.kvgFileName}-${pageIndex}`}
                                        section={section}
                                        cfg={cfg}
                                        styles={styles}
                                    />
                                );
                            })}
                        </View>
                    </View>

                    <View style={styles.footer} fixed>
                        <Text>
                            Created by{' '}
                            <Link src="https://kanji.sh" style={styles.footerLink}>
                                kanji.sh
                            </Link>
                        </Text>
                    </View>
                </Page>
            ))}
        </Document>
    );
};
