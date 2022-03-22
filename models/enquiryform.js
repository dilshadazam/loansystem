import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";
import loantypename from "../models/types-of-loan.js";
import tenure from "../models/loaneIntrstName.js";

const EnquiryForm = sequelize.define("enquiryform", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  f_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  l_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  contact: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  d_o_b:{
    type:Sequelize.STRING,
    allowNull:false,
  },

  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pincode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  loantypesnameId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
        model:loantypename,
        key: "id",
  },},
  tenureId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
        model:tenure,
        key: "id",
  },},
});
export default EnquiryForm;