const salaryInput = document.getElementById("salary");
const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");

const addBtn = document.getElementById("addBtn");

const salaryDisplay = document.getElementById("salaryDisplay");
const balanceDisplay = document.getElementById("balance");
const savedSalary = Number(localStorage.getItem("salary")) || 0;

salaryDisplay.textContent = savedSalary;



const expenseList = document.getElementById("expenseList");

let totalExpenses = 0;
let expenses = [];
let chart;
const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
const warning = document.getElementById("warning");




expenses = savedExpenses;
savedExpenses.forEach(function(expense){

    totalExpenses += expense.amount;

    const li = document.createElement("li");

    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function(){

    totalExpenses -= expense.amount;

    const updatedExpenses = expenses.filter(function(item){
        return item !== expense;
    });

    expenses = updatedExpenses;

    localStorage.setItem("expenses", JSON.stringify(expenses));

    const salary = Number(localStorage.getItem("salary")) || 0;

    balanceDisplay.textContent = salary - totalExpenses;

    li.remove();
    updateChart();
    

salaryDisplay.textContent = savedSalary;
const balance = Number(savedSalary) - totalExpenses;

balanceDisplay.textContent = balance;
checkThreshold();

});

    li.textContent = expense.name + " - ₹" + expense.amount + " ";

    li.appendChild(deleteBtn);

    expenseList.appendChild(li);

});
const balance = savedSalary - totalExpenses;

balanceDisplay.textContent = balance;
checkThreshold();

addBtn.addEventListener("click", function(){

    const salary = Number(salaryInput.value);
    const expenseName = expenseNameInput.value;
    const expenseAmount = Number(expenseAmountInput.value);

    if(
    salary <= 0 ||
    expenseName === "" ||
    expenseAmount <= 0
){
    alert("Please enter valid values");
    return;
}

    salaryDisplay.textContent = salary;
    localStorage.setItem("salary", salary);
    

    totalExpenses += expenseAmount;
    expenses.push({
    name: expenseName,
    amount: expenseAmount
});

localStorage.setItem("expenses", JSON.stringify(expenses));
    

    const li = document.createElement("li");

const deleteBtn = document.createElement("button");

deleteBtn.textContent = "Delete";
deleteBtn.addEventListener("click", function(){

    totalExpenses -= expenseAmount;

    const balance = Number(salaryInput.value) - totalExpenses;

    balanceDisplay.textContent = balance;
    updateChart();

    li.remove();

});

li.textContent = expenseName + " - ₹" + expenseAmount + " ";

li.appendChild(deleteBtn);

expenseList.appendChild(li);

    const balance = salary - totalExpenses;

    balanceDisplay.textContent = balance;
    updateChart();
    checkThreshold();

});
function updateChart() {

    const salary = Number(salaryDisplay.textContent);

    const remainingBalance = salary - totalExpenses;

    const ctx = document.getElementById("expenseChart");

    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Expenses", "Remaining Balance"],
            datasets: [{
                data: [totalExpenses, remainingBalance]
            }]
        }
    });

}
updateChart();
function checkThreshold() {

    const salary = Number(salaryDisplay.textContent);
    const balance = Number(balanceDisplay.textContent);

    if(balance < salary * 0.1){

        balanceDisplay.style.color = "red";

        warning.textContent = "⚠️ Warning: Balance below 10% of salary!";

    } else {

        balanceDisplay.style.color = "black";

        warning.textContent = "";

    }
}
