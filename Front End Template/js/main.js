// Check If There's a color Option In Local Storage
let mainColors = localStorage.getItem("color_option")


if (mainColors !== null){
  // console.log("Local Storage Is Not Empty");
  document.documentElement.style.setProperty('--main-color',mainColors);
  
  // Remove Active Class From All Colors List Item
  document.querySelectorAll(".colors-list li").forEach(ele => {
    ele.classList.remove("active")
    // Add Active Class On ELement With Data-Color === Local Storage Item
    if (ele.dataset.color === mainColors){
      //Add Active Class
      ele.classList.add("active")
    }
  })
}
//Random Background Option
let backgroundOption = true;
// Variable To Control The Interval
let backgroundInterval;
// Check If There's a Random background Option In Local Storage
let backgroundLocalItem = localStorage.getItem("background_option");
// Check If Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null){
  document.querySelectorAll(".random-backgrounds span").forEach(ele => {
    ele.classList.remove("active")
  })
  if (backgroundLocalItem === 'true'){
    backgroundOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  }else{
    backgroundOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
  // Remove Active Class From All Spans
}
// Toggle Spin Class Icon
let gear = document.querySelector(".toggle-settings .gear")
gear.onclick = function () {
  this.classList.toggle("fa-spin");
  this.parentElement.parentElement.classList.toggle("open")
}

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach(li => {
  li.addEventListener("click", (e) => {
    //Set Color On Root
    document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);
    // Remove Active Class From All Lis
    handleActive(e);
  })
})

// Switch Random Backgrounds Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
randomBackEl.forEach(span => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if(e.target.dataset.background === "yes"){
      backgroundOption = true;
      randomizeImgs();
      // Add Background To Local Storage
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
})
//Select Landing Page
let landingPage = document.querySelector(".landing-page");
let imgsArray = ["img-1.png","img-2.jpg","img-3.jpg","img-4.jpeg","img-5.jpg"];
// Function To Randomize Imgs
function randomizeImgs(){
  if (backgroundOption === true) {
    backgroundInterval = setInterval( () => {
      let randomNum = Math.floor(Math.random() * imgsArray.length)
      landingPage.style.backgroundImage = 'url("images/'+ imgsArray[randomNum] +'")';
    }, 1000)
  }
}
randomizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills")
window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;
  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // Window Height
  let windowHeight = this.innerHeight;
  // Window Scroll Top
  let windowScrollTop = this.scrollY;
  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress; 
    })
  }
}

// Create PopUp With The Image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
  img.addEventListener("click", (e) => {
    // Create OverLay Element
    let overLay = document.createElement("div");
    // Add Class To OverLay
    overLay.className = 'popup-overlay';
    // Append OverLay To Body
    document.body.appendChild(overLay);
    // Create Popup Box
    let popupBox = document.createElement("div");
    // Add Class to The Popup Box
    popupBox.className = 'popup-box';
    if(img.alt !== null){
      // Create Heading
      let popupHeading = document.createElement("h3");
      // Create Text For Heading
      let imgText = document.createTextNode(img.alt);
      // Append The Text To The Heading
      popupHeading.appendChild(imgText);
      // Append Heading To Popup Box
      popupBox.appendChild(popupHeading);
    }
    // Create The Img
    let popupImage = document.createElement("img");
    // Set The Source Of The Image
    popupImage.src = img.src;
    // Add image Yo Popup Box
    popupBox.appendChild(popupImage);
    // .. Append The Popup  Box To body
    document.body.appendChild(popupBox);
    // Create The Close Span
    let closeSpan = document.createElement("span");
    // Create Text For Close Span
    let closeSpanText = document.createTextNode("X");
    // Append Text To Close Span
    closeSpan.appendChild(closeSpanText);
    // Add Class To Close Span
    closeSpan.className = 'close-span';
    // Add Close Span To The Popup Box
    popupBox.appendChild(closeSpan);
  })
});
// Close Popup
document.addEventListener("click", (e) => {
  if(e.target.className == 'close-span') {
    // Remove The Current Popup
    e.target.parentNode.remove();
    // Remove Over Lay
    document.querySelector(".popup-overlay").remove()
  }
})

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
allBullets.forEach(bullet => {
  bullet.addEventListener('click', (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Handle Active State
function handleActive(ev){
  // Remove Active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach(element => {
    element.classList.remove("active");
  });
  // Add Active Class On Self
  ev.target.classList.add("active")
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");
if (bulletLocalItem !== null) {
  bulletsSpan.forEach(span => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === 'block') {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add('active');
  } else{
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add('active');
  }
}
bulletsSpan.forEach(span => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === 'show'){
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", 'block')
    }else{
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", 'none')
    }
    handleActive(e)
  })
})

// Reset Button
document.querySelector(".reset-option").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem('color_option')
  localStorage.removeItem('background_option')
  localStorage.removeItem('bullets_option')
  // Reload Window 
  location.reload();
}

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu")
let tLinks = document.querySelector(".links")
toggleBtn.onclick = function(e){
  e.stopPropagation()
  // Toggle Class menu-active on Button
  this.classList.toggle("menu-active");
  // Toggle Class open on Links
  tLinks.classList.toggle("open");
};
// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks){
    // Check If Menu Is Open
    if (tLinks.classList.contains("open")){
      // Toggle Class menu-active on Button
      toggleBtn.classList.toggle("menu-active");
      // Toggle Class open on Links
      tLinks.classList.toggle("open");
    }}
});
// Stop Propagation On Menu
tLinks.onclick = function(e) {
  e.stopPropagation();
}