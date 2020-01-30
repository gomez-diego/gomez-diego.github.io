var sidebar_active = true;

$(document).ready(function () {
    $("#home").on("click", function () {
        home();
    });

    $("#illustrations").on("click", function () {
        display_art(illustrations);
    });

    $("#logos").on("click", function () { 
        display_art(logos);
    });

    $("#albumcovers").on("click", function () { 
        display_art(albumcovers);
    });

    $("#contact").on("click", function () {
         display_information(contact_info);
    });
    
    $("#about").on("click", function () { 
        display_information(about_me);
    });

    $(".side-bar_activate").on("click", function () { 
        side_bar();
    });
});

var home = function (x) {
    var video = "<video autoplay muted loop class=\"video\"><source src=\"videos\\Clouds.mp4\" type=\"video/mp4\"></video>";
    $(".content-container").html(video);
}

var display_information = function (information) {
    $(".content-container").addClass("blur_loading");
    $(".content-container").html(`<div class="words"></div>`);
    setTimeout(function(){
        $(".content-container").removeClass("blur_loading");
    },1000)
    setTimeout(function(x) {
        information.forEach(function(element) {
            var p = `<div class="sentence">${element}<div>`;
            $(".words").append(p);
        });
    }, 250);
}

var side_bar = (x) => {
    if (sidebar_active) {
        $(".side-bar").width("0px");
        sidebar_active = false;
    } else {
        $(".side-bar").width("200px");
        sidebar_active = true;
    }
}

var display_art = function (currrent_object) {
    $(".content-container").html("");
    $(".content-container").addClass("blur_loading");

    for (const key in currrent_object) {
        $(".content-container").append(`<img src="${currrent_object[key]["image"]}" class="img_responsive"></img>`);
    }

    var imgs = document.images,
        len = imgs.length,
        counter = 0;

    [].forEach.call(imgs, function (img) {
        img.addEventListener('error', null, false);
        //img.addEventListener('load', null, false);
        img.onerror = function () {
            $(img).remove();
        }
        //img.onload = function () {}

    }, null); //function()

    setTimeout(function(){
        $(".content-container").removeClass("blur_loading");
    },1000)

    $(".img_responsive").on("click", function(x){
        $(".display-actived").remove();
        let copy = $(this).clone().addClass("display-actived").removeClass("img_responsive");
        var enclosure = $("<div>", {"class": "bg-container"});
        enclosure.append(copy);
        enclosure.insertAfter($(".main-container")).delay(500);
        full_image();
        $(".bg-container").click(function() {
            let copy = $(this);
            copy.remove();
        });
    });

}

var opacity = (document.documentElement.scrollTop / 1500).toFixed(1);

window.onscroll = function () {
    opacity = (document.documentElement.scrollTop / 1500).toFixed(1);
    if (opacity > 0.15) {
        document.getElementById("scroll").style.display = "block";
        document.getElementById("scroll").style.opacity = opacity;
    } else if (opacity == 0) {
        document.getElementById("scroll").style.display = "none";
    }

    full_image();
}

window.addEventListener("resize", function () {
    full_image();
 });

var full_image = function () {
    var inner_width = window.innerWidth;
    var inner_height = window.innerHeight;

    if (inner_height > inner_width) {
        $(".display-actived").css( "width", "90vw" );
        $(".display-actived").css( "height", "auto" );
    } else {
        $(".display-actived").css( "width", "auto" );
        $(".display-actived").css( "height", "90vh" );
    }
}



var scroll_to_top = function () {
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
}