import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import firebaseConfig from './config';


class Firebase {
    constructor() {
        // Initialize Firebase
        app.initializeApp(firebaseConfig);
        app.analytics();
        this.auth = app.auth();
        this.db = app.firestore();
    }

    async register(name, email, password) {
        const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
        return await newUser.user.updateProfile({displayName: name});
    }

    async login(email, password) {
        return await this.auth.signInWithEmailAndPassword(email, password);
    }

    async logout() {
        return await this.auth.signOut();
    }

    async resetPassword(email) {
        return await this.auth.sendPasswordResetEmail(email);
    }
}

const firebase = new Firebase();

export default firebase;