import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../helpers';

interface TenantAttributes {
  tenant_id: string;
  created_by?: string;
  created_on: Date;
  updated_on?: Date;
  updated_by?: string;
}

interface TenantCreationAttributes extends Optional<TenantAttributes, 'tenant_id'> {}

interface TenantInstance
  extends Model<TenantAttributes, TenantCreationAttributes>,
    TenantAttributes {}

export const Tenants = db.define<TenantInstance>('tenants', {
  tenant_id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUIDV4,
    defaultValue: db.literal('default')
  },
  created_by: {
    allowNull: true,
    type: DataTypes.UUIDV4
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
