let button = document.getElementById('change-password-button')
button.addEventListener('click', function (event) {
    event.preventDefault();

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const url = window.location.href + 'checkInfo/';
    const data = {
        password: document.getElementById('floatingInputPassword').value,
        confirmPassword: document.getElementById('floatingInputConfirmPassword').value,
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
            let errorBox = document.getElementById('change-password-error')
            let message = JSON.stringify(data['message'])
            if (message === '"accept"') {
                errorBox.innerHTML = ''
                window.location.href = 'http://127.0.0.1:8000/user/login/'
            } else {
                errorBox.innerHTML = message.replace(/\"/g, "")
            }
        })
        .catch(error => {
            console.error('خطا در ارسال درخواست:', error);
        });
})