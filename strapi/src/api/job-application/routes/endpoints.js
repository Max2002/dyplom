module.exports = {
  routes: [
    {
      method: "GET",
      path: "/get-applications-by-role/:role/:id",
      handler: "job-application.getApplicationsByRole",
      config: {
        auth: false,
      },
    },
    {
      method: "DELETE",
      path: "/delete-applications/:id",
      handler: "job-application.deleteByOrganisationId",
      config: {
        auth: false,
      },
    },
  ],
};
