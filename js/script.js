let bookList = [];
const submitBut = document.querySelector('.user-input-submit');
const form = document.querySelectorAll('.form-input');
const pageBookList = document.querySelector('.book-list');

function insertContent() {
  bookList.forEach((e) => {
    pageBookList.innerHTML += `
         <article class="book">
         <h4 class="book-name">${e.title}</h4>
         <p class="book-writer">${e.author}</p>
         <button class="remove ${bookList.indexOf(e)}" type="submit">Remove</button>
         <hr>
     </article>
         `;
  });
}

if (!localStorage.getItem('booklist')) {
  updateStorage();
} else {
  updateUserInterface();
}

function updateStorage() {
  const stringfiedBL = JSON.stringify(bookList);
  localStorage.setItem('booklist', stringfiedBL);
}

function updateUserInterface() {
  const retrievedData = localStorage.getItem('booklist');
  bookList = JSON.parse(retrievedData);
  insertContent();
}

function onSubmition() {
  const title = form[0].value;
  const author = form[1].value;
  const input = {
    title: title,
    author: author,
  };
  bookList.push(input);
  pageBookList.innerHTML = '';
  insertContent();
  updateStorage();
}

submitBut.addEventListener('click', onSubmition);

// "Remove" button:

//     The correct book is removed from the collection.
//     The correct book dissapears from the page.
