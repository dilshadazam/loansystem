import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";


const LoanTypesName = sequelize.define("loantypesname", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  loantypename: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

export default LoanTypesName;