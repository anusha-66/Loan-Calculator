// Listen for submit

document.querySelector('#loan-form').addEventListener('submit', function(e){
    // Hide Results
    document.querySelector('#results').style.display = 'none';

    //Show Loader
    document.querySelector('#loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

function calculateResults(e) {

    //UI vars
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculateddPayments = parseFloat(years.value) * 12;

    //compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculateddPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    //check if monthly payment is a finite number
    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculateddPayments).toFixed(2);
        totalInterest.value = ((monthly * calculateddPayments) - principal).toFixed(2);
        //Show Results
        document.querySelector('#results').style.display = 'block';

        //Hide Loader
        document.querySelector('#loading').style.display = 'none';


    } else {
        showError('Please check the numbers entered');
        //console.log('Please check numbers entered');
    }

}

//Show Error
function showError(error) {

    //Show Results
    document.querySelector('#results').style.display = 'none';

    //Hide Loader
    document.querySelector('#loading').style.display = 'none';

    // Create a div
    const errorDiv = document.createElement('div');

    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');


    //Add Class
    errorDiv.className = 'alert alert-danger';

    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading

    card.insertBefore(errorDiv, heading);

    //Clear Error after 3 secs
    setTimeout(clearError, 3000);

}

function clearError(){
    document.querySelector('.alert').remove();
}






