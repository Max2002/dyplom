module.exports = {
  routes: [
    {
      method: "GET",
      path: "/get-payrolls/:id",
      handler: "payroll.getPayrolls",
      config: {
        auth: false,
      },
    },
    {
      method: "DELETE",
      path: "/delete-payrolls/:id",
      handler: "payroll.deleteByOrganisationId",
      config: {
        auth: false,
      },
    },
  ],
};
