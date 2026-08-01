'use server';

import process from 'node:process';
import path from 'path';

import { renderToBuffer } from '@react-pdf/renderer';
import { isNil } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

import { configV2, KanaTemplate } from '@kanji-sh/printer';

const HIRAGANA_LIST = [
    ['あ', 'い', 'う', 'え', 'お'],
    ['か', 'き', 'く', 'け', 'こ'],
    ['さ', 'し', 'す', 'せ', 'そ'],
    ['た', 'ち', 'つ', 'て', 'と'],
    ['な', 'に', 'ぬ', 'ね', 'の'],
    ['は', 'ひ', 'ふ', 'へ', 'ほ'],
    ['ま', 'み', 'む', 'め', 'も'],
    ['や', 'ゆ', 'よ'],
    ['ら', 'り', 'る', 'れ', 'ろ'],
    ['わ', 'を', 'ん']
];

const KATAKANA_LIST = [
    ['ア', 'イ', 'ウ', 'エ', 'オ'],
    ['カ', 'キ', 'ク', 'ケ', 'コ'],
    ['サ', 'シ', 'ス', 'セ', 'ソ'],
    ['タ', 'チ', 'ツ', 'テ', 'ト'],
    ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
    ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
    ['マ', 'ミ', 'ム', 'メ', 'モ'],
    ['ヤ', 'ユ', 'ヨ'],
    ['ラ', 'リ', 'ル', 'レ', 'ロ'],
    ['ワ', 'ヲ', 'ン']
];

// 7 Days of Cache
const CacheAge = 7 * 24 * 60 * 60; // 7 days in seconds
const CacheControlHeaders = {
    'Cache-Control': `max-age=${CacheAge}`,
    'CDN-Cache-Control': `max-age=${CacheAge}`,
    'Vercel-CDN-Cache-Control': `max-age=${CacheAge}`
};

export async function GET(request: NextRequest): Promise<NextResponse> {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    if (isNil(type) || (type !== 'hiragana' && type !== 'katakana')) {
        console.error(`Invalid type parameter: ${type}`);
        return NextResponse.json(
            { status: 'error', errors: { type: 'Invalid type parameter' } },
            { status: 400 }
        );
    }
    try {
        // Make Config
        const pathConfig = configV2({
            outDir: path.resolve(process.cwd(), 'dist')
        });
        const title = type === 'katakana' ? 'Katakana Worksheet' : 'Hiragana Worksheet';
        const characters = type === 'hiragana' ? HIRAGANA_LIST : KATAKANA_LIST;

        // Render the PDF
        const buffer = await renderToBuffer(
            KanaTemplate({ characters, templateConfig: { title: title }, config: pathConfig })
        );
        const responseData = new Uint8Array(buffer);
        return new NextResponse(responseData, {
            headers: {
                ...CacheControlHeaders,
                'Content-Type': 'application/pdf',
                'Content-Length': responseData.byteLength.toString(),
                'Content-Disposition': `inline; filename="${title}.pdf"`
            }
        });
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            console.error(error.stack);
        }
        return NextResponse.json(
            { status: 'error', errors: { email: `Error generating the PDF: ${error}` } },
            { status: 500 }
        );
    }
}
