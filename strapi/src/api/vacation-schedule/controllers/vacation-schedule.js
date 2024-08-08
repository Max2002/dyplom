const { createCoreController } = require("@strapi/strapi").factories;

/**
 * vacation-schedule controller
 */

module.exports = createCoreController(
  "api::vacation-schedule.vacation-schedule",
  ({ strapi }) => ({
    async getVacationSchedules(context) {
      try {
        const { id } = context.params;
        const vacations = await strapi.db
          .query("api::vacation-schedule.vacation-schedule")
          .findMany({
            where: {
              organisation: { id },
            },
            populate: ["file", "organisation"],
          });

        context.body = {
          status: 200,
          vacations,
        };
      } catch (e) {
        context.body = {
          status: 500,
          vacations: [],
        };
      }
    },

    async deleteByOrganisationId(context) {
      try {
        const { id } = context.params;

        const findVacations = await strapi.db
          .query("api::vacation-schedule.vacation-schedule")
          .findMany({
            where: {
              organisation: { id },
            },
            populate: ["organisation"],
          });

        await strapi.db
          .query("api::vacation-schedule.vacation-schedule")
          .deleteMany({
            where: {
              id: { $in: findVacations.map((vac) => vac.id) },
            },
          });

        context.body = {
          status: 200,
        };
      } catch (e) {
        context.body = {
          status: 500,
        };
      }
    },
  })
);
