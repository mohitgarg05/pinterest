import React , {useEffect , useState} from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import cookie from 'js-cookie'
import Link from 'next/link'
import Navbar from './navbar'
const Allpics = () => {


  const [newPin, setnewPin] = useState([])
  const [RandomList, setRandomList] = useState([])
  const [Items, setItems] = useState()



  const classes = ["tall" , "wide" , "big"];

  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
  const random_item = items=> items[Math.floor(Math.random()*items.length)];

  const getImage = async(item)=>{

    const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query: item,
          per_page : 25},
        headers: {
            Authorization: 'Client-ID ADmV0kpNakTQJSpb24nkMIUb6WBcn4_b8YWRAOvYl14'
        }
    })
    return response.data.results;
  }

  const getUser = (t)=>{
    const y = jwt.decode(t);
    const sen = y.email;
 
    const obj = {
      email : sen
    }

     fetch('/api/getUserByEmail ',{
          method:'POST',
          header:{
              "Content-Type" : "application/json"
          },
          body : JSON.stringify(obj)
      }).then(async(data)=>{
        const res = await data.json();
        setItems(res.data[0].userInterest);
      
      })


    }

  useEffect(() => {

    const initialRender = ()=>{
      setnewPin([])
      Items?.forEach(async(item)=>{
        console.log(item);
          getImage(item).then((res)=>{
           res.map((itemss)=>{
              setnewPin((oldArray) => [...oldArray, itemss])
            }) 
          });
      })
    }
    initialRender();
    
  }, [Items])

  

  useEffect(() => {

    const t = cookie.get('token');
    console.log(t);
    if(t != undefined) getUser(t);
    else setItems(["car" , "bali" , "bikes" , "office"])
  }, [])
  

  
  useEffect(() => {

  
   setRandomList(shuffle(newPin));


    console.log(newPin);
  }, [newPin])


 

  
  
  return (
    <>
    
    <div className='row' style={{width:"100%"}}>
            <Navbar />
        </div>
        <div className='container' >
            <div className="grid-wrapper">


              {RandomList.map((item)=>{
              
                return(
                  <>
                    <div className={random_item(classes)}>
                      <Link href= {`/components/picId/${item.id}`}><img src={item.urls.small_s3} /></Link>
                    </div>
                  </>
                )
              })}
            </div>
        </div>
      </>
    
  )
}

export default Allpics;

