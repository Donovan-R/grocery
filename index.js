// ****** SELECTIONNER LES ELEMENTS HTML **********

// option d'édition

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
  const value = articleToAdd.value;
  const id = new Date().getTime().toString();
  if (!value) {
    displayAlert("veuillez saisir une donnée valable", "lightcoral");
  } else if (value && !editFlag) {
    createListItem(id, value);
    addToLocalStorage(id, value);
    displayAlert("l'article a bien été ajouté", "lightgreen");
    clearBtn.classList.add("showMe");
    setBackToDefault();
  } else {
    displayAlert("l'article a été modifié", "lightgreen");
    editElement.textContent = value;
    editLocalStorage(editId, value);
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
  localStorage.removeItem("list");
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
  articleToAdd.focus();
}

// supprimer un item
function deleteItem(e) {
  const articleAdded = document.querySelectorAll(".listItem");
  const toDelete = e.currentTarget.parentElement.parentElement;
  removeFromLocalStorage(toDelete.dataset.id);
  toDelete.remove();
  displayAlert("l'article a bien été enlevé", "lightcoral");
  if (articleAdded.length - 1 === 0) {
    clearBtn.classList.remove("showMe");
  }
  setBackToDefault();
}
// éditer un item
function editItem(e) {
  const toEdit = e.currentTarget.parentElement.parentElement;
  editFlag = true;
  editElement = e.currentTarget.parentElement.parentElement.firstChild;
  editId = toEdit.dataset.id;
  articleToAdd.value = editElement.textContent;
  articleToAdd.focus();
  displayAlert("l'article peut être modifié", "lightblue");
  submit.textContent = "modifier";
}

// ****** LOCAL STORAGE **********

function getLocalStorage() {
  const list = localStorage.getItem("list");
  if (list === null || list === undefined) {
    return [];
  } else {
    return JSON.parse(list);
  }
}

function addToLocalStorage(id, value) {
  const items = getLocalStorage();
  const item = { id, value };
  items.push(item);
  localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  const items = getLocalStorage();
  const out = items.filter((item) => item.id !== id);
  localStorage.setItem("list", JSON.stringify(out));
}

function editLocalStorage(id, value) {
  const items = getLocalStorage();
  const newItems = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(newItems));
}

// ****** METTRE EN PLACE LES ITEMS **********
// récupérer la liste dans le localStorage ou en créer une vide
function setupItems() {}
