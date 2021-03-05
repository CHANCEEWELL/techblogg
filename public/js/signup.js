$(document).ready(function () {

    // DOM Variables
    const signupBtnEl = $('#signup');
    const loginBtnEl = $('#login')
    const userName = $('#user_name');
    const password = $('#password');
    const passwordConf = $('#password_conf');

    // validate password
    function valPassword(newUser) {

        if (newUser.password === newUser.password_conf) {

            const passArray = Array.from(newUser.password);

            if (passArray.length < 8) {
                alert('please enter a password with at least 8 characters');
                return;
            }

            createUser(newUser)
        } else {
            alert('Passwords do not match!');
            return;
        }
    };


    // post new user
    async function createUser(newUser) {
        try {
            const result = await $.ajax({
                url: '/api/signup/',
                data: newUser,
                method: 'POST'
            });
            if (result.message === 'Login Successful!') {
                window.location = '/dashboard';
            } else if (result.message === 'Username taken') {
                alert('Username is taken');
            } else {
                window.location = '/login';
            }
        } catch (err) {
            console.log(err);
        }
    };

    signupBtnEl.on('click', (e) => {
        e.preventDefault();

        const newUser = {
            user_name: userName.val().trim(),
            password: password.val().trim(),
            password_conf: passwordConf.val().trim(),
        }

        valPassword(newUser);

    });

    loginBtnEl.on('click', (e) => {
        e.preventDefault();
        window.location = '/login';
    })

});