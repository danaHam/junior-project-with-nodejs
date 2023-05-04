const Ticket = require("../models/ticket");
const Customer = require('../models/customer');
const path = require("path");

///////////////////////////////////////////////// Create One Ticket (User) ////////////////////////////////
const createTicket_get = (req, res)=> {
    res.sendFile('C:/Users/zeina/Desktop/Junior/public/ticket.html');
};

let ticketID = "";
const createTicket_post= async (req, res)=> {
    console.log('././././');
    const { customer, description } = req.body;
    const status = "New";
    try{
        console.log('........');
        const ticket = await Ticket.create({ customer, description, status });
        ticketID = ticket._id;
        //console.log(',.,.,..,finish');
        const cust =  await Customer.findById({_id : ticket.customer})
        cust.tickets.push(ticket)
        //console.log('before push');
        //console.log(cust);
        await cust.save()
        //console.log('after push');
        res.status(200).json({success : true,message :"add ticket success"})
    } catch(err){
        res.status(400).json({success : false ,message : res.send(err)});
    }
};

const getTicketByUser = async(req,res)=>{
    const id = req.params.id
    const tick = await Ticket.findOne({customer : id})
  try{
    let user = await Customer.findById({_id :tick.customer })
    user.tickets.push(tick)
    console.log(user);
  }
  catch(err){
    console.log(err);
  }
}

const getTicUser = async(req,res)=>{
   const thisUser =  await Customer.findById(req.params.id).populate('tickets');
 
   console.log(thisUser);

   res.status(200).json({success : true,data : thisUser})
}




const createTicket2_post = async (req, res)=> {
    try{
      const ticket = await Ticket.findById(ticketID);
      await ticket.uploadImage(req, res, () => {});
      res.send("done!");
    } catch(err){
        res.send(err.message);
    }
};

///////////////////////////////////////////////// Update One Ticket (Admin) //////////////////////////////
const updateTicket_patch = async (req, res)=> {
    const { technician, priority, status } = req.body;
    try{
        await Ticket.findByIdAndUpdate(req.params.ticketID, {$set: { technician, priority, status }});
        res.send("Successfully updated the ticket!");
    } catch(err){
        res.send(err.message);
    }
};

///////////////////////////////////////////////// Get One Ticket /////////////////////////////////////////
 const get_ticket =  async (req, res)=> {
    try{
      const ticket = await Ticket.findById(req.params.ticketID);
      ticket.showImage(res);
      res.send(ticket);
    } catch(err) {
      res.send(err.message);
    }
};
const get_ticket_img =  async (req, res)=> {
    try{
      const ticket = await Ticket.findById(req.params.ticketID);
      ticket.showImage(res);
    } catch(err) {
      res.send(err.message);
    }
};

///////////////////////////////////////////////// Delete One Ticket //////////////////////////////////////
const delete_ticket =  async (req, res)=> {
    try{
      await Ticket.findByIdAndDelete(req.params.ticketID);
      res.send("Successfully deleted the ticket!");
    } catch(err) {
        res.send(err.message);
    }
};

///////////////////////////////////////////////// Get All Tickets ////////////////////////////////////////
const get_tickets =  async (req, res)=> {
    try{
      const tickets = await Ticket.find({});
      res.send(tickets);
    } catch(err){
      res.send(err.message);
    }
};

///////////////////////////////////////////////// Delete All Tickets ////////////////////////////////////
const delete_tickets =  async (req, res)=> {
    try{
      await Ticket.deleteMany();
      res.send("Successfully deleted all tickets!");
    } catch(err){
        res.send(err.message);
    }
};


module.exports = {
    //createTicketUser,
    getTicketByUser,
    getTicUser,
   //createTicket2_post,
   createTicket_get,
   createTicket_post, 
   createTicket2_post,
   updateTicket_patch,
   get_ticket,
   get_ticket_img,
   delete_ticket,
   get_tickets,
   delete_tickets,
}