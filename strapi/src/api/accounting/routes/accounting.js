'use strict';

/**
 * accounting router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::accounting.accounting');
