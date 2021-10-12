const ocean = document.getElementById('ocean');

window.onscroll = function () { majProfondeur() };
window.onload = function () { initOcean() };
window.onclick = function (element) { detectionClic(element) };

// pas mis animal-info
var elementCliquable = ["animal-img", "animal-legende", "wrapper-animal"];

let elements = [];
let textes = [];


// Mode DEV
let urlElementOcean = "http://localhost:3000/static/element_marins.json";
let urlTexteOcean = "http://localhost:3000/static/textes.json";

// Mode Prod
// let urlElementOcean = "https://raw.githubusercontent.com/rocherjf/exploration-ocean/main/element_marins.json";
// let urlTexteOcean = 'https://raw.githubusercontent.com/rocherjf/exploration-ocean/main/textes.json';

function initOcean() {
  fetch(urlElementOcean)
    .then((res) => {
      return res.json();
    })
    .then((elementsFondMarin) => {
      elements = elementsFondMarin;
      initialiserElements();
    })
    .catch((err) => {
      console.error(err);
    });

    fetch(urlTexteOcean)
    .then((res) => {
      return res.json();
    })
    .then((textesFondMarin) => {
      textes = textesFondMarin;
      initialiserTextes();
    })
    .catch((err) => {
      console.error(err);
    });
}


function initialiserElements() {

  elements.forEach(element => {

    // construction de la description
    let description = element.descriptionPart1;

    if (element.descriptionPart2) {
      description += "<br><br>" + element.descriptionPart2;
    }
    if (element.descriptionPart3) {
      description += "<br><br>" + element.descriptionPart3;
    }

    /*elementAAjouter =
      `<div class="wrapper-animal"  id="${element.id}-wrapper"  onclick="afficherInfo('${element.id}-info')" style="grid-row: ${element.gridRow};grid-column: ${element.gridColumn};">
        <img alt="Image d'un ${element.nom}" class="animal-img" src="img/${element.img}">
        <div class="animal-legende">${element.nom}</div>
        <span class="animal-info" id="${element.id}-info">${description}</span>
      </div>`;*/

      /*elementAAjouter =
      `<div class="wrapper-animal"  id="${element.id}-wrapper"  onclick="afficherInfo('${element.id}-info')" style="grid-row: ${element.gridRow};grid-column: ${element.gridColumn};">
      <figure>
          <img class="animal-img" src="img/${element.img}" alt="Image d'un ${element.nom}">
          <figcaption class="animal-legende">${element.nom}</figcaption>
        </figure>
      </div>`;*/

      elementAAjouter =
      `<div class="container-figure" style="grid-row: ${element.gridRow};grid-column: ${element.gridColumn};">
        <figure class="wrapper-animal"  id="${element.id}-wrapper"  onclick="afficherInfo('${element.id}-info')" >
          <img class="animal-img" src="img/${element.img}" alt="Image d'un ${element.nom}">
          <figcaption class="animal-legende">${element.nom}</figcaption>
        </figure>
      </div>`;



    ocean.innerHTML += elementAAjouter;
  })

}

function initialiserTextes(){

  textes.forEach(texte => {
    elementAAjouter =
    `<div class="wrapper-texte"  id="${texte.id}-wrapper"  style="grid-row: ${texte.gridRow};grid-column: ${texte.gridColumn};">
      <span>${texte.description}</span>
    </div>`;
  ocean.innerHTML += elementAAjouter;

  })

}

function majProfondeur() {

  //let e = Math.floor(Math.min(10924, window.scrollY / 50 * 3 - 12));
  let e = Math.floor(window.scrollY / 50 * 3 - 12);

  // changement d'échelle en fonction de la profondeur
  if (e >= 1500) {
    console.log('ICI');
    e = Math.min(10925, Math.floor(3500 + (e - 1500) * 5.3085));
  }
  if (e > 1000 && e < 1500) {
    console.log('LA');
    e = e + (e - 1000) * 4;
  }

  if (e < 0) {
    document.querySelector("#profondeur").hidden = true;
    document.querySelector("#profondeur-texte-wrapper").hidden = true;

  } else {
    document.querySelector("#profondeur").hidden = false;
    document.querySelector("#profondeur-texte-wrapper").hidden = false;
    let text = e + ' METRES DE PROFONDEUR';


    if (e < 200) {
      text = text + ' <br> Zone Epipelagique (0 - 200m)';
    }

    if (e >= 200 && e < 1000) {
      text = text + ' <br> Zone Mesopelagique (200 - 1000m)';
    }
    if (e >= 1000 && e < 4000) {
      text = text + ' <br> Zone Bathypélagique (1000 - 4000m)';
    }

    if (e >= 4000 && e < 10000) {
      text = text + ' <br> Zone Abyssopélagique (4000m - croûte océanique)';
    }

    if (e >= 10000) {
      text = text + ' <br> Zone Hadopélagique (les profondeurs des failles océaniques)';
    }

    document.querySelector("#profondeur-texte").innerHTML = text;

  }

  masquerInfo();

}

// permet de cacher ttes les infos sauf si on clic sur une zone déjà cliquable 
// (cas traité dans une autre fonction)
function detectionClic(element) {

  if (!elementCliquable.includes(element.target.className)) {
    masquerInfo()
  }

}

function afficherInfo(idInfo) {
  // masquer la ligne de profondeur pour mieux visualiser les infos
  document.querySelector("#profondeur").hidden = true;
  document.querySelector("#profondeur-texte-wrapper").hidden = true;

  // masquer les autres infos
  masquerInfo();

  let info = document.getElementById(idInfo);
  info.classList.add("show");
}

function masquerInfo() {
  const popups = document.querySelectorAll(".animal-info.show");
  popups.forEach(function (info) {
    info.classList.remove("show");
  });
}