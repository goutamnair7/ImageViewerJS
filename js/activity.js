var zoom = 100;
var rot = 0;

$(document).ready(function() {
    var image = document.getElementById('principal-image');
    var canvas = document.getElementById('myCanvas');
    var choose = document.getElementById('init-image');
    var ctx = canvas.getContext('2d');
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);
    canvas.style.display = "none";

    $("#exit-fullscreen").hide();

    $("#zoom-in").click(function() {
        console.log("Zoom-In");
    });

    $("#zoom-out").click(function() {
        console.log("Zoom-Out");
    });

    $("#zoom-best").click(function() {
        console.log("Zoom-Best");
    });

    $("#zoom-original").click(function() {
        console.log("Zoom-Original");
    });

    $("#rotate_anticlockwise").click(function() {
        rot -= 90;
        if (rot < 0) {
          rot = 270;
        }
        //rotateImage(rot);
    });

    $("#rotate_clockwise").click(function() {
        rot += 90;
        if (rot > 270) {
          rot = 0;
        }
        //rotateImage(rot);
    });

    /*function rotateImage(degree) {
      var ctx = canvas.getContext('2d');
      var cw = image.width, ch = image.height, cx = 0, cy = 0;

      //   Calculate new canvas size and x/y coorditates for image
      switch(rot){
        case 90:
          cw = image.height;
          ch = image.width;
          cy = image.height * (-1);
          break;
        case 180:
          cx = image.width * (-1);
          cy = image.height * (-1);
          break;
        case 270:
          cw = image.height;
          ch = image.width;
          cx = image.width * (-1);
          break;
        }

      //  Rotate image
      canvas.setAttribute('width', cw);
      canvas.setAttribute('height', ch);
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.rotate(degree * Math.PI / 180);
      ctx.drawImage(image, -image.width/2,-image.height/2);
      }*/

    $("#fullscreen").click(function() {
        console.log("Switching to fullscreen");
        $(".toolbar").fadeIn('slow');
        $("#canvas").css('top', '0px');
        $("#exit-fullscreen").show();
    });

    $("#exit-fullscreen").click(function() {
        console.log("Exiting fullscreen");
        $(".toolbar").show();
        $("#canvas").css('top', '55px');
        $("#exit-fullscreen").hide();
    });


    $("#init-image button").click(function() {
        $('#search_image').click();
    });

    $('#open-button').click(function(e) {
      e.preventDefault();
      fileInput = document.getElementById('search_image');
      var imageType = /image.*/;

      fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        if (file.type.match(imageType)) {
          var reader = new FileReader();
          reader.onload = function(e) {
            var imageSrc = reader.result;
            choose.style.display = 'none';
            canvas.style.zIndex = 1;
            image.src = imageSrc;
          }
          reader.readAsDataURL(file);
        }
      });
    });

});
