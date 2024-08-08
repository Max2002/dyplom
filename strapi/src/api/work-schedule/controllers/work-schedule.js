const { createCoreController } = require("@strapi/strapi").factories;

/**
 * work-schedule controller
 */

module.exports = createCoreController(
  "api::work-schedule.work-schedule",
  ({ strapi }) => ({
    async getWorkSchedules(context) {
      try {
        const { id } = context.params;
        const schedules = await strapi.db
          .query("api::work-schedule.work-schedule")
          .findMany({
            where: {
              organisation: { id },
            },
            populate: ["file", "organisation"],
          });

        context.body = {
          status: 200,
          schedules,
        };
      } catch (e) {
        context.body = {
          status: 500,
          schedules: [],
        };
      }
    },

    async deleteByOrganisationId(context) {
      try {
        const { id } = context.params;

        const findSchedules = await strapi.db
          .query("api::work-schedule.work-schedule")
          .findMany({
            where: {
              organisation: { id },
            },
            populate: ["organisation"],
          });

        await strapi.db.query("api::work-schedule.work-schedule").deleteMany({
          where: {
            id: { $in: findSchedules.map((schedule) => schedule.id) },
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
