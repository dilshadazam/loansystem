
// import User from "../../../models/user.js";
import pkg from "sequelize";
import sequelize from "../../../utilities/database.js";
const { QueryTypes } = pkg;

export const getAllMySignupCustomer = async (req, res, next) => {
  const loanproviderId = req.loanproviderId;

  console.log(loanproviderId);
  try {
    const details = await sequelize.query(
      "SELECT users.name,users.email,users.loanprovidercode,users.loanproviderId,users.isUserActive FROM users INNER JOIN loanproviders ON users.loanproviderId = loanproviders.id WHERE users.loanproviderId=?;",
      { type: QueryTypes.SELECT, replacements: [req.loanproviderId] }
    );

    res.status(200).json({
      message: `All signup customer fetched for loanproviderId=${loanproviderId}`,
      getAllMySignupCustomer: details,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};