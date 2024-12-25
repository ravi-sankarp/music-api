import { Users } from '../models/users';
import { TenantUsers } from '../models/tenantUsers';
import { db } from '../helpers';
import { UserSignup } from '../common/validations/users';
import { RoleToIdMap, RoleToStringMap } from '../common/constants';
import { Tenants } from '../models/tenants';

export const getUserByEmail = async (email: string) => {
  const user = await Users.findOne({ where: { email } });
  return user;
};

export const getTenantUserByUserId = async (userId: string) => {
  const tenantUser = await TenantUsers.findOne({ where: { user_id: userId } });
  return tenantUser;
};

export const createUserAndTenantUser = async (userData: UserSignup) => {
  const transaction = await db.transaction({ autocommit: false });
  try {
    const user = await Users.create(userData, { transaction });
    const tenant = await Tenants.create({ created_by: user.dataValues.user_id }, { transaction });
    const tenantUser = await TenantUsers.create(
      {
        created_by: user.dataValues.user_id,
        role_id: RoleToIdMap.ADMIN as keyof typeof RoleToStringMap,
        tenant_id: tenant.dataValues.tenant_id,
        user_id: user.dataValues.user_id
      },
      { transaction }
    );
    await transaction.commit();
    return { user, tenantUser };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
