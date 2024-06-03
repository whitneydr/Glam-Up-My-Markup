// Define each element as variables
const header = document.getElementsByTagName("header")[0];
const sections = document.getElementsByTagName("section");
const listItems = document.getElementsByTagName("li");
const gallery = document.getElementsByTagName("ul")[0];

// Add ids to elements
gallery.id = "gallery";

for (let i = 0; i < listItems.length; i++) {
  console.log(
    listItems[i].firstElementChild.textContent
      .toLowerCase()
      .split(",", 1)[0]
      .replace(/['\s]/g, "-")
  );
  let li = listItems[i];
  li.id = li.firstElementChild.textContent
    .toLowerCase()
    .split(",", 1)[0]
    .replace(/[\s']/g, "-");
}

// Create navigation arrows
let leftArrow = document.createElement("img");
leftArrow.src = "/images/arrow-back.svg";
leftArrow.id = "left-arrow";
leftArrow.classList = "arrow";
let rightArrow = document.createElement("img");
rightArrow.src = "/images/arrow-forward.svg";
rightArrow.id = "right-arrow";
rightArrow.classList = "arrow";
gallery.insertAdjacentElement("afterbegin", leftArrow);
gallery.insertAdjacentElement("beforeend", rightArrow);

let options = {
  root: document.querySelector("#gallery"),
  rootMargin: "0px",
  threshold: 1.0,
};

let callback = (entries, observer) => {
  let prevRatio;
  console.log("entries", entries);

  entries.forEach((entry) => {
    console.log(entry);
    console.log(entry.intersectionRatio);
    if (entry.intersectionRatio < 1) {
      leftArrow.style.display = "inline";
    } else if (entry.intersectionRatio == 1) {
      leftArrow.style.display = "none";
    }

    prevRatio = entry.intersectionRatio;
  });
};

let leftObserver = new IntersectionObserver(callback, options);
let firstPic = document.querySelector("#whitehaven-beach");
leftObserver.observe(firstPic);
let rightObserver = new IntersectionObserver(callback, options);
let lastPic = document.querySelector("#pink-sands-beach");
rightObserver.observe(lastPic);
