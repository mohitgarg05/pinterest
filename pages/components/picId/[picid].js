import React  from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import { useEffect ,useState } from 'react'
import Navbar from '../navbar'
import styles from '../../../styles/picdetail.module.css'
import {faDownload , faLink} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { saveAs } from 'file-saver'

const Pic = () => {
    const router = useRouter();
    const picId = router.query.picid;

    const [Image, setImage] = useState([])
    const [otherDetails, setotherDetails] = useState([] )
    
    const getImage = async()=>{

        const url = 'https://api.unsplash.com/photos/' +picId+ '?client_id=ADmV0kpNakTQJSpb24nkMIUb6WBcn4_b8YWRAOvYl14'
        const response = await axios.get(url)
        setImage(response.data.urls)
        setotherDetails(response.data);
      }

      useEffect(() => {
        console.log(Image);
        console.log(otherDetails);
      }, [Image,otherDetails])
      

    useEffect(() => {
        getImage();
    }, [picId])
    

    const downloadImage =  ()=>{
      saveAs(Image.small)
    }

    const getImageLink = ()=>{
      navigator.clipboard.writeText(window.location.href);
    }



  return (
    <>
      <Navbar/>
      <div className={styles.con}>
        <div className={styles.img_con}>
          <img src={Image.regular} />
        </div>
        <div className={styles.des_con}>
          <div className={styles.all_icons}>
            <button onClick={downloadImage}><FontAwesomeIcon icon={faDownload} /></button>
            <button onClick={getImageLink}><FontAwesomeIcon icon={faLink}/></button>
            <button>Save</button>
          </div>
          
          <h4 className={styles.h4}>{otherDetails.alt_description}</h4>
          <p className={styles.p}>{otherDetails.description}</p>
        </div>
      </div>
    </>
  )
}

export default Pic;

