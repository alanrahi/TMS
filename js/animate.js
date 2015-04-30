$(function(){

//Add animation -add
  $('.add').on('click',function(){
    $('.instances').addClass('animated flip').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend', function(){
       $(this).removeClass('animated flip')
    });
  });

  //Remove animation -remove
  $('.petitedelete').on('click',function(){
    $('.instances').addClass('animated flip').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend', function(){
       $(this).removeClass('animated flip')
    });
  });

//Animate the title 
  $('.tms-title').mouseenter(function(){
    $(this).addClass('animated infinite bounce').mouseleave('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend', function(){
       $(this).removeClass('animated infinite bounce')
       console.log('okay, it worked')
    });

  });
//body animation 
  $('.nav-li').on('click', function(){
    $('body').addClass('animated flip').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend', function(){
       $(this).removeClass('animated flip')
       console.log('okay, it worked')
    });

//body callback
body.addEventListener( 
     'webkitTransitionEnd', 
     function( event ) { 
         console.log( "Finished transition!" ); 
     }, false );    

  });

  
});// /function 
