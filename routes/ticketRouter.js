const express =  require('express');
const route = express.Router();
const ticketController = require('../controllers/ticketController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

//route.get('*', requireAuth);

route.route("/ticket")
    .get(ticketController.createTicket_get)
    .post(ticketController.createTicket_post)
;
route.post("/ticket2", ticketController.createTicket2_post);

///////////////////////////////////////////////// All Tickets /////////////////////////////////////////////
route.route("/tickets")
    .get(ticketController.get_tickets)
    .delete(ticketController.delete_tickets)
;

///////////////////////////////////////////////// Specific Tickets /////////////////////////////////////////
route.route("/tick/:ticketID")
    .get(ticketController.get_ticket)
    .patch(ticketController.updateTicket_patch)
    .delete(ticketController.delete_ticket)
;
route.get("/ticket/:ticketID/img", ticketController.get_ticket_img);

module.exports = route;