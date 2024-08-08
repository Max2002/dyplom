module.exports = {
  routes: [
    {
      method: "GET",
      path: "/get-vacationSchedules/:id",
      handler: "vacation-schedule.getVacationSchedules",
      config: {
        auth: false,
      },
    },
    {
      method: "DELETE",
      path: "/delete-vacations/:id",
      handler: "vacation-schedule.deleteByOrganisationId",
      config: {
        auth: false,
      },
    },
  ],
};
