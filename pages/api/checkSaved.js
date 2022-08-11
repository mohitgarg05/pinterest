import dbConnect from '../../utils/dbconnect'
import User from '../../models/user'

dbConnect();

export default async (req, res) => {
  const {method} = req;
  
  switch(method){
    case 'POST':
        const body = JSON.parse(req.body);
        console.log(body);
          try {
            const user = await User.find({userEmail : body.mail});
        
            const userData = user[0].userSaved;
            // console.log(userData);
            userData.map((item)=>{
                
            })

            const getData = userData.filter((item)=>item.image === body.img);
            console.log(getData);
            res.status(200).json({sucess:true , data:user})
          } catch (error) {
            res.status(400).json({sucess:false , error:error})
          }
          break;
    
    default:
      res.status(400).json({sucess:false});
      break;

    
  }
}

