import React, { useEffect, useRef, useState } from 'react';
import "../css/link.css"
import deleteImg from "../assets/delete.png";
import editImg from "../assets/edit.png";


export const Link = ({ docId, title, url, onDelete, onUpdate }) => {

    const [ currentTitle, setCurrentTitle ] = useState(title);
    const [ currentUrl, setCurrentUrl ] = useState(url);
    const [ editTitle, setEditTitle ] = useState(false);
    const [ editUrl, setEditUrl ] = useState(false);

    const titleRef = useRef(null);
    const urlRef = useRef(null);

    useEffect(() => {
        if(titleRef.current){
            titleRef.current.focus();
        }
    },[editTitle])
    useEffect(() => {
        if(urlRef.current){
            urlRef.current.focus();
        }
    },[editUrl])

    function handleEditTitle(){
        setEditTitle(true)
    }
    function handleEditUrl(){
        setEditUrl(true)
    }

    function handleChangeTitle(e){
        setCurrentTitle(e.target.value);
    }
    function handleChangeUrl(e){
        setCurrentUrl(e.target.value);
    }

    function handleBlurTitle(e){
        setEditTitle(false);
        onUpdate(docId, currentTitle, currentUrl);
    }
    function handleBlurUrl(e){
        setEditUrl(false);
        onUpdate(docId, currentTitle, currentUrl);
    }

    function handleDelete(){
        onDelete(docId);
    }



  return (
    <div key={docId} className='wrapper-link'>
        <div className='link-wrapper'>
            <div className='title-link'>
                { editTitle? ( 
                <> 
                    <div className='content-link-h'>
                        <input className='input-edit' ref={titleRef} value={currentTitle}  onChange={handleChangeTitle} onBlur={handleBlurTitle}/> 
                    </div>
                </> 
                ) : (
                <>
                    <div className='content-link-h-f'>
                        <button onClick={handleEditTitle} className="button-edit"><img src={editImg} alt="" /></button>
                        <span className='title-content-link'>{currentTitle}</span>
                    </div>
                </>)}
                
            </div>
            <div className='url-link'>
                { editUrl? ( 
                <> 
                    <div className='content-link-h'>
                        <input className='input-edit' ref={urlRef} value={currentUrl}  onChange={handleChangeUrl} onBlur={handleBlurUrl}/> 
                    </div>
                </> 
                ) : (
                <>
                    <div className='content-link-h-f'>
                        <button onClick={handleEditUrl} className="button-edit"><img src={editImg} alt="" /></button>
                        <span className='url-content-link'>{currentUrl}</span>
                    </div>
                </>)}
            </div>
        </div>

        <div className='button-link'>
            <button onClick={handleDelete} className="button-delete">
                <img src={deleteImg} alt="" />
            </button>
        </div>
    </div>
  )
}
