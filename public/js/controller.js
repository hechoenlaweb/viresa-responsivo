var swiper;
//Configuration swipe
function generateSlider(num){
  if(num<=1){
    $('.swiper-button-next,.swiper-button-prev,.swiper-pagination').css('display','none');
  };
       swiper = new Swiper('.swiper-container', {
            spaceBetween: 0,
            slidesPerView: 1,
            centeredSlides: false,
            slideToClickedSlide: true,
            grabCursor: true,
            effect:'slide',
            roundLengths:true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            scrollbar: '.swiper-scrollbar',
            pagination: '.swiper-pagination',
        });
        // Init Swiper
}

var sections = {
  home:['homeSection.html'],
  vinos:['homeSection.html','homeSection2.html']
}

var openSection = {
  timer: function(){
    var timeVar = new Date();
    return timeVar.getTime();
  },
  openUrl: function(getSection){
   var selectSection = sections[getSection];
     for(var value in selectSection){
      // console.log(selectSection[value]);
       var file = selectSection[value];
       var hash = this.timer()+value;
       $('.swiper-wrapper').empty();
       $('.swiper-wrapper').append('<div id="'+hash+'" class="swiper-slide"></div>');
       $('#'+hash).load('sections/'+file+'?cache='+hash);
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
      animation();
})

function animation(){
  $(".logo").animateSprite({
    fps: 12,
    animations: {
        iniciar: [0, 1, 2, 3, 4, 5, 6, 7,8,9]
    },
    loop: true,
    complete: function(){
        // use complete only when you set animations with 'loop: false'
        alert("animation End");
    }
});
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
        	reloadCSSElements();
      	}else{
        	  reloadCSSElements();
        	//alert('landscape');
      	}
    }, false);
};
function reloadCSSElements(){
        	for(var index in monitorElements){
          	var refreshObject = monitorElements[index];
          	$('.'+refreshObject).parent().css({'width':'100%','height':'100%'});
          	//alert($('.'+refreshObject).parent().attr('class'));
        	}
        	console.log('ok');
}
