import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import firebase from '../../firebase';

function useAuth() {
    const [authUser, setAuthUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebase.auth, user => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        })

        return () => unsubscribe();
    }, []);

    return authUser;
}

export default useAuth;
