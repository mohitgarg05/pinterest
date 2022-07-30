import React,{useRef , useEffect , useState} from 'react'
import style from '../../../styles/card.module.css'

const Card = (props) => {
  const box = useRef();
  const [Clicked, setClicked] = useState(false)
  const [userIn, setuserIn] = useState([])


  const handleSelect = ()=>{
    // console.log(box.current.textContent);
    // userIn.push(box.current.textContent)
  
    // setuserIn([...userIn ,box.current.textContent ])
    props.callback(box.current.textContent);
    setClicked(!Clicked);
  }




  useEffect(() => {

   
    //   const timeoutId = setTimeout(() => props.callback(userIn), 300);
    //   return () => clearTimeout(timeoutId);
    

  }, [userIn]);
  
  return (
    <div className={`${style.card_grid} `}>
        <div className={`${style.card} ${Clicked?style.card_active : ""} `} onClick={handleSelect}>
            <div className={style.card_header}>
                <img src={props.TopicUrl} />
            </div>
            <div className={`${style.card_body} ${Clicked?style.card_body_active : ""} `}>
               <p ref={box}>{props.TopicName}</p>
            </div>
        </div>
    </div>
  )
}

export default Card