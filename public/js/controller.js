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

function intentOpen(sec){
  TweenMax.set($(".preloadContentSection"),{autoAlpha:1});
  TweenMax.fromTo($(".preloadContentSection"),.5,{opacity:0,overwrite:1}, {opacity:1 ,overwrite:1, ease: Power4.easeIn, onComplete:exeOpen, onCompleteParams:[sec]});
}
function exeOpen(sec){
  openSection.openUrl(sec);
}

var openSection = {
  timer: function(){
    var timeVar = new Date();
    return timeVar.getTime();
  },
  openUrl: function(getSection){
  $(".preloadContentSection").show();



   var selectSection = sections[getSection];
   $('.swiper-wrapper').empty();
   var waiting = [];
     for(var value in selectSection){
      // console.log(selectSection[value]);
       var file = selectSection[value];
       var hash = this.timer()+value;
       console.log(hash+'/'+file);
       $('.swiper-wrapper').append('<div id="'+hash+'" class="swiper-slide "></div>');
       waiting.push(true);
       $('#'+hash).load('sections/'+file+'?cache='+hash, function(){
         reloadCSSElements();
         //waiting[hash]

         waiting.splice(0, 1);
         if(waiting.length==0){
           hidePreloadSection();
          };
         //alert(1);
       });

     };

     if(swiper){
       swiper.destroy(true, true);
     };
     generateSlider($(".swiper-slide").length);
     //$(".preloadContentSection").hide();
  }
};

function hidePreloadSection(){
  TweenMax.to($(".preloadContentSection"),.5, {opacity:0,autoAlpha:0 ,overwrite:1, ease: Power4.easeIn});
}

$(function(){
  //alert($(window).width()+'/'+$(window).height());
  $(window).load(function(){
    loadPage();
  });
});

function loadPage(){
  openSection.openUrl('home');
    orientarionChange();
    windowResize();
    closeMenu(false);
    openMenu(false);
    sectionsActivate();
    scrollDetect();
    indicador();
    cerrarLoader();

};
function cerrarLoader(){
  TweenMax.to($(".preloadContent"), 2.5, {height:0,autoAlpha:1, ease: Power4.easeIn});
}
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
    intentOpen('home');
     //openSection.openUrl('home');
     closeMenu(true);

  });
  $('.aboutUsClass').on('click tap',function(){
     intentOpen('aboutUs');
    // openSection.openUrl('aboutUs');
      closeMenu(true);
  });
}

/////////////////////MENU
function closeMenuAnim(){
      TweenMax.to($(".fullMenuLinks"), .5, {left:"-"+$(".fullMenuLinks").outerWidth()+"px",overwrite:1,  ease: Power4.easeInOut});
      TweenMax.to($(".fullMenu"), .5, {opacity:"0",autoAlpha: 1,overwrite:1, display:'none', onComplete: changeColor});
}
function openMenuAnim(){
      $(".fullMenuLinks,.fullMenu").css('display','block');
      TweenMax.fromTo($(".fullMenuLinks"), .5, {left:"-"+$(".fullMenuLinks").outerWidth()+"px",overwrite:1},{left:"0px",overwrite:1,  ease: Power4.easeInOut});
      TweenMax.to($(".fullMenu"),.5 , {opacity:"1",overwrite:1, ease: Power4.easeIn});
      $('circle').attr('stroke','rgba(172,44,63,.7)');
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
/////////////////////////
function changeColor(){
  $('circle').attr('stroke','rgba(255,255,255,.7)');
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
