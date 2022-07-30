import React,{useState , useEffect} from 'react'
import style from '../../../styles/age.module.css'
const Age = (props) => {

  const [Age, setAge] = useState();

  const handleChange = (e)=>{
    setAge(e.target.value);
  }
  useEffect(() => {
    const timeoutId = setTimeout(() => props.callback(Age), 600);
    return () => clearTimeout(timeoutId);
  }, [Age]);
  
  return (
    <div className={style.age_div}>
            <div className={`${style.age} row `}>
                <h1 className={style.h1}>How old are you?</h1>
            </div>
            <div className={`${style.age_input} row`} >
                <input name='age' required value={Age} onChange={handleChange} className={style.input} placeholder='Age' type="text" />
            </div>
           
        </div>
  )
}

export default Age