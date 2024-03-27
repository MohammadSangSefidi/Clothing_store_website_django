let button = document.getElementById('forget-password-button')
button.addEventListener('click', function (event) {
    event.preventDefault();

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const url = 'http://127.0.0.1:8000/user/login/forget-password/checkInfo/';
    const data = {
        email: document.getElementById('floatingInputEmail').value,
        name: document.getElementById('floatingInputUsername').value,
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
            let errorBox = document.getElementById('forget-password-error')
            let message = JSON.stringify(data['message'])
            if (message === '"accept"') {
                errorBox.innerHTML = ''
                let token = JSON.stringify(data['token'])
                window.location.href = `http://127.0.0.1:8000/user/login/forget-password/${token.replace(/\"/g, "")}`
            } else {
                errorBox.innerHTML = message.replace(/\"/g, "")
            }
        })
        .catch(error => {
            console.error('خطا در ارسال درخواست:', error);
        });
})