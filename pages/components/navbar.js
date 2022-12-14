import React , {useEffect , useState} from 'react'
import Image from 'next/image'
import Logo from '../image/logo.png'
import style from '../../styles/navbar.module.css'
import { GoogleLogin , GoogleLogout } from 'react-google-login'; 
import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import Link from 'next/link'
import {faChevronCircleDown} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Profilediv from './profilediv'

const Navbar = (props) => {




    const [hasToken, sethasToken] = useState(false);

    const [UserName, setUserName] = useState()
    const [UserImage, setUserImage] = useState()
    const [profilediv, setprofilediv] = useState(false)
    const [q, setQ] = useState("");
    // const [FilteredData, setFilteredData] = useState()

    useEffect(() => {
        const t = cookie.get('token');
        const res = localStorage.getItem('user');
        
        if(res){
            setUserName(JSON.parse(res).userName);
            setUserImage(JSON.parse(res).userImg);
        }

        if(t){
            const y = jwt.decode(t);
            console.log(y);
            sethasToken(true); 
        }
        
    }, [])



    const login = async (response)=>{

        const user = {
            "userName" : response.profileObj.name,
            "userImg": response.profileObj.imageUrl
        }
        window.localStorage.setItem('user', JSON.stringify(user));
      

        props.callbackMail(response.profileObj.email);
        props.callbackName(response.profileObj.name);
        props.callbackImage(response.profileObj.imageUrl);

        const obj = {
            email : response.profileObj.email
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
            if(data.status == "done"){
                props.callback2();
            }else{
                cookie.set('token', data.token)
                
                window.location.reload(false);
            }
           
        } catch (error) {
            console.log(error);
        }
    
    }

    const handleLoginFailure=(err)=>{
        console.log("Failed" , err);
    }
    const handleProfileDiv = (e)=>{
        e.preventDefault();
        setprofilediv(!profilediv);

    }
    // const handleSearch = (e)=>{
    //     setQ(e.target.value)
    //      const filteredData = props.list.filter((item) => {
    //           return Object.values(item).join('').toLowerCase().includes(q.toLowerCase())
    //       })
    //       setFilteredData(filteredData)

    //       props.func(FilteredData);
    //       console.log(filteredData);
          
    //   }


  return (
    <div className={`${style.navbar} row`} >
        <div className={`${style.navbar_logo} col-md-1`}>
            <Image src={Logo} />
        </div>
        <div className={`${style.navbar_home} col-md-auto`} >
            <Link href='/'><h4 className={style.h4} >Home</h4></Link>
        </div>
       
            
        {hasToken?  
        <div className={`${style.navbar_create}`} >
            <Link href='/components/createpin'><h4 className={`${style.h4}`} >Create</h4></Link>
        </div>:<></>}
 
        <div className={`${style.navbar_search} col-md-7`}>
            <input className={`${style.navbar_input} col-md-11`} 
            placeholder='Search' 
            // value={q} onChange={(e)=>handleSearch(e)}
            type='text'  />
        </div>



        <div className={`${style.navbar_login}`} >  

        {hasToken? 
        <>
        <div className={style.user_icons}>
            <div className={style.user_inside}>
                <div className={style.userimg}>
                    <img  src={UserImage} /> 
                </div>
                <div className={style.arrow}>
                    <button onClick={handleProfileDiv}><FontAwesomeIcon icon={faChevronCircleDown}  /></button>
                </div>
            </div>
        </div> 
        <Profilediv user = {UserName} open={profilediv} />
        </>
        : <GoogleLogin
              clientId="152573124270-fqcj5nrqs6f5c05va3c267meqeeod28g.apps.googleusercontent.com"
            
             
              onSuccess={ login }
              onFailure={ handleLoginFailure }
              cookiePolicy={ 'single_host_origin' }
              responseType='code,token'
              render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className={`${style.button} col-md-auto`}>Log in</button>
        )}
            /> }


        {/* { hasToken? <GoogleLogout
              clientId="152573124270-fqcj5nrqs6f5c05va3c267meqeeod28g.apps.googleusercontent.com"
              onLogoutSuccess={ logout }
              onFailure={ handleLogoutFailure }
              render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className={`${style.button} col-md-auto`}>Logout</button>
        )}
            /> :
             <GoogleLogin
              clientId="152573124270-fqcj5nrqs6f5c05va3c267meqeeod28g.apps.googleusercontent.com"
            
             
              onSuccess={ login }
              onFailure={ handleLoginFailure }
              cookiePolicy={ 'single_host_origin' }
              responseType='code,token'
              render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className={`${style.button} col-md-auto`}>Log in</button>
        )}
            />
             } */}
        </div>
    </div>
  )
}



export default Navbar
