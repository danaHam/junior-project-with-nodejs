const Customer = require('../models/customer');
const Handle = require('../routes/validations');

const addTechnician = async(req,res)=>{
  try{
    const tech = new Customer(req.body);
    console.log(req.body);
    console.log(tech);
    await tech.save();
    console.log(req.body);  
    res.status(201).json({success : true, message : 'add technician success'});
    
  }catch(err){ 
    const errors = Handle.handleErrors(err)
    res.status(400).json({success : false ,message : res.send(errors)});
  }
}

const viewTechnicianByName = async(req,res)=>{
  try{
   const viewTech = await Customer.findOne({role :"technicial"});
    res.status(201).json({success:true,data:viewTech});
  }catch(err){
    res.status(400).json({success:false, message:res.send(err)});
  }
}

const viewAllTechnician = async(req,res)=>{
  try{  const viewTech = await Customer.find({role :"technicial"});
  res.status(201).json({success:true,data:viewTech});
}
  catch(err){
  res.status(400).json({success:false, message:res.send(err)});
}
 
}

const updateTechnician = async(req,res)=>{
  const id = req.params.id;
  console.log(id);
   try{
   const edit = await Customer.findByIdAndUpdate(id,{name : req.body.name,phone:req.body.phone},{new : true});
   await edit.save();
    res.status(201).json({success:true,message:'edit success'});
   }catch(err){
    res.status(400).json({success:false, message:res.send(err)});
   }
}

const deleteTechnician = async (req,res)=>{
  const id = req.params.id;
  try{
    await Customer.findByIdAndDelete(id);
    res.status(201).json({success : true, message : "delete Success"});
  }catch(err){
    res.status(400).json({success : false , message : res.send(err)});
  }
} 

module.exports = {
  addTechnician,
  viewTechnicianByName,
  viewAllTechnician,
  updateTechnician,
  deleteTechnician,
  
}