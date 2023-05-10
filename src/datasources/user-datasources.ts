import { RESTDataSource } from "@apollo/datasource-rest";

export default class UserAPI extends RESTDataSource {
  override baseURL = "http://lacalhost:3000/users";
  // GET
  async getUser(id: string) {
    console.log(id);
    return this.get(
      `/${encodeURIComponent(id)}` // path
    );
  }

  // POST
  async postUser(user: any) {
    return this.post(
      `user`, // path
      { body: { user } } // request body
    );
  }

  // PUT
  async newUser(user: any) {
    return this.put(
      `user`, // path
      { body: { user } } // request body
    );
  }

  // PATCH
  async updateUser(user: any) {
    return this.patch(
      `user`, // path
      { body: { id: user.id, user } } // request body
    );
  }

  // DELETE
  async deleteUser(user: any) {
    return this.delete(
      `/${encodeURIComponent(user.id)}` // path
    );
  }
}
