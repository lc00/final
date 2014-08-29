
var level = ''; 
var cat = '';

// when Level of Difficulty is clicked on Practice Shots page
	$('.level').click(function(){
		//if it is yellow already, make it not yellow

		var justClickedLevel = $(this).text();

		// just clicked on the level that was previously selected,
		// unselect it and update the table
		if ( justClickedLevel===level ) {
			$(this).removeClass('yellow');
			level = '';
		}
		else {
			$('.level').removeClass('yellow');
			$(this).addClass('yellow');

			level = $(this).text();
			cat = $('.cat.yellow').text();
			// console.log('new level clicked', level, cat)
		}
	
		$.get('practice-shots', {level: level, cat: cat}, function(result){
			console.log(result)
			// $('.col-md-10').html(result)

			// $('.col-md-10').empty();
				// .append('<div class="table">' +
				// 	'<img class="tableImage" src="/image/pool-table-top-view.png" />' + 
				// 	'<img class="ball-on-table" src="/image/' + result.tablelist[0].array[0].typeOfBall + '.png" style="top:' + result.tablelist[0].array[0].location.top + 'px" />' +
				// 	'</div>')

			
				var source = $('#entry-template').html();
				var template = Handlebars.compile(source);

				var context = {title: "test"}	
				var html = template(context)
			


		});
	
	})

	// when Category of Shots is clicked on Practice Shots page
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