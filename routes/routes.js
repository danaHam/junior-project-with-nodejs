const express =  require('express');
const route = express.Router();


const authController = require('../controllers/authController');
const ticketController = require('../controllers/ticketController');
const regionController = require('../controllers/regionController');
const techController = require('../controllers/technicianController');
const {verifyToken} = require('../middleware/authMiddleware');


route.get('/',(req,res)=>res.send('ok'));


//auth routes
route.post('/sign-up',authController.signUp);
route.post('/login',authController.login);

//with token
route.get('/view-users',authController.viewUsers);
route.get('/view/:id',verifyToken,authController.viewOneUser);
route.delete('/delete/user/:id',verifyToken,authController.deleteUser);



//region Routes
route.post('/add-region',regionController.addRegion);
route.get('/get-all-region',regionController.allRegion);
route.get('/region/customer/:id', regionController.customerByRegion);
route.delete('/delete-region/:id',regionController.deleteRegion);

//technician Routes
route.post('/add-technician',techController.addTechnician);
route.get('/view-technician-by-name',techController.viewTechnicianByName);
route.get('/view-all-technician',techController.viewAllTechnician);
route.post('/edit-technician/:id',techController.updateTechnician);
route.delete('/delete-technician/:id', techController.deleteTechnician);
////tick

//route.post("/add/create/ticket/user",ticketController.createTicketUser);//create from user
route.get("/get/ticket/user/:id",ticketController.getTicketByUser);
route.get('/get/tic/:id',ticketController.getTicUser);//get user with array of tickets
//route.post('uploade',ticketController.createTicket2_post);

route.get('/welcom',verifyToken,(req,res)=>{
    res.send("welcoooom");
});

module.exports = route;

