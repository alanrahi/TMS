$(document).ready(function(){
//theTeam
	// for(i = 0; i < 1; i++){
		$('.fullScreenBackground').hide();
    // };

//on click load team information  
    $('#theTeam').on('click', function(){
	  	console.log("Clicked, load information about team");
      //this shows the div
	  	$('.fullScreenBackground').fadeIn();
   	});

//on click load team information 
    $('.theTeam-nav-close-button').on('click', function() {
      $('.fullScreenBackground').fadeOut(); 
    });  


//close button animateion
$('.theTeam-nav-close').mouseenter(function(){ $('.theTeam-nav-close-button').addClass('animated infinite tada')
console.log('mouseenter') });

$('.theTeam-nav-close').mouseleave(function(){ $('.theTeam-nav-close-button').removeClass('animated infinite tada')
console.log('mouseleave') });

});// /function 
