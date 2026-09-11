const bookForm = document.querySelector("#bookForm");

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new formData(bookForm); // lagrer form data til strings
  const data = Object.fromEntries(formData.entries());

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
