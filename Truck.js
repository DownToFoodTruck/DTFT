let contentArray = []
//this is for storing results of the API call


let truckTags = []
//this is the array containing tags that will be passed into the mongodb query


// // //INITIAL IMPORTS
// import truckList from './Trucks.json'assert {type: 'json'};
const findUniqueTruckTags = await fetchTags()
async function fetchTags() {
   var uncleanedTagArray = []
   const url = "/apiTAG"
   const rawRes = await fetch(url)
   const rawResJSON = await rawRes.json()
   for (i = 0; i < rawResJSON.length; i++) {
      try {

         uncleanedTagArray.push(rawResJSON[i])
      } catch (err) {
         console.log(err)
      }
   }
   uncleanedTagArray = [].concat.apply([], uncleanedTagArray.map(i => i.trim().toUpperCase().split(',')))

   var uncleanedTagArray = [...new Set(uncleanedTagArray)]
   return (uncleanedTagArray.sort())
}

const truckBox = document.getElementById("truck-box")
let myTruckData = []


//for each truck in our myTruckData add it into the truck HUD (this is effectively a screen refresh function)
export function initializetrucks() {
   document.getElementById("truck-box").innerHTML = "";
   document.getElementById("truck-category").innerHTML = "";
}

//SELECT AND ADD TO MENU
const ddsel = document.getElementById("select-truck")
ddsel.addEventListener("click", function () {
   var select = document.getElementById("tab-drop");
   var option = select.options[select.selectedIndex]

   if (myTruckData.includes(option.value)) {

   } else {
      fetchTrucks(option.value);
   }

   myTruckData.push(option.value)
   myTruckData = myTruckData.filter((c, index) => {
      return myTruckData.indexOf(c) === index;
   })



   async function fetchTrucks(param) {
      const url = "/api?tag=" + param
      const rawRes = await fetch(url)
      contentArray = await rawRes.json()


      for (i = 0; i < contentArray.length; i++) {
         try {
            appendFriend(contentArray, i)
         } catch (err) {
            console.log(err)
         }
      }
   }
   initializetrucks()

});


//REMOVE LAST INSTANCE
const deleteButton = document.getElementById("remove")
deleteButton.addEventListener("click", function () {

   myTruckData.pop()
   myTruckData = myTruckData.filter((c, index) => {
      return myTruckData.indexOf(c) === index;
   })
   // document.getElementById("truck-box").innerHTML=`<div class="friend-title">WHAT IS THERE TO EAT?</div>`
   initializetrucks()
   // renderTrucks()

});

//POPULATE TAG DROPDOWN
//Make set, append i for i in truck categories, jam into tag drop
var select1 = document.getElementById("tab-drop");
for (var i = 0; i < findUniqueTruckTags.length; i++) {
   $('#tab-drop').append('<option>' + findUniqueTruckTags[i] + '</option>');
   sortList()
}


/*    New Hungry Button  */

const elts = {
   text1: document.getElementById("text1"),
   text2: document.getElementById("text2")
};

const texts = [
   "DOWN TO FOOD TRUCK?",
   "CLICK SELECT TO START!",
   " ",
];

const morphTime = 1.50;
const cooldownTime = 2.00;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
   morph -= cooldown;
   cooldown = 0;

   let fraction = morph / morphTime;

   if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
   }

   setMorph(fraction);
}

function setMorph(fraction) {
   elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
   elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

   fraction = 1 - fraction;
   elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
   elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

   elts.text1.textContent = texts[textIndex % texts.length];
   elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
   morph = 0;

   elts.text2.style.filter = "";
   elts.text2.style.opacity = "100%";

   elts.text1.style.filter = "";
   elts.text1.style.opacity = "0%";
}

function animate() {
   requestAnimationFrame(animate);

   let newTime = new Date();
   let shouldIncrementIndex = cooldown > 0;
   let dt = (newTime - time) / 1000;
   time = newTime;

   cooldown -= dt;

   if (cooldown <= 0) {
      if (shouldIncrementIndex) {
         textIndex++;
      }

      doMorph();
   } else {
      doCooldown();
   }
}

animate();

/*  Creates Food Truck Collapsible  */
export function appendFriend(obj, index) {
   truckBox.innerHTML += `
<button type="button" class="collapsible" id="cardBtn${index}" onclick="showModal(${index})">
  <div class="card-image">
    <img src=${obj[index].Profile} class="profile-placeholder" onerror="this.src='img/Truck-Avatar.png';" alt="Trulli" width="150" height="150">
  </div>
  <div class="profile-details">
  <p class="profile-Name" >${obj[index].Name.toUpperCase()}</p>
  <p class="profile-Tags">${document.getElementById("tab-drop").value}</p>
  </div>
</button>
`
}

