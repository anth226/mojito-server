const updateUser = async (parents: any, { id }: any, { datasource }: any) => {
  try {
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

export default updateUser;
