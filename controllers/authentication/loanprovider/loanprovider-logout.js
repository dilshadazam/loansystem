import loanprovider from "../../../models/loanprovider.js";

export const loanproviderSignout = async (req, res, next) => {

  try {
    const result = await loanprovider.update({
      
      where: { 
     id:req.loanproviderId
      }
    }); 
    if (result[0] === 0) {
      const error = new Error('Loanprovider not found');
      error.statusCode = 404;
      return next(error);
    }
   
    res.status(201).json({
      message: "Loanprovider logged out successfully",
    });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
