let myLibrary = []
const cardContainer = document.querySelector(".card-container")
const bookForm = document.getElementById('form-container')
const form = document.getElementById('addBookForm')

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

function addBookToLibrary() {
    bookForm.style.display = 'block';
}

function displayBooks(myLibrary) {
    cardContainer.innerHTML = ""
    myLibrary.forEach((book) => {
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

        if (book.isRead === true) {
            isReadButton.innerText = "Book has been read"
        } else {
            isReadButton.innerText = "Book has not been read"
        }

        isReadButton.addEventListener("click", () => {
            book.isRead = !book.isRead
            isReadButton.innerText = book.isRead ? "Book has been read" : "Book has not been read";
        })



        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button')
        removeButton.innerText = "Remove"

        removeButton.addEventListener("click", () => {
            cardContainer.removeChild(card);
            
            const index = myLibrary.indexOf(book);
            if (index !== -1) {
              myLibrary.splice(index, 1);
            }
          });

        card.appendChild(bookTitle)
        card.appendChild(bookAuthor)
        card.appendChild(pagesInBook)
        card.appendChild(isReadButton)
        card.appendChild(removeButton)
        cardContainer.appendChild(card)
    })
}

bookForm, addEventListener("submit", function (event) {
    event.preventDefault()

    const titleInput = document.getElementById('title').value
    const authorInput = document.getElementById('author').value
    const pagesInput = document.getElementById('pages').value
    const isReadInput = document.getElementById('isRead').checked

    const book = new Book(titleInput, authorInput, pagesInput, isReadInput)
    myLibrary.push(book)
    displayBooks(myLibrary)
    bookForm.style.display = 'none';
})

bookForm.addEventListener('click', () => {
    bookForm.style.display = 'none'
})

form.addEventListener('click', (event) => {
    event.stopPropagation();
  });