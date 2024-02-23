import { Locale } from 'apps/kanji.sh/i18n';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
    locales: Locale.locales,
    localePrefix: 'as-needed'
});
