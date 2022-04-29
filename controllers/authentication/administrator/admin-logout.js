import admin from "../../../models/admin.js";
//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";


export const adminSignout = async (req, res, next) => {
  validationErrorHandler(req, next);
  try {
    const result = await admin.update(
      {
        refreshToken: null,
      },
      {
        where: {
          // id: req.adminId,
        },
      }
    );
    if (result[0] === 0) {
      const error = new Error("Admin not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(201).json({
      message: "Admin logged out successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};