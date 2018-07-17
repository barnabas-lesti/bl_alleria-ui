import $ from 'jquery';

import { Config } from '../config';

/**
 * Base class for UI modules.
 */
export class Module {
	constructor($element, id, settings, views) {

		/**
		 * The root node of the module.
		 *
		 * @type {Element}
		 */
		this.$element = $element;

		/**
		 * ID of the module set with [data-module-id]. Should be unique.
		 *
		 * @type {String}
		 */
		this.id = id;

		/**
		 * Is the module created with the create function.
		 *
		 * @type {Boolean}
		 */
		this.isCreated = false;

		/**
		 * Settings set with [data-module-settings]. Should contain json like syntax.
		 *
		 * @type {Object}
		 */
		this.settings = settings;

		/**
		 * Decorating the module with jQuery.
		 * 
		 * @type {JQueryStatic<HTMLElement>}
		 */
		this.$ = $;

		/**
		 * Views where the module should be created.
		 * 
		 * @type {String[]}
		 */
		this.views = views;
	}

	/**
	 * Hook that runs before the modules create method.
	 */
	beforeCreate() {}

	/**
	 * Create the module.
	 */
	create() {
		console.warn(`"${this.name}" doesn't have create() method! You're not doing things in the constructor right?`);
	}

	/**
	 * Hook that runs after the modules create method.
	 */
	afterCreate() {
		this.isCreated = true;

		if (Config.IS_DEV) {
			console.log(`"${this.name}" module created.`);
		}
	}
}
