import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";
import loantypesname from "../models/types-of-loan.js";

const LoanInterestName = sequelize.define("interestname", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,

  },

  loantypesnameId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
        model:loantypesname,
        key: "id",
  },},

  
  interestname: {
    type: Sequelize.STRING,
    allowNull: true,
  },

    isActive:{
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },

});

export default LoanInterestName;
