/**
 * recipe controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::recipe.recipe",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { slug } = ctx.params;

      const query = {
        filters: { slug },
        ...ctx.query,
      };

      const post = await strapi.entityService.findMany(
        "api::recipe.recipe",
        query
      );

      const sanitizedEntity = await this.sanitizeOutput(post);

      return this.transformResponse(sanitizedEntity[0]);
    },
  })
);
