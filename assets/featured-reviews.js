const modals = document.querySelectorAll("[data-modal]");

modals.forEach(function (trigger) {
  trigger.addEventListener("click", function (event) {
    event.preventDefault();
    const tagetmodel = "#modalarea-" + trigger.dataset.modal
    const modal = document.querySelector(tagetmodel);   
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

const paginatedList = document.querySelector(".featured-reviews__wrapper");
const listItems = paginatedList.querySelectorAll(".featured-reviews__block");
const paginationNumbers = document.getElementById("pagination-numbers");

const paginationLimitDesktop = parseInt(
  paginatedList.dataset.prePageLimitDesktop,
  10
);
const paginationLimitMobile = parseInt(
  paginatedList.dataset.prePageLimitMobile,
  10
);
var paginationLimit = 0;

function Resize() {
  if (window.innerWidth < 769) {
    paginationLimit = paginationLimitMobile;
  } else {
    paginationLimit = paginationLimitDesktop;
  }
}

Resize();
window.addEventListener("resize", Resize);

const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);

  paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });
};

function featuredReviews() {
  getPaginationNumbers();
  setCurrentPage(1);

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", featuredReviews);
