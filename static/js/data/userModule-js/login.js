let button = document.getElementById('login-button')
button.addEventListener('click', function (event) {
    event.preventDefault();

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const url = 'http://127.0.0.1:8000/user/login/sendData/';
    const data = {
        email: document.getElementById('floatingInputEmail').value,
        password: document.getElementById('floatingInputPasswd').value,
        csrfmiddlewaretoken: csrfToken
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
            'Authorization': 'Karim b0bee3d83043a95a22bc0adaf81456b67eb903f6',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            let errorBox = document.getElementById('login-error')
            let message = JSON.stringify(data['message'])
            if (message === '"accept"') {
                errorBox.innerHTML = ''
                window.location.href = 'http://127.0.0.1:8000/'
            } else {
                errorBox.innerHTML = message.replace(/\"/g, "")
            }
        })
        .catch(error => {
            console.error('خطا در ارسال درخواست:', error);
        });
})




