!function e(n,t,o){function i(a,l){if(!t[a]){if(!n[a]){var s="function"==typeof require&&require;if(!l&&s)return s(a,!0);if(r)return r(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var p=t[a]={exports:{}};n[a][0].call(p.exports,function(e){var t=n[a][1][e];return i(t?t:e)},p,p.exports,e,n,t,o)}return t[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(e,n,t){function o(e){var n="emails",t="flapby-bird-emails",r="PcH3OMtKKy0VwGhYsBYAKDzyx6KztK9h";$.ajax({url:"https://api.mongolab.com/api/1/databases/"+n+"/collections/"+t+"?apiKey="+r,data:JSON.stringify({email:e,time:(new Date).toJSON()}),type:"POST",contentType:"application/json"}).success(function(){i(!0),o($("input[name=email]").val(""))}).error(function(){i(!1)})}function i(e){alert(e?"Great! I'll keep you in the loop.":"Sorry, something went wrong. Please try again.")}$(function(){$("#hero img").on("mouseover",function(){$(this).velocity({translateY:-50,scale:1.25},{easing:"easeOutBack"},800)}),$("#hero img").on("mouseout",function(){$(this).velocity({translateY:0,scale:1},{easing:"spring"},250)}),$(".typed-js").typed({strings:["need a break","want to kill time","love a challenge","like to have fun"],typeSpeed:0,backDelay:1500,loop:!0}),$("#first-byte-time").html(window.performance.timing.responseStart-window.performance.timing.navigationStart),$("#front-end-load").html(window.performance.timing.domComplete-window.performance.timing.domLoading);var e=window.performance.getEntriesByType("resource"),n='<ul class="hidden">';$.each(e,function(e,t){n+='<li class="resource"><p>'+t.name+"</p>",n+="<p>"+t.initiatorType+"</p>",n+="<p>"+(t.responseEnd-t.requestStart)+"ms</p></li>"}),n+="</ul>",$("#performance").append(n),$("#toggle-resources").click(function(){$("#performance ul").toggleClass("hidden")}),$("#email-form").submit(function(e){e.preventDefault(),o($("input[name=email]").val())})}),function(){for(var e,n=function(){},t=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeline","timelineEnd","timeStamp","trace","warn"],o=t.length,i=window.console=window.console||{};o--;)e=t[o],i[e]||(i[e]=n)}()},{}]},{},[1]);