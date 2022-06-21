import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth, getUserInfo, registerUser, userExists } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children, onUserLoggeding, onUserNoLoggeding, onUserNoRegister }) => {

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, async(user) => {
            if (user){
                const isRegister = await userExists(user.uid);
                if(isRegister){
                    const userInfo = await getUserInfo(user.uid);
                    localStorage.setItem("user" , JSON.stringify(userInfo))
                    if(userInfo.processCompleted){
                    onUserLoggeding(userInfo);
                    }else{
                        onUserNoRegister(userInfo);
                    }
                } else {
                    await registerUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        profilePic: "",
                        username: "",
                        processCompleted: false,
                    });
                    onUserNoRegister(user);
                }
            } else {
                onUserNoLoggeding();
            }
        });
    },[navigate, onUserLoggeding, onUserNoLoggeding, onUserNoRegister])

    
  return (
    <div>{ children }</div>
  )
}
