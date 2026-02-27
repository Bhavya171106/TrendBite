const loginForm = document.getElementById('loginForm');
const authMessage = document.getElementById('authMessage');

const showMessage = (text, isError = true) => {
  authMessage.textContent = text;
  authMessage.style.color = isError ? '#b3261e' : '#1f7a1f';
};

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const payload = {
    email: String(formData.get('email') || '').trim(),
    password: String(formData.get('password') || ''),
  };

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      showMessage(data.error || 'Login failed');
      return;
    }

    localStorage.setItem('food_agent_user', JSON.stringify(data.user));
    showMessage('Login successful. Redirecting...', false);
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  } catch (_error) {
    showMessage('Unable to reach server');
  }
});
