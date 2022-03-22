//models
import Customer from "../../../models/customer.js";

import {validationErrorHandler} from "../../../helpers/validation-error-handler.js";
// EXPORT FUNCTION NAME FOR ROUTE
export const createCustomer = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {customerUniqueNo,f_name,l_name,email,contact_no,gender, d_o_b,city,student,employee,self_employed} = req.body;
  try {
    const preExistingCustomer = await Customer.findOne({
      where: {
        loanproviderId:req.loanproviderId,
        customerUniqueNo,
      }
    });
    const preExistingCustomer1 = await Customer.findOne({
        where: {
          loanproviderId:req.loanproviderId,
          email
        }
      });
    if (preExistingCustomer) {
      const error = new Error(' Customer Basic information is already Exists! On Entered customerUniqueNo');
      error.statusCode = 403;
      return next(error);
    }
    if (preExistingCustomer1) {  
        const error = new Error('Customer Basic information is already Exists! on Entered emailId ');
        error.statusCode = 403;
        return next(error);
      }
    //response in postman when data successfully inserted
    const response = await Customer.create({
        customerUniqueNo,loanproviderId:req.loanproviderId, f_name,l_name,email,contact_no,gender, d_o_b,city,student,employee,self_employed
    });
    res.status(201).json({
      message: "Customer Basic information add successfully",
      response
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};