/*  Creates Food Truck Modal  */
window.showModal = (index) => {

   document.getElementById("overlay").style.display = "block"

   document.getElementById("content").innerHTML = `

  <div class="row">
    <div class="column">
      <div class="card">
        <h2 id="list-name-header"style="text-align:center">${contentArray[index].Name.toUpperCase()}</h2>
        <div class="container">

 <div class = "carousel-actions">
    <button onclick="moveToPrevSlide()" id="carousel-button-prev" aria-label = "Previous Slide">⬅️</button>
    <button onclick="moveToNextSlide()" id="carousel-button-next" aria-label = "Next Slide">➡️</button>


<div class="carousel">

  <div class = "carousel-item carousel-item-visible">
    <img src=${contentArray[index].P1} class="p1-placeholder" onerror="this.style.display='none';" alt="Trulli">
  </div>

  <div class = "carousel-item">
    <img src=${contentArray[index].P2} class="p2-placeholder" onerror="this.style.display='none';" alt="Trulli">
  </div>

  <div class = "carousel-item">
    <img src=${contentArray[index].P3} class="p3-placeholder" onerror="this.style.display='none';" alt="Trulli">
  </div>
  </div>
</div>
<p class="title">Located at:<br>${contentArray[index].Address} </p>
${contentArray[index].Email=="NULL"? "":`<p>${contentArray[index].Email}</p>`}
<p>${contentArray[index].Phone.toUpperCase()!="NULL"?contentArray[index].Phone:""}</p>
<p>${contentArray[index].Description}</p>
<p>${contentArray[index].Hours_of_Operation.split(".").map(i=>`<p>${i}</p>`).toString().replaceAll(',','')}</p>
<p><button class="view-map">
<a href="https://www.google.com/maps/place/${contentArray[index].Address.replace(/\s\s+/g, ' ').replaceAll(' ','+')}"" target="_blank" class="modal-link">VIEW MAP</a>
</button></p>


${contentArray[index].Site=="NULL"? "":`<p><button class="view-map"><a href="${contentArray[index].Site}"" target="_blank" class="modal-link">VISIT WEBSITE</a>
</button></p>`}

${contentArray[index].Email=="NULL"? "":`<p><button class="view-map">
<a href="mailto:${contentArray[index].Email}" class="modal-link">EMAIL VENDOR</a>
</button></p>`}

          <div class="mapcontainer">
          <div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=${contentArray[index].Address.replace(/\s\s+/g, ' ').replaceAll(' ','%20')}&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://fmovies-online.net">fmovies</a><br><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}</style><a href="https://www.embedgooglemap.net">map embed code</a><style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style></div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
`
}

/*    Carousel    */
let slidePosition = 0

window.moveToNextSlide = () => {
   const slides = document.getElementsByClassName("carousel-item")
   const totalSlides = slides.length
   hideAllSlides()
   if (slidePosition === totalSlides - 1) {
      slidePosition = 0
   } else {
      slidePosition++
   }
   slides[slidePosition].classList.add("carousel-item-visible")
}

window.moveToPrevSlide = () => {
   const slides = document.getElementsByClassName("carousel-item")
   const totalSlides = slides.length
   hideAllSlides()

   if (slidePosition === 0) {
      slidePosition = totalSlides - 1
   } else {
      slidePosition--
   }
   slides[slidePosition].classList.add("carousel-item-visible")
}

function hideAllSlides() {
   const slides = document.getElementsByClassName("carousel-item")
   for (let slide of slides) {
      slide.classList.remove("carousel-item-visible")
      slide.classList.add("carousel-item-hidden")
   }
}

document.getElementById("close-modal").addEventListener("click", function () {
   document.getElementById("overlay").style.display = "none"
})

function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function stringifytrucks() {
   return Array.from(truckDiv.innerText)
}

function sortList() {
   var list, i, switching, b, shouldSwitch;
   list = document.getElementById("tab-drop");
   switching = true;
   /* Make a loop that will continue until
   no switching has been done: */
   while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      b = list.getElementsByTagName("option");
      // Loop through all list items:
      for (i = 0; i < (b.length - 1); i++) {
         // Start by saying there should be no switching:
         shouldSwitch = false;
         /* Check if the next item should
         switch place with the current item: */
         if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
            /* If next item is alphabetically lower than current item,
            mark as a switch and break the loop: */
            shouldSwitch = true;
            break;
         }
      }
      if (shouldSwitch) {
         /* If a switch has been marked, make the switch
         and mark the switch as done: */
         b[i].parentNode.insertBefore(b[i + 1], b[i]);
         switching = true;
      }
   }
}

function alphabetizeList(listItem) {
   var sel = document.getElementById(listItem);
   var selected = sel.val(); // cache selected value, before reordering
   var opts_list = sel.find('optioscript.jsn');
   opts_list.sort(function (a, b) {
      return $(a).text() > $(b).text() ? 1 : -1;
   });
   sel.html('').append(opts_list);
   sel.val(selected); // set cached selected value
}

//     ABOUT YBR MODAL

document.getElementById("open-modal-2").addEventListener("click", function () {
   document.getElementById("overlay-2").style.display = "block"
})

document.getElementById("close-modal-2").addEventListener("click", function () {
   document.getElementById("overlay-2").style.display = "none"
})