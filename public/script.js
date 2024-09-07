document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission

    // Clear previous error messages
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    errorMessage.classList.add('hidden');
    successMessage.classList.add('hidden');
    errorMessage.innerText = '';

    // Get form data
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    const appointmentDateTime = document.getElementById('appointmentDateTime').value;
    const address = document.getElementById('address').value;
    const product = document.getElementById('product').value;
    const comments = document.getElementById('comments').value;

    let isValid = true;

    // Name validation: no numbers allowed
    if (!/^[a-zA-Z]+$/.test(name)) {
        errorMessage.innerText += "Please enter a valid name (letters only).\n";
        isValid = false;
    }

    // Surname validation: no numbers allowed
    if (!/^[a-zA-Z]+$/.test(surname)) {
        errorMessage.innerText += "Please enter a valid surname (letters only).\n";
        isValid = false;
    }

    // Either mobile or email must be provided
    if (!mobile && !email) {
        errorMessage.innerText += "Please provide either a mobile number or an email address.\n";
        isValid = false;
    }

    // Mobile validation: only numbers allowed, if provided
    if (mobile && !/^\d+$/.test(mobile)) {
        errorMessage.innerText += "Please enter a valid mobile number (numbers only).\n";
        isValid = false;
    }

    // Email validation: proper format, if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMessage.innerText += "Please enter a valid email address.\n";
        isValid = false;
    }

    // Date validation: cannot select a past date
    const selectedDate = new Date(appointmentDateTime);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
        errorMessage.innerText += "Please select a future date and time for the appointment.\n";
        isValid = false;
    }

    // If form data is invalid, show the error message
    if (!isValid) {
        errorMessage.classList.remove('hidden');
        return;
    }

    // If form is valid, send data to the backend
    const formData = {
        name: name,
        surname: surname,
        mobile: mobile,
        email: email,
        appointmentDateTime: appointmentDateTime,
        address: address,
        product: product,
        comments: comments
    };

    fetch('/schedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.text())
    .then(data => {
        successMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        console.log('Success:', data);
    })
    .catch((error) => {
        errorMessage.innerText = 'There was an error scheduling your appointment. Please try again.';
        errorMessage.classList.remove('hidden');
        successMessage.classList.add('hidden');
        console.error('Error:', error);
    });
});
