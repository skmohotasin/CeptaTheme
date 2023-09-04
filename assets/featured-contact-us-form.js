const DataButton = document.querySelectorAll("[data-button]");
const NextPage = document.querySelector("[data-next-page]");
const BackPage = document.querySelector("[data-back-page]");
const ContactUsPageMain = document.querySelector(".contact-us-page-main");
const ContactUsFormMain = document.querySelector(".contact-us-form-main");
const ContactUsFormModal = document.querySelector("#contact-us-form-modal");
const modalExits = document.querySelectorAll(".contact-us-modal-exit");
const CButton = document.querySelector(".contact__button .button");
const loadingText = document.querySelector(".loading-text");
var SubmitHit = false;

const contactusFormModalButton = document.querySelector(
    "#contact-us-form-modal-button"
);
const SectionObserve = document.querySelector("[data-section-observe]");
const MainBody = document.querySelector("Body");

function featuredContactUsForm() {
    DataButton.forEach(function(trigger) {
        trigger.addEventListener("click", function(event) {
            event.preventDefault();
            ContactUsFormModal.classList.add("open");
            MainBody.classList.add("scrollbar-off");
            modalExits.forEach(function(exit) {
                exit.addEventListener("click", function(event) {
                    event.preventDefault();
                    ContactUsFormModal.classList.remove("open");
                    MainBody.classList.remove("scrollbar-off");
                });
            });
        });
    });

    NextPage.addEventListener("click", function(event) {
        event.preventDefault();
        ContactUsPageMain.classList.add("slide-in");
        ContactUsFormMain.classList.add("slide-out");
    });
    BackPage.addEventListener("click", function(event) {
        event.preventDefault();
        ContactUsPageMain.classList.remove("slide-in");
        ContactUsFormMain.classList.remove("slide-out");
    });
}

function isInViewport(element, main) {
    const rect = element.getBoundingClientRect();
    let viewportOffset = element.getBoundingClientRect();
    let MainBody = main.getBoundingClientRect();
    let BodyHeight = MainBody.height - window.innerHeight * 2;
    let top = viewportOffset.top;
    let topAbs = Math.abs(top);
    let windowHeight = window.innerHeight / 3;
    if (top < windowHeight) {
        contactusFormModalButton.classList.add("active");
    } else {
        contactusFormModalButton.classList.remove("active");
    }
    if (topAbs > BodyHeight) {
        contactusFormModalButton.classList.remove("active");
    }
}

document.addEventListener("scroll", function() {
    isInViewport(SectionObserve, MainBody);
});

CButton.addEventListener("click", function(event) {
    SubmitHit = true;
    loadingText.classList.add("fading");
    setTimeout(function() {
        loadingText.classList.remove("fading");
    }, 1000);
});
document.querySelector("#ContactForm").addEventListener('submit', function(event) {
    var data = this;
    fetch(data.getAttribute('action'), {
            method: data.getAttribute('method'),
            body: new FormData(data)
        }).then(res => res.text())
        .then(function(data) {
            ContactUsFormModal.classList.add("open");
            MainBody.classList.add("scrollbar-off");
        });
    event.preventDefault();
});
if (window.location.href.indexOf("?contact_posted=true") != -1) {
    const formStatusList = document.querySelector(".form-status-list");
    ContactUsFormModal.classList.add("open");
    MainBody.classList.add("scrollbar-off");
    setTimeout(function() {
        window.history.pushState({}, '', location.href.split("?contact_posted=true")[0]);
    }, 1000);
    setTimeout(function() {
        formStatusList.classList.add("hidden");
        ContactUsFormModal.classList.remove("open");
        MainBody.classList.remove("scrollbar-off");
    }, 3000);
}
if (!SubmitHit) {
    document.addEventListener("DOMContentLoaded", featuredContactUsForm);
}