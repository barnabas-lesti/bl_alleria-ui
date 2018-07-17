import { Module } from './module';
// import { Events } from '../config';
// import { eventService } from '../services/event-service';

export class DesktopHeader extends Module {
	constructor(...args) {
		super(...args);
		this.name = 'DesktopHeader';
	}

	create() {
		// TODO: implement some logic
		// eventService.on(Events.SCROLL, () => {
		// 	this._activateAnchor(this._getActiveAnchorBasedOnScreenLocation());
		// });
	}
}
