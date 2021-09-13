const vertical = document.querySelector(".vertical");
const horizon = document.querySelector(".horizon");
const tag = document.querySelector(".tag");
const target = document.querySelector(".target");
const targetRect = target.getBoundingClientRect();
const targetHalfWidth = targetRect.width/2;
const targetHalfHeight = targetRect.height/2;
window.addEventListener("mousemove",(event)=>{
   const x = event.clientX;
   const y = event.clientY;

   vertical.style.transform = `translateX(${x}px)`;
  // vertical.style.left = `${x}px`;

  horizon.style.transform = `translateY(${y}px)`;
   //horizon.style.top = `${y}px`;

   //target.style.left = `${x}px`;
   //target.style.top = `${y}px`;
   target.style.transform = `translate(${x-targetHalfWidth}px, ${y-targetHalfHeight}px)`;

   // tag.style.left = `${x}px`;
   // tag.style.top = `${y}px`;
   tag.style.transform = `translate(${x}px, ${y}px)`;
   tag.innerHTML = `${x}px ${y}px`;

});
