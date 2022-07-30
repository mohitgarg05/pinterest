import React , {useState,useEffect} from 'react'
import style from '../../../styles/popup.module.css'
import Ages from './age'
import Genders from './gender'
import Interests from './interest'
import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
const Popupdiv = (props) => {
  const [count, setcount] = useState(0);
  const [AgeProp, setAgeProp] = useState()
  const [GenderProps, setGenderProps] = useState()
  const [UserInterest, setUserInterest] = useState([])
  

  const handleCount = ()=>{
    setcount((count+1)%3);
  }

  const callback = (age) => {
      
      setAgeProp(age)
  }
  const callback2 = (gender) => {
    setGenderProps(gender)
  }

  const callback3 = (item)=>{
    setUserInterest(item);
  }

  const handleInterest =async()=>{

    const obj = {
      email : props.mail,
      age : AgeProp,
      gender : GenderProps,
      interest : UserInterest
    }

    try {
      const res = await fetch('/api/signin',{
          method:'POST',
          header:{
              "Content-Type" : "application/json"
          },
          body : JSON.stringify(obj)
      })

      const data = await res.json();
      console.log(data);
      const decoded = jwt.decode(data.token);
      console.log(decoded);
      cookie.set('token', data.token)
      props.callback();
      window.location.reload(false)
  } catch (error) {
      console.log(error);
  }
  }



  return (
    <div className={style.popuo_div}>
        <div className={`${style.main_div} container`}>
        <div className='row'>
            <div className={style.smallNav}>
                <li   className={`${style.list_nav} ${count==0 ? style.active :""}`}></li>
                <li className={`${style.list_nav} ${count==1 ? style.active :""}`}></li>
                <li className={`${style.list_nav} ${count==2 ? style.active :""}`}></li>
                <li className={style.list_nav}></li>
            </div>
        </div>
        <div className='row'>
       
          {count==0?<Ages callback={callback} />:count==1?<Genders callback={callback2}/>:<Interests callback = {callback3} />}
        </div>
        <div className={`${style.div_submit} row`} >
              {count==2?<button className={style.button} onClick={handleInterest}>Finish</button>
              : <button className={style.button} onClick={handleCount}>Next</button>}


        </div>
        
    </div>
    </div>
  )
}

export default Popupdiv