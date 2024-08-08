module.exports = {
  routes: [
    {
      method: "GET",
      path: "/get-news/:id",
      handler: "news.getNews",
      config: {
        auth: false,
      },
    },
    {
      method: "DELETE",
      path: "/delete-news/:id",
      handler: "news.deleteByOrganisationId",
      config: {
        auth: false,
      },
    },
  ],
};
