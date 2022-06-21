import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { existsUsername, getProfilePhoto, getProfilePublic } from '../firebase/firebase';
import "../css/public.css"


export const PublicProfile = () => {

    const params = useParams();
    const [profile, setProfile] = useState(null);
    const [url, setUrl] = useState("");
    const [links, setLinks] = useState([]);
    const [state, setState] = useState(0);

    useEffect( () => {
        getProfile()
        async function getProfile(){
            const username = params.username;
            try {
                const userUid = await existsUsername(username);
                if ( userUid ) {
                    const userInfo = await getProfilePublic(userUid);
                    setProfile(userInfo);

                    const url = await getProfilePhoto(
                        userInfo.profileInfo.profilePic
                    );
                    setUrl(url);
                } else {
                    setState(7);
                }
            } catch (error) {
                console.error(error)
            }
        }
    }, [params] )

    useEffect( () => {
        getLinks()
        function getLinks(){
            profile?.linksInfo?.then(res => setLinks(res))
        }
    },[profile])

    if (state === 7){
        return(
            <div className='wrapper-no-exist'>
                <div className='no-exist'>
                    <h2 className='title-no-exist'>La página que buscas no existe.</h2>
                    <h3 className='a-no-exist'>¿Quieres que este sea tu nombre de usuario? <a href="">Crea tu Linktree ahora.</a></h3>
                </div>
            </div>
        )
    }


  return (
    <div className='wrapper-public'>
        <div className='public-profile'>
            <div className='public-img'>
                <img src={url} alt=""/>
            </div>
            <h2 className='username-public'>@{profile?.profileInfo?.username}</h2>
            <h3 className='name-public'>{profile?.profileInfo?.displayName}</h3>
            <div className='links'>
                {links?.map((link, index) => {
                    return(
                        <div key={index} className="wrapper-button-p">
                            <a href={link.url} className="button-public">{link.title}</a>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}
