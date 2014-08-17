$.fn.serializeObject=function(){"use strict";var a={},b=function(b,c){var d=a[c.name];"undefined"!=typeof d&&d!==null?$.isArray(d)?d.push(c.value):a[c.name]=[d,c.value]:a[c.name]=c.value};return $.each(this.serializeArray(),b),a};


$(function(){
	$(document).on('click', '#user-name', function(){
		$('#log-out').slideToggle('slow');
	});
	$('#table-info').submit(function(e){
		e.preventDefault();

		var user = $('#user-name').text();
		var title = $('#title').val();

		var arrayOfBalls = [];
		var ballsOnTable = $('.circle');
		$.each(ballsOnTable, function(index, el){
			var el = $(el);
			arrayOfBalls.push({ 
				'typeOfBall': el.data('type'),
				"location": {
					'left': el.context.offsetLeft,
					'top': el.context.offsetTop
				}
			});
		});
		$.post('/newTable', {
			user: user, 
			title:title, 
			array: JSON.stringify(arrayOfBalls) 
		}, function(result){
			console.log(result)
		});
	})

});