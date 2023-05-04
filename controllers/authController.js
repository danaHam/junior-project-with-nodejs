const Customer = require('../models/customer');
const HandleErrors = require('../routes/validations');
const jwt = require('jsonwebtoken');
const Region = require('../models/region');
const Ticket = require('../models/ticket');


const signUp = async (req,res,) =>{
    // const { email, password,phone,role, } = req.body  || req.params;      
    try {
    //   await validator(req.body,ValidationRule,{},(err, status) => {
    //     if (!status) {
    //         res.status(412)
    //             .send({
    //                 success: false,
    //                 message: 'Validation failed',
    //                 data: err
    //             });
    //     } else {
    //         next();
    //     }
    // }).catch( err => console.log(err));
      // const customer = await Customer.create({ email, password,phone,role });
      const user = new Customer(req.body);
      await user.save();
      console.log(user+'----------');
      const region = Region.findById({_id:user.region});
     
      // region.cust.push(user);
      // await region.save();
      console.log(region+'////////////');
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({
        success : true,
        message : " add sucess",
        user : user,
        token : token
      });
    }catch(err){
        const errors = HandleErrors.handleErrors(err);
        console.log(errors);
        res.status(400).json({ errors });
        
      }
      
}



const login = async (req,res)=>{
  const {phone ,password} = req.body;

  try{
    const user = await Customer.log(phone,password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({success:true,message:"login Success",token:token,})
  }catch(err){
    const errors = HandleErrors.handleErrors(err); 
    res.status(400).json({success : false , message : res.send(errors)});
  }
}


const viewUsers = async ( req,res)=>{

    await Customer.find().populate()
    .then((result)=>{
      res.status(200).json({success : true, data : result });
     })
     .catch((err)=>{
      res.status(401).json({success : false, message : res.send(err) });
    
    })
}


const viewOneUser = async (req,res)=>{
  const id = req.params.id;
  console.log(id);
  await Customer.findById(id)
  .then((result)=>{
    res.status(200).json({success : true, data : result });
  })
  .catch((err)=>{
    res.status(401).json({success : false, message : res.send(err) });
  })
}


const deleteUser = async (req,res)=>{
  const id = req.params.id;
  Customer.findByIdAndDelete(id)
  .then((result)=>{
      if(result){
        res.send({
          "message" : "delete success"
        });
      }
  })
  .catch((err)=>{
    res.status(401).json({success : false , message : res.send(err)});
    console.log(err);
  })

}



//  const allCustomer = async(req,res)=>{
//   await Customer.find({role : "Customer"}).populate('tickets')
//   .then((result)=>{
//     result.forEach((e)=>{
//       res.send(e.tickets.forEach((t)=>
//       res.send(t) //just property ticket 
//       ));
//     });
//   })
//   .catch((err)=>{
//     res.send(err);
//   })
// }


//create token


// const allCustomer = async(req,res)=>{
//   await Customer.find({role : "Customer"}).populate('tickets')
//   .then((result)=>{
//     result.forEach((e)=>{
//       res.send(e)///just this object when relation another object
//     });
//   })
//   .catch((err)=>{
//     res.send(err);
//   })
// }

const allCustomer = async(req,res)=>{
  await Customer.find({role : "Customer"}).populate('tickets')
  .then((result)=>{
      res.send(result) ///list of object Role customer 
  })
  .catch((err)=>{
    res.send(err);
  })
}




const maxAge = 3 * 24 * 60 * 60; 
const createToken = (id)=>{
  return jwt.sign({ id},'maintance tiketing System',{
    expiresIn : maxAge
  });
};


module.exports = {
    signUp,
    login,
    viewUsers,
    viewOneUser,
    deleteUser,
    allCustomer
}