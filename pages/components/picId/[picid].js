import React  from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import { useEffect ,useState } from 'react'
import Navbar from '../navbar'
import styles from '../../../styles/picdetail.module.css'
import {faDownload , faLink} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { saveAs } from 'file-saver'
import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

const Pic = () => {
    const router = useRouter();
    const picId = router.query.picid;

    const [Email, setEmail] = useState()
    const [Image, setImage] = useState([])
    const [otherDetails, setotherDetails] = useState([] )

    useEffect(() => {
      const t = cookie.get('token');
      if(t){
          const y = jwt.decode(t);
          console.log(y.email);
          setEmail(y.email);
      }
    }, [])
    
    const getImage = async()=>{

        const url = 'https://api.unsplash.com/photos/' +picId+ '?client_id=ADmV0kpNakTQJSpb24nkMIUb6WBcn4_b8YWRAOvYl14'
        const response = await axios.get(url)
        setImage(response.data.urls)
        setotherDetails(response.data);
      }

      useEffect(() => {
        console.log(Image);
        console.log(otherDetails);
      }, [Image,otherDetails])
      

    useEffect(() => {
        getImage();
    }, [picId])
    

    const downloadImage =  ()=>{
      saveAs(Image.small)
    }

    const getImageLink = ()=>{
      navigator.clipboard.writeText(window.location.href);
    }

    const checkSave = async()=>{
      
      const t = Image.regular
      const obj  = {
        mail : Email,
        img : t
      }

      try {
        const res = await fetch('/api/checkSaved',{
          method:'POST',
          header:{
              "Content-Type" : "application/json"
          },
          body : JSON.stringify(obj)
        })


        const data = await res.json();
        console.log(data);

      } catch (error) {
        
      }

    }


    useEffect(() => {
        checkSave();
    }, [Image])
    


    const sendSaved = async(e)=>{

      e.preventDefault();
      const obj  = {
        mail : Email,
        img : Image.regular,
        alt : otherDetails.alt_description,
        descr : otherDetails.description
      }


      console.log(obj);

      try {
        
        const res = await fetch('/api/savedPin',{
          method:'POST',
          header:{
              "Content-Type" : "application/json"
          },
          body : JSON.stringify(obj)
        })

        const response = await res.json();
        console.log(response);

      } catch (error) {
        console.log(error);
      }


    }


  return (
    <>
        <div className='row' style={{width:"100%"}}>
            <Navbar/>
        </div>
      <div className={styles.con}>
        <div className={styles.img_con}>
          <img src={Image.regular} />
        </div>
        <div className={styles.des_con}>
          <div className={styles.all_icons}>
            <button onClick={downloadImage}><FontAwesomeIcon icon={faDownload} /></button>
            <button onClick={getImageLink}><FontAwesomeIcon icon={faLink}/></button>
            <button onClick={sendSaved}>Save</button>
          </div>
          
          <h4 className={styles.h4}>{otherDetails.alt_description}</h4>
          <p className={styles.p}>{otherDetails.description}</p>
        </div>
      </div>
    </>
  )
}

export default Pic;

