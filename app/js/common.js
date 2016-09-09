$(function() {

    //Плавная прокрутка к объекту
    $(".scroll").click(function(event){
//Перехватываем обработку по умолчанию события нажатия мыши
        event.preventDefault();
//Получаем полный url - например, mysitecom/index.htm#home
        var full_url = this.href;
//Разделяем url по символу # и получаем имя целевой секции - home в адресе mysitecom/index.htm#home
        var parts = full_url.split("#");
        var trgt = parts[1];
//Получаем смещение сверху для целевой секции
        var target_offset = $("#"+trgt).offset();
        var target_top = target_offset.top;
//Переходим в целевую секцию установкой позиции прокрутки страницы в позицию целевой секции
        $('html, body').animate({scrollTop:target_top}, 1500);
    });

    //Header во весь экран
    function heightDetect(){

        $("header").css("height", $(window).height());
        $(".wrapper").css("height", $(window).height());
        $(".wrapper-home_center").css("height", $(window).height());
        $(".wrapper-home_right").css("height", $(window).height());

    }

    heightDetect();
    $(window).resize(function() {
        heightDetect();
    });

    //Owl initializer
    $(".owl-carousel").owlCarousel({
        items:1,
        margin:30,
        stagePadding:30,
        smartSpeed:450,
        nav:true
    });

    //E-mail Ajax форма
    //Documentation & Example: https://github.com/agragregra/uniMail
    $("form").submit(function() { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            $('.success').addClass("visible");
            setTimeout(function() {
                // Done Functions
                th.trigger("reset");
                $('.success').removeClass("visible");
                $.magnificPopup.close();
            }, 2500);
        });
        return false;
    });

    //Chrome Smooth Scroll
    try {
        $.browserSelector();
        if($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch(err) {

    };

    //Плавный скролл
    //Documentation & Example: https://github.com/inuyaksa/jquery.nicescroll
    $("html").niceScroll();

    function fix_size() {

        var images = $('.effect-julia');
        images.each(setsize);

        function setsize() {
            var img = $(this),
                img_dom = img.get(0),
                container = img.parents('.img-container');
            if (img_dom.complete) {
                resize();
            } else img.one('load', resize);

            function resize() {
                if ((container.width() / container.height()) < (img_dom.width / img_dom.height)) {
                    img.width('100%');
                    img.height('auto');
                    return;
                }
                img.height('100%');
                img.width('auto');
            }
        }
    }
    $(window).on('resize', fix_size);
    fix_size();
});
