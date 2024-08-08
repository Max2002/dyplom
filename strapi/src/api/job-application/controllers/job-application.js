/**
 * job-application controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::job-application.job-application",
  ({ strapi }) => ({
    async getApplicationsByRole(context) {
      try {
        const { role, id } = context.params;
        const where = {
          user: { user_id: { id } },
          owner: { organisation: { id } },
        };

        const applications = await strapi.db
          .query("api::job-application.job-application")
          .findMany({
            where: where[role],
            populate: [
              "organisation.payrolls.users_permissions_users",
              "user_id",
            ],
          });

        context.body = {
          status: 200,
          applications,
        };
      } catch (e) {
        context.body = {
          status: 500,
          applications: [],
        };
      }
    },

    async deleteByOrganisationId(context) {
      try {
        const { id } = context.params;

        const findApplications = await strapi.db
          .query("api::job-application.job-application")
          .findMany({
            where: {
              organisation: { id },
            },
            populate: ["organisation"],
          });

        await strapi.db
          .query("api::job-application.job-application")
          .deleteMany({
            where: {
              id: { $in: findApplications.map((app) => app.id) },
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
