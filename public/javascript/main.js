$.fn.serializeObject=function(){"use strict";var a={},b=function(b,c){var d=a[c.name];"undefined"!=typeof d&&d!==null?$.isArray(d)?d.push(c.value):a[c.name]=[d,c.value]:a[c.name]=c.value};return $.each(this.serializeArray(),b),a};

var Ball = function(type, location){
	this.type = type;
	this.top = location.top;
	this.left = location.left;
}
Ball.prototype.create = function(){
	// <img src="/image/0.png" class="ball-on-table" data-type="0" style="top: 0; left: 0">
	this.el = $('<img>')
		.attr('src', '/image/' + this.type + '.png')
		.addClass('ball-on-table')
		.attr('data-type', this.type)
		.css({
				'top': this.top - 12.5,
				'left': this.left - 12.5
		});
};

$(function(){
	$(document).on('click', '#user-name', function(){
		$('#log-out').slideToggle('slow');
	});

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

	});
	var selectedBall = "";

	$('.ball').click(function(){
		$('.ball').removeClass('border');
		$(this).addClass('border');	

		selectedBall = $(this).data('type');



	});

	$('.table').click(function(e){
		var ball = new Ball(selectedBall, {top: e.offsetY, left: e.offsetX})
		ball.create();
		$(this).append(ball.el);
	})


});