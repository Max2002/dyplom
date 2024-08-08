module.exports = {
  routes: [
    {
      method: "GET",
      path: "/get-workSchedules/:id",
      handler: "work-schedule.getWorkSchedules",
      config: {
        auth: false,
      },
    },
    {
      method: "DELETE",
      path: "/delete-workSchedules/:id",
      handler: "work-schedule.deleteByOrganisationId",
      config: {
        auth: false,
      },
    },
  ],
};
