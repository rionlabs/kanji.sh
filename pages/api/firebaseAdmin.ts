import * as firebaseAdmin from 'firebase-admin';
import Config from '../../src/config/Config';

const firebaseAdminCredentials: string = JSON.parse(
    process.env.ADMIN_SDK_SERVICE_ACCOUNT as string
);

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(firebaseAdminCredentials),
        storageBucket: Config.firebaseConfig.storageBucket
    });
}

export { firebaseAdmin };
