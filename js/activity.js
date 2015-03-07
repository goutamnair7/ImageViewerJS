$(document).ready(function() {
    image = document.getElementById('principal-image');
    canvas = document.getElementById('myCanvas');
    choose = document.getElementById('init-image');
    ctx = canvas.getContext('2d');
    canvas.style.display = "none";
    scale_h = 1.0;
    scale_w = 1.0;

    $("#exit-fullscreen").hide();

    $("#zoom-in").click(function() {
        if(scale_h <= 5.0 && scale_w <= 5.0){
            scale_h += 0.1;
            scale_w += 0.1;
            canvas.setAttribute('width', image.width*scale_w);
            canvas.setAttribute('height', image.height*scale_h);
            ctx.scale(scale_w, scale_h);
            ctx.drawImage(image, 0, 0);
        }
    });

    $("#zoom-out").click(function() {
        if(scale_h > 0.5 && scale_w > 0.5){
            scale_h -= 0.1;
            scale_w -= 0.1;
            canvas.setAttribute('width', image.width*scale_w);
            canvas.setAttribute('height', image.height*scale_h);
            ctx.scale(scale_w, scale_h);
            ctx.drawImage(image, 0, 0);
        }
    });

    $("#zoom-best").click(function() {
            h = image.height;
            w = image.width;
            if(h > window.innerHeight-55){
                ratio = w/h;
                h = window.innerHeight - 55;
                w = ratio*h;
            }
            else if(w > window.innerWidth){
                ratio = h/w;
                w = window.innerWidth;
                h = ratio*w;
            }
            scale_h = h/image.height;
            scale_w = w/image.width;
            canvas.setAttribute('width', image.width*scale_w);
            canvas.setAttribute('height', image.height*scale_h);
            ctx.scale(scale_w, scale_h);
            ctx.drawImage(image, 0, 0);
    });

    $("#zoom-original").click(function() {
        scale_h = scale_w = 1.0;
        canvas.setAttribute('width', image.width*scale_w);
        canvas.setAttribute('height', image.height*scale_h);
        ctx.scale(scale_w, scale_h);
        ctx.drawImage(image, 0, 0);
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
          var reader = new FileReader();

          file = fileInput.files[0];
          console.log(file);
          reader.readAsDataURL(file);
          reader.onload = function(_file) {
            image.src = _file.target.result;
            image.onload = function(){
                canvas.setAttribute('width', image.width);
                canvas.setAttribute('height', image.height);
                choose.style.display = "none";
                canvas.style.display = "block";
                ctx.drawImage(image, 0, 0);
                image.style.display = "none";
                canvas.toDataURL('image/jpeg');
            }
          }
      });
    });
});
