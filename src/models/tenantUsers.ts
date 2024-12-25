import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../helpers';
import { RoleToIdMap, RoleToStringMap } from '../common/constants';
import { ObjectValues } from '../types/types';
import { UserRoles } from './userRoles';

interface TenantUserAttributes {
  user_id: string;
  tenant_id: string;
  role_id: keyof typeof RoleToStringMap;
  deleted: boolean;
  created_by: string;
  created_at: Date;
  updated_by?: string;
  updated_at?: Date;
}

interface TenantUserCreationAttributes
  extends Optional<TenantUserAttributes, 'deleted' | 'created_at' | 'updated_by' | 'updated_at'> {}

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
  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_by: {
    allowNull: true,
    type: DataTypes.UUIDV4
  },
  updated_at: {
    allowNull: true,
    type: DataTypes.DATE
  }
},{
  freezeTableName: true,
  timestamps: false,
  createdAt: false,
  updatedAt: false
});

TenantUsers.belongsTo(UserRoles, { foreignKey: 'role_id',as:"user_role" });
