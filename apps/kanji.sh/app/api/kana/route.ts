'use server';

import { renderToBuffer } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';

import { Config } from 'libs/printer/src/config';
import { downloadKanjiData } from 'libs/printer/src/download';
import { buildKanjiDiagrams } from 'libs/printer/src/kanjivg';
import { KanaTemplate } from 'libs/printer/src/new/templates/kana';

const HIRAGANA_LIST = [
    ['あ', 'い', 'う', 'え', 'お'],
    ['か', 'き', 'く', 'け', 'こ'],
    ['さ', 'し', 'す', 'せ', 'そ'],
    ['た', 'ち', 'つ', 'て', 'と'],
    ['な', 'に', 'ぬ', 'ね', 'の'],
    ['は', 'ひ', 'ふ', 'へ', 'ほ'],
    ['ま', 'み', 'む', 'め', 'も'],
    ['ら', 'り', 'る', 'れ', 'ろ'],
    ['や', 'ゆ', 'よ', 'わ', 'を', 'ん']
];

// noinspection JSUnusedLocalSymbols
const KATAKANA_LIST = [
    ['ア', 'イ', 'ウ', 'エ', 'オ'],
    ['カ', 'キ', 'ク', 'ケ', 'コ'],
    ['サ', 'シ', 'ス', 'セ', 'ソ'],
    ['タ', 'チ', 'ツ', 'テ', 'ト'],
    ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
    ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
    ['マ', 'ミ', 'ム', 'メ', 'モ'],
    ['ラ', 'リ', 'ル', 'レ', 'ロ'],
    ['ヤ', 'ユ', 'ヨ', 'ワ', 'ヲ', 'ン']
];

export async function GET(): Promise<NextResponse> {
    try {
        await downloadKanjiData({ outputDir: Config.outDirPath, outputFileName: 'all-data.json' });
        await buildKanjiDiagrams();
        console.log(`Config: ${JSON.stringify(Config, null, 2)}`);

        // Render the PDF in 5 seconds, if not send error response
        const buffer = await renderToBuffer(
            KanaTemplate({ characters: HIRAGANA_LIST, config: { title: 'Hiragana Worksheet' } })
        );
        const responseData = new Uint8Array(buffer);
        return new NextResponse(responseData, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Length': responseData.byteLength.toString(),
                'Content-Disposition': `inline; filename="Hiragana Worksheet.pdf"`
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
