let addToy = false;

// Elements of interest
const toyCollectionEl = document.querySelector("div#toy-collection");
const toyCollectionFragment = document.createDocumentFragment();

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Make fetch request to get all the toy objects

  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then(createToyElements)
    .then(() => toyCollectionEl.appendChild(toyCollectionFragment));

  // Functionality to add a new toy
  const form = document.querySelector("form.add-toy-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const toyName = form.querySelector("input[name='name']");
    const toyImg = form.querySelector("input[name='image']");

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: toyName.value,
        image: toyImg.value,
        likes: 0,
      }),
    })
      .then((response) => response.json())
      .then(createToyElement)
      .then(() => toyCollectionEl.appendChild(toyCollectionFragment))
      .then(() => {
        toyName.value = "";
        toyImg.value = "";
      });
  });
});

// Utility functions
function createToyElements(toys) {
  for (toy of toys) {
    createToyElement(toy);
  }
}

function createToyElement(toy) {
  const cardEl = document.createElement("div");
  cardEl.classList.add("card");

  const h2 = document.createElement("h2");
  h2.textContent = toy.name;
  const img = document.createElement("img");
  img.setAttribute("src", toy.image);
  img.classList.add("toy-avatar");
  const p = document.createElement("p");
  p.textContent = toy.likes;
  const button = document.createElement("button");
  button.textContent = "Like ❤️";
  button.classList.add("like-btn");
  button.setAttribute("id", toy.id);

  cardEl.append(h2, img, p, button);
  toyCollectionFragment.appendChild(cardEl);
}
