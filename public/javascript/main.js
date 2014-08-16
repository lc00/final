$(function(){
	$(document).on('click', '#user-name', function(){
		$('#log-out').slideToggle('slow');
	});
	$(".circle").click(function(){
		var circle = {
			top: this.offsetTop,
			left: this.offsetLeft
		};
		$.post('/newBall', circle, function(result){
			console.log(result)
		})
	})

});