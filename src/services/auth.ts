import {
    getAuth,
    onAuthStateChanged,
    signInAnonymously,
    User,
} from "firebase/auth";
import { isFirebaseConfigured } from "./firebase";
import { app } from "./firebase";

const auth = getAuth(app);

export const ensureSignedIn = async (): Promise<User | null> => {
    if (!isFirebaseConfigured) return null;
    if (auth.currentUser) return auth.currentUser;
    try {
        await signInAnonymously(auth);
    } catch {}
    return new Promise((resolve) => {
        const unsub = onAuthStateChanged(auth, (user) => {
            unsub();
            resolve(user);
        });
    });
};

export const getUid = (): string | null => {
    return auth.currentUser ? auth.currentUser.uid : null;
};

export { auth };
