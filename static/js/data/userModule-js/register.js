let button = document.getElementById('register-button')
button.addEventListener('click', function (event) {
    event.preventDefault();

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const url = 'http://127.0.0.1:8000/user/register/checkInfo/';
    const data = {
        name: document.getElementById('floatingInputUsername').value,
        email: document.getElementById('floatingInputEmail').value,
        password: document.getElementById('floatingInputPasswd').value,
        confirmPassword: document.getElementById('floatingInputPasswdRe').value,
        csrfmiddlewaretoken: csrfToken
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
            'Authorization': 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            let errorBox = document.getElementById('register-error')
            let message = JSON.stringify(data['message'])
            if (message === '"accept"') {
                errorBox.innerHTML = ''
                let token = JSON.stringify(data['token'])
                window.location.href = `http://127.0.0.1:8000/user/register/confirm-email/${token.replace(/\"/g, "")}`
            } else {
                errorBox.innerHTML = message.replace(/\"/g, "")
            }
        })
        .catch(error => {
            console.error('خطا در ارسال درخواست', error);
        })
    })