import deleteUser from "./deleteUser";
import updateUser from "./updateUser";
import registerUser from "./registerUser";
import login from "./login";

const userMutation = {
  registerUser,
  updateUser,
  deleteUser,
  login,
};
export default userMutation;
