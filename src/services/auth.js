import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import app from '../firebase'

const auth = getAuth(app);

export const login = (emial, password) => {
    return signInWithEmailAndPassword(auth, emial, password)
};

export const logout = () => {
    return signOut(auth);
};

export const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export default auth;