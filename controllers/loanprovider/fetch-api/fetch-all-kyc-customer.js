
// import User from "../../../models/user.js";
import pkg from "sequelize";
import sequelize from "../../../utilities/database.js";
const { QueryTypes } = pkg;

export const getCustomerKycInfo = async (req, res, next) => {
    
  const loanproviderId = req.loanproviderId;

  console.log(loanproviderId);
  try {
    const details = await sequelize.query(
      "SELECT customers.customerUniqueNo,customers.email,customers.contact_no,customers.gender,customers.d_o_b,customers.pan_no,customers.adhar_no FROM customers INNER JOIN loanproviders ON customers.loanproviderId = loanproviders.id WHERE customers.loanproviderId=?",
      { type: QueryTypes.SELECT, replacements: [req.loanproviderId] }
    );

    res.status(200).json({
      message: `All list customer kyc check for loanproviderId=${loanproviderId}`,
      getCustomerKycInfo: details,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};