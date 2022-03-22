//models
import Rolemaster from "../../../models/rolemaster.js";

import {validationErrorHandler} from "../../../helpers/validation-error-handler.js";
 
// EXPORT FUNCTION NAME FOR ROUTE
export const createRoleMaster = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {rolemastertitle} = req.body;
  try {
    const preExistingRolemaster = await Rolemaster.findOne({
      where: { 
        rolemastertitle,
        adminId:req.adminId
      }
    }); 
    if (preExistingRolemaster) {
      const error = new Error('Role Master already Exists!');
      error.statusCode = 403;
      return next(error);
    }
    const response = await Rolemaster.create({
      rolemastertitle, adminId:req.adminId
    });
     //response in postman when data successfully inserted
    res.status(201).json({
      message: "Role Master create successfully !!",
      response
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};