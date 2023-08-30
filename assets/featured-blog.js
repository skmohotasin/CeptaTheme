document.addEventListener("DOMContentLoaded", function () {
  const Blogslider = document.querySelector("#Blogslider");
  const blogPostAll = document.querySelectorAll(".splide__track .blog__post")
  var blogPosts = document.querySelector(".splide__track .blog__posts").getBoundingClientRect();
  var blogPostsInner = parseInt(blogPosts.height - ( 12.165 * blogPosts.width/100 ), 10).toString();
  var numberSlideDesktop = parseInt(Blogslider.dataset.numberSlideDesktop, 10);

  if (window.innerWidth < 769) {
    setTimeout(function(){
       blogPostAll.forEach((blog) => {
         blog.children[1].children[0].children[0].style.minHeight = blogPostsInner + 'px'
      });
    }, 50);
  }
  const splideBlog = new Splide("#Blogslider", {
    type: "loop",
    perPage: numberSlideDesktop,
    focus: "left",
    lazyload: "loaded",
    pagination: false,
    perMove: 1,
    clones: 0,
    breakpoints: {
      768: {
        perPage: 1,
      },
    },
    classes: {
      arrows: "splide__arrows slider-buttons",
      arrow: "splide__arrow slider-button",
      prev: "splide__arrow--prev slider-button slider-button--prev",
      next: "splide__arrow--next slider-button slider-button--next",
    },
  });
  splideBlog.mount();

  setTimeout(function () {
    const modalBlog = document.querySelectorAll("[data-modal-blog]");
    const MainBodyForBlog = document.querySelector("Body");

    modalBlog.forEach(function (trigger) {
      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        const tagetmodel = "#readmore-" + trigger.dataset.modalBlog;
        const modal = document.querySelector(tagetmodel);
        modal.classList.add("open");
        MainBodyForBlog.classList.add("scrollbar-off");
        const exits = modal.querySelectorAll(".modal-exit");
        exits.forEach(function (exit) {
          exit.addEventListener("click", function (event) {
            event.preventDefault();
            modal.classList.remove("open");
            MainBodyForBlog.classList.remove("scrollbar-off");
          });
        });
      });
    });
  }, 300);
});
