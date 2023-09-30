/* getting data from locat Storage */

let dataFromLocalStorage = JSON.parse(localStorage.getItem("requestedItemtoStorage"));
const requestListColumn = document.querySelector(".request-list-column");

/* creating element from localStorage */

if (dataFromLocalStorage) {
    let inquiryItem, inquiryItemName, inquiryItemImg, inquiryAmount, inquiryItemNumber;

    dataFromLocalStorage.forEach(function (item) {
        if (item.itemCartValue == "requested") {
            inquiryItem = document.createElement("div");
            inquiryItem.classList.add("request-list-item");
            requestListColumn.appendChild(inquiryItem)

            inquiryItem.innerHTML =
                `
                <div class="list-item-details">
                <img src="./img/inquiry/1.png" alt="1" class="list-item-img">
                <div class="cart-item-details">
                    <p class="list-item-name">SY4S-05D</p>
                    <p class="inquiry-item-amount">Amount: <span
                            class="inquiry-item-amount--number"></span>
                    </p>
                </div> <!-- /cart-item-details -->
            </div>
            <a class="list-item-btn"></a>
            `
            inquiryItemName = inquiryItem.querySelector(".list-item-name");
            inquiryItemImg = inquiryItem.querySelector(".list-item-img");
            inquiryAmount = inquiryItem.querySelector(".inquiry-item-amount--number");
            inquiryItemNumber = item.itemNumber;

            inquiryItemName.innerText = item.itemTitle;
            inquiryItemImg.setAttribute("src", item.itemImg);
            inquiryAmount.innerText = parseInt(item.itemQuantityCount);

            inquiryItem.setAttribute("data-number", inquiryItemNumber);


        }
    })
}


/* changing number in the header */
/* upload number in cart from localStorage */
/*
const cartNumber = document.querySelector(".cart-number");
const cartNumberAmount = parseInt(JSON.parse(localStorage.getItem("addedItemCartNumber")));

if (cartNumberAmount) {
    cartNumber.innerText = cartNumberAmount;
}


const quoteNumber = document.querySelector(".quote-number");
let quoteNumberAmount = parseInt(JSON.parse(localStorage.getItem("requestItemNumber")));

if (quoteNumberAmount) {
    quoteNumber.innerText = quoteNumberAmount;
}
*/

/* deleting item from inquiry */

requestListColumn.addEventListener("click", deleteInquiryItem);

let deleteInquiryBtn, requestListItem, inquiryDeleteItemNumber, inquiryAmountDeleteItem;


function deleteInquiryItem(e) {
    deleteInquiryBtn = e.target.closest(".list-item-btn");
    requestListItem = e.target.closest(".request-list-item");
    inquiryDeleteItemNumber = requestListItem.dataset.number;
    inquiryAmountDeleteItem = parseInt(requestListItem.querySelector(".inquiry-item-amount--number").innerText);

    if (deleteInquiryBtn == e.target) {
        requestListItem.style.display = "none";
        for (i = 0; i < dataFromLocalStorage.length; i++) {
            if (inquiryDeleteItemNumber == dataFromLocalStorage[i].itemNumber) {
                dataFromLocalStorage.splice([i], 1);
            }
        }

        quoteNumberAmount = quoteNumberAmount - inquiryAmountDeleteItem;
        quoteNumber.innerText = quoteNumberAmount;


        let dataToLocalStorageJSON = JSON.stringify(dataFromLocalStorage);
        localStorage.setItem("requestedItemtoStorage", dataToLocalStorageJSON);
        dataFromLocalStorage = JSON.parse(localStorage.getItem("requestedItemtoStorage"));

        let requestItemNumberJSON = JSON.stringify(quoteNumberAmount);
        localStorage.setItem("requestItemNumber", requestItemNumberJSON);
        quoteNumberAmount = parseInt(JSON.parse(localStorage.getItem("requestItemNumber")));

    }
}

/* removing arrays from local storage if items = 0 */
if (quoteNumberAmount == 0) {
    quoteNumber.innerText = "";
    localStorage.removeItem("requestItemNumber");
    localStorage.removeItem("requestedItemtoStorage")
}

//* collecting data from inquiry form */
const inquiryForm = document.querySelector(".inquiry-form");
let inputName = document.querySelector("#name");
let formItems = document.querySelectorAll(".form-item")
const submitBtn = document.querySelector(".submit-btn");

/* changing style for default popup message */


let inputItems = document.querySelectorAll(".input-item")
let inputMessage;

formItems.forEach(function (item) {
    inputMessage = document.createElement("div");
    inputMessage.style.display = "none";
    item.append(inputMessage);
})

inputItems.forEach(function (item) {
    if (item.hasAttribute("required")) {
        item.addEventListener("invalid", function (e) {
            e.preventDefault();

            if (!e.target.validity.valid) {
                inputMessage = item.nextElementSibling;
                inputMessage.className = "input-error";
                inputMessage.style.display = "block";
                //item.classList.add("invalid");
                if (item.classList.contains("input-name")) {
                    inputMessage.textContent = "Please write your full name";
                } else if (item.classList.contains("input-phone")) {
                    inputMessage.textContent = "Please write your phone";
                } else if (item.classList.contains("input-email")) {
                    inputMessage.textContent = "Please write your email";
                }
            }
        })
        item.addEventListener("input", function (e) {
            if ("block" === inputMessage.style.display) {
                item.classList.remove("invalid")
                inputMessage.style.display = "none"
            }
        })
    }

})

/* submiting the form */

inquiryForm.addEventListener("submit", collectInquiryData);

function collectInquiryData(e) {
    // e.preventDefault()

    /* checking if all required filed are filled */
    if (inquiryForm.checkValidity()) {
        /* creating form requiest if the form is filled */
        let inquiryName, inquiryPhone, inquiryEmail, inquiryCompany, inquiryItems;
        inquiryName = document.querySelector("#name").value;
        inquiryPhone = document.querySelector("#phone").value;
        inquiryEmail = document.querySelector("#form-email").value;
        inquiryCompany = document.querySelector("#company").value || null;


        let inquiryRequest = {
            inquiryName: inquiryName,
            inquiryPhone: inquiryPhone,
            inquiryEmail: inquiryEmail,
            inquiryCompany: inquiryCompany,
            inquiryItems: dataFromLocalStorage
        }
        console.log(inquiryRequest)
    }

    /* clear the form and localStorage after submiting the form */
    dataFromLocalStorage = localStorage.removeItem("requestedItemtoStorage");
    quoteNumberAmount = localStorage.removeItem("requestItemNumber");
    quoteNumber.innerText = quoteNumberAmount;
    inquiryForm.reset()

}
