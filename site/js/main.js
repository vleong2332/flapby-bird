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