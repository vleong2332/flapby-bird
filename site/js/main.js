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