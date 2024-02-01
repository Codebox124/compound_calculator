// script.js

function calculateCompoundInterest() {
    // Get user inputs
    const solveOption = parseInt(document.getElementById('solve').value);
    const initialBalance = parseFloat(document.getElementById('initialBalance').value);
    const periodicDeposit = parseFloat(document.getElementById('fv-periodic-deposit').value);
    const depositFrequency = parseInt(document.getElementById('fv-deposit-frequency').value);
    const depositTiming = parseInt(document.getElementById('fv-deposit-timing').value);
    const interestRate = parseFloat(document.getElementById('fv-interest-rate').value) / 100; // Convert percentage to decimal
    const term = parseInt(document.getElementById('fv-term').value);

    // Show/hide relevant inputs based on the selected option
    toggleInputsVisibility(solveOption);

    // Calculate compound interest based on the selected option
    let results = [];
    switch (solveOption) {
        case 1:
            results = calculateTimeToReachGoalDetails(initialBalance, periodicDeposit, depositFrequency, depositTiming, interestRate, term);
            break;
        case 2:
            results = calculateRequiredPeriodicDepositDetails(initialBalance, depositFrequency, depositTiming, interestRate, term);
            break;
        case 3:
            results = calculateRequiredInterestRateDetails(initialBalance, periodicDeposit, depositFrequency, depositTiming, term);
            break;
        case 4:
        default:
            results = calculateFutureValueDetails(initialBalance, periodicDeposit, depositFrequency, depositTiming, interestRate, term);
            break;
    }

    // Display the result table
    displayResultTable(results);
}

// Function to toggle input visibility based on the selected option
function toggleInputsVisibility(selectedOption) {
    // Get all input elements
    const inputs = document.querySelectorAll('.conditional-input');

    // Hide all inputs by default
    inputs.forEach(input => input.style.display = 'none');

    // Show relevant inputs based on the selected option
    if (selectedOption === 4) {
        document.getElementById('initialBalanceInput').style.display = 'block';
        document.getElementById('fv-periodic-deposit').style.display = 'block';
        document.getElementById('fv-deposit-timing').style.display = 'block';
        document.getElementById('fv-interest-rate').style.display = 'block';
        document.getElementById('fv-term').style.display = 'block';
    }
    // Add conditions for other options if needed
}

function displayResultTable(results) {
    const tableBody = document.getElementById('resultTableBody');
    tableBody.innerHTML = ''; // Clear previous results

    for (const result of results) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${result.year}</td>
                         <td>${result.periodicDeposit.toFixed(2)} €</td>
                         <td>${result.totalDeposits.toFixed(2)} €</td>
                         <td>${result.totalInterest.toFixed(2)} €</td>
                         <td>${result.balance.toFixed(2)} €</td>`;
        tableBody.appendChild(row);
    }
}




// Function to calculate the future value using the compound interest formula
function calculateFutureValueDetails(initialBalance, periodicDeposit, depositFrequency, depositTiming, interestRate, term) {
    const n = term * depositFrequency;
    const r = interestRate / depositFrequency;

    let futureValue = initialBalance;
    let totalDeposits = 0;
    let totalInterest = 0;
    const results = [];

    for (let i = 1; i <= n; i++) {
        if (depositTiming === 1) {
            futureValue += periodicDeposit;
            totalDeposits += periodicDeposit;
        }

        futureValue *= (1 + r);
        totalInterest += futureValue - initialBalance - totalDeposits;

        if (depositTiming === 0) {
            futureValue += periodicDeposit;
            totalDeposits += periodicDeposit;
        }

        results.push({
            year: i,
            periodicDeposit: periodicDeposit,
            totalDeposits: totalDeposits,
            totalInterest: totalInterest,
            balance: futureValue
        });
    }

    return results;
}

// Function to calculate the time needed to reach the goal
function calculateTimeToReachGoalDetails(initialBalance, periodicDeposit, depositFrequency, depositTiming, interestRate, goal) {
    // Implementation for time calculation...
    // Similar structure to calculateFutureValueDetails, returning an array of results
}

// Function to calculate the required periodic deposit to reach the goal
function calculateRequiredPeriodicDepositDetails(initialBalance, depositFrequency, depositTiming, interestRate, term) {
    // Implementation for required periodic deposit calculation...
    // Similar structure to calculateFutureValueDetails, returning an array of results
}

// Function to calculate the required interest rate to reach the goal
function calculateRequiredInterestRateDetails(initialBalance, periodicDeposit, depositFrequency, depositTiming, term) {
    // Implementation for required interest rate calculation...
    // Similar structure to calculateFutureValueDetails, returning an array of results
}
