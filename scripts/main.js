let sb_activate = true;

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
    if (sb_activate) {
        $(".side-bar").width("0px");
        $(".main-container").css("margin-left", "0px");
        sb_activate = false;
    } else {
        $(".side-bar").width("180px");
        $(".main-container").css("margin-left", "180px");
        sb_activate = true;
    }
}

let display_image = (element) => {
    let img = element.target.src;
    $(".main-container").addClass("loading");
    $(".content-container").html("");
    $(".content-container").append(`<img src="${img}" class="img_display blur_loading"></img>`);
    setTimeout(x => {
        image_adjust(".img_display");
        $(".blur_loading").removeClass("blur_loading");
        $(".main-container").removeClass("loading");
        $(".main-container").addClass('animated fadeIn');
    }, 500);
    topFunction();
    $(".main-container").removeClass('animated fadeIn');

    $(window).resize(function () {
        image_adjust(".img_display");
    });

}

let display_art = (currrent_object) => {
    $(".main-container").addClass("loading");
    $(".content-container").html("");
    for (const key in currrent_object) {
        $(".content-container").append(`<img src="${currrent_object[key]["image"]}" class="img_responsive blur_loading"></img>`);
    }
    setTimeout(x => {
        image_adjust(".img_responsive");
        $(".blur_loading").removeClass("blur_loading");
        $(".main-container").removeClass("loading");
        $(".main-container").addClass('animated fadeIn');
    }, 500);
    topFunction();
    $(".main-container").removeClass('animated fadeIn');
    $(".img_responsive").on("click", (x) => display_image(x));

    $(window).resize(function () {
        image_adjust(".img_responsive");
    });
}

let image_adjust = (type_img) => {
    let max_width = $(".content-container").width() - 50;
    let max_height = $(window).innerHeight()

    console.log(max_height);

    let elements = $(type_img);
    for (let index = 0; index < elements.length; index++) {
        if (elements[index].naturalHeight > max_height) {
            $(elements[index]).css({
                "width": "auto",
                "height": max_height - 50
            });
        }
        if (elements[index].naturalHeight > max_height && elements[index].naturalWidth > max_width) {
            $(elements[index]).css({
                "width": max_width - 250,
                "height": "auto"
            });
        }
        if (elements[index].naturalWidth > max_width) {
            $(elements[index]).css({
                "width": max_width,
                "height": "auto"
            });
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

let topFunction = () => {
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
}