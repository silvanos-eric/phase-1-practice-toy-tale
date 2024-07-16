let addToy = false;

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
  const toyCollectionEl = document.querySelector("div#toy-collection");
  const cardsFragment = document.createDocumentFragment();

  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((data) => {
      for (toy of data) {
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
        cardsFragment.appendChild(cardEl);
      }
    })
    .then(() => toyCollectionEl.appendChild(cardsFragment));
});
