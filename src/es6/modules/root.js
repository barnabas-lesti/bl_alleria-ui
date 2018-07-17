import { Module } from './module';

/**
 * Application global root module.
 */
export class Root extends Module {
	constructor(...args) {
		super(...args);
		this.name = 'Root';
	}

	create() {}
}
