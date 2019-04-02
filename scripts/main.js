let sidebar_active = true;
let image_type;

$(document).ready(function () {
    $("#home").on("click", () => home());
    $("#illustrations").on("click", () => display_art(illustrations));
    $("#logos").on("click", () => display_art(logos));
    $("#contact").on("click", () => display_information(contact_info));
    $("#about").on("click", () => display_information(about_me));
    $(".side-bar_activate").on("click", () => side_bar());
});

let home = (x) => {
    $(".content-container").html("");
}

let display_information = (information) => {
    $(".content-container").removeClass('animated bounceInLeft');
    $(".main-container").removeClass("loading");
    $(".content-container").html(`<div class="words"></div>`);

    setTimeout(x => {
        information.forEach(element => {
            let p = `<div class="">${element}<div>`;
            $(".words").append(p);
        });
        $(".content-container").addClass('animated bounceInLeft');
    }, 250);
}

let side_bar = (x) => {
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

let display_image = (element) => {
    //side_bar();
    image_type = ".img_display";
    let img = element.target.src;
    $(".main-container").addClass("loading");
    $(".content-container").html("");
    $(".content-container").append(`<img src="${img}" class="img_display blur_loading"></img>`);
    setTimeout(x => {
        image_adjust(image_type); // HERE
        $(".blur_loading").removeClass("blur_loading");
        $(".main-container").removeClass("loading");
        $(".main-container").addClass('animated fadeIn');
    }, 250);
    $(".main-container").removeClass('animated fadeIn');
}

let display_art = (currrent_object) => {
    image_type = ".img_responsive";
    $(".main-container").addClass("loading");
    $(".content-container").html("");
    for (const key in currrent_object) {
        $(".content-container").append(`<img src="${currrent_object[key]["image"]}" class="img_responsive blur_loading"></img>`);
    }

    let imgs = document.images,
        len = imgs.length,
        counter = 0;

    [].forEach.call(imgs, function (img) {
        img.addEventListener('load', incrementCounter, false);
        img.addEventListener('error', incrementCounter, false);
        img.onerror = function () {
            $(img).remove();
        }
    });

    function incrementCounter() {
        counter++;
        if (counter === len) {
            image_adjust(image_type);
            $(".main-container").removeClass("loading");
            setTimeout(x => {
                $(".main-container").addClass('animated fadeIn');
                scroll_to_top();
                $(".blur_loading").removeClass("blur_loading");
            }, 500);
            $(".main-container").removeClass('animated fadeIn');
        }
    }
    $(".img_responsive").on("click", (x) => display_image(x));

}


let image_adjust = (type_img) => {
    let max_width = $(".content-container").width();
    let max_height = $(window).innerHeight();
    let elements = $(type_img);

    if (type_img == ".img_responsive") {
        for (let index = 0; index < elements.length; index++) {
            $(elements[index]).css({
                "width": max_width /3.75,
                "height": "auto"
            });
        }
    } else {
        for (let index = 0; index < elements.length; index++) {
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

let opacity = (document.documentElement.scrollTop / 1500).toFixed(1);
window.onscroll = () => {
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

let scroll_to_top = () => {
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
}