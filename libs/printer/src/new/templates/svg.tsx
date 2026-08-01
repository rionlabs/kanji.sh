import { readFileSync } from 'node:fs';

import { Path, Svg, Text } from '@react-pdf/renderer';

type SvgAttributes = Record<string, string>;

export type SvgRenderOptions = {
    size: number;
    strokeColor: string;
    strokeWidth: number;
    fillColor: string;
};

/**
 * Parse SVG attributes from tag string
 */
export const parseAttributes = (tag: string): SvgAttributes => {
    const attributes: SvgAttributes = {};
    const matches = Array.from(tag.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)="([^"]*)"/g));
    for (const match of matches) {
        const [, key, value] = match;
        attributes[key] = value;
    }
    return attributes;
};

/**
 * Normalize color values to usable format
 */
export const normalizeColor = (value: string | undefined, fallback: string): string | undefined => {
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

/**
 * Extract viewBox from SVG markup or infer from width/height
 */
export const extractViewBox = (svgMarkup: string): string => {
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

/**
 * Read and render KanjiVG SVG file
 */
export const readKanjiVgSvg = (filePath: string, options: SvgRenderOptions): JSX.Element | null => {
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
    const pathTags = Array.from(svgMarkup.matchAll(/<path\b([^>]*)\/?>(?:<\/path>)?/gi));
    const textTags = Array.from(svgMarkup.matchAll(/<text\b([^>]*)>(.*?)<\/text>/gi));

    if (pathTags.length === 0 && textTags.length === 0) {
        return null;
    }

    return (
        <Svg
            viewBox={viewBox}
            width={options.size}
            height={options.size}
            preserveAspectRatio="xMidYMid meet"
            style={{ position: 'absolute' }}>
            {pathTags.map((match, index) => {
                const attrs = parseAttributes(match[1]);
                const d = attrs['d'];
                if (!d) {
                    return null;
                }

                const stroke =
                    normalizeColor(attrs['stroke'], options.strokeColor) ?? options.strokeColor;
                const fill = normalizeColor(attrs['fill'], options.fillColor) ?? 'none';
                const strokeWidth = options.strokeWidth
                    ? options.strokeWidth
                    : attrs['stroke-width']
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
                const opacity = attrs['opacity'] ? Number(attrs['opacity']) : undefined;
                const transform = attrs['transform'];

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
            {textTags.map((match, index) => {
                const attrs = parseAttributes(match[1]);
                const transform = attrs['transform'] ?? '';
                return (
                    <Text
                        key={`${filePath}-text-${index}`}
                        transform={transform}
                        style={{ fontSize: '8px', fontFamily: 'Quicksand' }}>
                        {match[2]}
                    </Text>
                );
            })}
        </Svg>
    );
};

export type SquareGuideProps = {
    sizePx: number;
    patternType: 'none' | 'plus' | 'asterisk';
    color: string;
    strokeWidthPx: number;
};

/**
 * Renders grid guide pattern (plus or asterisk) for practice cells
 */
export const SquareGuide = ({ sizePx, patternType, color, strokeWidthPx }: SquareGuideProps) => {
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
                        opacity="0.5"
                        strokeWidth={strokeWidthPx}
                        fill="none"
                    />
                    <Path
                        d="M 100 0 L 0 100"
                        stroke={color}
                        opacity="0.5"
                        strokeWidth={strokeWidthPx}
                        fill="none"
                    />
                </>
            ) : null}
        </Svg>
    );
};
