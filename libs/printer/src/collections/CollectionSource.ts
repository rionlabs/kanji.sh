import { CollectionType } from '@kanji-sh/models';

export type CollectionSource = {
    type: CollectionType;
    pdf: {
        key: string;
        kanji: string[];
    }[];
}

/*
Source will have the following data:
per PDF file:
 - kanji array
 - name

* */
