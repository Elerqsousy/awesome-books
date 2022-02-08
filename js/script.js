let bookList = [];
const formBook = document.querySelector('#book-form');
const form = document.querySelectorAll('.form-input');
const pageBookList = document.querySelector('.book-list');

function updateStorage() {
  const stringfiedBL = JSON.stringify(bookList);
  localStorage.setItem('booklist', stringfiedBL);
}

function insertContent() {
  bookList.forEach((book) => {
    pageBookList.innerHTML += `
         <article class="book">
         <h4 class="book-name">${book.title}</h4>
         <p class="book-writer">${book.author}</p>
         <button class="remove-btn" id=${book.id} type="button" >Remove</button>
         <hr>
     </article>
         `;
  });
  const removeBtn = document.querySelectorAll('.remove-btn');
  removeBtn.forEach((button) => {
    button.addEventListener('click', () => {
      const newBookList = bookList.filter((book) => book.id.toString() !== button.id);
      bookList = newBookList;
      pageBookList.innerHTML = '';
      insertContent();
      updateStorage();
    });
  });
}

function updateUserInterface() {
  const retrievedData = localStorage.getItem('booklist');
  bookList = JSON.parse(retrievedData);
  insertContent();
}

if (!localStorage.getItem('booklist')) {
  updateStorage();
} else {
  updateUserInterface();
}

// random id
const randomId = () => Math.round(Math.random() * 10000); // random id function

function onSubmition(e) {
  e.preventDefault();
  const title = form[0].value;
  const author = form[1].value;
  const input = {
    id: randomId(),
    title,
    author,
  };
  bookList = bookList.concat(input);
  pageBookList.innerHTML = '';
  insertContent();
  updateStorage();
}

formBook.addEventListener('submit', onSubmition);
