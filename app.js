const bookForm = document.querySelector("#bookForm");

const bookCont = document.querySelector("#bookContainer");

const searchBar = document.querySelector("#search");

const searchBtn = document.querySelector("#searchBtn");

const deleteAllBtn = document.querySelector("#delete_All_Btn");

const sortSelecter = document.querySelector("#sortSelect");

// Funksjon som sjekker at den er fylt ut ordentlig
function isBookDataValid(data) {
  return Object.values(data).every((value) => value.trim() != "");
}

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookData = new FormData(bookForm); // lagrer form data til strings
  const data = Object.fromEntries(bookData.entries());

  if (!isBookDataValid(data)) {
    alert("Fyll ut alle feltene");
    return;
  }

  let bookArray = [];

  if (localStorage.getItem("bookinfo")) {
    // sjekk om bookinfo existerer
    const allBooks = JSON.parse(localStorage.getItem("bookinfo")); // hent info fra local storage
    allBooks.forEach((book) => {
      // loop gjennom info på local storage
      bookArray.push(book);
    });
    bookArray.push(data);
  } else {
    console.log("her?");
    bookArray.push(data);
  }
  console.log(bookArray);
  localStorage.setItem("bookinfo", JSON.stringify(bookArray));
  createBookCards("NA", sortSelecter.value);
  bookForm.reset();
});

function createBookCards(searchedBooks, sortBooks) {
  let getBooks = JSON.parse(localStorage.getItem("bookinfo")) || []; // Hente data
  bookCont.innerHTML = "";
  if (searchedBooks !== "NA") {
    getBooks = getBooks.filter((book) => book.bookName.includes(searchedBooks));
  }
  if (sortBooks === "titleAsc") {
    // Ternary-operator
    getBooks.sort((book1, book2) =>
      book1.bookName < book2.bookName
        ? -1
        : book1.bookName > book2.bookName
          ? 1
          : 0,
    );
  } else if (sortBooks === "titleDesc") {
    getBooks.sort((book1, book2) =>
      book1.bookName < book2.bookName
        ? 1
        : book1.bookName > book2.bookName
          ? -1
          : 0,
    );
  } else if (sortBooks === "ratingAsc") {
    getBooks.sort((book1, book2) =>
      book1.rating < book2.rating ? -1 : book1.rating > book2.rating ? 1 : 0,
    );
  } else if (sortBooks === "ratingDesc") {
    getBooks.sort((book1, book2) =>
      book1.rating < book2.rating ? 1 : book1.rating > book2.rating ? -1 : 0,
    );
  }

  getBooks.forEach((bookI) => {
    // Destructuring
    const { bookName, author, genre, pages, rating } = bookI;

    // Lage book-card
    const containDiv = document.createElement("div");
    containDiv.classList.add("book-card");
    // Lage tittel, forfatter, sjanger og rating elementene
    const bookNameH2 = document.createElement("h2");
    const booktxt = document.createTextNode(bookName);
    bookNameH2.append(booktxt);
    //
    const authorP = document.createElement("p");
    const authortxt = document.createTextNode("Forfatter: " + author);
    authorP.append(authortxt);
    //
    const genreP = document.createElement("p");
    const genretxt = document.createTextNode("Sjanger: " + genre);
    genreP.append(genretxt);
    //
    const pagesP = document.createElement("p");
    const pagestxt = document.createTextNode("Antall sider: " + pages);
    pagesP.append(pagestxt);
    //
    const ratingP = document.createElement("p");
    const ratingtxt = document.createTextNode("Rating: " + rating);
    ratingP.append(ratingtxt);
    // Sletteknapp
    const deleteBtn = document.createElement("Button");
    deleteBtn.classList.add("delete_btn");
    deleteBtn.textContent = "Slett denne boken";
    deleteBtn.addEventListener("click", () => {
      deleteBook(bookName);
    });

    const img = document.createElement("img");

    containDiv.appendChild(img);
    containDiv.appendChild(bookNameH2);
    containDiv.appendChild(authorP);
    containDiv.appendChild(genreP);
    containDiv.appendChild(pagesP);
    containDiv.appendChild(ratingP);
    containDiv.appendChild(deleteBtn);

    bookCont.appendChild(containDiv);
  });
}

createBookCards("NA", sortSelecter.value);

function deleteBook(bookName) {
  let getBooks = JSON.parse(localStorage.getItem("bookinfo")) || [];
  // Jeg setter, for enkelhetens skyld, slette id-en til det samme som tittelen som blir ført inn, selv om det kan føre til duplikater og andre misforståelser.
  getBooks = getBooks.filter((book) => book.bookName !== bookName);
  if (confirm("Vil du slette denne boken??")) {
    localStorage.setItem("bookinfo", JSON.stringify(getBooks));
    createBookCards("NA", sortSelecter.value);
  }
}

searchBtn.addEventListener("click", (e) => {
  // let searchValue = ;
  createBookCards(searchBar.value, sortSelecter.value);
});

sortSelecter.addEventListener("change", (e) => {
  createBookCards("NA", sortSelecter.value);
});

deleteAllBtn.addEventListener("click", (e) => {
  if (confirm("Vil du slette alle bøkene??")) {
    localStorage.removeItem("bookinfo");
    createBookCards("NA", sortSelecter.value);
  }
});
