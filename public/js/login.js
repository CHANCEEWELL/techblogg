$(document).ready(function () {

  // DOM Variables
  const signupBtnEl = $('#signup');
  const loginBtnEl = $('#login');
  const userName = $('#user_name');
  const password = $('#password');

  async function loginUser(userData) {
    try {
      const result = await $.ajax({
        url: '/api/login',
        data: userData,
        method: 'POST',
      });

      if (result.message === 'Login Successful!') {
        window.location = '/dashboard';
      } else if (result.message === 'Login failed!') {
        alert('Login Failed');
      } else {
        window.location = '/login';
      }

    } catch (err) {
      console.log(err);
    }
  };

  loginBtnEl.on('click', (e) => {
    e.preventDefault();

    const userData = {
      user_name: userName.val().trim(),
      password: password.val().trim(),
    }

    loginUser(userData);
  });

  signupBtnEl.on('click', (e) => {
    e.preventDefault();
    window.location = '/signup';
  });

});