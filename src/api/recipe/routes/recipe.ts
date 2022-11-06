/**
 * recipe router
 */
import { factories } from "@strapi/strapi/";

const defaultRouter = factories.createCoreRouter("api::recipe.recipe");

// function to add to or override default router methods
const customRouter = (innerRouter, routeOveride = [], extraRoutes = []) => {
  let routes;

  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes;

      const newRoutes = routes.map((route) => {
        let found = false;

        routeOveride.forEach((overide) => {
          if (
            route.handler === overide.handler &&
            route.method === overide.method
          ) {
            found = overide;
          }
        });

        return found || route;
      });

      return newRoutes.concat(extraRoutes);
    },
  };
};

// Overide the default router with the custom router to use slug.
const myOverideRoutes = [
  {
    method: "GET",
    path: "/recipes/:slug",
    handler: "api::recipe.recipe.findOne",
  },
];

const myExtraRoutes = [];

module.exports = customRouter(defaultRouter, myOverideRoutes, myExtraRoutes);
