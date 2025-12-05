const myLibrary = [];

function Book(author,title, price,pages) {
  this.id = crypto.randomUUID();
  this.author= author;
  this.title= title;
  this.price = price;
  this.pages = pages;
}

function addBookToLibrary() {
  const newBook = new Book (author,title,price,pages);
  myLibrary.push(newBook);
  displayLibrary()
}
function displayLibrary() {
  const container = document.getElementById("libraryContainer");
  container.innerHTML = ""; // Clear previous DOM elements

  library.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.isRead ? "Yes" : "No"}</p>
      <button class="toggle-btn">Toggle Read</button>
      <button class="remove-btn">Remove</button>
    `;

    // Toggle Read Button Handler
    card.querySelector(".toggle-btn").addEventListener("click", () => {
      const bookObj = library.find(b => b.id === book.id);
      bookObj.toggleRead();
      displayLibrary();
    });

    // Remove Book Button Handler
    card.querySelector(".remove-btn").addEventListener("click", () => {
      const index = library.findIndex(b => b.id === book.id);
      library.splice(index, 1);
      displayLibrary();
    });

    container.appendChild(card);
  });
}

// --------------------
// UI Elements
// --------------------
const newBookBtn = document.getElementById("newBookBtn");
const dialog = document.getElementById("bookDialog");
const cancelBtn = document.getElementById("cancelBtn");
const bookForm = document.getElementById("bookForm");

const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const pagesInput = document.getElementById("pagesInput");
const readInput = document.getElementById("readInput");

// --------------------
// Form + Dialog Logic
// --------------------
newBookBtn.addEventListener("click", () => dialog.showModal());
cancelBtn.addEventListener("click", () => dialog.close());

bookForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents page reload / server submission

  addBookToLibrary(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.checked
  );

  bookForm.reset();
  dialog.close();
});

// --------------------
// Example Books
// --------------------
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("Dune", "Frank Herbert", 412, false);

