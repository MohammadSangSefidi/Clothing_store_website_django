function add_to_cart(userId, productId, count, colorId, sizeId) {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const url = baseURL + '/cart/addToCart/';
    const data = {
        userId: userId,
        product: productId,
        color: colorId,
        size: sizeId,
        count: count,
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
            if (data.message === 'accept') {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "محصول به سبد خرید اضافه شد",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        })
}

function change_cart_item_count(itemId, count, add, inputId, priceDivId, sumPricesDivId, sumDiscountsDivId, fullPriceDivId) {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const url = baseURL + '/cart/changeCartItemCunt/';
    const data = {
        id: itemId,
        count: count,
        add: add,
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
            if (data.message === 'accept') {
                if (add) {
                    const input = document.getElementById(inputId)
                    input.value = `${parseInt(input.value) + 1}`
                    const priceDiv = document.getElementById(priceDivId)
                    priceDiv.innerHTML = data.newPrice + '<span class="mb-0 text-muted-two font-14 fw-lighter">تومان</span>'
                } else {
                    const input = document.getElementById(inputId)
                    input.value = `${parseInt(input.value) - 1}`
                    const priceDiv = document.getElementById(priceDivId)
                    priceDiv.innerHTML = data.newPrice + '<span class="mb-0 text-muted-two font-14 fw-lighter">تومان</span>'
                }
                const sumPricesDiv = document.getElementById(sumPricesDivId)
                sumPricesDiv.innerHTML = `${data.newCartInfo.sumPrices} تومان`

                const sumDiscountsDiv = document.getElementById(sumDiscountsDivId)
                sumDiscountsDiv.innerHTML = `${data.newCartInfo.sumDiscounts} تومان`

                const fullPriceDiv = document.getElementById(fullPriceDivId)
                fullPriceDiv.innerHTML = `${data.newCartInfo.fullPrice} تومان`

            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        })
}

function delete_cart_item(itemId) {
    Swal.fire({
        title: "آیا از حذف محصول از سبد خرید مطمئنی؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله",
        cancelButtonText: "خیر"
    }).then((result) => {
        if (result.isConfirmed) {
            const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
            const url = baseURL + '/cart/deleteItem/';
            const data = {
                id: itemId,
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
                    if (data.message === 'accept') {
                        document.location.reload()
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: data.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        }
    });


}
