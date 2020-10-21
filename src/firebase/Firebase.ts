import app from 'firebase/app';
import 'firebase/app';
import firebase from "firebase";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

const enableFirebase = process.env.ENABLE_FIREBASE === 'true';

class Firebase {
    analytics: firebase.analytics.Analytics | null;
    performance: firebase.performance.Performance | null;

    constructor() {
        if (enableFirebase) {
            app.initializeApp(firebaseConfig);
            this.analytics = app.analytics();
            this.performance = app.performance();

        } else {
            this.analytics = null;
            this.performance = null;
        }
    }
}

export default Firebase;