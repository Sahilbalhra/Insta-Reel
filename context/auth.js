import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

// function that stand btw upto a perticular time
export const AuthContext = React.createContext();

function AuthWrapper({ children }) {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //checking auth user
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
    setLoading(false);
  }, []);

  // console.log("Auth Wrapper");
  function login(email, password) {
    //provided by google
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    //sign out the user
    return signOut(auth);
    // signOut(auth).then(() => {
    //     // Sign-out successful.
    //   }).catch((error) => {
    //     // An error happened.
    //   });
  }

  function forgot(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  //only user under store can accees the data
  const store = {
    login,
    user,
    logout,
    forgot,
    signup,
  };
  return (
    <AuthContext.Provider value={store}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthWrapper;
