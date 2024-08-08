module.exports = {
  routes: [
    {
      method: "GET",
      path: "/get-accounting/:id",
      handler: "accounting.getAccounting",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/get-accounting-by-id/:id",
      handler: "accounting.getAccountingById",
      config: {
        auth: false,
      },
    },
    {
      method: "DELETE",
      path: "/delete-accounting/:id",
      handler: "accounting.deleteByOrganisationId",
      config: {
        auth: false,
      },
    },
  ],
};
