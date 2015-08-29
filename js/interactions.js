var image = new Image();
var canvas = document.getElementById('brain-flower-canvas');

image.onload = function () {
    var yOffset = 55;
    canvas.width = $('#top-image').width();
    canvas.height = image.height + yOffset;

    // Draw the image in the center of the canvas
    var context = canvas.getContext('2d');
    var midX = (canvas.width - image.width) / 2;
    context.drawImage(image, midX, yOffset);
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

// TODO: the brain flower image needs to be re-centered whenever the browser window changes. Make that function.
