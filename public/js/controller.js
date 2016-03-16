var swiper;
///////////////////////
var custom_event;
///////////////////////

function globalCatch(){
  $('.nameBullet').hide();
  var selectionBullet = $('.swipeCustom').find('.swiper-pagination-bullet-active').parent();
  $(selectionBullet).find('.nameBullet').show();
}
function loadPage(){
  custom_event = $.support.touch ? "tap" : "click";
  openSection.openUrl('home');
    orientarionChange();
    windowResize();
    closeMenu(false);
    openMenu(false);
    sectionsActivate();
    scrollDetect();
    indicador();
    cerrarLoader();
    activaClicks()
};

/////////////////////////
var elementsInteractive  = '.swiper-button-next,.swiper-button-prev,.swiper-pagination,.swipeCustom';
////////////////////////
var arrayOpen;
function generateSlider(num){
    if(num==1){
    $(elementsInteractive).css('display','none');
  }else{
    $(elementsInteractive).show();
    };
       swiper = new Swiper('.swiper-container', {
            spaceBetween: 0,
            slidesPerView: 1,
            effect:'slide',
            centeredSlides: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            scrollbar: '.swiper-scrollbar',
            pagination: '.swiper-pagination',
            roundLengths:true,
            nested:true,
            speed: 800,
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
                     effect: 'slide',
                     speed: 600
                  }
              }
            //paginationType: 'progress'
        });

        // Init Swiper
}

var sections = {
  home:[['INICIO','homeSection.html']],
  aboutUs:[['QUIENES SOMOS','aboutUsSection.html'],['NUESTRA HISTORIA','aboutUsSection2.html'],['CALIDAD','aboutUsSection3.html']],
  ourFields:[['TEST1','test1.html']],
  ourGrapes:[['TEST2','test2.html']]
}

function intentOpen(sec){
  $(elementsInteractive).css('display','none');
  TweenMax.set($(".preloadContentSection"),{autoAlpha:1});
  TweenMax.fromTo($(".preloadContentSection"),.5,{opacity:0,overwrite:1}, {opacity:1 ,overwrite:1, ease: Power4.easeIn, onComplete:exeOpen, onCompleteParams:[sec]});
}

function exeOpen(sec){
  setTimeout(function(){
        openSection.openUrl(sec);
    }, 1000);
};

var openSection = {
  timer: function(){
    var timeVar = new Date();
    return timeVar.getTime();
  },
  openUrl: function(getSection){
  $(".preloadContentSection").show();

   var selectSection = sections[getSection];
//   var selectSectionBullets = sections[getSection];



   $('.swiper-wrapper').empty();
   var waiting = [];
     for(var value in selectSection){
      // console.log(selectSection[value]);
       var file = selectSection[value][1];
       var nameFile = selectSection[value][0];
      // $('.nameBullet').eq(value).html('ok'nameFile);
    //   console.log(value);
       //alert(nameFile);
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
           nameSubs();

          };
         //alert(1);
       });

     };

     if(swiper){
       swiper.destroy(true, true);
     };
     arrayOpen = selectSection;
     generateSlider($(".swiper-slide").length);
     //$(".preloadContentSection").hide();
  }
};

function nameSubs(){
  //alert(1);
   for(var value in arrayOpen){
      var nameFile = arrayOpen[value][0];
      $('.nameBullet').eq(value).html(nameFile);
       console.log(value);
    }

}

function hidePreloadSection(){
  TweenMax.to($(".preloadContentSection"),.5, {opacity:0,autoAlpha:0 ,overwrite:1, ease: Power4.easeIn});
}

$(function(){
  //alert($(window).width()+'/'+$(window).height());
  $(window).load(function(){
    loadPage();
  });
});

function activaClicks(){
  $('.validateEnter').click(function(){
    enterSite();
  });
}
function enterSite(){
  TweenMax.to($(".confirmEnter"), .6, {opacity:0,autoAlpha:0, ease: Power4.easeIn});
}
function cerrarLoader(){
  TweenMax.to($(".preloadContent"), 2.5, {height:0,autoAlpha:1, ease: Power4.easeIn});
}
function indicador(){
  $('body').on(custom_event,function(event){
    $('#indicador').css('left',event.pageX-($('#indicador').width()/2));
    $('#indicador').css('top',event.pageY-($('#indicador').height()/2));
    $('#indicador').css({'opacity':'0','display':'block'});
    $('#indicador').removeClass('indicadorAnima');
    setTimeout(function(){
        	$('#indicador').addClass('indicadorAnima');

    }, 50);

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
  $('.homeClass').on(custom_event,function(){
    intentOpen('home');
   // moveTooltip($(this).position().top);
     //openSection.openUrl('home');
     closeMenu(true);
      subSectionfc($(this).attr('name'));

  });
  $('.aboutUsClass').on(custom_event,function(){
   // moveTooltip($(this).position().top);
     intentOpen('aboutUs');
    // openSection.openUrl('aboutUs');
      closeMenu(true);
      subSectionfc($(this).attr('name'));
  });
  $('.ourFieldsClass').on(custom_event,function(){
   // moveTooltip($(this).position().top);
     intentOpen('ourFields');
      $('.subSection').html($(this).attr('name'));
    // openSection.openUrl('aboutUs');
    //  closeMenu(true);
     subSectionfc($(this).attr('name'));
  });
  $('.ourGrapesClass').on(custom_event,function(){
   // moveTooltip($(this).position().top);
     intentOpen('ourGrapes');
    // openSection.openUrl('aboutUs');
      //closeMenu(true);
     subSectionfc($(this).attr('name'));
  });
  $('.noAvailable').on(custom_event,function(){
    //alert('Sección no disponible.');
    subSectionfc($(this).attr('name'));
  });

  $('.fa-circle').mouseover(function(){
   // alert(1);
    $('.toolTipContent').show();
    moveTooltip($(this).position().top,$(this).attr('name'));
  }).mouseout(function(){
    $('.toolTipContent').hide();
  })



}
function subSectionfc(nombre){
  $('.subSection').html('- '+nombre);
}

function moveTooltip(posY,name){
  $('.toolTipDiv').html(name);
  $('.toolTipContent').css('top',(posY+25)+'px');

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
    $(".close").on(custom_event,function(){
      closeMenuAnim();
    });
  }
}
function openMenu(mode){
  if(mode){
      openMenuAnim();
     // $(".seccionLink").addClass('AexitMenu2');
  }else{
    $("#topMenu").on(custom_event,function(){
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
     setTimeout(function(){
       nameSubs();
    }, 200);
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
