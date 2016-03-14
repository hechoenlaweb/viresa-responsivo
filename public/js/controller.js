var swiper;
//Configuration swipe
function generateSlider(num){
  if(num==1){
    $('.swiper-button-next,.swiper-button-prev,.swiper-pagination').css('display','none');
  }else{
    $('.swiper-button-next,.swiper-button-prev,.swiper-pagination').show();
    };
       swiper = new Swiper('.swiper-container', {
            spaceBetween: 0,
            slidesPerView: 1,
            effect:'coverflow',
            centeredSlides: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            scrollbar: '.swiper-scrollbar',
            pagination: '.swiper-pagination',
            roundLengths:true,
            nested:true,
            speed: 1200,
            freeModeSticky:true,
            coverflow: {
              rotate: 20,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows : true,
            },
            breakpoints: {
                 700: {
                     effect: 'fade',
                     speed: 600
                  }
              }
            //paginationType: 'progress'
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

       $('.swiper-wrapper').append('<div id="'+hash+'" class="swiper-slide "></div>');
       $('#'+hash).load('sections/'+file+'?cache='+hash, function(){
         reloadCSSElements();
       });

     };
     if(swiper){
       swiper.destroy(true, true);
     };
     generateSlider($(".swiper-slide").length);
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
    indicador();
});

function indicador(){
  $(document).on('click tap',function(e){

    $('#indicador').css('left',e.pageX-($('#indicador').width()/2));
     $('#indicador').css('top',e.pageY-($('#indicador').height()/2));
   $('#indicador').css({'opacity':'0','display':'block'});
    $('#indicador').removeClass('indicadorAnima');
    setTimeout(function(){
        	$('#indicador').addClass('indicadorAnima');

      	}, 200);

   // $('#indicador').top($(window).offset().top);


  })
}

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

  $('.homeClass').on('click tap',function(){
     openSection.openUrl('home');
     closeMenu(true);

  });
  $('.aboutUsClass').on('click tap',function(){
     openSection.openUrl('aboutUs');
      closeMenu(true);
  });
}

function closeMenu(mode){
  if(mode){
      closeMenuAnim();
  }else{
    $(".close").on('click tap',function(){
      closeMenuAnim();
    });
  }
}
function closeMenuAnim(){
      TweenMax.to($(".fullMenuLinks"), .6, {left:"-"+$(".fullMenuLinks").outerWidth()+"px",overwrite:1, ease: Power4.easeIn});
      TweenMax.to($(".fullMenu"), 1, {opacity:"0",autoAlpha: 1,overwrite:1, display:'none', delay:.2, ease: Power4.easeIn, onComplete: changeColor});

}
function changeColor(){
  $('circle').attr('stroke','rgba(255,255,255,.7)');
}
function openMenu(mode){
  if(mode){
      openMenuAnim();
     // $(".seccionLink").addClass('AexitMenu2');
  }else{
    $("#topMenu").on('click tap',function(){
      openMenuAnim();


     // $(".seccionLink").addClass('AexitMenu2');
    });
  }
}

function openMenuAnim(){
      $(".fullMenuLinks,.fullMenu").css('display','block');
      TweenMax.fromTo($(".fullMenuLinks"), 1, {left:"-"+$(".fullMenuLinks").outerWidth()+"px",overwrite:1},{left:"0px",overwrite:1, delay:.5, ease: Power4.easeIn});
      TweenMax.to($(".fullMenu"), 1.5, {opacity:"1",overwrite:1, ease: Power4.easeIn});
      $('circle').attr('stroke','rgba(172,44,63,.7)');
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
      	}, 200);


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
