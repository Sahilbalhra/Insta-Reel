import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = React.createContext();

function AuthWrapper({ children }) {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  //this useEffect work like as componentDidMount
  useEffect(() => {
    //onAuthStateChanged :firebase function to check weather a user is loged in the app or not....
    onAuthStateChanged(auth, (user) => {
      //   console.log(user);
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
    setLoading(false);
  }, []);

  //function to login
  function login(email, password) {
    //auth from firebase file
    //signInWithEmailAndPassword : it is a firebase function to login
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    //firebase function to logOut.
    return signOut(auth);
  }

  function forgot(email) {
    //firebase function 
    return sendPasswordResetEmail(auth, email);
  }

  function signup(email, password) {
    //firebase function to signup
    return createUserWithEmailAndPassword(auth, email, password);
  }

  //hold all the function in it of firebase
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
