export const PageConfig: Record<string, { priority: number; title: string; description: string }> =
    {
        '/': {
            priority: 1,
            title: 'Your one-stop tool for practicing Kanji',
            description:
                'Practice the Kanjis you learned over the years with distraction-free sheets.'
        },
        '/read': {
            priority: 0.8,
            title: 'Reading sheets coming soon',
            description: 'Subscribe for updates to get your hands on reading practice sheets.'
        },
        '/write': {
            priority: 0.8,
            title: 'Download Kanji worksheets for Free',
            description: ''
        },

        '/write/jlpt': {
            priority: 0.7,
            title: 'Download Kanji worksheets for JLPT level',
            description:
                'Free to download PDF files for Japanese Language Proficiency Test, Level N5, N4, N3, N2, and N1.'
        },
        '/write/grade': {
            priority: 0.7,
            title: 'Kanji worksheets by Japanese Elementary School Grades',
            description: ''
        },
        '/write/wanikani': {
            priority: 0.7,
            title: 'Download Kanji worksheets for all Wanikani levels',
            description: ''
        },
        '/write/kanjigarden': {
            priority: 0.7,
            title: 'Download Kanji worksheets for all Kanji introduced in KanjiGarden',
            description: ''
        },
        '/write/frequency': {
            priority: 0.7,
            title: 'Download Kanji worksheet ordered by frequency',
            description: ''
        },
        '/about': {
            priority: 0.8,
            title: 'About',
            description: ''
        },
        '/about/terms': {
            priority: 0.5,
            title: 'Terms of Use',
            description:
                'Kanji.sh is a free and open-source collection of worksheets for practicing Japanese Kanji. '
        },
        '/about/privacy-policy': {
            priority: 0.5,
            title: 'Privacy Policy',
            description: ''
        },
        '/404': {
            priority: 0,
            title: 'Error',
            description: 'Page Not Found'
        }
    };
