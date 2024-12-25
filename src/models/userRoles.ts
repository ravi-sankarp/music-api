import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../helpers';

interface UserRoleAttributes {
  id: number;
  name: string;
  description: string;
}

interface UserRoleCreationAttributes extends Optional<UserRoleAttributes, 'id'> {}

interface UserRoleInstance
  extends Model<UserRoleAttributes, UserRoleCreationAttributes>,
    UserRoleAttributes {}

export const UserRoles = db.define<UserRoleInstance>('user_roles', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(100),
    unique: true
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  }
});
