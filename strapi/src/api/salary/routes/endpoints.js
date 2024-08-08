module.exports = {
  routes: [
    {
      method: "GET",
      path: "/get-salary/:id",
      handler: "salary.getSalary",
      config: {
        auth: false,
      },
    },
  ],
};
