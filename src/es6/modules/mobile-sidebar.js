import { Module } from './module';
// import { Events } from '../config';
// import { eventService } from '../services/event-service';

export class MobileSidebar extends Module {
	constructor(...args) {
		super(...args);
		this.name = 'MobileSidebar';
	}

	create() {
		// TODO: implement some logic
		// eventService.on(Events.SCROLL, () => {
		// 	this._activateAnchor(this._getActiveAnchorBasedOnScreenLocation());
		// });
	}
}
