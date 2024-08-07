let button = document.getElementById('forget-password-button')
button.addEventListener('click', function (event) {
    event.preventDefault();

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const url = baseURL + '/user/login/forget-password/checkInfo/';
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
            'Authorization': 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6',
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
                window.location.href = `${baseURL}/user/login/forget-password/${token.replace(/\"/g, "")}`
            } else {
                errorBox.innerHTML = message.replace(/\"/g, "")
            }
        })
        .catch(error => {
            console.error('خطا در ارسال درخواست:', error);
        });
})