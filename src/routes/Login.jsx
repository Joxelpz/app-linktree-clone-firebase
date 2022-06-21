import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from "../firebase/firebase";
import "../css/login.css"
import google from "../assets/google.png"
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from '../components/AuthProvider';


export const Login = () => {

    const navigate = useNavigate();
    const [state, setCurrentState] = useState(0);


    
    async function handleOnClick(){
        const googleProvider = new GoogleAuthProvider();
        await singInWithGoogle(googleProvider);

        async function singInWithGoogle(googleProvider) {
            try{
                const res = await signInWithPopup( auth, googleProvider );
            } catch (error) {
                console.error(error);
            }
        }
    }

    function handleUserLoggeding() {
        navigate("/dashboard");
    }
    function handleUserNoRegister() {
        navigate("/create-user");
    }
    function handleUserNoLoggeding() {
        setCurrentState(4);
    }

    if (state === 4){
        return (
            <div className='wrapper-loggin'>
                <div className='loggin'>
                    <h1 className='login-title'>Inicia sesión</h1>
                    <button onClick={handleOnClick} className="button-style">
                        <img src={google} alt="" />
                        <p>Sign up with Google</p>
                    </button>
                </div>
            </div>
          )
    }

    if (state === 5){
        return (
            <div className='wrapper-loggin'>
                <div className='loggin'>
                    <h1 className='login-title'>Inicia sesión</h1>
                    <button onClick={handleOnClick} className="button-style">
                        <img src={google} alt="" />
                        <p>Sign up with Google</p>
                    </button>
                </div>
            </div>
          )
    }

    return <AuthProvider onUserLoggeding={handleUserLoggeding} onUserNoRegister={handleUserNoRegister} onUserNoLoggeding={handleUserNoLoggeding}>
        
        <div className='wrapper-loggin'>
            <div className='loggin'>
                <h1 className='login-title'>Loading...</h1>
            </div>
        </div>

    </AuthProvider>
    
}
