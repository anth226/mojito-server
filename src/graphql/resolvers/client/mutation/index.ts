import createClient from "./create-client"
import deleteClient from "./delete-client"
import updateClient from "./update-client"

const clientMutation = {
    createClient,
    updateClient,
    deleteClient,
}
export default clientMutation
