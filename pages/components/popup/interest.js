import React , {useEffect , useState} from 'react'
import style from '../../../styles/interest.module.css'
import axios from 'axios'
import Card from './card'

const Interest = (props) => {

    const [Topics, setTopics] = useState();
    const [dataUser, setdataUser] = useState([])

    const getData = async()=>{  

        const re = await axios.get('https://api.unsplash.com/topics', {
            params: { per_page: 24},
            headers: {
                Authorization: 'Client-ID ADmV0kpNakTQJSpb24nkMIUb6WBcn4_b8YWRAOvYl14'
            }
        })

        setTopics(re.data);
    

    }


    useEffect(() => {
       getData();
    }, [])

   
    const getInterest =(temp)=>{
        console.log(temp);
        setdataUser([...dataUser , temp]);
    }

    useEffect(() => {
        if(dataUser.length >=5){
            props.callback(dataUser);
        }
    }, [dataUser])
    
    
  return (
    <div className={style.interest_div}>
    
    <div className='container'>
        <div className={`${style.heading} row `}>
            <h3>What are you into these days?</h3>
        </div>
        <div className={`${style.heading2} row `}>
            <p>Pick the topic you want to see in your home feed</p>
        </div>
        <div className={style.main_div}>
            <div className={style.card_grid}>
                {Topics?.map((item)=>{
                
                    return(
                        <>
                            <Card 
                            TopicName = {item.title} 
                            TopicUrl = {item.cover_photo.urls.regular} 
                            callback = {getInterest}
                            />
                            
                        </>
                    )
                })}
            </div>
        </div>
        
    </div>
    
    </div>
  )
}

export default Interest