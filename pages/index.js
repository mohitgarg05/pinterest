import Navbar from './components/navbar'
import Allpics from './components/allpics'
import React , {useState} from 'react'
import PopUp from './components/popup/popupdiv'

export default function Home() {

  const [TriggerPopup, setTriggerPopup] = useState(false);
  const [Email, setEmail] = useState()
  const [userName, setuserName] = useState()
  const [userImage, setuserImage] = useState()

  const handlePopupclose = ()=>{
    setTriggerPopup(false);
  }
  const handlePopup = ()=>{
    setTriggerPopup(true);
  }
  const getEmail = (mail)=>{
    setEmail(mail);
  }
  const getUserImg = (mail)=>{
    setuserImage(mail);
  }
  const getUserName = (mail)=>{
    setuserName(mail);
  }

  return (
   <>
   <header >
      <div className='row' style={{width:"100%" , display:"none"}}>
        <Navbar  
        callbackMail={getEmail} 
        callbackName = {getUserName} 
        callbackImage = {getUserImg}  
        callback2={handlePopup}/>
      </div>
   </header>
   <div style={{width:"100%"}}>
        {TriggerPopup && <PopUp 
        mail = {Email} 
        name={userName} 
        image = {userImage} 
        callback = {handlePopupclose} />}
   </div>
   <div className='row all_pic'>
      <Allpics />
   </div>
   
    
   </>
  )
}
