import * as firebaseAdmin from 'firebase-admin';
import Config from '../../src/config/Config';

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert('kanji-sh-firebase-adminsdk.json'),
        storageBucket: Config.firebaseConfig.storageBucket
    });
}

export { firebaseAdmin };
