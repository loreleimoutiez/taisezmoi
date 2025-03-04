const API_PATH = '/api';

function initLoginForm(form) {
  form.addEventListener('submit', event => {
    event.preventDefault();

    const { username, password } = event.target.elements;

    fetch(`${API_PATH}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: username.value,
        password: password.value
      }),
      credentials: 'include'
    })
      .then(response => {
        if (response.status === 200) {
          window.location.href = '/write';
        } else {
          throw new Error('Unauthorized user');
        }
      })
      .catch(error => console.error('Login failed:', error));
  });
}

export async function checkAuthStatus() {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/status`, {
      //const response = await fetch('http://localhost:3000/api/auth/status', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.isAuthenticated;
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'authentification :', error);
    return false;
  }
}

window.initLoginForm = initLoginForm;
