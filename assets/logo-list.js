document.addEventListener("DOMContentLoaded", function() {
    function Boolean(value) {
        if (value == 'true') {
            return true;
        } else {
            return false;
        }
    }
    var slide = document.querySelector("#splide-track");
    var Sspeed = parseInt(slide.dataset.speed, 10);
    var Srewind = Boolean(slide.dataset.rewind);
    var SpauseOnHover = Boolean(slide.dataset.pauseOnHover);
    var SpauseOnFocus = Boolean(slide.dataset.pauseOnFocus);

    const splide = new Splide(".splide", {
        type: "loop",
        drag: "free",
        focus: "left",
        lazyload: "loaded",
        start: 0,
        arrows: false,
        pagination: false,
        autoWidth: true,
        rewind: Srewind,
        padding: '5.208vw',
        gap: '8.854vw',
        pauseOnHover: SpauseOnHover,
        pauseOnFocus: SpauseOnFocus,
        autoScroll: {
            speed: Sspeed,
        },
        breakpoints: {
        768: {
          padding: '4.866vw',
          gap: '9.732vw',
        }
      }
    });
    splide.mount(window.splide.Extensions);
});