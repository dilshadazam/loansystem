import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";
import loanprovider from "../models/loanprovider.js";

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  loanproviderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model:loanprovider,
      key: "id",
    },
},
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  
  loanprovidercode: {
    type: Sequelize.STRING,
    allowNull: false,
},
 
  isUserActive:{
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  role:{
    type:Sequelize.STRING,
    allowNull:false,
  },
  refreshToken: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default User;
