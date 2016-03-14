var swiper;
//Configuration swipe
function generateSlider(num){
  if(num<=1){
    $('.swiper-button-next,.swiper-button-prev,.swiper-pagination').css('display','none');
  };
       swiper = new Swiper('.swiper-container', {
            spaceBetween: 0,
            slidesPerView: 1,
            effect:'slide',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            scrollbar: '.swiper-scrollbar',
            pagination: '.swiper-pagination',
        });
        // Init Swiper
}

var sections = {
  home:['homeSection.html'],
  aboutUs:['aboutUsSection.html','aboutUsSection2.html']
}

var openSection = {
  timer: function(){
    var timeVar = new Date();
    return timeVar.getTime();
  },
  openUrl: function(getSection){
   var selectSection = sections[getSection];
   $('.swiper-wrapper').empty();
     for(var value in selectSection){
      // console.log(selectSection[value]);
       var file = selectSection[value];

       var hash = this.timer()+value;
       console.log(hash+'/'+file);

       $('.swiper-wrapper').append('<div id="'+hash+'" class="swiper-slide"></div>');
       $('#'+hash).load('sections/'+file+'?cache='+hash, function(){
         reloadCSSElements();
       });

     };
     if(swiper){
       swiper.destroy(true, true);
     };
     generateSlider($(".swiper-wrapper").length);
  }
};


$(function(){
//alert($(window).width()+'/'+$(window).height());
      // generateSlider();
    openSection.openUrl('home');
    orientarionChange();
    windowResize();
    closeMenu(false);
    openMenu(false);
    sectionsActivate();
    scrollDetect();
});

function scrollDetect(){
  var lastScrollTop = 0;
  $(window).scroll(function(event){
     var st = $(this).scrollTop();
     if (st > lastScrollTop){
         console.log("abajo");
     } else {
        console.log("arriba");
     }
     lastScrollTop = st;
  });
}

function sectionsActivate(){

  $('.homeClass').click(function(){
     openSection.openUrl('home');
     closeMenu(true);
  });
  $('.aboutUsClass').click(function(){
     openSection.openUrl('aboutUs');
      closeMenu(true);
  });
}

function closeMenu(mode){
  if(mode){
      closeMenuAnim();
  }else{
    $(".close").click(function(){
      closeMenuAnim();
    });
  }
}
function closeMenuAnim(){
      TweenMax.to($(".fullMenuLinks"), .6, {left:"-"+$(".fullMenuLinks").outerWidth()+"px", ease: Power4.easeIn});
      TweenMax.to($(".fullMenu"), 1, {opacity:"0",autoAlpha: 1, display:'none', delay:.2, ease: Power4.easeIn});
}
function openMenu(mode){
  if(mode){
      openMenuAnim();
     // $(".seccionLink").addClass('AexitMenu2');
  }else{
    $("#topMenu").click(function(){
      openMenuAnim();
     // $(".seccionLink").addClass('AexitMenu2');
    });
  }
}

function openMenuAnim(){
      $(".fullMenuLinks,.fullMenu").css('display','block');
      TweenMax.fromTo($(".fullMenuLinks"), 1, {left:"-"+$(".fullMenuLinks").outerWidth()+"px"},{left:"0px", delay:.5, ease: Power4.easeIn});
      TweenMax.to($(".fullMenu"), 1.5, {opacity:"1", ease: Power4.easeIn})
}

//Fix problem sizes percent
var monitorElements = ['backgroundHome'];
///////
function windowResize(){
  $(window).resize(function(){
    reloadCSSElements();
  })
}
function orientarionChange(){
  window.addEventListener("orientationchange", function() {
	// Announce the new orientation number
      	if(window.orientation==0){
        	//reloadCSSElements();
      	}else{
        	 // reloadCSSElements();
        	//alert('landscape');
        	closeMenu(true);
      	}
      	setTimeout(function(){
        	reloadCSSElements();
      	}, 100);


    }, false);
};
function reloadCSSElements(){
        	for(var index in monitorElements){
          	var refreshObject = monitorElements[index];
          	$('.'+refreshObject).parent().css({'width':'100%','height':'100%'});
          	//alert($('.'+refreshObject).parent().attr('class'));
        	}
        	//console.log('ok');
}
