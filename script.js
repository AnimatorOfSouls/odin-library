let library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
  return this.title + " by " + this.author + ", " + this.pages + " pages, " + (this.read ? "read" : "not read yet");
}

function makeCardButtons() {
  let buttons = document.createElement("div");
  buttons.classList.add("buttons");

  let readButton = document.createElement("button");
  readButton.innerText = "Toggle Read";
  readButton.classList.add("read");
  readButton.addEventListener("click", (e) => {
    let bookCard = e.target.parentElement.parentElement;
    let bookCardText = bookCard.querySelector("p.read-status");
    let book = library[bookCard.getAttribute("book-id")];
    if (book.read) {
      book.read = false;
      bookCardText.innerText = "Not finished reading";
    } else {
      book.read = true;
      bookCardText.innerText = "Finished reading";
    }
  });
  buttons.appendChild(readButton);

  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", (e) => {
    let bookCard = e.target.parentElement.parentElement;
    library[bookCard.getAttribute("book-id")] = null;
    bookCard.remove();
  });
  buttons.appendChild(deleteButton);

  return buttons;
}

function displayBook(book) {
  let card = document.createElement("div");
  card.classList.add("book-card");
  card.setAttribute("book-id", library.length-1);
  let title = document.createElement("h2");
  title.innerText = book.title;
  card.appendChild(title);
  let author = document.createElement("em");
  author.innerText = book.author;
  card.appendChild(author);
  let pages = document.createElement("p");
  pages.innerText = "Length: " + book.pages + " pages";
  card.appendChild(pages);
  let read = document.createElement("p");
  read.innerText = book.read ? "Finished reading" : "Not finished reading";
  read.classList.add("read-status");
  card.appendChild(read);

  card.appendChild(makeCardButtons());
  
  document.querySelector(".container").appendChild(card);
}

function addBookToLibrary(book) {
  library.push(book);
  displayBook(book);
}



document.querySelector(".add-book").addEventListener("click", (e) => {
  document.querySelector(".new-book").classList.remove("hidden");
});

document.querySelector(".submit-new-book").addEventListener("click", (e) => {
  let values = [];
  document.querySelectorAll(".normal-input").forEach((e) => {
    values.push(e.value);
    e.value = "";
  });
  let radio = document.querySelector("input[type=radio]:checked");
  values.push(radio.value);
  radio.checked = false;

  let book = new Book(values[0], values[1], values[2], values[3]);
  library.push(book);
  addBookToLibrary(book);
  
  document.querySelector(".new-book").classList.add("hidden");
});

document.querySelector(".cancel").addEventListener("click", (e) => {
  document.querySelector(".new-book").classList.add("hidden");
});



let example1 = new Book("Wayfarers", "Becky Chambers", "250", true);
let example2 = new Book("Mistborn", "Brandon Sanderson", "500", false);
addBookToLibrary(example1);
addBookToLibrary(example2);