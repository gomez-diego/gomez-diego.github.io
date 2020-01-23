var sidebar_active = true;
var image_type;

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
    $(".content-container").html("");
}

var display_information = function (information) {
    $(".content-container").removeClass('animated bounceInLeft');
    $(".main-container").removeClass("loading");
    $(".content-container").html(`<div class="words"></div>`);

    setTimeout(function(x) {
        information.forEach(function(element) {
            var p = `<div class="">${element}<div>`;
            $(".words").append(p);
        });

        $(".content-container").addClass('animated bounceInLeft');

    }, 250);

}

var side_bar = (x) => {
    if (sidebar_active) {
        $(".side-bar").width("0px");
        $(".main-container").css("margin-left", "0px");
        sidebar_active = false;
    } else {
        $(".side-bar").width("180px");
        $(".main-container").css("margin-left", "180px");
        sidebar_active = true;
    }

    image_adjust(image_type);
}

var display_art = function (currrent_object) {
    
    image_type = ".img_responsive";
    $(".content-container").html("");

    for (const key in currrent_object) {
        $(".content-container").append(`<img src="${currrent_object[key]["image"]}" class="img_responsive"></img>`);
    }

    var imgs = document.images,
        len = imgs.length,
        counter = 0;

    [].forEach.call(imgs, function (img) {
        img.addEventListener('load', loadImage, false);
        img.addEventListener('error', loadImage, false);
        img.onerror = function () {
            $(img).remove();
        }
    });

    function loadImage() {
        image_adjust(image_type);
    }

    $(".img_responsive").on("click", function(x){
        $(".display-actived").remove();
        let copy = $(this).clone().addClass("display-actived").removeClass("img_responsive").addClass("positioned");
        var enclosure = $("<div>", {"class": "bg-container"});
        enclosure.append(copy);
        enclosure.insertAfter($(".main-container")).delay(500);
        $(".bg-container").click(function() {
            let copy = $(this);
            copy.remove();
        });
    });

}

var image_adjust = (type_img) => {
    var max_width = $(".content-container").width();
    var max_height = $(window).innerHeight();
    var elements = $(type_img);

    if (type_img == ".img_responsive") {
        for (var index = 0; index < elements.length; index++) {
            $(elements[index]).css({
                "width": max_width /3.75,
                "height": "auto"
            });
        }
    } else {
        for (var index = 0; index < elements.length; index++) {
            if(max_height >= max_width) {
                $(elements[index]).css({
                    "width": max_width,
                    "height": "auto"
                });
            } else {
                $(elements[index]).css({
                    "width": "auto",
                    "height": max_height-100
                });
            }
        }
    }
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
}

window.addEventListener("resize", function () {
    image_adjust(image_type);
});

var scroll_to_top = function () {
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
}