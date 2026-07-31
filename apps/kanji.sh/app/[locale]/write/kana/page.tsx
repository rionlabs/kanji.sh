import React from 'react';

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { FiDownload } from 'react-icons/fi';

import { PDFView } from 'apps/kanji.sh/src/components/molecules/PDFView';
import type { LocaleParams } from 'apps/kanji.sh/src/types/LocaleParams';

const KANA_SECTIONS = [
    {
        key: 'hiragana',
        worksheetUrl: '/api/kana?type=hiragana',
        downloadFilename: 'hiragana-worksheet.pdf',
        pageCount: 1
    },
    {
        key: 'katakana',
        worksheetUrl: '/api/kana?type=katakana',
        downloadFilename: 'katakana-worksheet.pdf',
        pageCount: 1
    }
] as const;

export const generateMetadata = async (): Promise<Metadata> => {
    const t = await getTranslations('write.kana');
    return {
        title: t('title'),
        description: t('description')
    };
};

export default async function KanaPage({ params }: LocaleParams) {
    const locale = (await params).locale;
    setRequestLocale(locale);
    const t = await getTranslations('write.kana');

    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <h4>{t('title')}</h4>
                <p>{t('description')}</p>
                <p>{t('sheetDescription')}</p>
            </div>

            <div className="flex flex-col gap-10 lg:flex-row">
                {KANA_SECTIONS.map((section) => (
                    <section key={section.key} className="w-full lg:w-1/2">
                        <h5>{t(`${section.key}.title`)}</h5>
                        <div className="mb-4">{t(`${section.key}.description`)}</div>

                        <div className="mb-10">
                            <a
                                href={section.worksheetUrl}
                                download={section.downloadFilename}
                                className="btn btn-wide btn-primary mt-1">
                                <FiDownload />
                                {t('downloadLabel')}
                            </a>
                        </div>

                        <h6 className="mb-4 text-center">{t('previewLabel')}</h6>
                        <div className="mx-auto max-w-[420px]">
                            <PDFView fileUrl={section.worksheetUrl} pageCount={section.pageCount} />
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
