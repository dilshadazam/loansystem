 //packages
import bcrypt from "bcryptjs";

//models
import Loanprovider from "../../../models/loanprovider.js";


//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";
// EXPORT FUNCTION NAME FOR ROUTE
export const loanproviderSignup = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { name,email, password,rolemasterId,loanprovidercode } = req.body;
 
  try {
    const lprovider = await Loanprovider.findOne(
      { where: {
        loanprovidercode,adminId: req.adminId,
      } 
    });
    if (lprovider) {
      const error = new Error("Loan Provider already exists on entered loanprovidercode please write another one");
      error.statusCode = 403;
      return next(error);
    }
    const encryptedPassword = await bcrypt.hash(password, 12);
    console.log(encryptedPassword);
    const result = await Loanprovider.create({
      name,
      email,
      password: encryptedPassword,
      rolemasterId,
      loanprovidercode,
      role:"LOANPROVIDER",
      isLoanproviderActive: true,
      isAuthorized:true,
      adminId: req.adminId,
    });
 
    res.status(201).json({
      msg: `Loan provider name is ${name}, ${email},rolemaster id is =${rolemasterId} and loanprovider code is =${loanprovidercode} Registered successfully`
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
