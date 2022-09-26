//Selector
const bBtn = document.getElementById('btnForm');
const bList = document.querySelector(".bookList")
//Selector for input
const bName = document.querySelector(".book_name");
const bAuthor = document.querySelector(".book_author");
const bPage = document.querySelector(".book_page");
//input submit button
const submitBtn = document.querySelector(".submit-btn");

//Event Listener
document.addEventListener('DOMContentLoaded', getBooks);
bBtn.addEventListener('click', () =>{
    const form = document.getElementById('bookForm');

    if(form.style.visibility === 'hidden') {
        form.style.visibility = 'visible';
    } else {
        form.style.visibility = 'hidden';
    }
});

submitBtn.addEventListener("click", addBookToLibrary);
bList.addEventListener('click', deleteCheck);

//Funtions
function addBookToLibrary(event){

    event.preventDefault();

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const newBook = document.createElement('li');
    newBook.innerText = 'Title: ' + bName.value + ' | Author: ' + bAuthor.value + ' | Pages: ' + bPage.value;
    newBook.classList.add('list-book');
    bookDiv.appendChild(newBook);

    const checkedButton = document.createElement('button');
    checkedButton.innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>';
    checkedButton.classList.add("check-btn");
    bookDiv.appendChild(checkedButton);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    deleteBtn.classList.add("delete-btn");
    bookDiv.appendChild(deleteBtn);

    bList.appendChild(bookDiv);

    bName.value = "";
    bAuthor.value = "";
    bPage.value = "";
}

function deleteCheck(e){
    const item = e.target;

    if(item.classList[0] === "delete-btn"){
        const Blist = item.parentElement;
        Blist.classList.add("fall");
        removeLocalBooks(bList);
        Blist.addEventListener('transitionend', function(){
            Blist.remove();
        });
    }

    if(item.classList[0] === "check-btn"){
        const Blist = item.parentElement;
        Blist.classList.toggle("completed");
    }
}

function saveLocalBook(bList) {
    let books;

    if(localStorage.getItem("books") === null){
        books=[];
    } else {
        books = JSON.parse(localStorage.getItem("books"));
    }
    books.push(bList);
    localStorage.setItem("books", JSON.stringify(books));
}

function getBooks(){
    let books;

    if(localStorage.getItem("books") === null){
        books=[];
    } else {
        books = JSON.parse(localStorage.getItem("books"));
    }

    books.forEach(function(list){

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const newBook = document.createElement('li');
    newBook.innerText = list;
    newBook.classList.add('list-book');
    bookDiv.appendChild(newBook);

    const checkedButton = document.createElement('button');
    checkedButton.innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>';
    checkedButton.classList.add("check-btn");
    bookDiv.appendChild(checkedButton);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    deleteBtn.classList.add("delete-btn");
    bookDiv.appendChild(deleteBtn);

    bList.appendChild(bookDiv);
    });
}

function removeLocalBooks(bList){
    let books;

    if(localStorage.getItem("books") === null){
        books=[];
    } else {
        books = JSON.parse(localStorage.getItem("books"));
    }
    const bookIndex = bList.children[0].innerText;
    books.splice(books.indexOf(bookIndex), 1);
}