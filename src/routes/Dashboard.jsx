import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from '../components/AuthProvider'
import { Menu } from '../components/Menu';
import { v4 as uuidv4 } from "uuid";
import { auth, deleteLink, getLinks, insertLink, updateLink } from '../firebase/firebase';
import { Link } from '../components/Link';
import "../css/dashboard.css"
import { onAuthStateChanged } from 'firebase/auth';



export const Dashboard = () => {

  const navigate = useNavigate();
  const [ nameUser, setNameUser ] = useState({});
  const [ state, setState ] = useState(0);
  const [ title, setTitle ] = useState("");
  const [ url, setUrl ] = useState("");
  const [ links, setLinks] = useState([]);


  const [currentUser, setCurrentUser] = useState(null);


  async function handleUserLoggeding(user) {
      setNameUser(user)
      setState(2);
      const resLinks = await getLinks(user.uid);
      setLinks([ ... resLinks ])
  }
  function handleUserNoRegister(user) {
      navigate("/login");
  }
  function handleUserNoLoggeding() {
      navigate("/login");
  }

  if ( state === 0 ) {
    return (
      <AuthProvider 
      onUserLoggeding={handleUserLoggeding} 
      onUserNoRegister={handleUserNoRegister} 
      onUserNoLoggeding={handleUserNoLoggeding}>
  
      </AuthProvider>
    )
  }

  function handleOnSubmit(e){
    e.preventDefault();
    addLink()
  }

  function addLink(){
    if( title !== "" && url !== "") {
      const newLink = {
        id: uuidv4(),
        title: title,
        url: url,
        uid: nameUser.uid,
      }
      
      const res = insertLink(newLink);
      newLink.docId = res.id;
      setTitle("")
      setUrl("")
      setLinks([ ... links, newLink ])
    } 
  }

  function handleOnChange(e){
     const value = e.target.value;
     if( e.target.name === "title" ){
       setTitle(value);
     }
     if( e.target.name === "url" ){
      setUrl(value);
    }
  }

  async function handleUpdateLink( docId, title, url ){
    const link = links.find( item => item.docId = docId)
    link.title = title;
    link.url = url;
    await updateLink(docId, link);

  }
  async function handleDeleteLink(docId){
    await deleteLink(docId);
    const tmp = links.filter( link => link.docId !== docId );
    setLinks([ ...tmp ])
  }

  return (
    <Menu>
        <div className='wrapper-dashboard'>
          <div className='dashboard-wrapper'>
            <h1 className='title-dashboard'>Dashboard</h1>

            <form action="" onSubmit={handleOnSubmit} className="form-dashboard">
              <label htmlFor="title" className='title-input-dashboard'>Title</label>
              <input type="text" name='title' onChange={handleOnChange} className='input-dashboard'/> 

              <label htmlFor="url" className='title-input-dashboard'>url</label>
              <input type="text" name='url' onChange={handleOnChange} className='input-dashboard'/>

              <input type="submit" value="Crear nuevo link" className='button-input-dashboard'/>
            </form>

            <div>
              {links.map( link => {
                  return (
                    <Link 
                    key={link.id} 
                    docId={link.docId}
                    url={link.url} 
                    title={link.title} 
                    onUpdate={handleUpdateLink} 
                    onDelete={handleDeleteLink}/>
                  )
              })}
            </div>
          </div>
        </div>
    </Menu>
  )

  
}
