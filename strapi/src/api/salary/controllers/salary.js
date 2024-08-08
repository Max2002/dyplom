/**
 * salary controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::salary.salary", ({ strapi }) => ({
  async getSalary(context) {
    try {
      const { id } = context.params;

      context.body = await strapi.db.query("api::salary.salary").findMany({
        where: {
          users_permissions_user: { id },
        },
      });
    } catch (e) {
      context.body = [];
    }
  },
}));
