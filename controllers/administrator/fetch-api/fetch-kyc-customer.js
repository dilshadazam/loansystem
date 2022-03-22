//Models
import Customer from "../../../models/customer.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

// EXPORT FUNCTION NAME FOR ROUTE
export const getSingleCustKycData = async (req, res, next) => {
  validationErrorHandler(req, next);
  const customerUniqueNo = req.params.customerUniqueNo;
  try {
    const data = await Customer.findAll({

      where: {
        customerUniqueNo,
      },
      
      attributes: [ "f_name","l_name","company_name","email","gender", "contact_no","d_o_b","city","student","employee","self_employed","pan_no","adhar_no", "createdAt"],
      raw: true,
    });
    //if data not found by customer unique number then this message will appeare
    if (!data) {
      const error = new Error('data not found');
      error.statusCode = 404;
      return next(error);
    }
     //response in postman when data successfully inserted
     res.status(200).json({
      message: `KYC Customer information by customer Unique No = ${customerUniqueNo}`,
      data,
    });
  }catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};