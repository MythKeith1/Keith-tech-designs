document.addEventListener('DOMContentLoaded',()=>{

  // Reveal on scroll
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  },{threshold:.2});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Typing effect
  const el=document.querySelector('.typed');
  const words=['innovation.','precision.','creativity.','impact.'];
  let i=0,c=0,fwd=true;
  (function tick(){
    el.textContent=words[i].slice(0,c);
    fwd?c++:c--; 
    if(c>words[i].length){fwd=false;setTimeout(tick,900);return;}
    if(c<0){fwd=true;i=(i+1)%words.length;c=0;}
    setTimeout(tick,fwd?80:40);
  })();

  // Smooth scroll
  document.querySelectorAll('nav a, .cta-btn').forEach(link=>{
    link.addEventListener('click',e=>{
      e.preventDefault();
      document.querySelector(link.getAttribute('href'))
        .scrollIntoView({behavior:'smooth'});
    });
  });

  // Cursor glow
  const cursor=document.querySelector('.cursor-glow');
  document.addEventListener('mousemove',e=>{
    cursor.style.left=e.clientX+'px';
    cursor.style.top=e.clientY+'px';
  });

  // Tilt cards
  document.querySelectorAll('.tilt').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const rect=card.getBoundingClientRect();
      const x=(e.clientX-rect.left)/rect.width;
      const y=(e.clientY-rect.top)/rect.height;
      const tiltX=(y-0.5)*15;
      const tiltY=(x-0.5)*15;
      card.style.transform=`rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave',()=>card.style.transform='rotateX(0) rotateY(0) scale(1)');
  });

  // Magnetic buttons
  document.querySelectorAll('.magnetic').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{
      const rect=btn.getBoundingClientRect();
      const x=e.clientX-rect.left-rect.width/2;
      const y=e.clientY-rect.top-rect.height/2;
      btn.style.transform=`translate(${x*0.2}px,${y*0.2}px) scale(1.05)`;
    });
    btn.addEventListener('mouseleave',()=>btn.style.transform='translate(0,0) scale(1)');
  });

  // Contact form send
  const form=document.querySelector('.contact-form');
  const btn=form.querySelector('.send-btn');
  const success=form.querySelector('.success-msg');
  form.addEventListener('submit',e=>{
    e.preventDefault();
    btn.textContent='Sending...';
    setTimeout(()=>{
      btn.textContent='Send Message';
      success.style.display='block';
    },1200);
  });
});
