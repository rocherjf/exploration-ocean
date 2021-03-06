const ocean = document.getElementById('ocean');

window.onscroll = function () { majProfondeur() };
window.onload = function () { initOcean() };

let elements = [];
let textes = [];

let urlElementOcean = "element_marins.json";
let urlTexteOcean = 'textes.json';

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

    elementAAjouter =
      `<div class="container-figure" style="--grid-row: ${element.gridRow};--grid-column: ${element.gridColumn};--grid-row-small: ${element.gridRowSmall};--grid-column-small: ${element.gridColumnSmall};" id="${element.id}-wrapper">
        <figure class="wrapper-animal"   onclick="afficherInfo('${element.id}')" >
          <img class="animal-img" src="img/${element.img}" alt="Image d'un ${element.nom}">
          <figcaption id="${element.id}-titre" class="animal-legende">${element.nom}</figcaption>
        </figure>
        <p class="animal-description" id="${element.id}-info">${description}</p>
      </div>`;



    ocean.innerHTML += elementAAjouter;
  })

}

function initialiserTextes() {

  textes.forEach(texte => {
    elementAAjouter =
      `<div class="wrapper-texte"  id="${texte.id}-wrapper"  style="grid-row: ${texte.gridRow};grid-column: ${texte.gridColumn};">
      <span>${texte.description}</span>
    </div>`;
    ocean.innerHTML += elementAAjouter;

  })

}

function majProfondeur() {

  let e = Math.floor(window.scrollY / 50 * 3 - 12);

  // changement d'??chelle en fonction de la profondeur
  if (e >= 1500) {
    e = Math.min(10925, Math.floor(3500 + (e - 1500) * 5.3085));
  }
  if (e > 1000 && e < 1500) {
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
      text = text + ' <br> Zone Bathyp??lagique (1000 - 4000m)';
    }

    if (e >= 4000 && e < 10000) {
      text = text + ' <br> Zone Abyssop??lagique (4000m - cro??te oc??anique)';
    }

    if (e >= 10000) {
      text = text + ' <br> Zone Hadop??lagique (les profondeurs des failles oc??aniques)';
    }

    document.querySelector("#profondeur-texte").innerHTML = text;

  }

}


function afficherInfo(idElement) {
  // masquer la ligne de profondeur pour mieux visualiser les infos
  document.querySelector("#profondeur").hidden = true;
  document.querySelector("#profondeur-texte-wrapper").hidden = true;

  // afficher la fen??tre modale
  Swal.fire({
    title: document.querySelector(`#${idElement}-titre`).innerHTML,
    html: document.querySelector(`#${idElement}-info`).innerHTML,
  }).then(() => afficherIndicateurProfondfeur());

}


function afficherIndicateurProfondfeur() {
  document.querySelector("#profondeur").hidden = false;
  document.querySelector("#profondeur-texte-wrapper").hidden = false;
}
