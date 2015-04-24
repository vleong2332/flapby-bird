$(function() {


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
	$('.typed-js').typed({
		strings: ["need a break", "want to kill time", "love a challenge", "like to have fun"],
		typeSpeed: 0,
		backDelay: 1500,
		loop: true
	});


	/* PERFORMANCE STATS */
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


	/* EMAIL SCRIPT */
	$('#email-form').submit(function(event) {
		event.preventDefault();
		storeEmail($('input[name=email]').val());
	});
});


/* ==================== */
/* FUNCTION DECLARATION */
/* ==================== */
function storeEmail(email) {
	var db  = "emails",
			col = "flapby-bird-emails",
			key = "PcH3OMtKKy0VwGhYsBYAKDzyx6KztK9h";

	$.ajax({ 
		url: "https://api.mongolab.com/api/1/databases/"+db+"/collections/"+col+"?apiKey="+key,
		data: JSON.stringify({
			"email": email,
			"time": new Date().toJSON()
		}), 
		type: "POST",
		contentType: "application/json"
	})
	.success(function() {
		printConfirmation(true);
		// Reset the email input
		storeEmail($('input[name=email]').val(""));
	})
	.error(function() {
		printConfirmation(false);
	});
}

function printConfirmation(state) {
	if (state)
		alert("Great! I'll keep you in the loop.");
	else
		alert("Sorry, something went wrong. Please try again.");
}