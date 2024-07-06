let ChangePasswordButton = document.getElementById('save-new-password-button')

ChangePasswordButton.addEventListener('click', function (event) {
    event.preventDefault();
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const url = `${baseURL}/userPanel/${num_input.value}/changePassword/${userId}/`;
    const data = {
        oldPassword: document.getElementById('floatingInputoldPasswd').value,
        password: document.getElementById('floatingInputNewPasswd').value,
        confirmPassword: document.getElementById('floatingInputConfirmPasswd').value,
        csrfmiddlewaretoken: csrfToken
    }
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
            let errorBox = document.getElementById('change-password-error')
            let message = JSON.stringify(data['message'])
            if (message === '"accept"') {
                errorBox.innerHTML = ''
                window.location.href = `${baseURL}/user/login/`
            } else {
                errorBox.innerHTML = message.replace(/\"/g, "")
            }
        })
        .catch(error => {
            console.error('خطا در ارسال درخواست', error);
        })
})

