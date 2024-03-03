import { createContext, useContext, useState } from "react";
import { AUTH, GoogleAccount, STORAGE } from "../fbconfig/connect";
// import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();
  async function CreateAccount(Name, Email, Password, PhoneNo) {
    const userInfo = {
      a_Name: Name,
      b_Email: Email,
      c_Password: Password,
      d_PhoneNo: PhoneNo,
      e_Cart: [],
      f_OrderHistory: [],
      h_OrderCount: 0,
    };
    createUserWithEmailAndPassword(AUTH, Email, Password);
    setDoc(doc(STORAGE, "FashionNova Users", Email), userInfo);
  }

  async function CreateAccountWithGoogle(email,displayName,phonenumber) {
    const UserInfo = {
        a_Name: displayName,
        b_Email: email,
        c_Password: "Google Account",
        d_PhoneNo: phonenumber || "Not Registered",
        e_Cart: [],
        f_OrderHistory: [],
        h_OrderCount: 0,
    };
    setDoc(doc(STORAGE, "FashionNova Users", email), UserInfo);
  }

  async function LoginAccount(Email, Password) {
    return signInWithEmailAndPassword(AUTH, Email, Password);
  }

  function RemoveAccount() {
    return signOut(AUTH);
  }

  useEffect(() => {
    const UnSubscribe = onAuthStateChanged(AUTH, (authUser) => {
      setUser(authUser || null);
    });
    return () => {
      UnSubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        CreateAccount,
        LoginAccount,
        RemoveAccount,
        user,
        CreateAccountWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
