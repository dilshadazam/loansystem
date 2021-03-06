//models
import User from "../../../models/user.js";
//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const userSignout = async(req, res, next) => {
  validationErrorHandler(req, next);
  try{
    const result = await User.update({
      refreshToken: null
      
    },{ where:
       {
       id:req.UserId
      } 
      });
    if (result[0] === 0) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

   
    res.status(201).json({
      message: 'User logged out successfully'
    });
  }catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};