import dbConnect from '../../utils/dbconnect'
import User from '../../models/user'

dbConnect();


export default async (req, res) => {
  const {method} = req;
  
  switch(method){
    case 'GET':
      console.log(req.body);
    
      try {
        const user = await User.find({});
        res.status(200).json({sucess:true , data:user})
      } catch (error) {
        res.status(400).json({sucess:false})
      }
      break;

    case 'POST':
      const body = JSON.parse(req.body);

          try {

            const filter = {
              userEmail : body.mail
            }

            const update = {
              $push:{
              userPins : {
                description : body.title,
                alt_description : body.describ,
                about : body.about,
                image : body.img
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


