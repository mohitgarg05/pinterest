import React,{useState , useEffect} from 'react'
import style from '../../styles/createpin.module.css'
import {faArrowAltCircleUp , faXmarkCircle} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import Navbar from './navbar'
const Createpin = () => {

  const [DisplayImage, setDisplayImage] = useState()
  const [Image, setImage] = useState()
  const [Email, setEmail] = useState()
  const [SendImage, setSendImage] = useState()
  const [values, setvalues] = useState({
    title:"",
    about:"",
    dest:""
  })


  useEffect(() => {
    const t = cookie.get('token');
    if(t){
        const y = jwt.decode(t);
        console.log(y.email);
        setEmail(y.email);
    }
  }, [])
  

  const handleImage = (e)=>{

    
      const reader = new FileReader();
    
      reader.onload = ()=>{
          if(reader.readyState === 2){
              setDisplayImage(reader.result);
          }
      }
      reader.readAsDataURL(e.target.files[0])
      setImage(e.target.files[0])
  }


  const handleChange=(e)=>{
      const {name , value} = e.target;
      setvalues({
        ...values , 
        [name]:value
      })
  }

  

  const handleSubmit =async(e)=>{
    e.preventDefault();
    const obj = new FormData();
    obj.append('file' , Image); 
    obj.append('upload_preset', 'tauyw8ej');
   
    await axios.post('https://api.cloudinary.com/v1_1/douy3nwlh/image/upload',obj )
          .then(async(r) => {
            // setSendImage(r.data.secure_url);
            const send = {
              'mail' : Email,
              'title' : values.title,
              'describ' : values.dest,
              'about' : values.about,
              'img' : r.data.secure_url
            }

            try {
              const res = await fetch('/api/postPin',{
                method:'POST',
                header:{
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(send)
              })
      
              const response = await res.json();
              console.log(response);
          } catch (error) {
              console.log(error);
          }

          });
    
    

    


  }

  return (
    <>
      <div className='row' style={{width:"100%"}}>
            <Navbar/>
        </div>
   
    <div className={style.main}>
    
    <div className={`${style.con} `}>
      <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data" className={style.flex_comp}>
      
        <div className={style.input_div}>

          
      

          <div className={style.inside}>
            {DisplayImage?
         
            <img src={DisplayImage} />
           
             :
            <label className={style.label} htmlFor='upload_img'>
            <input type='file' name='upload_img' id='upload_img' className={style.take} onChange={handleImage} />
                <p className={style.icon}><FontAwesomeIcon icon={faArrowAltCircleUp} /></p>
                <p className={style.upload}>Click to upload  </p>
                <p className={style.recm}>Recommendation : Use high-quality .jpg less than 20MB </p>
            </label> }

            
        
          </div>
        </div>
        <div className={style.dis_data}>

        <div className={style.form}>
          <div className={style.inside_form}>
            <input type="text"  required name='title' value={values.title}  onChange={handleChange} placeholder='Add your title' />
            <input type="text" required name='about' value={values.about} onChange={handleChange} placeholder='Tell everyone what your Pin is about' />
            <input type="text" required name='dest' value={values.dest} onChange={handleChange} placeholder='Add a destination link' />
            <button type='submit' >Save</button>
          </div>
          
        </div>
        
        </div>
    
      </form>
    </div>
    </div>
    </>
  )
}

export default Createpin


