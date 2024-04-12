$(document).ready(function () {
    // Calculate Taxes
    function calculateTax(grossIncome, extraIncome, deductions, age) {
        grossIncome = parseFloat(grossIncome.replace(/,/g,''));
        extraIncome = parseFloat(extraIncome.replace(/,/g,''));
        deductions = parseFloat(deductions.replace(/,/g,''));

        // Calculate Taxable Income
        const taxableIncome = grossIncome + extraIncome - deductions;

        // Subtract the 800000 from Total Income 
        const taxableIncomeAboveThres = taxableIncome - 800000;

        //  tax rates based on age group
        let taxRates;
        if (age === "<40") {
            taxRates = 0.3;
        } else if (age === ">=40&<60") {
            taxRates = 0.4;
        } else if (age === ">=60") {
            taxRates = 0.1;
        }

        // Calculate tax amount
        const tax = taxableIncomeAboveThres * taxRates;
        return tax;
    }

    // showing Input error icon
    function showErrorIcon(inputId, errorMessage) {
        console.log(inputId, errorMessage);
        $(`#${inputId}Error`).show();
        $(`#${inputId}Error`).attr('title', errorMessage);
        $(`#${inputId}`).addClass('is-invalid');
    }

    // hide error icon By Default
    function hideErrorIcon(inputId) {
        $(`#${inputId}Error`).hide();
        $(`#${inputId}`).removeClass('is-invalid');
    }

    // Submit form
    $('#taxForm').submit(function (e) {
        e.preventDefault();

        // Validate inputs
        let isValid = true;

        // target or get Input Feild Value
        const grossIncome = $('#grossIncome').val();
        const extraIncome = $('#extraIncome').val();
        const ageGroup = $('#ageGroup').val();
        const deductions = $('#deductions').val();

        // check the grossIncome is empty ot type 
        if (isNaN(grossIncome) || !grossIncome) {
            showErrorIcon('grossIncome', 'Please enter numbers only....');
            isValid = false;
        } else {
            hideErrorIcon('grossIncome');
        }
        // check the extraIncome is empty ot type 
        if (isNaN(extraIncome) || !extraIncome) {
            showErrorIcon('extraIncome', 'Please enter numbers only...');
            isValid = false;
        } else {
            hideErrorIcon('extraIncome');
        }
        // check the ageGroup is empty ot type 
        if (!ageGroup) {
            showErrorIcon('ageGroup', 'Please select an age group...');
            isValid = false;
        } else {
            hideErrorIcon('ageGroup');
        }
        // check the deductions is empty ot type 
        if (isNaN(deductions) || !deductions) {
            showErrorIcon('deductions', 'Please enter numbers only...');
            isValid = false;
        } else {
            hideErrorIcon('deductions');
        }
        // if no error occurs then show the result page with income 
        if (isValid) {
            let taxAmount = 0;
            if (grossIncome > 800000) {
                taxAmount += calculateTax(grossIncome, extraIncome, deductions, ageGroup);
            }
            const overallIncome = parseFloat(grossIncome) + parseFloat(extraIncome) - parseFloat(deductions) - taxAmount;
            $('#resultText').text(`Rs. ${overallIncome.toFixed(2).toLocaleString('en-IN')}`);
            $('#taxTotal').text(`Total Tax is Rs. ${taxAmount.toLocaleString('en-IN')}`);
            $('#resultModal').modal('show');
        }
    });
});