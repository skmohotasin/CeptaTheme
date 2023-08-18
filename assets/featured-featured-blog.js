const modalBlog = document.querySelectorAll("[data-modal-blog]");

modalBlog.forEach(function (trigger) {
  trigger.addEventListener("click", function (event) {
    event.preventDefault();
    const tagetmodel = "#readmore-" + trigger.dataset.modalBlog
    const modal = document.querySelector(tagetmodel);   
    console.log(tagetmodel,modal);
    modal.classList.add("open");
    
    const exits = modal.querySelectorAll(".modal-exit");
    exits.forEach(function (exit) {
      exit.addEventListener("click", function (event) {
        event.preventDefault();
        modal.classList.remove("open");
      });
    });
  });
});
