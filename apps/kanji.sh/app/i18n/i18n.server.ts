import { RemixI18Next } from "remix-i18next/server";

// We import everything from our configuration file
import * as i18n from "./i18n";

export default new RemixI18Next({
    detection: {
        supportedLanguages: i18n.supportedLngs,
        fallbackLanguage: i18n.fallbackLng,
    },
    // This is the configuration for i18next used
    // when translating messages server-side only
    i18next: {
        ...i18n,
    },
});
