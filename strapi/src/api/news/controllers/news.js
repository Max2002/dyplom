const { createCoreController } = require("@strapi/strapi").factories;

/**
 * news controller
 */

const schema = require("../content-types/news/schema.json");

module.exports = createCoreController("api::news.news", ({ strapi }) => ({
  async getNews(context) {
    try {
      const { id } = context.params;
      const news = await strapi.db.query("api::news.news").findMany({
        where: {
          organisation: { id },
        },
        populate: ["photo", "organisation"],
      });

      context.body = {
        status: 200,
        news,
        schema: schema.attributes,
      };
    } catch (e) {
      context.body = {
        status: 500,
        news: [],
        schema: schema.attributes,
      };
    }
  },

  async deleteByOrganisationId(context) {
    try {
      const { id } = context.params;

      const findNews = await strapi.db.query("api::news.news").findMany({
        where: {
          organisation: { id },
        },
        populate: ["organisation"],
      });

      await strapi.db.query("api::news.news").deleteMany({
        where: {
          id: { $in: findNews.map((news) => news.id) },
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
