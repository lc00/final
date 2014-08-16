$(function(){
	$(document).on('click', '#user-name', function(){
		$('#log-out').slideToggle('slow');
	});
	$('#table-info').submit(function(e){
		e.preventDefault();
		
		var user = $('#user-name').text();

		var title = $('#title').val();

		var type = $('#type-of-ball').val();


		// var circle = {
		// 	typeOfBall: type,
		// 	top: this.offsetTop,
		// 	left: this.offsetLeft
		// };
		$.post('/newTable', {user: user, title:title, typeOfBall:type}, function(result){
			console.log(result)
		})
	})

});