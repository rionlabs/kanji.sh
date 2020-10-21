import app from "firebase";
import firebase from "firebase";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

class Firebase {
    analytics: firebase.analytics.Analytics;

    constructor() {
        app.initializeApp(firebaseConfig);
        this.analytics = app.analytics();
        app.analytics().setAnalyticsCollectionEnabled(process.env.NODE_ENV == "production");
    }
}

export default Firebase;