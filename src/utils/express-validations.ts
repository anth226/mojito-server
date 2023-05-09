import { USER_ROLES } from "../constants";
import userRepository from "../repositories/user-repository";

async function isUniqueEmail(value: string) {
  const info = await userRepository.getByEmail(value);
  if (info) {
    throw Promise.reject();
  }
}
async function isRoleValid(value: string) {
  return Object.values(USER_ROLES).includes(value);
}

export { isUniqueEmail, isRoleValid };
