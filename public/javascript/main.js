$.fn.serializeObject=function(){"use strict";var a={},b=function(b,c){var d=a[c.name];"undefined"!=typeof d&&d!==null?$.isArray(d)?d.push(c.value):a[c.name]=[d,c.value]:a[c.name]=c.value};return $.each(this.serializeArray(),b),a};

var Ball = function(type, location){
	this.type = type;
	this.top = location.top;
	this.left = location.left;




}
Ball.prototype.create = function(){
	// <img src="/image/0.png" class="ball-on-table" data-type="0" style="top: 0; left: 0">
	
	if(this.type === 0){
		this.el = $('<img>')
			.attr('src', '/image/' + this.type + '.svg')
			.addClass('ball-on-table')
			.attr('data-type', this.type)
			.css({
					'top': this.top - 12.5,
					'left': this.left - 12.5,
					"height": '33px',
					"width": '33px'
			});
	}


	else {
		this.el = $('<img>')
			.attr('src', '/image/' + this.type + '.png')
			.addClass('ball-on-table')
			.attr('data-type', this.type)
			.css({
					'top': this.top - 12.5,
					'left': this.left - 12.5
			});
	}

};

$(function(){

	// variable that holds the level of difficulty
	var levelOfDifficulty;

	// highlight the number under Level of Difficulty in Add Shots page
	$('.level').click(function(){
		levelOfDifficulty = $(this).data('level');

		$('.level').removeClass('yellow');
		$(this).addClass('yellow');

	});


	// variable that holds the category of shots
	var catOfShots = "";

	// highlight the Category of Shots in Add Shots page
	$('.cat-of-shots').click(function(){

		$('.cat-of-shots').removeClass('yellow');
		$(this).addClass('yellow');	

		catOfShots = $(this).text();
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
				level: levelOfDifficulty,
				category: catOfShots,
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
	// ball moving animation

	$('.ball').click(function(){

		$('.ball').removeClass('border');
		$(this).addClass('border');	

		selectedBall = $(this).data('type');

		var ball = $(this);

		console.log(ball)

		TweenLite.to(ball, 1, {top: "300px"})


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

	var level;
	var cat;

	$('.level-practice').click(function(){
		//if it is yellow already, make it not yellow

		var justClickedLevel = $(this).text();

		console.log(justClickedLevel, level)

		if ( justClickedLevel===level ) {
			$(this).removeClass('yellow');

			console.log('hi')

			if (cat) {
				$.get('/table-filtered', {level: level, cat: cat}, function(result){
					console.log('if')
					$('.col-md-10').html(result)
				});				
			}
			else{
				$.get('practice-shots', function(result){
					console.log('else')
					$('.col-md-10').html(result)
				})
			}

		}	




		else {
			$('.level-practice').removeClass('yellow');
			$(this).addClass('yellow');

			level = $(this).text();
			cat = $('.cat-practice.yellow').text();

			console.log(level, cat)

			$.get('/table-filtered', {level: level, cat: cat}, function(result){
				$('.col-md-10').html(result)
			});
		}
	})

	$('.cat-practice').click(function(){

		if( $(this).text() === cat ){
			$(this).removeClass('yellow');

			if( level ){
				$.get('table-filtered', {level: level}, function(result){
					$('.col-md-10').html(result)
				})
			}
			else{
				$.get('practice-shots', function(result){
					$('.col-md-10').html(result)
				})
			}
		}

		else{
			$('.cat-practice').removeClass('yellow');
			$(this).addClass('yellow');

			cat = $(this).text();
			level = $('.level-practice.yellow').text();

			console.log(cat, level)

			$.get('/table-filtered', {level: level, cat: cat}, function(result){
				$('.col-md-10').html(result)
			});
		}

	})



});