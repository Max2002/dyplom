'use strict';

/**
 * vacation-schedule service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::vacation-schedule.vacation-schedule');
