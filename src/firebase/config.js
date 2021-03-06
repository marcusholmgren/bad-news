// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: '<your-api-key>',
    authDomain: '<your-auth-domain>',
    databaseURL: '<your-database-url>',
    projectId: '<your-cloud-firestore-project>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-sender-id>'
};

const firebaseEndpoints = {
    linksPagination: "https://<your-functions-url>/linksPagination"
};
export {firebaseEndpoints};
export default firebaseConfig;
