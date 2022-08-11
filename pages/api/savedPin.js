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

            const filter = {
              userEmail : body.mail
            }

            const update = {
              $push:{
                userSaved : {
                image : body.img,
                alt_description : body.alt,
                description : body.descr
              }
            }
            }

            const user = await User.findOneAndUpdate(filter , update,{
              new:true
            });

       
              console.log(user);

             
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


