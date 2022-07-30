import dbConnect from '../../utils/dbconnect'
import User from '../../models/user'

dbConnect();

export default async (req, res) => {
  const {method} = req;
  
  switch(method){

    
    case 'GET':
    
          try {
            const user = await User.find({});
            res.status(200).json({sucess:true , data:user})
          } catch (error) {
            res.status(400).json({sucess:false})
          }
          break;

    case 'POST':
        
      const body = JSON.parse(req.body);
      console.log(body.email);
          try {
            const user = await User.find({userEmail : body.email});
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

