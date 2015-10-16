var image = new Image();
var canvas = document.getElementById('brain-flower-canvas');
var yOffset = 55; // Pixels above brain flower image

function resizeCanvas() {
  canvas.width = Math.max($('#top-image').width(), image.width);
  canvas.height = image.height + yOffset;

  // Draw the image in the center of the canvas
  var context = canvas.getContext('2d');
  var midX = (canvas.width - image.width) / 2;
  context.drawImage(image, midX, yOffset);
}

image.onload = function () {
    resizeCanvas();

    // Dynamic centering of image.
    window.addEventListener('resize', resizeCanvas, false);
};
image.src = '/media/brain_coronal_flower.png';

// Change color of "interactive experiences" to the color the mouse hovers over within the brain flower image.
$(function() {
  $('#brain-flower-canvas').mousemove(function(e) {

      var pixelData = canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;

      // For debugging
      //$('#output').html('R: ' + pixelData[0] + '<br>G: ' + pixelData[1] + '<br>B: ' + pixelData[2] + '<br>A: ' + pixelData[3] + '<br>x: ' + event.offsetX + '<br>y: ' + event.offsetY);

      // Update the text dropshadow if the mouse is over a color that's not really close to black.
      var isCloseToBlack = pixelData[0] < 10 && pixelData[1] < 10 && pixelData[2] < 10;
      if (isCloseToBlack) {
        var cssText = '0px 0px 15px rgba(255, 255, 255, 0.9)';
        $('#interactive-ex').css('text-shadow', cssText);
      }
      else if (!isCloseToBlack) {
        var cssText = '0px 0px 15px rgba('
          + pixelData[0] + ', '
          + pixelData[1] + ', '
          + pixelData[2] + ', '
          + '0.9\)';
        $('#interactive-ex').css('text-shadow', cssText);
      }
  });
});


// Media query event handler
if (matchMedia) {
	var mq = window.matchMedia("(max-width: 450px)");
	mq.addListener(WidthChange);
	WidthChange(mq);
}

// Media query change
function WidthChange(mq) {

	if (mq.matches) {
		// window width is at most 450px


	}
	else {
		// window width is greater than

    // The sticky header appears below the home section, so that its appearance on the home section is nice and clean.
    var position = $('#about').position();
    console.log('position: ' + position);
    $(window).scroll(function() {
      if ($(this).scrollTop() > 492) { // TODO: Need to fine tune 400 to position.top, which currently is above the "About" text
        $('#nav-header').addClass('navbar-fixed-top');
        $('#header').fadeIn(500, function() { // Fading is not working
          $(this).addClass('header');
          $('#nav-header').addClass('box-shadow');
        });
      } else {
        $('#nav-header').removeClass('navbar-fixed-top');
        $('#header').fadeIn(500, function() { // Fading is not working
          $('#nav-header').removeClass('box-shadow');
        });
      }
    });
	}

}
