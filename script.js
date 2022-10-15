//Selector
const bBtn = document.getElementById('btnForm');
const bList = document.querySelector(".bookList")
//Selector for input
const bName = document.querySelector(".book_name");
const bAuthor = document.querySelector(".book_author");
const bPage = document.querySelector(".book_page");
const bStatus = document.querySelector(".book_status");
//input submit button
const submitBtn = document.querySelector(".submit-btn");

//Event Listener
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

class Book {
    constructor(bName, bAuthor, bPage){
        this.bName = bName.value;
        this.bAuthor = bAuthor.value;
        this.bPage = bPage.value;
    }
}
let myLibrary = [];
let newBook;
//Funtions
function addBookToLibrary(){

    newBook = new Book(bName, bAuthor, bPage, bStatus);
    myLibrary.push(newBook);
    setData();
    render();
}

function render() {
    const display = document.getElementsByClassName('bookList');
    const books = document.querySelectorAll('.book');
    books.forEach(book => display.removeChild(book));

    for (let i=0; myLibrary.length; i ++){
        addBookToLibrary(myLibrary[i]);
    }
}

function createBook(item){

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.setAttribute('id', myLibrary.indexOf(item));

    const checkedButton = document.createElement('button');
    checkedButton.innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>';
    checkedButton.classList.add("check-btn");
    bookDiv.appendChild(checkedButton);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    deleteBtn.classList.add("delete-btn");
    bookDiv.appendChild(deleteBtn);

    bList.appendChild(bookDiv);

}

function deleteCheck(e){
    const item = e.target;

    if(item.classList[0] === "delete-btn"){
        const Blist = item.parentElement;
        Blist.classList.add("fall");
        removeLocalBooks(bList);
        Blist.addEventListener('transitionend', function(){
            Blist.remove();
            myLibrary.splice(myLibrary.indexOf(item),1);
            setData();
            render();
        });
    }

    if(item.classList[0] === "check-btn"){
        const Blist = item.parentElement;
        Blist.classList.toggle("completed");
    }
}

function setData(){
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}
function restore(){
    if(!localStorage.myLibrary){
        render();
    } else {
        let objects = localStorage.getItem('myLibrary')
        objects = JSON.parse(objects);
        myLibrary = objects;
        render();
    }
}

restore();
