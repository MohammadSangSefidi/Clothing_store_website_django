$(function () {

    ///نمایش زیر منو
    $(".showSubMenu").click(function () {
        $(this).nextAll("ul").toggleClass("show");
        $(this).toggleClass('open');
    })

    ///نمایش مگامنو آپدیدت جدید
    $(".main-menu-head").hover(function () {
        $(this).children().find(".main-menu-sub").first().addClass('main-menu-sub-active');
        $(this).children().addClass('active');
    })
    $(".main-menu-head").mouseleave(function () {
        $(this).children().find(".main-menu-sub").first().removeClass('main-menu-sub-active');
        $(this).children().removeClass('active');
    })
    $(".main-menu li").mouseover(function () {

        $(".main-menu li").removeClass("main-menu-sub-active-li");
        $(this).addClass("main-menu-sub-active-li");
        $(".main-menu-sub").removeClass('main-menu-sub-active');
        $(this).children('ul').removeClass('main-menu-sub-active');
        $(this).children('ul').addClass('main-menu-sub-active');
    });
    $(".main-menu-sub-active").mouseleave(function () {
        $(".main-menu-sub-active").removeClass("main-menu-sub-active");
    })

    ///شمارنده محصول برای اضافه کردن به سبد خرید
    $("input.counter").TouchSpin({
        min: 1,
        max: '1000000000000000',
        buttondown_class: "btn-counter waves-effect waves-light",
        buttonup_class: "btn-counter waves-effect waves-light"
    });

    ///انتخاب گر رنگ
    $(".category-sort .form-checks .form-check").click(function () {
        $(".category-sort .form-checks .form-check").removeClass("active");
        $(this).addClass('active');
        $(".category-sort .form-checks .form-check").children("input[type=radio]").attr('checked', false);
        $(this).children("input[type=radio]").attr('checked', true);
    })


    ///انتخاب زمان ارسال
    $(".send-item").click(function () {
        $(".send-item").removeClass("active");
        $(this).addClass('active');
    })

    ///انتخاب روش پستی
    $(".shipping-item").click(function () {
        $(".shipping-item").removeClass("active");
        $(this).addClass('active');
    })

    ///انتخاب روش پرداخت
    $(".bank-item").click(function () {
        $(".bank-item").removeClass("active");
        $(this).addClass('active');
    })


    jQuery('[data-bs-toggle="tooltip"]').tooltip();
    jQuery('[data-bs-toggle="modal"][title]').tooltip();

});

/**
 * open search form flaot
 */

$(document).ready(function () {

    /**
     * open
     */
    $(".header-search").click(function () {
        $(".search-float").toggleClass("open");
    });

    /**
     * close
     */

    $(".search-float-close").click(function () {
        $(".search-float").toggleClass("open");
    });


});

/**
 * open basket float with click
 */

$(document).ready(function () {

    /**
     * open
     */
    $(".header-cart-icon-toggle").click(function () {
        $(".min-cart").toggleClass("open");
    });

});


/**
 * config floating contact
 */
$('#btncollapzion').Collapzion({
    _child_attribute: [{
        'label': 'پشتیبانی تلفنی',
        'url': 'tel:0930555555555',
        'icon': 'bi bi-telephone'
    },
        {
            'label': 'پشتیبانی تلگرام',
            'url': 'https://tlgrm.me',
            'icon': 'bi bi-telegram'
        },
        {
            'label': 'پشتیبانی واتس آپ',
            'url': 'https://wa.me/444444444',
            'icon': 'bi-whatsapp'
        },

    ],
});


// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/*
*
* mega menu floating
*
* */
$(function () {
    var lastScrollTop = 0, delta = 5;
    $(window).scroll(function () {
        var nowScrollTop = $(this).scrollTop();
        if (Math.abs(lastScrollTop - nowScrollTop) >= delta) {
            if (nowScrollTop > lastScrollTop) {
                // ACTION ON
                // SCROLLING DOWN
                $(".top-menu-parent").addClass("mx-0");
            } else {
                // ACTION ON
                // SCROLLING UP
                $(".top-menu-parent").removeClass("mx-0");
            }
            lastScrollTop = nowScrollTop;
        }
    });
});


/**
 * delivery item form check
 */

$(document).ready(function () {

    $(".delivery-item").click(function () {
        $(this).find('input').prop("checked", true);
    });

    $(".delivary-payment-bank-item").click(function (){
        $(".delivary-payment-bank-item").removeClass("active");
       $(this).addClass("active");
    });
});


/*
* فرم چند مرحله ای ورود / ثبت نام
*/

$(document).ready(function (){
    ///disable fild password in load form
    $(".step-passwd").hide();
    ///disable button submit in step one
    $(".step-two").hide();

    ///show filed password in step two form
    $(".step-one").click(function (){

        ///check empty fild username
        if($(".step-username #username").val() != ""){
            ///hide username filed
            $(".step-username").hide();
            ///show password filed
            $(".step-passwd").show();
            ///hide button step one
            $(this).hide();
            ///show button submit
            $(".step-two").show();
        }else{
            $(".step-username #username").addClass("border-danger border-2");
        }


        ///check empty fild password

        $(".btnForm").click(function(){
            if($(".step-passwd #passwd").val() !=""){
                $("#form-auth").submit();
            }else{
                $(".step-passwd #passwd").addClass("border-danger border-2");
            }
        })


    })

})
