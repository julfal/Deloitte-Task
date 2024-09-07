document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        mobile: document.getElementById('mobile').value,
        email: document.getElementById('email').value,
        appointmentDateTime: document.getElementById('appointmentDateTime').value,
        address: document.getElementById('address').value,
        product: document.getElementById('product').value,
        comments: document.getElementById('comments').value
    };

    // Send form data to the backend
    fetch('/schedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('successMessage').classList.remove('hidden');
        document.getElementById('errorMessage').classList.add('hidden');
        console.log('Success:', data);
    })
    .catch((error) => {
        document.getElementById('errorMessage').classList.remove('hidden');
        document.getElementById('successMessage').classList.add('hidden');
        console.error('Error:', error);
    });
});

