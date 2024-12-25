import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../helpers';

interface UserAttributes {
  user_id: string;
  email: string;
  password: string;
  created_by?: string;
  created_on: Date;
  updated_on?: Date;
  updated_by?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

export const Users = db.define<UserInstance>('users', {
  user_id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUIDV4,
    defaultValue: db.literal('default')
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  created_by: {
    allowNull: true,
    type: DataTypes.UUID
  },
  created_on: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_on: {
    allowNull: true,
    type: DataTypes.DATE
  },
  updated_by: {
    allowNull: true,
    type: DataTypes.UUIDV4
  }
});
