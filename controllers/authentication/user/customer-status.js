//models
import Customer from "../../../models/user.js";

//helpers
import {validationErrorHandler} from "../../../helpers/validation-error-handler.js";

export const toggleCustomerStatus = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {isUserActive} = req.body;
  try {
    await Customer.findOne({
      isUserActive: isUserActive,
      },
      {
        where: {
          userId: req.params.userId
        }
      });
    const result = await Customer.update({
    isUserActive,
    }, {
      where: {
        id: req.params.userId
      }
    });
    if (result[0] === 0) {
      const error = new Error('customer not found');
      error.statusCode = 404;
      return next(error);
     
    }
    res.status(201).json({
      message: 'customer status updated successfully'
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};