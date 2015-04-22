/* TITLE IMAGE ANIMATION */
$('#hero img').on('mouseover', function() {
	$(this).velocity({
		translateY: -50,
		scale: 1.25
	}, {
		easing: "easeOutBack",
	}, 800);
});
$('#hero img').on('mouseout', function() {
	$(this).velocity({
		translateY: 0,
		scale: 1
	}, {
		easing: "spring"
	}, 250);
});

/* SUB-TITLE TYPING ANIMATION */
$(function() {
	$('.typed-js').typed({
		strings: ["need a break", "want to kill time", "love a challenge", "like to have fun"],
		typeSpeed: 0,
		backDelay: 1500,
		loop: true
	});
});

/* PERFORMANCE STATS */
$(function() {
	$('#first-byte-time').html(window.performance.timing.responseStart - window.performance.timing.navigationStart);
	$('#front-end-load').html(window.performance.timing.domComplete - window.performance.timing.domLoading);

	var resources = window.performance.getEntriesByType('resource');
	var entry = "<ul class=\"hidden\">";
	$.each(resources, function(i,v){
		entry += "<li class=\"resource\"><p>" + v.name + "</p>";
		entry += "<p>" + v.initiatorType + "</p>";
		entry += "<p>" + (v.responseEnd - v.requestStart) + "ms</p></li>";
	});
	entry += "</ul>";
	$('#performance').append(entry);

	$('#toggle-resources').click(function() {
		$('#performance ul').toggleClass('hidden');
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
