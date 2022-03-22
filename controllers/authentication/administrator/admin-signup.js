//packages
import bcrypt from "bcryptjs";

//models
import Admin from "../../../models/admin.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const adminSignup = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { name,email, password } = req.body;
 
  try {
    const admin = await Admin.findOne({ where: { email } });
    if (admin) {
      const error = new Error("Admin is already registered by entered email ");
      error.statusCode = 403;
      return next(error);
    }
    const encryptedPassword = await bcrypt.hash(password, 12);
    console.log(encryptedPassword);
    const result = await Admin.create({
      name,
      email,
      password: encryptedPassword,
      isAdminActive: true,
      isAuthorized:true,
      role:"ADMIN",
    });
   
    res.status(201).json({
      msg: `admin Registered successfully`
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
