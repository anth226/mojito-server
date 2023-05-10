const getUserByEmail = async (
  parents: any,
  { id }: { id: string },
  { datasource }: any
) => {
  try {
    console.log("email");
    const user = await datasource.userApi.getUser(id);
    console.log(user);
    return {
      user: user,
      response: {
        status: 200,
        message: "Query successfully!",
      },
    };
  } catch (error) {
    return {
      user: null,
      response: {
        status: 404,
        message: "Query failed!",
      },
    };
  }
};

export default getUserByEmail;
