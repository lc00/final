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
	


	// a ball is placed onto the table on Add Shots page
	$('.table').click(function(e){
		// stop proceeding if no ball is clicked on/selected
		if( selectedBall === ""){
			return false;
		}

		var ball = new Ball(selectedBall, {top: e.offsetY, left: e.offsetX})
		ball.create();
		$(this).append(ball.el);
	});


	// modal mode on Practice Shots page
	$('.table').on("click", function(e){
		var selectedTable = $(this).clone();
		$('.modal-body').html(selectedTable);
		$("#myModal").modal('toggle')
	});

	var level = '';
	var cat = '';

	$('.level-practice').click(function(){
		//if it is yellow already, make it not yellow

		var justClickedLevel = $(this).text();

		// just clicked on the level that was previously selected,
		// unselect it and update the table
		if ( justClickedLevel===level ) {
			$(this).removeClass('yellow');
			level = '';

			// console.log('level clicked - justclicked level equal to level', level, cat)

			// Category has selection, only display tables based on this Category
			if (cat) {
				$.get('/table-filtered', {level: level, cat: cat}, function(result){
					// console.log('level clicked - cat is selected' )
					$('.col-md-10').html(result)
				});				
			}
			// no level of Diff. and Category of Shots is selected,
			// render practice shot page with all tables
			else{
				$.get('practice-shots', function(result){
					// console.log('level clicked - no level and cat, render practiceshots page')
					$('body').html(result)
				})
			}

		}	


		// new level is clicked/selected 

		else {
			$('.level-practice').removeClass('yellow');
			$(this).addClass('yellow');

			level = $(this).text();
			cat = $('.cat-practice.yellow').text();

			// console.log('new level clicked', level, cat)

			$.get('/table-filtered', {level: level, cat: cat}, function(result){
				$('.col-md-10').html(result)
			});
		}
	})

	$('.cat-practice').click(function(){

		if( $(this).text() === cat ){
			$(this).removeClass('yellow');
			cat = '';

			// console.log('cat clicked - justclicked cat equal to cat', level, cat)

			if( level ){
				$.get('table-filtered', {level: level, cat: cat}, function(result){

					// console.log('cat clicked - level is selected' )


					$('.col-md-10').html(result)
				})
			}
			else{
				$.get('practice-shots', function(result){

					// console.log('cat clicked - no level and cat, render practiceshots page')


					$('body').html(result)
				})
			}
		}

		else{
			$('.cat-practice').removeClass('yellow');
			$(this).addClass('yellow');

			cat = $(this).text();
			level = $('.level-practice.yellow').text();

			// console.log('new cat clicked', level, cat)

			$.get('/table-filtered', {level: level, cat: cat}, function(result){
				$('.col-md-10').html(result)
			});
		}

	})



});