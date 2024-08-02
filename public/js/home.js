const body = document.body;
const html = document.documentElement;
const height = Math.max(body.scrollHeight, body.offsetHeight,
  html.clientHeight, html.scrollHeight, html.offsetHeight);
const footer=document.querySelector("footer");



//adjusting FOOTER
const windowHeight=window.innerHeight;
const windowWidth=document.body.clientWidth;
windowHeight>=height?footer.style.top=`${windowHeight}px`:footer.style.top=`${height}px`;

// footer.style.width=`${windowWidth}px`;