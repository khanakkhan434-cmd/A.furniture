
document.addEventListener("DOMContentLoaded", function () {
  /* Mobile menu */
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  /* Active navigation on click + scroll */
  const navLinks = Array.from(document.querySelectorAll(".nav a[data-section]"));

  function setActive(sectionId) {
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.dataset.section === sectionId);
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      setActive(link.dataset.section);
      if (nav) nav.classList.remove("open");
    });
  });

  const sections = navLinks
    .map(function (link) { return document.getElementById(link.dataset.section); })
    .filter(Boolean);

  function updateActiveSection() {
    if (!sections.length) return;
    const marker = window.scrollY + 140;
    let current = sections[0].id;
    sections.forEach(function (section) {
      if (section.offsetTop <= marker) current = section.id;
    });
    setActive(current);
  }

  window.addEventListener("scroll", updateActiveSection, { passive: true });
  window.addEventListener("resize", updateActiveSection);
  updateActiveSection();

  /* Back to top */
  const backTop = document.querySelector(".back-top");
  if (backTop) {
    window.addEventListener("scroll", function () {
      backTop.style.display = window.scrollY > 500 ? "block" : "none";
    }, { passive: true });

    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Working hero slider */
  const hero = document.getElementById("heroImage");
  const dots = Array.from(document.querySelectorAll(".slider-dots [data-slide]"));
  const prev = document.querySelector(".slider-arrow.left");
  const next = document.querySelector(".slider-arrow.right");

  if (hero) {
    const slides = [
      "assets/images/hero-sofa.jpg",
      "assets/images/bed.jpg",
      "assets/images/factory.jpg"
    ];

    let current = 0;
    let timer = null;

    function showSlide(index) {
      current = (index + slides.length) % slides.length;
      hero.style.backgroundImage = 'url("' + slides[current] + '")';

      dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === current);
      });
    }

    function restartAutoSlide() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () {
        showSlide(current + 1);
      }, 4500);
    }

    if (prev) {
      prev.addEventListener("click", function () {
        showSlide(current - 1);
        restartAutoSlide();
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        showSlide(current + 1);
        restartAutoSlide();
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        showSlide(i);
        restartAutoSlide();
      });
    });

    showSlide(0);
    restartAutoSlide();
  }
});


/* Category cards: stay in Products section instead of jumping to Home */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".category-card").forEach(function(card){
    card.addEventListener("click", function(e){
      e.preventDefault();
      const products = document.getElementById("products");
      if (products) products.scrollIntoView({behavior:"smooth", block:"start"});
    });
    card.addEventListener("keydown", function(e){
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const products = document.getElementById("products");
        if (products) products.scrollIntoView({behavior:"smooth", block:"start"});
      }
    });
  });
});


/* Premium interactions: lightbox, reveal animations and reliable back-to-top */
document.addEventListener("DOMContentLoaded", function(){
  const lightbox=document.getElementById("lightbox");
  const lightboxImage=document.getElementById("lightboxImage");
  const galleryItems=Array.from(document.querySelectorAll(".gallery-img"));
  if(lightbox && lightboxImage){
    galleryItems.forEach(function(item){
      item.addEventListener("click",function(){
        const img=item.querySelector("img");
        if(!img) return;
        lightboxImage.src=img.src;
        lightboxImage.alt=img.alt || "Furniture gallery image";
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden","false");
        document.body.style.overflow="hidden";
      });
    });
    function closeLightbox(){
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden","true");
      document.body.style.overflow="";
    }
    const close=lightbox.querySelector(".lightbox-close");
    if(close) close.addEventListener("click",closeLightbox);
    lightbox.addEventListener("click",function(e){if(e.target===lightbox) closeLightbox();});
    document.addEventListener("keydown",function(e){if(e.key==="Escape" && lightbox.classList.contains("open")) closeLightbox();});
  }

  const revealTargets=document.querySelectorAll(".section-heading,.category-card,.product-card,.about-copy,.about-gallery,.why-grid>div,.review-card,.gallery-img,.contact-inner");
  revealTargets.forEach(function(el){el.classList.add("reveal");});
  if("IntersectionObserver" in window){
    const observer=new IntersectionObserver(function(entries,obs){
      entries.forEach(function(entry){
        if(entry.isIntersecting){entry.target.classList.add("revealed");obs.unobserve(entry.target);}
      });
    },{threshold:.12});
    revealTargets.forEach(function(el){observer.observe(el);});
  }else{
    revealTargets.forEach(function(el){el.classList.add("revealed");});
  }

  const top=document.querySelector(".back-top");
  if(top){
    const update=function(){top.style.display=window.scrollY>550?"block":"none";};
    window.addEventListener("scroll",update,{passive:true});
    top.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"});});
    update();
  }
});


/* Separate contact page: open the submitted inquiry in WhatsApp. */
document.addEventListener("DOMContentLoaded", function(){
  const form = document.getElementById("contactForm");
  if(!form) return;
  form.addEventListener("submit", function(e){
    e.preventDefault();
    const data = new FormData(form);
    const message = [
      "Hello A.Furniture, I would like to make an inquiry.",
      "",
      "Name: " + (data.get("name") || ""),
      "Email: " + (data.get("email") || ""),
      "Phone: " + (data.get("phone") || ""),
      "Interest: " + (data.get("interest") || ""),
      "Message: " + (data.get("message") || "")
    ].join("\\n");
    window.open("https://wa.me/923001234567?text=" + encodeURIComponent(message), "_blank", "noopener");
  });
});
