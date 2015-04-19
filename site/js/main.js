$('#hero img').on('mouseover', function() {
	$(this).velocity({
		translateY: -50,
		scale: 1.25
	},
	{
		easing: "easeoutback",
	}, 1000);
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