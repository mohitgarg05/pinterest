import React,{useState,useEffect} from 'react'
import style from '../../../styles/gender.module.css'
const Gender = (props) => {


  const [ValueChange, setValueChange] = useState("")
  const handlesubmit=()=>{

  }
  const handlevalue = (e)=>{
    setValueChange(e.target.value)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => props.callback(ValueChange), 600);
    return () => clearTimeout(timeoutId);
  }, [ValueChange])
  


  return (
    <div className={style.age_div}>
        <div className={`${style.age} row `}>
            <h1 className={style.h1}>What is your gender?</h1>
        </div>
        <form onSubmit={handlesubmit}>
            <div className={`${style.radio_button} `}>
                <input 
                className={style.radio_input} 
                type="radio" 
                id="male" 
                name="gender" 
                value="Male"
                onChange={handlevalue} />

                <label className={style.label} htmlFor="male">Male</label><br/>
                <input 
                type="radio" 
                id="female" 
                name="gender" 
                value="Female" 
                onChange={handlevalue} 
                />
                <label className={style.label} htmlFor="female">Female</label><br/>
                <input 
                type="radio" 
                id="nota" 
                name="gender" 
                value="Not Specified"
                onChange={handlevalue}  />
                <label  className={style.label} htmlFor="nota">Not Specified</label><br/>
            </div>
        </form>
        
    </div>
  )
}

export default Gender