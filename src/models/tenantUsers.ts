import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../helpers';

interface TenantUserAttributes {
  user_id: string;
  tenant_id: string;
  role_id: number;
  deleted: boolean;
  created_by: string;
  created_on: Date;
  updated_by?: string;
  updated_on?: Date;
}

interface TenantUserCreationAttributes
  extends Optional<TenantUserAttributes, 'user_id' | 'tenant_id'> {}

interface TenantUserInstance
  extends Model<TenantUserAttributes, TenantUserCreationAttributes>,
    TenantUserAttributes {}

export const TenantUsers = db.define<TenantUserInstance>('tenant_users', {
  user_id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUIDV4
  },
  tenant_id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUIDV4
  },
  role_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  deleted: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_by: {
    allowNull: false,
    type: DataTypes.UUIDV4
  },
  created_on: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_by: {
    allowNull: true,
    type: DataTypes.UUIDV4
  },
  updated_on: {
    allowNull: true,
    type: DataTypes.DATE
  }
});