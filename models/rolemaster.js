import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";

import admin from "./admin.js";
const RoleMaster = sequelize.define("rolemaster", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  rolemastertitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  adminId:{
    type:Sequelize.INTEGER,
    allowNull:false,
    References:{
      model:admin,
      key:"id",
    },
  },

});
export default RoleMaster;