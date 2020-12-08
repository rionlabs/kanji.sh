import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/performance';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

const enableFirebase = process.env.REACT_APP_ENABLE_FIREBASE === 'true';

class Firebase {
    analytics: firebase.analytics.Analytics | null;
    performance: firebase.performance.Performance | null;

    constructor() {
        if (enableFirebase && typeof window !== 'undefined' && !firebase.apps.length) {
            // Check that `window` is in scope for the analytics module!
            firebase.initializeApp(firebaseConfig);
            if ('measurementId' in firebaseConfig) {
                this.analytics = firebase.analytics();
                this.performance = firebase.performance();
            } else {
                this.analytics = null;
                this.performance = null;
            }
        } else {
            this.analytics = null;
            this.performance = null;
        }
    }
}

export default Firebase;