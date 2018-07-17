/**
 * Main JavaScript entry point file. Bootstrapping logic
 * that start the application should go here.
 */

import $ from 'jquery';

import { moduleLoaderService } from './services/module-loader-service';
import { eventService } from './services/event-service';

import { Events } from './config';

$(window).on('load', () => {
	moduleLoaderService.loadModules();

	eventService.on(Events.VIEW_CHANGE, data => {
		moduleLoaderService.createModules(data.to);
	});

	eventService.bootstrap();
});
