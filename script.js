//Selector
const bBtn = document.getElementById('btnForm');
const bList = document.querySelector(".bookList")
//Selector for input
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
    constructor(book_name, book_author, book_page){
        this.book_name = bookForm.book_name.value;
        this.book_author = bookForm.book_author.value;
        this.book_page = bookForm.book_page.value + 'pg';
    }
}
let myLibrary = [];
let newBook;
//Funtions
function addBookToLibrary(e){
    e.preventDefault();
    newBook = new Book(book_name, book_author, book_page);
    myLibrary.push(newBook);
    setData();
    render();
}

function render() {
    const display = document.getElementsByClassName('bookList');
    const books = document.querySelectorAll('.book');
    books.forEach(book => display.removeChild(book));

    for (let i=0; myLibrary.length; i++){
        addBookToLibrary(myLibrary[i]);
    }
}

function createBook(item){

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.setAttribute('id', myLibrary.indexOf(item));
    
    const bookName = document.createElement("div");
    bookName.textContent = item.book_name;
    bookName.setAttribute("id", "bookName");
    bookDiv.appendChild(bookName);
    
    const bookAuthor = document.createElement("div");
    bookAuthor.textContent = item.book_author;
    bookAuthor.setAttribute("id", "bookAuthor");
    bookDiv.appendChild(bookAuthor);
    
    const bookPage = document.createElement("div");
    bookAuthor.textContent = item.book_page;
    bookAuthor.setAttribute("id", "bookAuthor");
    bookDiv.appendChild(bookPage);

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
