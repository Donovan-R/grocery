// ****** SELECTIONNER LES ELEMENTS HTML **********

// option d'édition
const date = new Date();
const alert = document.querySelector(".alert");
const submit = document.getElementById("submit");
const articleToAdd = document.getElementById("basket");
const placeHolder = articleToAdd.getAttribute("placeholder");
const list = document.querySelector(".listDetails");
const clearBtn = document.querySelector(".listClear");
let editFlag = false;
let editId = "";
let editElement = "article";

// charger les items (DOMContentLoaded)
window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM entièrement chargé et analysé");
});

// ****** EVENT LISTENERS **********
// soumettre le formulaire

submit.addEventListener("click", addItem);

function addItem(e) {
  e.preventDefault();
  let id = date.getTime().toString();
  let value = articleToAdd.value;
  if (!value) {
    displayAlert("veuillez saisir une donnée valable", "lightcoral");
  } else if (value && !editFlag) {
    createListItem(id, value);
    // addToLocalStorage(id, value);
    displayAlert("l'article a bien été ajouté", "lightgreen");
    clearBtn.classList.add("showMe");
    setBackToDefault();
  } else {
    displayAlert("l'article a été modifié", "lightgreen");
    editElement.textContent = value;
    setBackToDefault();
  }
}

function createListItem(id, value) {
  // create basket
  const element = document.createElement("article");
  element.classList.add("listItem");
  element.dataset.id = id;
  element.innerHTML = `<p class="value">${value}</p>
            <div class="listBtns">
              <button type="button" class="editBtn">+
              </button>
              <button type="button" class="deleteBtn">-
              </button>
            </div>`;
  // fin basket
  //   create button basket
  // delete one
  const deleteBtn = element.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", deleteItem);
  // edit one
  const editBtn = element.querySelector(".editBtn");
  editBtn.addEventListener("click", editItem);

  list.appendChild(element);
}

// supprimer tous les items

//   delete all

function clearItems() {
  const articleAdded = document.querySelectorAll(".listItem");
  if (articleAdded.length > 0) {
    articleAdded.forEach(function (article) {
      article.remove();
    });
  }
  clearBtn.classList.remove("showMe");
  displayAlert("le panier a été vidé", "lightcoral");
  clearBtn.classList.remove("showMe");
  setBackToDefault();
}
clearBtn.addEventListener("click", clearItems);

//   fin delete all

// ****** FONCTIONS **********
// ajouter un item en haut de page

// afficher l'alerte
function displayAlert(text, action) {
  alert.innerHTML = `<h4 class="alertMessage">${text}<h4>`;
  alert.style.background = action;
  setTimeout(() => {
    alert.innerHTML = "";
    alert.style.background = "transparent";
  }, 1000);
}

// supprimer l'alerte

function setBackToDefault() {
  articleToAdd.value = "";
  editFlag = false;
  editId = "";
  submit.textContent = "ajouter";
  // alert.style.background = "transparent";
  articleToAdd.focus();
}

// supprimer un item
function deleteItem(e) {
  const articleAdded = document.querySelectorAll(".listItem");
  e.currentTarget.parentElement.parentElement.remove();

  displayAlert("l'article a bien été enlevé", "lightcoral");
  if (articleAdded.length - 1 === 0) {
    clearBtn.classList.remove("showMe");
  }
  setBackToDefault();
}
// éditer un item
function editItem(e) {
  editFlag = true;
  editElement = e.currentTarget.parentElement.parentElement.firstChild;
  // editId=
  articleToAdd.value =
    e.currentTarget.parentElement.parentElement.firstChild.textContent;
  articleToAdd.focus();
  displayAlert("l'article peut être modifié", "lightblue");
  submit.textContent = "modifier";
}

// ****** LOCAL STORAGE **********

function getLocalStorage() {
  const list = localStorage.getItem("list");
  if (list === undefined) {
    return [];
  } else {
    JSON.parse(list);
  }
}

function addToLocalStorage() {
  const items = getLocalStorage();
  const item = { id, value };
  items.push(item);
  localStorage.setItem("list", items);
}

function removeFromLocalStorage(id) {}

function editLocalStorage(id, value) {}

function getLocalStorage() {}

// ****** METTRE EN PLACE LES ITEMS **********
// récupérer la liste dans le localStorage ou en créer une vide
function setupItems() {}
