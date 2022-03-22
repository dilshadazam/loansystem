import express from "express";

//BODY VALIDATOR IMPORT 
import { body } from "express-validator";
import {createCustomerEnquiry} from "../controllers/guest/enquiryform.js";

const router = express.Router();

//MIDDLEWARE OF LOANPROVIDER
import {isUser} from "../middleware/is-user.js";

router.post(
    "/addenquiry",
    createCustomerEnquiry
  );

export default router;