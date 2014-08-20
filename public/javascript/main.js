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
	// log out shows up
	$(document).on('click', '#user-name', function(){
		$('#log-out').slideToggle('slow');
	});

	//submitting a new shot on Add Shots page
	$('#table-info').on('submit', function(e){
		e.preventDefault();

			//get all form input fields and convert them to an object
			var formData = $(this).serializeObject();

			// stop proceeding to the next step if the title field is not filled out 
			if(!formData.title){
				alert('Please add title');
				return false;
			}

			//get all the ball info on the table and input the info into an array
			var arrayOfBalls = [];
			var ballsOnTable = $('.ball-on-table');
			$.each(ballsOnTable, function(index, el){
				var el = $(el);


				// console.dir(el)

				arrayOfBalls.push({ 
					'typeOfBall': el.context.dataset.type,
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

	// this is the variable that holds the selected ball when one of 
	// the balls is selected  to be placed on the table on Add Shots page 
	var selectedBall = "";

	// ball gets a border when being clicked on and its data type is 
	// stored into the a variable
	$('.ball').click(function(){

		$('.ball').removeClass('border');
		$(this).addClass('border');	

		selectedBall = $(this).data('type');



	});

	// a ball is placed onto the table 
	$('.table').click(function(e){
		// stop proceeding if no ball is clicked on/selected
		if( selectedBall === ""){
			return false;
		}

		var ball = new Ball(selectedBall, {top: e.offsetY, left: e.offsetX})
		ball.create();
		$(this).append(ball.el);
	});


	// modal mode
	$('.table').on("click", function(e){

		var selectedTable = $(this).clone();

		$('.modal-body').html(selectedTable);

		
		$("#myModal").modal('toggle')
	});


});