"use strict";

let getTagsSideBar = document.querySelectorAll(".post-sidebar__tag");

let getTagsPost = document.querySelectorAll(".post__tag");


getTagsSideBar.forEach(function (tag) {
  if (tag.text === "Показати усі пости") {
    tag.classList.add("content-filter__item--all");

    getTagsSideBar[0].before(tag);
  }
});

getTagsPost.forEach(function (tag) {
  if (tag.text === "Показати усі пости") {
    tag.classList.add("content-filter__item--all");

    getTagsPost[0].before(tag);
  }
});