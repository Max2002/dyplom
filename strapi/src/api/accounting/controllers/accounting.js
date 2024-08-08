/**
 * accounting controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::accounting.accounting",
  ({ strapi }) => ({
    async getAccounting(context) {
      try {
        const { id } = context.params;
        const accounting = await strapi.db
          .query("api::accounting.accounting")
          .findMany({
            where: {
              organisation: { id },
            },
            populate: ["file", "organisation"],
          });

        context.body = {
          status: 200,
          accounting,
        };
      } catch (e) {
        context.body = {
          status: 500,
          accounting: [],
        };
      }
    },

    async getAccountingById(context) {
      try {
        const { id } = context.params;
        const accounting = await strapi.db
          .query("api::accounting.accounting")
          .findOne({
            where: { id },
            populate: [
              "file",
              "organisation.work_schedules.file",
              "organisation.payrolls.users_permissions_users",
            ],
          });

        context.body = {
          status: 200,
          accounting,
        };
      } catch (e) {
        context.body = {
          status: 500,
          accounting: {},
        };
      }
    },

    async deleteByOrganisationId(context) {
      try {
        const { id } = context.params;

        const findAccounting = await strapi.db
          .query("api::accounting.accounting")
          .findMany({
            where: {
              organisation: { id },
            },
            populate: ["organisation"],
          });

        await strapi.db.query("api::accounting.accounting").deleteMany({
          where: {
            id: { $in: findAccounting.map((acc) => acc.id) },
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
