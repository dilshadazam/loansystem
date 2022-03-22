//packages
import bcrypt from "bcryptjs";

//models
import Admin from "../../../models/admin.js";

export const AdminpasswordReset = async (req, res, next) => {
  const {  password,confirmpassword} = req.body;
 
  try {
    const admin = await Admin.findOne({
      where: {
        adminId: req.adminId,
        password
      },
      raw: true,
    });
    if (password == confirmpassword ) {
      password = await bcrypt.hash(password, 12);
      const admin = await Admin.update(
        { password: password },
      );

      if (!admin) {
        const error = new Error("input Credentials not matched");
        error.statusCode = 403;
        return next(error);
      }

      res.status(201).json({
        msg: "Admin"+" "+email+" "+"Password Updated successfully",
      });
    } else {
      const error = new Error("Entered credentials not match");
      error.statusCode = 403;
      return next(error);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};