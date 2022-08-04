import React,{useEffect , useState} from 'react'
import Navbar from './navbar'
import style from '../../styles/userProfile.module.css'
const userProfile = () => {
    const [Name, setName] = useState()
    const [UserImage, setUserImage] = useState()

    useEffect(() => {

        const res = localStorage.getItem('user');
        if(res){
            setName(JSON.parse(res).userName);
            setUserImage(JSON.parse(res).userImg);
        }
     
    }, [])
    
    
  return (
    <>
        <div className='row' style={{width:"100%"}}>
            <Navbar/>
        </div>
        <div className={style.container}>

        <div className={style.user_image}>
            <img src={UserImage}></img>
        </div>
        <div className={style.h}>
            <h2>{Name}</h2>
            <p>1 following</p>
        </div>
        <div className={style.myPins}>
            <div className={style.created}>
                <p>Created</p>
            </div>
            <div className={style.saved}>
                <p>Saved</p>
            </div>
        </div>
            
        </div>
    </>
  )
}

export default userProfile