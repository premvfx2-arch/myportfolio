
const images = document.querySelectorAll(".cards img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

images.forEach(img=>{
  img.addEventListener("click",()=>{
    lightbox.style.display="flex";
    lightboxImg.src=img.src;
  });
});

closeBtn.addEventListener("click",()=>{
  lightbox.style.display="none";
});

lightbox.addEventListener("click",(e)=>{
  if(e.target!==lightboxImg){
    lightbox.style.display="none";
  }
});






let count=1;
setInterval(()=>{
  count++;
  if(count>50) count=1;
  document.getElementById("counter").innerText=count;
},100);

document.getElementById("bulb").addEventListener("click",()=>{
  document.body.classList.toggle("glow-active");
});






const section = document.querySelector(".portfolio-section");
const row1 = document.querySelector(".row-1");
const row2 = document.querySelector(".row-2");
const row3 = document.querySelector(".row-3");
const content = document.querySelector(".content");

let current = 0;
let target = 0;
let ticking = false;

function ease(current,target,rate=0.08){
    return current + (target-current)*rate;
}

function animate(){
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight - window.innerHeight;
    const scrollY = window.scrollY;

    const progress = Math.min(Math.max((scrollY-sectionTop)/sectionHeight,0),1);
    target = progress;
    current = ease(current,target);

    const moveX = current * 120;   // subtle horizontal
    const moveY = current * 0;   // vertical movement

    /* Horizontal + vertical movement */
    row1.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    row3.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    row2.style.transform = `translateX(${-moveX}px) translateY(${moveY}px)`;

    /* Text moves straight down and slightly forward */
    content.style.transform = `translateY(${moveY * 0.6}px) scale(${1 + current*0.05})`;

    if(Math.abs(current-target) > 0.001){
        requestAnimationFrame(animate);
    } else {
        ticking = false;
    }
}

window.addEventListener("scroll",()=>{
    if(!ticking){
        requestAnimationFrame(animate);
        ticking = true;
    }
});









const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e)=>{
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});








const boxes = document.querySelectorAll(".video-box");
const modal = document.getElementById("modal");
const modalVideo = document.getElementById("modalVideo");
const closeBtns = document.getElementById("close");

boxes.forEach(box => {
  box.addEventListener("click", () => {
    const videoSrc = box.getAttribute("data-video");
    modalVideo.src = videoSrc;
    modal.classList.add("active");
    modalVideo.play();
  });
});

function closeModal(){
  modal.classList.remove("active");
  modalVideo.pause();
  modalVideo.src = "";
}

closeBtns.addEventListener("click", closeModal);

modal.addEventListener("click", (e)=>{
  if(e.target === modal){
    closeModal();
  }
});










const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

menu.addEventListener("click",()=>{
    nav.classList.toggle("active");
});











const box = document.getElementById("box2");
const icons = document.querySelectorAll(".icon");

icons.forEach(icon=>{
    icon.x = Math.random()*(box2.clientWidth-70);
    icon.y = Math.random()*(box2.clientHeight-70);

    // Very slow floating speed
    icon.vx = (Math.random()-0.5)*0.4;
    icon.vy = (Math.random()-0.5)*0.4;

    icon.style.left = icon.x + "px";
    icon.style.top = icon.y + "px";
});

function animate(){
    icons.forEach(icon=>{
        icon.x += icon.vx;
        icon.y += icon.vy;

        if(icon.x<=0 || icon.x>=box.clientWidth-70) icon.vx*=-1;
        if(icon.y<=0 || icon.y>=box.clientHeight-70) icon.vy*=-1;

        icon.style.left = icon.x + "px";
        icon.style.top = icon.y + "px";
    });

    requestAnimationFrame(animate);
}
animate();

/* Smooth Slow Escape */
box2.addEventListener("mousemove",e=>{
    icons.forEach(icon=>{
        const rect = icon.getBoundingClientRect();
        const dx = e.clientX-(rect.left+rect.width/2);
        const dy = e.clientY-(rect.top+rect.height/2);
        const distance = Math.sqrt(dx*dx+dy*dy);

        if(distance<120){
            const force=(120-distance)/120;

            // Soft push
            icon.vx += (-dx/distance)*force*0.2;
            icon.vy += (-dy/distance)*force*0.2;

            // Smooth damping
            icon.vx*=0.97;
            icon.vy*=0.97;
        }
    });
});