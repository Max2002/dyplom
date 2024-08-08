const { createCoreController } = require("@strapi/strapi").factories;

/**
 * organisation controller
 */

const schema = require("../content-types/organisation/schema.json");

module.exports = createCoreController(
  "api::organisation.organisation",
  ({ strapi }) => ({
    async getOrganisations(context) {
      try {
        const { id } = context.params;
        const organisations = await strapi.db
          .query("api::organisation.organisation")
          .findMany({
            where: {
              payrolls: { users_permissions_users: { id } },
            },
            populate: ["logo", "payrolls.users_permissions_users"],
          });

        context.body = {
          status: 200,
          organisations,
          schema: schema.attributes,
        };
      } catch (e) {
        context.body = {
          status: 500,
          organisations: [],
          schema: schema.attributes,
        };
      }
    },

    async getOrganisationsByName(context) {
      try {
        const { name } = context.params;
        const organisations = await strapi.db
          .query("api::organisation.organisation")
          .findMany({
            where: {
              name: {
                $containsi: name,
              },
            },
            populate: ["logo"],
          });

        context.body = {
          status: 200,
          organisations,
        };
      } catch (e) {
        context.body = {
          status: 500,
          organisations: [],
        };
      }
    },

    async getOrganisationsById(context) {
      try {
        const { id } = context.params;
        const organisation = await strapi.db
          .query("api::organisation.organisation")
          .findOne({
            where: {
              id,
            },
            populate: ["logo", "payrolls.users_permissions_users"],
          });

        context.body = {
          status: 200,
          organisation,
        };
      } catch (e) {
        context.body = {
          status: 500,
          organisation: {},
        };
      }
    },
  })
);
