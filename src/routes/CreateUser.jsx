import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from '../components/AuthProvider';
import { existsUsername, logout, updateUser } from '../firebase/firebase';
import "../css/creater-user.css"



export const CreateUser = () => {

    const navigate = useNavigate();
    const [ state, setState ] = useState(0);
    const [ nameUser, setNameUser ] = useState({});
    const [ username, setUserName ] = useState("");


    function handleUserLoggeding(user) {
        navigate("/dasboard");
    }
    function handleUserNoRegister(user) {
        setNameUser(user);
        setState(3);
    }
    function handleUserNoLoggeding() {
        navigate("/login");
    }

    function handleInputUser(e){
        setUserName(e.target.value);
    }
    function handleLogout(){
        logout();
    }
    async function handleContinue(){
        if( username !== "" ){
            const exists = await existsUsername(username);
            console.log(exists)
            if(exists){
                setState(5);
            } else {
                const tmp = { ...nameUser}
                tmp.username = username;
                tmp.processCompleted = true;
                const userIpm = await updateUser(tmp);
                console.log(userIpm)
                setState(6);
            }
        }
    }
    
    if( state === 3 || state === 5 ) {
        return (
            <div className='wrapper-create-user'>
                <div className='create-user'>
                    <h1 className='create-user-title'>Bienvenido! </h1>
                    <p className='create-user-description'>{nameUser.displayName}, estas a un paso de culminar el proceso de registro, por favor elige tu nombre de usuario.</p>
                    {state === 5 ? <p className='create-user-error'>error</p> : ""}
                    <div className='create-user-input'>
                        <input type="text" onInput={handleInputUser} placeholder="Username"/>
                    </div>
                    <div className='create-user-button'>
                        <button onClick={handleContinue} className='create-user-button-dash'>Continuar</button>
                        <button className='create-user-button-cancel' onClick={handleLogout}>Cancelar</button>
                    </div>
                </div>
            </div>
          );
    }

    if( state === 6 ) {
        return (
            <div className='wrapper-create-user'>
                <div className='create-user'>
                    <h1 className='create-user-title'>Felicidades!</h1>
                    <p className='create-user-description'>{nameUser.displayName}, has culmidado el registro ya puedes cuntinuar al Dashboard.</p>
                    <button className='create-user-button-dash' onClick={ () => navigate("/dashboard")}>Dashboar</button>
                </div>
            </div>
          );
    }

    return (
        <AuthProvider 
        onUserLoggeding={handleUserLoggeding} 
        onUserNoRegister={handleUserNoRegister} 
        onUserNoLoggeding={handleUserNoLoggeding}>

        </AuthProvider>
    )
}
