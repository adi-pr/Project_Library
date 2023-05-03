function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

Book.prototype.toggleReadStatus = function() {
    this.isRead = !this.isRead;
}

Book.prototype.getReadButtonText = function() {
    return this.isRead ? "Book has been read" : "Book has not been read";
}

function Library() {
    this.books = [];
}

Library.prototype.addBook = function(book) {
    this.books.push(book);
}

Library.prototype.removeBook = function(book) {
    const index = this.books.indexOf(book);
    if (index !== -1) {
        this.books.splice(index, 1);
    }
}

Library.prototype.displayBooks = function() {
    const cardContainer = document.querySelector(".card-container");
    cardContainer.innerHTML = "";

    this.books.forEach((book) => {
        const card = document.createElement('div')
        card.classList.add('card')

        const bookTitle = document.createElement('h2')
        bookTitle.textContent = `"${book.title}"`

        const bookAuthor = document.createElement('p')
        bookAuthor.textContent = `by ${book.author}`

        const pagesInBook = document.createElement('p')
        pagesInBook.textContent = `${book.pages} pages`

        const isReadButton = document.createElement('button')
        isReadButton.classList.add('is-read-button')
        isReadButton.innerText = book.getReadButtonText();

        isReadButton.addEventListener("click", () => {
            book.toggleReadStatus();
            isReadButton.innerText = book.getReadButtonText();
        })

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button')
        removeButton.innerText = "Remove"

        removeButton.addEventListener("click", () => {
            cardContainer.removeChild(card);
            this.removeBook(book);
        });

        card.appendChild(bookTitle)
        card.appendChild(bookAuthor)
        card.appendChild(pagesInBook)
        card.appendChild(isReadButton)
        card.appendChild(removeButton)
        cardContainer.appendChild(card)
    })
}

const library = new Library();

function addBookToLibrary() {
    bookForm.style.display = 'block';
}

const bookForm = document.getElementById('form-container')
const form = document.getElementById('addBookForm')

bookForm, addEventListener("submit", function (event) {
    event.preventDefault()

    const titleInput = document.getElementById('title').value
    const authorInput = document.getElementById('author').value
    const pagesInput = document.getElementById('pages').value
    const isReadInput = document.getElementById('isRead').checked

    const book = new Book(titleInput, authorInput, pagesInput, isReadInput)
    library.addBook(book);
    library.displayBooks();
    bookForm.style.display = 'none';
})

bookForm.addEventListener('click', () => {
    bookForm.style.display = 'none'
})

form.addEventListener('click', (event) => {
    event.stopPropagation();
});
