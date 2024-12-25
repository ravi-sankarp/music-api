import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../helpers';
import { TenantUsers } from './tenantUsers';

export interface UserAttributes {
  user_id: string;
  email: string;
  password: string;
  created_by?: string;
  created_at: Date;
  updated_at?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'user_id' | 'created_at'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

export const Users = db.define<UserInstance>(
  'users',
  {
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
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      allowNull: true,
      type: DataTypes.DATE
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
);

Users.hasOne(TenantUsers, { foreignKey: 'user_id' , as:'tenant_users'});
TenantUsers.hasOne(Users, { foreignKey: 'user_id' });
