document.addEventListener("DOMContentLoaded", () => {
    const totalAmount = document.getElementById("total_amount");
    const userAmount = document.getElementById("user-amount");
    const checkAmountButton = document.getElementById("check-amount-button");
    const totalAmountButton = document.getElementById("total-amount-button");
    const productTitle = document.getElementById("product-title");
    const productTitleError = document.getElementById("product-title-error");
    const errorMessage = document.getElementById("budget_error");
    const amount = document.getElementById("amount");
    const expenditureValue = document.getElementById("expenditure");
    const balanceValue = document.getElementById("balance-amount");
    const list = document.getElementById("list");
    let tempAmount = 0;

    totalAmountButton.addEventListener("click", () => {
        tempAmount = parseFloat(totalAmount.value);
        if (isNaN(tempAmount) || tempAmount <= 0) {
            errorMessage.classList.remove("hide");
        } else {
            errorMessage.classList.add("hide");
            amount.innerHTML = tempAmount.toFixed(2);
            balanceValue.innerText = (tempAmount - parseFloat(expenditureValue.innerText)).toFixed(2);
            totalAmount.value = "";
        }
    });

    const disableButtons = (bool) => {
        let editButtons = document.getElementsByClassName("edit");
        Array.from(editButtons).forEach(element => {
            element.disabled = bool;
        });
    };

    const modifyElement = (element, edit = false) => {
        let parentDiv = element.parentElement;
        let currentBalance = parseFloat(balanceValue.innerText);
        let currentExpense = parseFloat(expenditureValue.innerText);
        let parentAmount = parseFloat(parentDiv.querySelector(".amount").innerText);
        if (edit) {
            let parentText = parentDiv.querySelector(".product").innerText;
            productTitle.value = parentText;
            userAmount.value = parentAmount;
            disableButtons(true);
        }
        balanceValue.innerText = (currentBalance + parentAmount).toFixed(2);
        expenditureValue.innerText = (currentExpense - parentAmount).toFixed(2);
        parentDiv.remove();
    };

    const listCreator = (expenseName, expenseValue) => {
        let sublistContent = document.createElement("div");
        sublistContent.classList.add("sublist-content", "flex-space");
        list.appendChild(sublistContent);
        sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
        let editButton = document.createElement("button");
        editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
        editButton.style.fontSize = "24px";
        editButton.addEventListener("click", () => {
            modifyElement(editButton, true);
        });
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
        deleteButton.style.fontSize = "24px";
        deleteButton.addEventListener("click", () => {
            modifyElement(deleteButton);
        });
        sublistContent.appendChild(editButton);
        sublistContent.appendChild(deleteButton);
        document.getElementById("list").appendChild(sublistContent);
    };

    checkAmountButton.addEventListener("click", () => {
        if (!userAmount.value || !productTitle.value) {
            productTitleError.classList.remove("hide");
            return false;
        } else {
            productTitleError.classList.add("hide");
        }

        disableButtons(false);
        let expenditure = parseFloat(userAmount.value);
        let sum = parseFloat(expenditureValue.innerText) + expenditure;
        expenditureValue.innerText = sum.toFixed(2);
        const totalBalance = tempAmount - sum;
        balanceValue.innerText = totalBalance.toFixed(2);
        listCreator(productTitle.value, userAmount.value);
        productTitle.value = "";
        userAmount.value = "";
    });
});