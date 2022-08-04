import React , {useEffect,useState} from 'react'
import style from '../../styles/profildiv.module.css'
import {  GoogleLogout } from 'react-google-login'; 
import cookie from 'js-cookie'
import Link from 'next/link'
const profilediv = (props) => {

  const handleLogoutFailure=(err)=>{
    console.log("Failed" , err);
}

const logout = ()=>{
     cookie.remove('token')
     localStorage.removeItem('user');
     window.location.reload(false);
}

  

  return (
    <div className= {`${style.profil_div} ${props.open?style.openit:""} `} >
      <div className={style.wrap}>
        <div className={style.current}>
          <p>Currently in</p>
        </div>
        <div className={style.user_name}>
          <Link href='/components/userProfile'><p className={style.p}>{props.user}</p></Link>
        
        </div>
       
        <div>
        <GoogleLogout
              clientId="152573124270-fqcj5nrqs6f5c05va3c267meqeeod28g.apps.googleusercontent.com"
              onLogoutSuccess={ logout }
              onFailure={ handleLogoutFailure }
              render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className={style.button}>Logout</button>
        )}
            /> 
        </div>
      </div>
    </div>
  )
}

export default profilediv