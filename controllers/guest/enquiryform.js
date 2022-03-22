//models
import EnquiryForm from "../../models/enquiryform.js";

import {validationErrorHandler} from "../../helpers/validation-error-handler.js";
// EXPORT FUNCTION NAME FOR ROUTE
export const createCustomerEnquiry = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {f_name,l_name,email,d_o_b,contact,gender,city,pincode,state,loantypesnameId,tenureId} = req.body;
 
    //response in postman when data successfully inserted
    const response = await EnquiryForm.create({
        f_name,l_name,email,d_o_b,contact,gender,city,pincode,state,loantypesnameId,tenureId });
        console.log(response);
        
    res.status(201).json({
      message: "Thank you" +" "+ l_name + " "+"our team will connect you soon",
  
      response
    
    });
 
};