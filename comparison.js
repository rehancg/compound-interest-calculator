function calculateAllPeriods() {
    const initialDeposit = parseFloat(document.getElementById('initialDeposit').value);
    const monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value);
    const taxRate = parseFloat(document.getElementById('taxRate').value) / 100;
    const duration = parseFloat(document.getElementById('duration').value);
    
    // Get all interest rates (annual rates)
    const monthlyRate = parseFloat(document.getElementById('monthlyRate').value) / 100;
    const quarterlyRate = parseFloat(document.getElementById('quarterlyRate').value) / 100;
    const biannualRate = parseFloat(document.getElementById('biannualRate').value) / 100;
    const annualRate = parseFloat(document.getElementById('annualRate').value) / 100;

    // Calculate for each period with adjusted interest rates
    calculatePeriod('monthlyResults', initialDeposit, monthlyInvestment, monthlyRate/12, 1, taxRate, duration);
    calculatePeriod('quarterlyResults', initialDeposit, monthlyInvestment, quarterlyRate/4, 3, taxRate, duration);
    calculatePeriod('biannualResults', initialDeposit, monthlyInvestment, biannualRate/2, 6, taxRate, duration);
    calculatePeriod('annualResults', initialDeposit, monthlyInvestment, annualRate, 12, taxRate, duration);
}

function calculatePeriod(elementId, initialDeposit, monthlyInvestment, interestRate, months, taxRate, duration) {
    let currentBalance = initialDeposit;
    let totalInvestment = initialDeposit;
    let totalTaxPaid = 0;
    
    // Calculate total periods based on duration
    const periodsPerYear = 12 / months;
    const totalPeriods = duration * periodsPerYear;
    const monthlyInvestmentTotal = monthlyInvestment * months;

    for (let i = 0; i < totalPeriods; i++) {
        // Calculate interest
        const interestEarned = currentBalance * interestRate;
        const taxAmount = interestEarned * taxRate;
        totalTaxPaid += taxAmount;
        
        currentBalance += interestEarned - taxAmount;

        // Add monthly investments for this period
        if (i < totalPeriods - 1) {
            currentBalance += monthlyInvestmentTotal;
            totalInvestment += monthlyInvestmentTotal;
        }
    }

    const profit = currentBalance - totalInvestment;
    let nextInvestment = 0;
    if(months !== 1){
        nextInvestment = monthlyInvestmentTotal;
    }
    const roi = (profit / (totalInvestment + nextInvestment)) * 100;
    const totalWithPendingInvestment = currentBalance + nextInvestment;

    // Display results
    const resultsDiv = document.querySelector(`#${elementId} .results`);
    resultsDiv.innerHTML = `
        <p><strong>Total Investment:</strong> ${formatCurrency(totalInvestment)} LKR</p>
        <p><strong>Total Return:</strong> ${formatCurrency(currentBalance)} LKR</p>
        <p><strong>With Next Investment:</strong> ${formatCurrency(totalWithPendingInvestment)} LKR</p>
        <p><strong>Profit:</strong> ${formatCurrency(profit)} LKR</p>
        <p><strong>Tax Paid:</strong> ${formatCurrency(totalTaxPaid)} LKR</p>
        <p><strong>ROI:</strong> ${roi.toFixed(2)}%</p>
        <p><strong>Duration:</strong> ${duration} year${duration !== 1 ? 's' : ''}</p>
    `;
}

function formatCurrency(value) {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
} 