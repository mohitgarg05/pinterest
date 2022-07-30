import dbConnect from '../../utils/dbconnect'
import User from '../../models/user'
import jwt from 'jsonwebtoken'
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

    case 'POST' : 
          
          const body = JSON.parse(req.body);
          console.log(body);
          try {
            const present = await User.find({userEmail:body.email});
            console.log(present);
            if(present.length==0){

              const user = new User({
                userEmail : body.email,
                userName : body.name,
                userImage : body.img,
                userAge : body.age,
                userGender : body.gender,
                userInterest : body.interest
              })

              console.log(user);

               user.save();

              const token =  generateToken(body.email , user._id) ;
                
             
              res.status(201).json({status:"done" ,sucess:true , data:user , token : token})

            }
            else{
              const token =  generateToken(body.email , present._id) ;
              res.status(201).json({status:"present" , token:token , data:present});
            }
          } catch (error) {
            res.status(400).json({sucess:false , message:error})
          }
          break;
    
    default:
      res.status(400).json({sucess:false});
      break;

    
  }
}

const generateToken =  (email , id)=>{
  try {
    const token = jwt.sign({user_id: id , email} , "mynameismohitgargmonugargenchantedbikaner");

    return token;
  } catch (error) {
    console.log(error);
  }
}
