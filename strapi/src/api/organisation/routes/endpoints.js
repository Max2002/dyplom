module.exports = {
  routes: [
    {
      method: "GET",
      path: "/get-organisations/:id",
      handler: "organisation.getOrganisations",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/get-organisations-by-name/:name",
      handler: "organisation.getOrganisationsByName",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/get-organisations-by-id/:id",
      handler: "organisation.getOrganisationsById",
      config: {
        auth: false,
      },
    },
  ],
};
