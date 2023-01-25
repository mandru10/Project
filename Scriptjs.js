// ~ Search bar 

const searchForm = document.getElementById("searchForm");
let allReplacedElements = []; 

searchForm.onsubmit = (e) => {
    e.preventDefault();

// Replaced old searched elements with the default ones 

    allReplacedElements.forEach(item => {
        item.elementJs.innerHTML = item.elementHTML
    })
    allReplacedElements = [];

    const searchInput = document.getElementById("search");
    const searchValue = searchInput.value;
    const searchValueLowerCase = searchValue.toLowerCase();

    let firstFoundElement = null;
    let indexFoundElement = 0;
    
//Empty tag search 

    document.querySelectorAll('*:not(:has(*))').forEach((element) => {
        const elementInnerHtml = element.innerHTML;
        const isSearchValue = elementInnerHtml.toLowerCase().search(searchValueLowerCase);

        if (isSearchValue !== -1) {
            if (!indexFoundElement) {
                firstFoundElement = element;
                indexFoundElement = 1;
            }

// Regex for searching and mark strings 
    
            const searchRegex = new RegExp(searchValue, 'gi');
            const replacedInnerHtml = elementInnerHtml.replace(searchRegex, (match) => `<mark>${match}</mark>`);

            allReplacedElements.push({
                elementJs: element,
                elementHTML: element.innerHTML
            })

            element.innerHTML = replacedInnerHtml;
        }
    })

// Automat scroll to the first found element in the page

    firstFoundElement && firstFoundElement.scrollIntoView({behavior:'smooth'})
}

// ~ More information button

const moreInformationButton = document.getElementById("aboutButtonExtend");

moreInformationButton.onclick = (e) => {
    const moreInformationText = document.getElementById("moreInformationText");

    const moreInfoTextIsHidden = moreInformationText.classList.contains('none');
    if (moreInfoTextIsHidden) {
        moreInformationButton.innerHTML = 'Hide Information';
        moreInformationText.classList.remove('none')
    } else {
        moreInformationButton.innerHTML = 'More Information';
        moreInformationText.classList.add('none')
    }
}

// ~ Training buttons 

const gymModal = document.getElementById("gymModal");
const buttonGym = document.getElementById("buttonInfoGym");
const buttonCloseGym = document.getElementById("modalCloseGym");
const buttonCloseClasses = document.getElementById("modalCloseClasses");
const buttonCloseBox = document.getElementById("modalCloseBox");
const classesModal = document.getElementById("classesModal")
const buttonClasses = document.getElementById("buttonInfoClasses");
const boxModal = document.getElementById("boxModal");
const buttonBox = document.getElementById("buttonInfoBox");


buttonGym.addEventListener('click', openModal);
buttonClasses.addEventListener('click', openModalClasses);
buttonBox.addEventListener('click', openModalBox);
buttonCloseGym.addEventListener("click", closeModalGym);
buttonCloseClasses.addEventListener("click", closeModalClasses);
buttonCloseBox.addEventListener("click", closeModalBox);
    
function openModal(){
    gymModal.style.display = "block";

}

function openModalClasses(){
    classesModal.style.display = "block";
}

function openModalBox(){
    boxModal.style.display = "block";
}

function closeModalGym(){
    gymModal.style.display = "none";
}

function closeModalClasses(){
    classesModal.style.display = "none";
}

function closeModalBox(){
    boxModal.style.display = "none";
}

// ~ Order and buy buttons

let cart = [];
const buyButtons = document.getElementsByClassName('js-buy');
 

Array.from(buyButtons).forEach(buyButton => {
    buyButton.addEventListener('click', (e) => {
        e.preventDefault();

// Add the objects in cart 

        const button = e.currentTarget;
        const item = {
            title: button.dataset.title,
            price: button.dataset.price
        }

// Checking to not have a duplicate abonament in the cart        

        const abonaments = ['Silver', 'Gold', 'Platinum'];
        const alreadyExist = cart.some(element => element.title === item.title && abonaments.includes(item.title));

// Verifying the condition from line 134

        if(!alreadyExist){
            cart.push(item)
            renderCart();
        }
    })  
})

//Create all the elements in format HTML 

function renderCart(){
    const shopContainer = document.getElementById("shopContainer");
 
// If nothing in cart, the modal will close    

    if(cart.length === 0){
        shopContainer.classList.add("none");
        return
    }
    const itemsHtml = cart.reduce((acc, item, index) => {return acc + `
        <div class="item-cart"><button class="js-delete-item" data-id="${index}">x</button><span class="order-container">${item.title} - ${item.price}<span></div>
    `}, '' + `<div id="message"><span id="orderPlaceholderName"></span></div>` + `<div class="submit"><button id="button-order">Send Order</button></div>` + 
    `<div class="credentials"><input type="text" id="credentialsName" placeholder="Your Name" required minlength="1" maxlength="27" size="20"></div>`);
    shopContainer.classList.remove("none");
    shopContainer.innerHTML = itemsHtml;
    setupListeners();

}

function setupListeners(){
    const removeButtons = document.getElementsByClassName('js-delete-item');
    const sendOrder = document.getElementById("button-order");
    const showText = document.getElementById("orderPlaceholderName")
    const credentials = document.getElementById("credentialsName");

sendOrder.addEventListener('click', (eventSend) => {
    eventSend.preventDefault();

    if(credentials.value === "" || credentials.value == null){
        showText.innerHTML = `Please enter your name !`;

    }else{
        message.style.display = "block";
        showText.innerHTML = `&#9989; Order accepted ! Pick / Pay at GYM, <br> <span id="orderName">${credentials.value}</span>`;
    }

})

// Remove items from order

    Array.from(removeButtons).forEach(removeButton => {
        removeButton.addEventListener("click", (e) =>{
            e.preventDefault();
            const button = e.currentTarget;
            const id = button.dataset.id;
            const idInt = parseInt(id)
            cart = removeElementAt(cart, idInt);
            renderCart();
        })
    })
}

// Remove item from an array and return the remaining array

function removeElementAt(arr, index) {
   let frontPart = arr.slice(0, index);
   let lastPart  = arr.slice( index+1 );
   return [...frontPart, ...lastPart];
}


