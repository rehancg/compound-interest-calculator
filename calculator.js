function calculateInterest() {
    // Get input values
    const initialDeposit = parseFloat(document.getElementById('initialDeposit').value);
    const annualInterestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const taxRate = parseFloat(document.getElementById('taxRate').value) / 100;
    const renewalPeriod = parseInt(document.getElementById('renewalPeriod').value);
    const additionalInvestment = parseFloat(document.getElementById('additionalInvestment').value);
    const duration = parseFloat(document.getElementById('duration').value);

    // Calculate number of renewals
    const totalRenewals = duration * (12 / renewalPeriod);
    
    let currentBalance = initialDeposit;
    let totalInvestment = initialDeposit;
    let totalTaxPaid = 0;
    
    // Calculate interest for each period
    for (let i = 0; i < totalRenewals; i++) {
        // Calculate interest for the period
        const periodRate = annualInterestRate / (12 / renewalPeriod);
        const interestEarned = currentBalance * periodRate;
        
        // Calculate tax
        const taxAmount = interestEarned * taxRate;
        totalTaxPaid += taxAmount;
        
        // Add interest (after tax) to balance
        currentBalance += interestEarned - taxAmount;
        
        // Add additional investment at renewal
        if (i < totalRenewals - 1) {  // Don't add additional investment on last period
            currentBalance += additionalInvestment;
            totalInvestment += additionalInvestment;
        }
    }

    // Calculate final values
    const totalReturn = currentBalance;
    const profit = totalReturn - totalInvestment;
    const roi = (profit / totalInvestment) * 100;
    const totalWithPendingInvestment = totalReturn + additionalInvestment;

    // Create new result element
    const resultDiv = document.createElement('div');
    resultDiv.style.borderBottom = '1px solid #ddd';
    resultDiv.style.marginBottom = '15px';
    resultDiv.style.paddingBottom = '15px';
    
    // Get the selected renewal period text
    const renewalSelect = document.getElementById('renewalPeriod');
    const renewalText = renewalSelect.options[renewalSelect.selectedIndex].text;
    
    const timestamp = new Date().toLocaleTimeString();
    resultDiv.innerHTML = `
        <p><small>${timestamp}</small></p>
        <p>Total Investment: <span>${formatCurrency(totalInvestment)}</span> LKR</p>
        <p>Total Return: <span>${formatCurrency(totalReturn)}</span> LKR</p>
        <p><strong>Renew Every: ${renewalText}</strong></p>
        <p><strong>Total With Pending Investment: <span>${formatCurrency(totalWithPendingInvestment)}</span> LKR</strong></p>
        <p><strong>Profit: <span>${formatCurrency(profit)}</span> LKR</strong></p>
        <p><strong>Total Tax Paid: <span>${formatCurrency(totalTaxPaid)}</span> LKR</strong></p>
        <p>ROI: <span>${roi.toFixed(2)}</span>%</p>
    `;

    // Add new result at the top
    const container = document.getElementById('resultsContainer');
    container.insertBefore(resultDiv, container.firstChild);
}

function clearResults() {
    document.getElementById('resultsContainer').innerHTML = '';
}

function formatCurrency(value) {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
} 