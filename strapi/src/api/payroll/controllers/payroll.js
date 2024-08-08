const { createCoreController } = require("@strapi/strapi").factories;

/**
 * payroll controller
 */

const schema = require("../content-types/payroll/schema.json");

module.exports = createCoreController("api::payroll.payroll", ({ strapi }) => ({
  async getPayrolls(context) {
    try {
      const { id } = context.params;
      const payrolls = await strapi.db.query("api::payroll.payroll").findMany({
        where: {
          organisation: { id },
        },
        populate: ["users_permissions_users", "organisation"],
      });

      context.body = {
        status: 200,
        payrolls,
        schema: schema.attributes,
      };
    } catch (e) {
      context.body = {
        status: 500,
        payrolls: [],
        schema: schema.attributes,
      };
    }
  },

  async deleteByOrganisationId(context) {
    try {
      const { id } = context.params;

      const findPayrolls = await strapi.db
        .query("api::payroll.payroll")
        .findMany({
          where: {
            organisation: { id },
          },
          populate: ["organisation"],
        });

      await strapi.db.query("api::payroll.payroll").deleteMany({
        where: {
          id: { $in: findPayrolls.map((payroll) => payroll.id) },
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
}));
