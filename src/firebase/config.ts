interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}

// Your web app's Firebase configuration
const firebaseConfig: FirebaseConfig = {
    apiKey: '<your-api-key>',
    authDomain: '<your-auth-domain>',
    databaseURL: '<your-database-url>',
    projectId: '<your-cloud-firestore-project>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-sender-id>'
};

interface FirebaseEndpoints {
  linksPagination: string;
}

const firebaseEndpoints: FirebaseEndpoints = {
    linksPagination: "https://<your-functions-url>/linksPagination"
};
export {firebaseEndpoints};
export default firebaseConfig;
