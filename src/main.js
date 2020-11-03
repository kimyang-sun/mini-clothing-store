"use strict";
// load items & display items
function loadItems() {
  return fetch("./data/data.json")
    .then(responsive => responsive.json())
    .then(json => json.items)
    .catch(new Error("Fetch Error"));
}

function displayItems(items) {
  const itemList = document.querySelector(".item__list");
  itemList.innerHTML = items.map(item => createHTML(item)).join("");
}

function createHTML(item) {
  return `
  <li class="item" data-value="${item.type}, ${item.color}, ${item.sex}, ${item.size}">
    <a href="#">
      <img src="${item.image}" alt="${item.type}" />
      <span class="item__name">${item.sex}, ${item.size}</span>
    </a>
  </li>
  `;
}

// category filter
function siblings(element) {
  return [...element.parentElement.children].filter(value => value != element);
}

function onButtonClick(event) {
  const button = event.target.closest(".category__btn");
  if (!button) return;
  selectedBtnCheck(button);

  const selected = document.querySelectorAll(".category__btn.selected");
  const selectedValues = [...selected].map(btn => btn.dataset.value);

  const items = document.querySelectorAll(".item");
  items.forEach(item => {
    const itemValues = item.dataset.value;
    const filtered = selectedValues.filter(value => itemValues.includes(value));
    if (filtered.length !== selected.length) {
      item.classList.add("invisible");
    } else {
      item.classList.remove("invisible");
    }
  });
}

function selectedBtnCheck(selector) {
  if (selector.classList.contains("selected")) {
    selector.classList.remove("selected");
  } else {
    siblings(selector).forEach(value => value.classList.remove("selected"));
    selector.classList.add("selected");
  }
}

function setEventListener() {
  const buttons = document.querySelector(".category__container");
  buttons.addEventListener("click", event => onButtonClick(event));
}

setEventListener();

// load
loadItems().then(items => {
  displayItems(items);
});
