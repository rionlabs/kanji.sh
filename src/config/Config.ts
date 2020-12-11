// Common configuration
const Config = {
    githubUrl: process.env.GITHUB_URL,
    supportEmail: process.env.SUPPORT_EMAIL,
    contactEmail: process.env.CONTACT_EMAIL,
    bmcUrl: process.env.BMC_URL,
    authorWebsiteUrl: process.env.AUTHOR_WEBSITE_URL,
    maintainer: process.env.MAINTAINER,
    firebaseConfig: {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    }
}

export default Config;