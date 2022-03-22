import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";
import Loanprovider from "./loanprovider.js";

const Customer = sequelize.define("customer", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull: false,
    primaryKey: true,
    
   
  },
  customerUniqueNo: {
    type: Sequelize.STRING,
    allowNull: true,
  },

loanproviderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model:Loanprovider,
      key: "id",
    },
},
  company_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  f_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  l_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  contact_no: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  d_o_b: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  student: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  employee: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  self_employed: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  pan_no: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  adhar_no: {
    type: Sequelize.STRING,
    allowNull: true,
  },
 
 
});

export default Customer;
