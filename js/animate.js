$(document).ready(function(){
//theTeam
	for(i = 0; i < 1; i++){
		$('.fullScreenBackground').hide();
    };

//on click load team information  
    $('#theTeam').on('click', function(){
	  	console.log("Clicked, load information about team");
      //this shows the div
	  	$('.fullScreenBackground').show();
      $('#primary-content').hide();

    	// $('.fullScreenBackground').removeClass('fadeOut');
	  	$('.fullScreenBackground').addClass('animated fadeIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend', function(){
         $(this).removeClass('animated fadeIn')
      });
   	});

//on click load team information 
    $('.theTeam-nav-close-button').on('click', function() {
      $('.fullScreenBackground').hide(); 
      $('#primary-content').show();

     $('.theTeam-nav-close-button').mouseenter('.fullScreenBackground').addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend', function(){
         $(this).removeClass('animated fadeOut')
         
      }); 
    });

// //Add animation -add
//   $('.add').on('click',function(){
//     $('.instances').addClass('animated flip').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend', function(){
//        $(this).removeClass('animated flip')
//     });
//   });

//   //Remove animation -remove
//   $('.petitedelete').on('click',function(){
//     $('.instances').addClass('animated flip').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend', function(){
//        $(this).removeClass('animated flip')
//     });
//   });

// //Animate the title 
//   $('.tms-title').mouseenter(function(){
//     $(this).addClass('animated infinite bounce').mouseleave('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend', function(){
//        $(this).removeClass('animated infinite bounce')
//        console.log('okay, it worked')
//     });

//   });
// //body animation 
//   $('.nav-li').on('click', function(){
//     $('body').addClass('animated flip').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend', function(){
//        $(this).removeClass('animated flip')
//        console.log('okay, it worked')
//     });

// //body callback
// body.addEventListener( 
//      'webkitTransitionEnd', 
//      function( event ) { 
//          console.log( "Finished transition!" ); 
//      }, false );    

//   });

  
});// /function 
