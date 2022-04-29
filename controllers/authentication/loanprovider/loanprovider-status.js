//models
import Loanprovider from "../../../models/loanprovider.js";

//helpers
import {validationErrorHandler} from "../../../helpers/validation-error-handler.js";

export const toggleLoanproviderStatus = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { isLoanproviderActive} = req.body;
  try {
    await Loanprovider.findOne({
      isLoanproviderActive: isLoanproviderActive,   
      },
      {
        where: {
          loanproviderId: req.params.loanproviderId
        }
      });
    const result = await Loanprovider.update({
      isLoanproviderActive,   
    }, {
      where: {
        id: req.params.loanproviderId
      }
    });
    if (result[0] === 0) {
      const error = new Error('loanprovider not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(201).json({
      message: 'loanprovider status updated successfully'
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};