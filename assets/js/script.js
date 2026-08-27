
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
    // Cards with a real destination navigate normally; cards without one keep the old scroll behavior.
    if (card.getAttribute("href")) return;
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
    window.open("https://wa.me/923172351280?text=" + encodeURIComponent(message), "_blank", "noopener");
  });
});


/* E-commerce header search + local A.Furniture products + account/cart UI */
document.addEventListener("DOMContentLoaded", function(){
  const searchForms = Array.from(document.querySelectorAll(".header-search, .mobile-search-panel"));
  const mobileToggle = document.querySelector(".mobile-search-toggle");
  const mobilePanel = document.querySelector(".mobile-search-panel");
  const productGrid = document.querySelector(".product-grid");

  function escapeHtml(value){
    return String(value || "").replace(/[&<>\"]/g, function(ch){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch];
    });
  }

  function goToSearch(query){
    const value=(query||"").trim();
    if(!value) return;
    const url=new URL(window.location.href);
    if(url.pathname.endsWith("/index.html") || url.pathname.endsWith("/") || url.pathname === ""){
      url.searchParams.set("search",value);
      window.history.replaceState({},"",url);
      applySearch(value,true);
    }else{
      window.location.href="index.html?search="+encodeURIComponent(value);
    }
    if(mobilePanel) mobilePanel.classList.remove("open");
  }

  function applySearch(query,scrollToProducts){
    if(!productGrid) return;
    const cards=Array.from(productGrid.querySelectorAll(".product-card"));
    const q=(query||"").trim().toLowerCase();
    let matches=0;
    cards.forEach(function(card){
      const text=card.textContent.toLowerCase();
      const imageAlt=Array.from(card.querySelectorAll("img")).map(function(img){return img.alt||"";}).join(" ").toLowerCase();
      const match=!q || (text+" "+imageAlt).includes(q);
      card.style.display=match?"":"none";
      if(match) matches++;
    });

    let status=document.querySelector(".search-results-status");
    if(!status){
      status=document.createElement("div");
      status.className="search-results-status";
      productGrid.parentNode.insertBefore(status,productGrid);
    }

    if(q){
      status.innerHTML='<span>Search results for <b>"'+escapeHtml(q)+'"</b></span><button type="button" class="clear-search">Clear</button>';
      status.style.display="flex";
      const clear=status.querySelector(".clear-search");
      if(clear) clear.addEventListener("click",function(){
        const url=new URL(window.location.href);
        url.searchParams.delete("search");
        window.history.replaceState({},"",url);
        applySearch("",false);
        searchForms.forEach(function(form){
          const input=form.querySelector(".search-input");
          if(input) input.value="";
        });
      });
      if(!matches){
        status.insertAdjacentHTML("beforeend",'<em class="search-no-results">No matching A.Furniture product found.</em>');
      }
      if(scrollToProducts){
        const section=document.querySelector(".products-section");
        if(section) setTimeout(function(){section.scrollIntoView({behavior:"smooth",block:"start"});},50);
      }
    }else{
      status.style.display="none";
      cards.forEach(function(card){card.style.display="";});
    }
  }

  searchForms.forEach(function(form){
    form.addEventListener("submit",function(e){
      e.preventDefault();
      const input=form.querySelector(".search-input");
      goToSearch(input?input.value:"");
    });
    const input=form.querySelector(".search-input");
    if(input && productGrid) input.addEventListener("input",function(){applySearch(input.value,false);});
  });

  if(mobileToggle && mobilePanel){
    mobileToggle.addEventListener("click",function(){
      const open=mobilePanel.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded",open?"true":"false");
      if(open){
        const input=mobilePanel.querySelector(".search-input");
        if(input) setTimeout(function(){input.focus();},50);
      }
    });
  }

  if(productGrid){
    const params=new URLSearchParams(window.location.search);
    const initialSearch=params.get("search")||"";
    searchForms.forEach(function(form){
      const input=form.querySelector(".search-input");
      if(input) input.value=initialSearch;
    });
    applySearch(initialSearch,!!initialSearch);
  }

  // Keep the cart badge synced across all pages.
  function getCart(){try{return JSON.parse(localStorage.getItem("A.F_CART")||"[]");}catch(e){return [];}}
  function updateCartCount(){
    const count=getCart().reduce((sum,item)=>sum+(Number(item.quantity)||1),0);
    document.querySelectorAll(".cart-count").forEach(function(el){el.textContent=count;el.style.display=count>0?"flex":"none";});
  }
  updateCartCount();
  window.addEventListener("storage",updateCartCount);

  // Buy Now keeps its existing checkout flow, while also remembering the selected item for Cart.
  document.addEventListener("click",function(e){
    const link=e.target.closest('a[href*="checkout.html"]');
    if(!link) return;
    const href=link.getAttribute("href")||"";
    try{
      const url=new URL(href,window.location.href);
      const custom=url.searchParams.get("custom")==="1";
      const id=url.searchParams.get("id")||"";
      const name=url.searchParams.get("name")||id||"Furniture";
      const image=url.searchParams.get("image")||"";
      const productCodes={bed:"A.F-001",sofa:"A.F-002",dining:"A.F-003",wardrobe:"A.F-004"};
      const item={id:custom?"custom-"+Date.now():id,productCode:custom?"CUSTOM":(productCodes[id]||""),name:custom?decodeURIComponent(name):name,image:custom?decodeURIComponent(image):image,price:0,quantity:1,customDesign:custom,checkoutUrl:url.pathname+url.search};
      const cart=getCart();
      const existing=cart.find(function(x){return x.id===item.id && x.customDesign===item.customDesign;});
      if(existing) existing.quantity=(Number(existing.quantity)||1)+1; else cart.push(item);
      localStorage.setItem("A.F_CART",JSON.stringify(cart));
      updateCartCount();
    }catch(err){}
  });
});
