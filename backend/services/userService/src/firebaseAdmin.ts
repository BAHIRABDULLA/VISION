import admin from "firebase-admin";

import  serviceAccount from './secrets/serviceAccountKey.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});
