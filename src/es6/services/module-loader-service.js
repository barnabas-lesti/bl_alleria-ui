import $ from 'jquery';

import { Modules } from '../deps';
import { Service } from './service';

/**
 * Module loader service to handle Module operations. The loader looks for "data-module" attributes in the DOM:
 * - [data-module]:          Name of the module to connect to the HTML element (<header ... data-module="Header" ...>).
 * - [data-module-id]:       Unique ID to distinguish loaded modules (<div ... data-module-id="mainSection12" ...>) (optional).
 * - [data-module-settings]: Settings for the module in a JSON like syntax (<div ... data-module-settings="'itemCount': 2, 'color': 'red'" ...>) (optional).
 * - [data-module-views]:    Views where the module should be created (<div ... data-module-views="sm,md" ...>) (optional).
 */
class ModuleLoaderService extends Service {
	constructor() {
		super();
		this._modules = [];
	}

	/**
	 * Creates not yet created modules based on the view.
	 * 
	 * @param {String} view
	 */
	createModules(view) {
		for (const module of this._modules) {
			if (
				!module.isCreated &&
				(module.views.length === 0  || ~module.views.indexOf(view))
			) {
				module.beforeCreate();
				module.create();
				module.afterCreate();
			}
		}
	}

	/**
	 * Retrieves a module with the given moduleId.
	 *
	 * @param {string} moduleId
	 * @return {Module}
	 */
	getModuleById(moduleId) {
		return $.grep(this._modules, module => module.id === moduleId)[0];
	}

	/**
	 * Loads the modules needed for the view.
	 */
	loadModules() {
		$('[data-module]').each((index, element) => {
			this._loadModule(element);
		});
	}

	/**
	 * Generates module settings object from the data-module-settings attribute string.
	 * 
	 * @param {String} moduleSettingsString
	 * @return {Object}
	 */
	_getModuleSettings(moduleSettingsString) {
		let settings = {};
		if (moduleSettingsString) {
			try {
				$.extend(settings, JSON.parse(`{${moduleSettingsString.replace(/'/g, '"')}}`));
			} catch (error) {
				throw new Error(`Syntax error in module-settings (${moduleSettingsString}). Please verify that the settings use JSON-like syntax.`);
			}
		}
		return settings;
	}

	/**
	 * Loads a module (and its settings) based on the markup and the data-module* attributes
	 * 
	 * @param {HTMLElement} element
	 */
	_loadModule(element) {
		const $element   = $(element);
		const moduleName = $element.data('module');
		const Module     = $.grep(Modules, module => moduleName === module.name)[0];
		if (Module) {
			const moduleId = $element.data('module-id');
			if (moduleId && !!$.grep(this._modules, Module => Module.id === moduleId).length) {
				throw new Error(`Duplicate moduleId: [data-module-id="${moduleId}"]`);
			}

			const viewsString = $element.data('module-views');
			const views       = viewsString ? viewsString.split(',').map(view => view.trim()) : [];

			const moduleInstance = new Module(
				$element,
				moduleId,
				this._getModuleSettings($element.data('module-settings')),
				views
			);
			this._modules.push(moduleInstance);
		} else {
			throw new Error(`${moduleName} not found. Maybe you forgot to include it in deps.js?`);
		}
	}
}

export const moduleLoaderService = new ModuleLoaderService();
