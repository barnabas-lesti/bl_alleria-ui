import $ from 'jquery';

import { Breakpoints, Config, Events } from '../config';
import { Service } from './service';

class EventService extends Service {
	constructor() {
		super();

		this._$window = $(window);
	}

	/**
	 * Bootstraps the service. Does some post construction work like starts global event listeners.
	 */
	bootstrap() {
		this._listenToResizeAndViewChange();
		this._listenToScroll();
		this._listenToSwipe();
	}

	/**
	 * Retrurns the active view.
	 * 
	 * @returns {String}
	 */
	getView() {
		// TODO: Might need to rething this logic or just move the init logic to improve performance.
		let view;
		const windowInnerWidth = window.innerWidth;

		for (const breakpoint of Breakpoints) {
			if (windowInnerWidth >= breakpoint.from) {
				view = breakpoint.view;
			} else {
				break;
			}
		}

		return view;
	}

	/**
	 * Interface method to register event callbacks.
	 * 
	 * @param {String} event
	 * @param {Function} callback
	 */
	on(event, callback) {
		this._registerOnTriggerCallback(event, callback);
	}

	/**
	 * Emits the event with given data.
	 *
	 * @param {String} event
	 * @param {Object} data
	 */
	trigger(event, data) {
		const eventCallbacks = this._callbackMap && this._callbackMap.get(event);
		if (Config.IS_DEV) {
			this._logEvent(event, data);
		}
		if (eventCallbacks) {
			for (const callback of eventCallbacks) {
				callback(data);
			}
		}
	}

	/**
	 * Listens to resize event and checks if view has changed (throttled).
	 */
	_listenToResizeAndViewChange() {
		const THROTTLE = 100;

		this._currentView = this.getView();
		this.trigger(Events.VIEW_CHANGE, { to: this._currentView });
		this._$window.on('resize', () => {
			if (this._resizeTimeoutId) {
				window.clearTimeout(this._resizeTimeoutId);
			}
			this._resizeTimeoutId = window.setTimeout(() => {
				const newView = this.getView();
				this.trigger(Events.RESIZE, { view: newView });
				if (newView !== this._currentView) {
					this.trigger(Events.VIEW_CHANGE, {
						from: this._currentView,
						to: newView
					});
					this._currentView = newView;
				}
			}, THROTTLE);
		});
	}

	/**
	 * Listens to scroll event (throttled).
	 */
	_listenToScroll() {
		const THROTTLE = 1;

		this._$window.on('scroll', () => {
			if (this._scrollTimeoutId) {
				window.clearTimeout(this._scrollTimeoutId);
			}
			this._scrollTimeoutId = window.setTimeout(() => {
				this.trigger(Events.SCROLL);
			}, THROTTLE);
		});
	}

	/**
	 * Listens to swipe events and notifies listeners.
	 */
	_listenToSwipe() {
		const SCREEN_EDGE_BOUNDARY = 50;
		const SWIPE_SENSITIVITY    = 30;

		this._$body = $(document.body);

		this._$body.on('touchstart', event => {
			this._touchStartPosition = event.originalEvent.touches[0].pageX;
			this._eventData = {
				$target: $(event.target)
			};
		});

		this._$body.on('touchmove', event => {
			this._swipeLength = event.originalEvent.touches[0].pageX - this._touchStartPosition;
			this._isLeftSwipe = this._swipeLength < 0;
		});

		this._$body.on('touchend', () => {
			if (Math.abs(this._swipeLength) > SWIPE_SENSITIVITY) {
				if (this._isLeftSwipe) {
					this.trigger(Events.LEFT_SWIPE, this._eventData);
					if (this._touchStartPosition > this._$body.width() - SCREEN_EDGE_BOUNDARY) {
						this.trigger(Events.LEFT_SWIPE_FROM_EDGE, this._eventData);
					}
				} else {
					eventService.trigger(Events.RIGHT_SWIPE, this._eventData);
					if (this._touchStartPosition < SCREEN_EDGE_BOUNDARY) {
						this.trigger(Events.RIGHT_SWIPE_FROM_EDGE, this._eventData);
					}
				}
			}
			this._swipeLength = undefined;
		});
	}

	/**
	 * Logs the event source.
	 * 
	 * @param {String} event String name of the event.
	 * @param {Object} data Data passed with the trigger function.
	 */
	_logEvent(event, data) {
		for (const eventProperty in Events) {
			if (Events.hasOwnProperty(eventProperty) && event === Events[eventProperty]) {
				console.log(`Events.${eventProperty}`, data);
			}
		}
	}

	/**
	 * Registers a callback mapped to event types.
	 * 
	 * @param {String} event
	 * @param {Function} callback
	 */
	_registerOnTriggerCallback(event, callback) {
		if (!this._callbackMap) {
			this._callbackMap = new Map();
		}

		if (!this._callbackMap.get(event)) {
			this._callbackMap.set(event, []);
		}

		this._callbackMap.get(event).push(callback);
	}
}

export const eventService = new EventService();
