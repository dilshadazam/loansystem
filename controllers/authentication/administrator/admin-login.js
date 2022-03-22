//packages
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//models
import Admin from "../../../models/admin.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const administratorLogin = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({
      where: {
        email: req.body.email,
        isAdminActive:true,
      },
      raw: true,
    });
    if (!admin) {
      const error = new Error("Admin not found");
      error.statusCode = 404;
      return next(error);
    }
    const isPwdEqual = await bcrypt.compare(password, admin["password"]);
    if (!isPwdEqual) {
      const error = new Error("Wrong Password");
      error.statusCode = 401;
      return next(error);
    }
    const id = admin["id"];
    const name = admin["name"];
    const mail = admin["email"];
    const last_login_time=admin["updatedAt"];
    const role=admin['role'];
    const token = jwt.sign({ id, email: mail }, process.env.TOKEN_SIGNING_KEY, {
      expiresIn: "1 day",
    });
    const refreshToken = jwt.sign(
      { id, email: mail, name },
      process.env.REFRESH_TOKEN_SIGNING_KEY
    );
    await Admin.update(
      { refreshToken: refreshToken },
      { where: { email, isAdminActive: true } }
    );
    res.status(201).json({
      msg: `Hey Admin ${name} login successful`,
      token: token,
      refreshToken: refreshToken,
      name:name,
      role:role,
      Last_login_time:last_login_time,


    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
