const bookForm = document.querySelector("#bookForm");

const bookCont = document.querySelector("#bookContainer");

const searchBar = document.querySelector("#search");

const searchBtn = document.querySelector("#searchBtn");

const deleteAllBtn = document.querySelector("#delete_All_Btn");

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
  createBookCards("NA");
  bookForm.reset();
});

function createBookCards(searchedBooks) {
  let getBooks = JSON.parse(localStorage.getItem("bookinfo")) || []; // Hente data
  bookCont.innerHTML = "";
  if (searchedBooks !== "NA") {
    getBooks = getBooks.filter((book) => book.bookName.includes(searchedBooks));
  }
  getBooks.forEach((bookI) => {
    // if (bookI.bookName == searchedBooks || searchedBooks == "NA")
    {
      // Lage book-card
      const containDiv = document.createElement("div");
      containDiv.classList.add("book-card");
      // Lage tittel, forfatter, sjanger og rating elementene
      const bookNameH2 = document.createElement("h2");
      const booktxt = document.createTextNode(bookI.bookName);
      bookNameH2.append(booktxt);
      //
      const author = document.createElement("p");
      const authortxt = document.createTextNode("Forfatter: " + bookI.author);
      author.append(authortxt);
      //
      const genre = document.createElement("p");
      const genretxt = document.createTextNode("Sjanger: " + bookI.genre);
      genre.append(genretxt);
      //
      const pages = document.createElement("p");
      const pagestxt = document.createTextNode("Antall sider: " + bookI.pages);
      pages.append(pagestxt);
      //
      const rating = document.createElement("p");
      const ratingtxt = document.createTextNode("Rating: " + bookI.rating);
      rating.append(ratingtxt);
      // Sletteknapp
      const deleteBtn = document.createElement("Button");
      deleteBtn.classList.add("delete_btn");
      deleteBtn.textContent = "Slett denne boken";
      deleteBtn.addEventListener("click", () => {
        deleteBook(bookI.bookName);
      });

      const img = document.createElement("img");

      containDiv.appendChild(img);
      containDiv.appendChild(bookNameH2);
      containDiv.appendChild(author);
      containDiv.appendChild(genre);
      containDiv.appendChild(pages);
      containDiv.appendChild(rating);
      containDiv.appendChild(deleteBtn);

      bookCont.appendChild(containDiv);
    }
  });
}

createBookCards("NA");

function deleteBook(bookName) {
  let getBooks = JSON.parse(localStorage.getItem("bookinfo")) || [];
  // Jeg setter, for enkelhetens skyld, slette id-en til det samme som tittelen som blir ført inn, selv om det kan føre til duplikater og andre misforståelser.
  getBooks = getBooks.filter((book) => book.bookName !== bookName);
  if (confirm("Vil du slette denne boken??")) {
    localStorage.setItem("bookinfo", JSON.stringify(getBooks));
    createBookCards("NA");
  }
}

searchBtn.addEventListener("click", (e) => {
  // let searchValue = ;
  createBookCards(searchBar.value);
});

deleteAllBtn.addEventListener("click", (e) => {
  if (confirm("Vil du slette alle bøkene??")) {
    localStorage.removeItem("bookinfo");
    createBookCards("NA");
  }
});
