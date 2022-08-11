import React,{useEffect , useState} from 'react'
import Navbar from './navbar'
import axios from 'axios'
import style from '../../styles/userProfile.module.css'
import CreatedByMe from './createdByMe'
import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
const userProfile = () => {
    const [Name, setName] = useState()
    const [UserImage, setUserImage] = useState()
    const [ShowCreated, setShowCreated] = useState(false)
    const [ShowSaved, setShowSaved] = useState(true)
    const [Email, setEmail] = useState()
    const [AllAbout, setAllAbout] = useState([])

    useEffect(() => {

        const res = localStorage.getItem('user');
        if(res){
            setName(JSON.parse(res).userName);
            setUserImage(JSON.parse(res).userImg);
        }
        const t = cookie.get('token');
        if(t){
            const y = jwt.decode(t);
            console.log(y.email);
            setEmail(y.email);
        }

    }, [])

    useEffect(() => {
        console.log(AllAbout?.userPins);
    }, [AllAbout])
    


    const getPins = async ()=>{
        try {
            const res = await axios.get('/api/postPin');
            const res2 = res.data.data;
            const SaveData = res2.find((item)=>item.userEmail == Email);
            setAllAbout(SaveData)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        getPins();
    },[Email])

    const handleElem = ()=>{
        setShowCreated(true);
        setShowSaved(false);
    }
    const handleElem2 = ()=>{
        setShowCreated(false);
        setShowSaved(true);
    }
    
    
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
            <div className={`${style.created} ${ShowCreated? style.underline : ""}`} onClick={handleElem}>
                <p>Created</p>
            </div>
            <div className={`${style.saved} ${ShowSaved? style.underline : ""}`} onClick={handleElem2}>
                <p>Saved</p>
            </div>
        </div>
        <div className={style.allCreated}>
               {ShowCreated? 
               <CreatedByMe my = {AllAbout?.userPins} /> 
               : <CreatedByMe my = {AllAbout?.userSaved} />   } 
               
               
        </div>
            
        </div>
    </>
  )
}

export default userProfile