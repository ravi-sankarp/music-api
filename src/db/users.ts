import { Users } from '../models/users';
import { TenantUsers } from '../models/tenantUsers';
import { db } from '../helpers';
import { RoleToIdMap, RoleToStringMap } from '../common/constants';
import { Tenants } from '../models/tenants';
import { QueryTypes } from 'sequelize';
import { UsersFilters } from '../common/validations/filters';

export const getUserByEmail = async (email: string) => {
  const user = await Users.findOne({ where: { email } });
  return user;
};

export const getTenantUserByUserId = async (userId: string) => {
  const tenantUser = await TenantUsers.findOne({ where: { user_id: userId, deleted: false } });
  return tenantUser;
};

export const createUserAndTenantUser = async (userData: {
  email: string;
  password: string;
  role: keyof typeof RoleToIdMap;
  tenantId?: string;
}) => {
  const transaction = await db.transaction({ autocommit: false });
  try {
    const user = await Users.create(userData, { transaction });
    if (!userData.tenantId) {
      const tenant = await Tenants.create({ created_by: user.dataValues.user_id }, { transaction });
      await TenantUsers.create(
        {
          created_by: user.dataValues.user_id,
          role_id: RoleToIdMap[userData.role] as keyof typeof RoleToStringMap,
          tenant_id: tenant.dataValues.tenant_id,
          user_id: user.dataValues.user_id
        },
        { transaction }
      );
    } else {
      await TenantUsers.create(
        {
          created_by: user.dataValues.user_id,
          role_id: RoleToIdMap[userData.role] as keyof typeof RoleToStringMap,
          tenant_id: userData.tenantId,
          user_id: user.dataValues.user_id
        },
        { transaction }
      );
    }
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const getUsersByTenantId = async (
  tenantId: string,
  userId: string,
  filters: UsersFilters
) => {
  const query = `SELECT users.user_id user_id, email, name role, users.created_at created_at
  FROM tenant_users tu
  JOIN users users
  ON tu.tenant_id = :tenantId
  AND tu.user_id = users.user_id
  AND tu.user_id <> :userId
  AND tu.deleted = false
  ${filters.role ? `AND tu.role_id = ${RoleToIdMap[filters.role as keyof typeof RoleToIdMap]}` : ''}
  JOIN user_roles roles 
  ON tu.role_id = roles.id
  limit ${filters.limit}
  offset ${filters.offset}
  `;

  const users = await db.query(query, {
    type: QueryTypes.SELECT,
    replacements: { tenantId, userId }
  });
  return users;
};

export const deleteTenantUser = async (userId: string, tenantId: string) => {
  await TenantUsers.update({ deleted: true }, { where: { user_id: userId, tenant_id: tenantId } });
};

export const getUserById = async (userId: string) => {
  const user = await Users.findOne({ where: { user_id: userId } });
  return user;
};
export const updateUserPasswordById = async (userId: string, newPassword: string) => {
  await Users.update({ password: newPassword }, { where: { user_id: userId } });
};
