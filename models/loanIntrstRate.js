import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";
import interestname from "../models/loaneIntrstName.js";
import admin from "./admin.js";

const LoanInteresRate = sequelize.define("interestrate", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,

  },

  adminId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
        model:admin,
        key: "id",
  },},
  
  interestnameId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
        model:interestname,
        key: "id",
  },},
  
  rateofinterest: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },

  penaltyrate: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
 

});

export default LoanInteresRate;
