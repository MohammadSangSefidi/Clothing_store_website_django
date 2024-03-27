let button = document.getElementById('submit')
button.addEventListener('click', function (event) {
    event.preventDefault()
})
let input = document.getElementById('otp-value')
input.addEventListener('input', function (event) {
    // event.preventDefault()

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const url = window.location.href + '/check-active-code/';
    const data = {
        emailActivateCode: document.getElementById('otp-value').value,
        csrfmiddlewaretoken: csrfToken
    };
    console.log(data)
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
            let errorBox = document.getElementById('confirm-email-error')
            let message = JSON.stringify(data['message'])
            if (message === '"accept"') {
                errorBox.innerHTML = ''
                window.location.href = 'http://127.0.0.1:8000/user/login/'
            } else {
                errorBox.innerHTML = message.replace(/\"/g, "")
            }
        })
        .catch(error => {
            console.error('خطا در ارسال درخواست', error);
        })
})