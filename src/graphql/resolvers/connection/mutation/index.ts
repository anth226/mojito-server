import createConnection from "./create-connection";
import deleteConnection from "./delete-connection";
import updateConnection from "./update-connection";

const connectionMutation = {
  createConnection,
  updateConnection,
  deleteConnection,
};
export default connectionMutation;
