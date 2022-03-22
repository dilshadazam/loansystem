import express from 'express';

import {body} from 'express-validator';

import {adminSignup} from "../controllers/authentication/administrator/admin-signup.js";

import {administratorLogin} from "../controllers/authentication/administrator/admin-login.js";

import {adminSignout} from "../controllers/authentication/administrator/admin-logout.js";

import {AdminpasswordReset} from "../controllers/authentication/administrator/admin-password-reset.js";

import {loanproviderSignup} from "../controllers/authentication/loanprovider/loanprovider-signup.js";

import {loanproviderLogin} from "../controllers/authentication/loanprovider/loanprovider-login.js";

import {loanproviderSignout} from "../controllers/authentication/loanprovider/loanprovider-logout.js"; 

import {customerSignup} from "../controllers/authentication/user/customer-signup.js";

import {customerLogin} from "../controllers/authentication/user/customer-login.js";

import {userSignout} from "../controllers/authentication/user/customer-logout.js";

const router = express.Router();
import { isAdministrator } from "../middleware/is-admin.js";
import {isLoanprovider} from "../middleware/is-loanprovider.js";

//ADMIN LOGIN USING EMAIL + PASSWORD
router.post('/administrator/signup', [
  body('name').trim().not().isEmpty().withMessage("Name is required"),
  body('email').isEmail().normalizeEmail().withMessage("Should be in a valid email format"),
  body('password').trim().isLength({min: 6}).withMessage("Minimum 6 characters")
], adminSignup);

//ADMIN LOGIN USING EMAIL + PASSWORD
router.post('/administrator/login', [
  body('email').isEmail().normalizeEmail().withMessage("Should be in a valid email format"),
  body('password').trim().isLength({min: 6}).withMessage("Minimum 6 characters")
], administratorLogin);

 //admin logout by it self 
 router.put('/administrator/administrator-logout', 
 adminSignout);
 

 router.put("/administrator/passwordreset",[
  body('oldpassword').isEmail().normalizeEmail().withMessage("Should be in a valid email format"),
  body('newpassword').trim().isLength({min: 6}).withMessage("Minimum 6 characters")
], AdminpasswordReset);



//LOAN PROVIDER signup by admin
router.post('/loanprovider/loanprovider-signup', [
  body('name').trim().not().isEmpty().withMessage("Name is required"),
  body('email').isEmail().normalizeEmail().withMessage("Should be in a valid email format"),
  body('loanprovidercode').trim().not().isEmpty().withMessage("loanprovidercode is required"),
  body('rolemasterId').not().isEmpty().withMessage("rolemasterId is required"),
  body('password').trim().isLength({min: 6}).withMessage("Minimum 6 characters")
],isAdministrator, loanproviderSignup);


//LOAN PROVIDER login by it self 
router.post('/loanprovider/login', [
  body('email').isEmail().normalizeEmail().withMessage("Should be in a valid email format"),
  body('password').trim().isLength({min: 6}).withMessage("Minimum 6 characters")
], loanproviderLogin);


 //loanprovider logout by it self 
 router.put('/loanprovider/loanprovider-logout', 
 loanproviderSignout);
 

// //customer signup by admin
// router.post('/administrator/customerbyadmin-signup', [
//   body('name').trim().not().isEmpty().withMessage("Name is required"),
//   body('email').isEmail().normalizeEmail().withMessage("Should be in a valid email format"),
//   body('loanprovidercode').trim().not().isEmpty().withMessage("loanprovidercode is required"),
//   body('password').trim().isLength({min: 6}).withMessage("Minimum 6 characters")
// ],isAdministrator, customerSignup);


//customer signup by company
router.post('/user/customerbycompany-signup', [
  body('name').trim().not().isEmpty().withMessage("Name is required"),
  body('email').isEmail().normalizeEmail().withMessage("Should be in a valid email format"),
  body('loanprovidercode').trim().not().isEmpty().withMessage("loanprovidercode is required"),
  body('password').trim().isLength({min: 6}).withMessage("Minimum 6 characters")
],isLoanprovider, customerSignup);



//customer login by it self 
router.post('/user/user-longin', 
[
  body('email').isEmail().normalizeEmail().withMessage("Should be in a valid email format"),
  body('password').trim().isLength({min: 6}).withMessage("Minimum 6 characters")
],
 customerLogin);

 //customer logout by it self 
router.put('/user/user-logout', 
userSignout);



export default router;
