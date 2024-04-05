let slug = document.getElementById('slug').value
let error = document.getElementById('comment-error')
let commentButton = document.getElementById('submit-comment')

let name_input = document.getElementById('comment-name-input')
let email_input = document.getElementById('comment-email-input')
let text_input = document.getElementById('comment-text-input')



commentButton.addEventListener('click', (event) => {
    event.preventDefault();
    let selectedValue = null
    try {
        selectedValue = document.querySelector('input[name="rating"]:checked').value
    } catch (error) {
        selectedValue = 0
    }

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const url = `http://127.0.0.1:8000/products/detail/${slug}/sendComments/`;
    const data = {
        name: name_input.value,
        email: email_input.value,
        score: selectedValue,
        commentText: text_input.value,
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
        .then(res => {
            console.log(res.message)
            if (res.message === 'accept') {
                error.innerHTML = ''
                name_input.value = ''
                email_input.value = ''
                text_input.value = ''
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "نظر شما ارسال بعد از تایید اضافه می شود",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                error.innerHTML = res.message
            }
        })
        .catch(error => {
            error.innerHTML = error
        })
})