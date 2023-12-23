document.addEventListener('DOMContentLoaded', () => {

    // Handle the login form submission
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
  
        fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
          // Redirect to dashboard on successful login
          if (data.user) {
            window.location.replace('/dashboard');
          } else {
            // Show an error message
            alert('Failed to log in');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      });
    }
  
    // Handle the logout button click
    const logoutButton = document.querySelector('#logout-button');
    if (logoutButton) {
      logoutButton.addEventListener('click', (event) => {
        event.preventDefault();
  
        fetch('/api/users/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          if (response.ok) {
            // Redirect to homepage on successful logout
            window.location.replace('/');
          } else {
            // Show an error message
            alert('Failed to log out');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      });
    }
  
    // Handle the signup form submission
    const signupForm = document.querySelector('#signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.querySelector('#username').value;
        const email = document.querySelector('#signup-email').value;
        const password = document.querySelector('#signup-password').value;
  
        fetch('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        })
        .then(response => response.json())
        .then(data => {
          // Redirect to dashboard on successful signup
          if (data.user) {
            window.location.replace('/dashboard');
          } else {
            // Show an error message
            alert('Failed to register');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      });
    }
  
  });
  