let addressList = document.getElementById('address-list')

let addressEndpoint = `http://127.0.0.1:8000/userPanel/${num_input.value}/address/${userId}/`
let addressOption = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6'
    }
}

fetch(addressEndpoint, addressOption)
    .then(response => response.json())
    .then(data => {
        add_address(data, addressList, userId)
    })

let button = document.getElementById('save-address')

button.addEventListener('click', function (event) {
    event.preventDefault()
    let cityInput = document.getElementById('floatingInputCity1').value
    let stateInput = document.getElementById('floatingInputOstan1').value
    let addressInput = document.getElementById('floatingInputStreet1').value

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const url = `http://127.0.0.1:8000/userPanel/${num_input.value}/address/${userId}/createAddress/`;
    const data = {
        user: userId,
        city: cityInput,
        state: stateInput,
        address: addressInput,
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
            let errorBox = document.getElementById('address-error')
            let message = JSON.stringify(data['message'])
            if (message === '"accept"') {
                errorBox.innerHTML = ''
                window.location.href = `http://127.0.0.1:8000/userPanel/${num_input.value}/`
            } else {
                errorBox.innerHTML = message.replace(/\"/g, "")
            }
        })
        .catch(error => {
            console.error('خطا در ارسال درخواست:', error);
        });
})