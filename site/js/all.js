$('#hero img').on('mouseover', function() {
	$(this).velocity({
		translateY: -50,
		scale: 1.25
	},
	{
		easing: "easeoutback",
	}, 800);
});

$('#hero img').on('mouseout', function() {
	$(this).velocity({
		translateY: 0,
		scale: 1
	},
	{
		easing: "spring"
	}, 250);
});

$(function() {
	$('.typed-js').typed({
		strings: ["need a break", "want to kill time", "love a challenge", "like to have fun"],
		typeSpeed: 0,
		backDelay: 1500,
		loop: true
	});
});
// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
