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

function addBookToLibrary(book) {
  library.push(book);
}

function displayBook(book) {
  let card = document.createElement("div");
  card.classList.add("book-card");
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
  read.innerText = "Finished reading: " + book.read;
  card.appendChild(read);
  
  document.querySelector(".container").appendChild(card);
}

document.querySelector(".add-book").addEventListener("click", (e) => {
  document.querySelector(".new-book").classList.remove("hidden");
});

document.querySelector(".submit-new-book").addEventListener("click", (e) => {
  let values = [];
  document.querySelectorAll(".normal-input").forEach((e) => {
    values.push(e.value);
  });
  values.push(document.querySelector("input[type=radio]:checked").value);

  displayBook(new Book(values[0], values[1], values[2], values[3]));
  
  document.querySelector(".new-book").classList.add("hidden");
});

let a = new Book("Wayfarers", "Becky Chambers", "250", true);
console.log(a.info())

displayBook(a);
displayBook(a);