import en from './locales/en.json';
import xTranslate from './locales/x-translate.json';

// This is the list of languages your application supports,
// the fallback is always the last
export const supportedLngs = ['es', 'en'];

// This is the language you want to use in case
// if the user preferred language is not in the supportedLngs
export const fallbackLng = 'en';

// The default namespace of i18next is "translation", but you can customize it
export const defaultNS = 'default';

// These are the translation files we created, `translation` is the namespace
// we want to use, we'll use this to include the translations in the bundle
// instead of loading them on-demand
export const resources = {
    en: { ...en, ...xTranslate }
};
