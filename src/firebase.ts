import firebase from 'firebase/app';
import {FileData} from "./Metadata";
import 'firebase/analytics';
import 'firebase/performance';
import 'firebase/storage';
import Config from "./config/Config";

function initFirebase() {
    const enableFirebase = process.env.NEXT_PUBLIC_ENABLE_FIREBASE === 'true';

    if (enableFirebase && typeof window !== 'undefined' && !firebase.apps.length) {
        // Check that `window` is in scope for the analytics module!
        firebase.initializeApp(Config.firebaseConfig);
        if ('measurementId' in Config.firebaseConfig) {
            firebase.analytics();
            firebase.performance();
        }
        firebase.storage();
    }
}

function getDownloadUrl(fileData: FileData): Promise<string> {
    return firebase.storage().ref(fileData.filePath).getDownloadURL()
}

function logEvent(eventName: string, eventParams?: { [key: string]: any },) {
    firebase.analytics().logEvent(eventName, eventParams);
}

initFirebase()

export {getDownloadUrl, logEvent}