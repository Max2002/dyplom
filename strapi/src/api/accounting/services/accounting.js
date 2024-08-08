'use strict';

/**
 * accounting service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::accounting.accounting');
