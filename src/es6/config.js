/**
 * Application common configuration.
 */
export const Config = {
	IS_DEV: true
};

/**
 * Event constants.
 */
export const Events = {
	LEFT_SWIPE:            'myLeftSwipe',
	LEFT_SWIPE_FROM_EDGE:  'myLeftSwipeFromEdge',
	RIGHT_SWIPE:           'myRightSwipe',
	RIGHT_SWIPE_FROM_EDGE: 'myRightSwipeFromEdge',
	RESIZE:                'myResize',
	SCROLL:                'myScroll',
	VIEW_CHANGE:           'myViewChange'
};

/**
 * View constants that are used for module view initializations.
 */
export const Views = {
	SM: 'sm',
	MD: 'md',
	LG: 'lg'
};

/**
 * Breakpoints array for the application. The array should contain
 * objects where the "view" property is the name of the view (from the Views
 * constants) and the "from" property is the screen width from where the
 * view is active.
 */
export const Breakpoints = [
	{ view: Views.SM, from: 0 },
	{	view: Views.MD, from: 768 },
	{ view: Views.LG, from: 1224 }
];
