var cache = new Date().getTime();
var filesJs = ['js/jquery.min.js','js/TweenMax.min.js','js/controller.min.js','js/slider/js/swiper.js'];
for(var filesJsShow in filesJs){
  document.write('<script src="'+filesJs[filesJsShow]+'?cache='+cache+'"></script>');
}