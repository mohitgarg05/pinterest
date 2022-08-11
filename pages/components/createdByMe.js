import React ,{useEffect , useState} from 'react'
import style from '../../styles/createdByMe.module.css'

const createdByMe = (props) => {
  console.log(props.my);
  const [Pins, setPins] = useState([])

  useEffect(() => {
    setPins(props.my)
  }, [props.my])

  useEffect(() => {

  console.log(Pins);
  
  }, [Pins])
  
  

  return (
    <div className={style.contain}>
        <div className={style.wrap}>
          <div className={style.images}>
            {Pins?.map((item)=>{
              return(
                <div className={style.img_pro}>
                  <img src={item.image} />
                </div>
              )
            })}
          </div>
        </div>
    </div>
  )
}

export default createdByMe