import { pathConfig } from 'apps/kanji.sh/src/config';

import { prepareData } from '@kanji-sh/printer';

export default async function PareparePage() {
    // Workaround for preparing data during build phase
    await prepareData(pathConfig);
    return (
        <div>
            <h1>Data prepared successfully!</h1>
        </div>
    );
}
