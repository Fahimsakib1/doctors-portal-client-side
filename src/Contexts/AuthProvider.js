import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../Firebase/Firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const providerGoogle = new GoogleAuthProvider();



    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        setLoading(true);
        localStorage.removeItem('doctorsPortalToken')
        return signOut(auth);
    }

    const updateUser = (userInfo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, userInfo)
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, providerGoogle);
    }

    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);

    }

    
    //code for toggle theme
    const [theme, setTheme] = useState("Light");

    useEffect( () => {
        if(theme === "dark"){
            document.documentElement.classList.add("dark")
            
        }
        else{
            document.documentElement.classList.remove("dark")
            
            
        }
    }, [theme])

    const ThemeChange = () => {
        setTheme(theme === "dark" ? "Light" : "dark")
    }


    const handleThemeSwitch = () => {
        ThemeChange()
    }




    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log("Current User From Auth Provider", currentUser);
            setUser(currentUser);
            setLoading(false)
        })
        return () => unsubscribe();
    }, [])


    const AuthInfo = { user, loading, setLoading, createUser, userLogin, signOutUser, updateUser, googleSignIn, resetPassword, theme, ThemeChange, handleThemeSwitch }

    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

