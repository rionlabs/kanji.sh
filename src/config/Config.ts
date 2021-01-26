// Common configuration
const Config = {
    publicUrl: process.env.NEXT_PUBLIC_URL,
    githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL,
    supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
    contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    bmcUrl: process.env.NEXT_PUBLIC_BMC_URL,
    authorWebsiteUrl: process.env.NEXT_PUBLIC_AUTHOR_WEBSITE_URL,
    maintainer: process.env.NEXT_PUBLIC_MAINTAINER,
    firebaseConfig: {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    },
    pdfStoragePath: `${process.env.NEXT_PUBLIC_BRANCH_NAME || 'main'}/pdf`
};

export default Config;
