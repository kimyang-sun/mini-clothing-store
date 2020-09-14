"use strict";

// JSON 파일에서 아이템 가져오기
function loadItems() {
  return fetch("data/data.json")
    .then(response => response.json())
    .then(json => json.items)
    .catch(console.log);
}

// 가져온 아이템 보여주기 (밑에 html 문자열 만든것을 보여주기)
function displayItems(items) {
  const container = document.querySelector(".item-list");
  //const html = items.map(item => createHTMLString(item)).join("");
  //console.log(html);
  container.innerHTML = items.map(item => createHTMLString(item)).join("");
}

// 가져온 아이템으로 html 문자열 만들기
function createHTMLString(item) {
  return `
  <li class="item">
    <a href="#">
      <img src="${item.image}" alt="${item.type}" / class="item-thumbnail">
      <span class="item-name">${item.gender}, ${item.size}</span>
    </a>
  </li>
  `;
}

// 카테고리 메뉴 버튼 클릭 함수
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;
  if (key == null || value == null) {
    return;
  }

  const filltered = items.filter(item => item[key] === value);
  displayItems(filltered);
}

// 이벤트 등록하기 (카테고리 메뉴 클릭했을때 카테고리에 맞게 분류)
function setEventListener(items) {
  const logo = document.querySelector(".top-logo");
  const buttons = document.querySelector(".category-menu");

  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", event => onButtonClick(event, items));
}

// main
loadItems()
  .then(items => {
    console.log(items);
    displayItems(items);
    setEventListener(items);
  })
  .catch(console.log);
