import "../css/profile.css"
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from '../components/AuthProvider'
import { Menu } from '../components/Menu'
import { getProfilePhoto, setProfilePhoto, updateUser } from '../firebase/firebase';
import editImg from "../assets/edit.png";



export const Profile = () => {

    const navigate = useNavigate();
    const [ nameUser, setNameUser ] = useState({});
    const [ state, setState ] = useState(0);
    const [ profileUrl, setProfileUrl ] = useState(null);
    const fileRef = useRef(null);
   


    async function handleUserLoggeding(user){
        setNameUser(user);
        const url = await getProfilePhoto(user.profilePic);
        setProfileUrl(url);
        setState(2);
    }
    function handleUserNoRegister(user){
        navigate("/login")
    }
    function handleUserNoLoggeding(){
        navigate("/login")
    }

    function handleOpenFile(){
        if(fileRef.current){
            fileRef.current.click();
        }
    }
    function handleChangeFile(e){
        const files = e.target.files;
        const fileReader = new FileReader();

        if(fileReader && files && files.length > 0){
            fileReader.readAsArrayBuffer(files[0]);
            fileReader.onload = async function(){
                const imageData = fileReader.result;

                const res = await setProfilePhoto(nameUser.uid, imageData)

                if( res){
                    const tmpUser = {... nameUser}
                    tmpUser.profilePic = res.metadata.fullPath;
                    await updateUser(tmpUser);
                    setNameUser({ ...tmpUser });
                    const url = await getProfilePhoto(nameUser.profilePic);
                    setProfileUrl(url);
                }

            }
        }
    }

    if ( state !== 2 ){
        return (
            <AuthProvider 
            onUserLoggeding={handleUserLoggeding} 
            onUserNoRegister={handleUserNoRegister} 
            onUserNoLoggeding={handleUserNoLoggeding}>
        
            </AuthProvider>
          )
    }

  return (
     <Menu>
        <div className='wrapper-profile'>
            <div className='profile'>
                <h2 className='title-profile'>Editar Perfil</h2>
                <div className="wrapper-photo">
                    <div className='img-profile'>
                        <img src={profileUrl} alt=""/>
                    </div>
                    <div>
                        <button onClick={handleOpenFile} className='button-profile'>Cargar imagen</button>
                        <input ref={fileRef} type="file" onChange={handleChangeFile} style={{ display: "none" }}/>
                    </div>
                </div>
            </div>
        </div>
    </Menu>
  )
}
