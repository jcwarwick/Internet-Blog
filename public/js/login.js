document.querySelector('#loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    // Fetch form data
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
  
    // Make POST request
    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
  
    if (response.ok) {
        window.location.href = '/'; // Redirect to the home page
    } else {
        // Handle errors
        alert('Failed to log in');
    }
  });