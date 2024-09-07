document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting normally

    // Get form values
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    const appointmentDateTime = document.getElementById('appointmentDateTime').value;
    const address = document.getElementById('address').value;
    const product = document.getElementById('product').value;
    const comments = document.getElementById('comments').value;

    // Form validation for mobile or email
    if (!mobile && !email) {
        document.getElementById('errorMessage').classList.remove('hidden');
        document.getElementById('successMessage').classList.add('hidden');
        return;
    }

    // Here you can add AJAX or Fetch API to send the form data to your server.

    // Show success message
    document.getElementById('successMessage').classList.remove('hidden');
    document.getElementById('errorMessage').classList.add('hidden');

    // Clear the form (optional)
    document.getElementById('appointmentForm').reset();
});
