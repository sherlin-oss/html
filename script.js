var popupOverlay = document.getElementById("popup-overlay");

var popupBox = document.getElementById("popup-box");

var addPopupButton = document.getElementById("add-popup-button");

var cancelPopup = document.getElementById("cancel-popup");

var addBookButton = document.getElementById("add-book");

var bookContainer = document.getElementById("book-container");

var bookTitleInput = document.getElementById("book-title-input");

var bookAuthorInput = document.getElementById("book-author-input");

var bookDescriptionInput =
    document.getElementById("book-description-input");

var searchInput = document.getElementById("search-input");



/* Open Popup */

addPopupButton.addEventListener("click", function () {

    popupOverlay.style.display = "block";

    popupBox.style.display = "block";

});



/* Close Popup */

cancelPopup.addEventListener("click", function (event) {

    event.preventDefault();

    popupOverlay.style.display = "none";

    popupBox.style.display = "none";

});



/* Add Book */

addBookButton.addEventListener("click", function (event) {

    event.preventDefault();


    var title = bookTitleInput.value.trim();

    var author = bookAuthorInput.value.trim();

    var description = bookDescriptionInput.value.trim();


    if (title === "" || author === "" || description === "") {

        alert("Please fill all the details.");

        return;

    }


    var div = document.createElement("div");

    div.setAttribute("class", "book-container");


    div.innerHTML = `

        <h2>${title}</h2>

        <h4>${author}</h4>

        <p>${description}</p>

        <p class="status available">Available</p>

        <button class="borrow-button"
                onclick="borrowBook(this)">
            Borrow
        </button>

        <button class="delete-button"
                onclick="deleteBook(this)">
            Delete
        </button>

    `;


    bookContainer.append(div);


    /* Clear inputs */

    bookTitleInput.value = "";

    bookAuthorInput.value = "";

    bookDescriptionInput.value = "";


    /* Close popup */

    popupOverlay.style.display = "none";

    popupBox.style.display = "none";

});



/* Delete Book */

function deleteBook(button) {

    var book = button.parentElement;

    book.remove();

}



/* Borrow / Return Book */

function borrowBook(button) {

    var book = button.parentElement;

    var status = book.querySelector(".status");


    if (status.classList.contains("available")) {

        status.textContent = "Borrowed";

        status.classList.remove("available");

        status.classList.add("borrowed");

        button.textContent = "Return";

    }

    else {

        status.textContent = "Available";

        status.classList.remove("borrowed");

        status.classList.add("available");

        button.textContent = "Borrow";

    }

}



/* Search Book */

searchInput.addEventListener("input", function () {

    var searchText = searchInput.value.toLowerCase();

    var books =
        document.querySelectorAll(".book-container");


    books.forEach(function (book) {

        var title =
            book.querySelector("h2").textContent.toLowerCase();

        var author =
            book.querySelector("h4").textContent.toLowerCase();


        if (
            title.includes(searchText) ||
            author.includes(searchText)
        ) {

            book.style.display = "inline-block";

        }

        else {

            book.style.display = "none";

        }

    });

});