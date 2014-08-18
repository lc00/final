$.fn.serializeObject=function(){"use strict";var a={},b=function(b,c){var d=a[c.name];"undefined"!=typeof d&&d!==null?$.isArray(d)?d.push(c.value):a[c.name]=[d,c.value]:a[c.name]=c.value};return $.each(this.serializeArray(),b),a};


$(function(){
	$(document).on('click', '#user-name', function(){
		$('#log-out').slideToggle('slow');
	});

	// $('addShots').on('click', function(){
	// 	$.get('/add-shots', function(result){
	// 		console.log( result.user +"successfuly loaded add-shots");
	// 	});
	// });

	$('#table-info').on('submit', function(e){
		e.preventDefault();
		
		//get all form input fields and convert them to an object
		var formData = $(this).serializeObject();

		if(!formData.title){
			alert('Please add title');
			return false;
		}

		//get all the ball info on the table and input the info into an array
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

		// POST to the server with username, form data, and balls on the table info
		$.post('/newTable', {
			form_data: formData, 
			array: JSON.stringify(arrayOfBalls) 
		}, function(result){
			console.log(result)
		});

		return true;
	});

	

});