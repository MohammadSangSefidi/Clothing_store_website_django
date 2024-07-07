let ordersList = document.getElementById('orders-list')
let pagination_div = document.getElementById('pagination-div')

let num_input_order = document.getElementById('num-input')

let ordersEndpoint = `${baseURL}/userPanel/${num_input_order.value}/orders/${userId}/?page=${num_input_order.value}`
let ordersOption = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6'
    }
}

function change_to_detail(orderId) {
    let itemsEndpoint = `${baseURL}/userPanel/${num_input.value}/orders/${userId}/${orderId}/`
    let itemsOption = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6'
        }
    }

    fetch(itemsEndpoint, itemsOption)
        .then(response => response.json())
        .then(data => {
            let orderIdDiv = document.getElementById('order-id-div')
            orderIdDiv.innerHTML = `<span class="main-color-one-color fw-bold">شماره سفارش:</span> 200${data.cartInfo.id}`

            let orderDataTimeDiv = document.getElementById('order-data-time-div')
            orderDataTimeDiv.innerHTML = `<i class="bi bi-clock-fill me-2"></i>${data.cartInfo.paid_date}`

            let orderAddressDiv = document.getElementById('order-address-div')
            orderAddressDiv.innerHTML = data.cartInfo.address

            let sumPricesDiv = document.getElementById('sum-prices-div')
            sumPricesDiv.innerHTML = `${data.cartInfo.sum_prices} <span>تومان</span>`

            let sumDiscountsDiv = document.getElementById('sum-discounts-div')
            sumDiscountsDiv.innerHTML = `${data.cartInfo.sum_discounts} <span>تومان</span>`

            let finallPriceDiv = document.getElementById('finall-price-div')
            finallPriceDiv.innerHTML = `${data.cartInfo.final_price} <span>تومان</span>`
            for (let item of data.message) {
                let orderProductsList = document.getElementById('order-products-list')
                orderProductsList.innerHTML = `<div class="col-sm-6">
                                    <div class="cart-canvas border rounded-3 p-3">
                                        <div class="row align-items-center">
                                            <div class="col-4 ps-0">
                                                <img alt="" src="${item.product.image}" width="200">
                                            </div>
                                            <div class="col-8">
                                                <h3 class="text-overflow-2 font-16">${item.product.title}
                                                </h3>
                                                <div class="product-box-suggest-price my-2  d-flex align-items-center justify-content-between">
                                                    <ins class="font-25 ms-0">${item.product.price} <span>تومان</span></ins>
                                                </div>
                                                <div class="cart-canvas-foot d-flex align-items-center justify-content-between">
                                                    <div class="cart-canvas-count">
                                                        <span>تعداد:</span>
                                                        <span class="fw-bold">${item.count}</span>
                                                    </div>
                                                    <div>
                                                        <span>قیمت نهایی کل:</span>
                                                        <span>${item.final_price} تومان</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>` + orderProductsList.innerHTML
            }
            orders.classList.add('dis-none')
            orders.classList.remove('dis-block')

            orderDetail.classList.add('dis-block')
            orderDetail.classList.remove('dis-none')
        })

}


fetch(ordersEndpoint, ordersOption)
    .then(response => response.json())
    .then(data => {
        if (data.detail === 'صفحه نامعتبر') {
            document.location.href = baseURL + '/404_page/'
        }
        add_pagination(data, pagination_div, num_input_order, baseURL +`/userPanel/`, 5)
        let func = `change_to_detail(${data})`
        let num = 1
        if (data.results.length > 0) {
            for (let order of data.results) {
                let priceTd = ''
                let is_paidTd = ''
                let paid_dateTd = ''
                let detailTd = ''
                if (order.is_paid) {
                    priceTd = `<td class="font-14">${order.final_price} تومان</td>`
                    is_paidTd = `<td class="font-14"><a href="" class="title-font">پرداخت شده</a></td>`
                    paid_dateTd = `<td class="font-14">${order.paid_date}</td>`
                    detailTd = `<td class="font-14">
                                <a class="btn border-0 main-color-one-bg waves-effect waves-light"><i
                                class="bi bi-chevron-left" onclick="change_to_detail(${order.id})"></i></a>
                            </td>`
                } else {
                    priceTd = `<td class="font-14">${order.full_price} تومان</td>`
                    is_paidTd = `<td class="font-14"><a href="" class="title-font">سبد خرید در انتظار پرداخت</a></td>`
                    paid_dateTd = `<td class="font-14">پرداخت نشده</td>`
                    detailTd = `<td class="font-14">
                                <a href="${baseURL}/cart/" class="btn border-0 main-color-one-bg waves-effect waves-light"><i
                                class="bi bi-chevron-left"></i></a>
                            </td>`
                }

                ordersList.innerHTML = ordersList.innerHTML + `<tr>
                                    <td class="font-14">${num}</td>
                                    <td class="font-14">200${order.id}</td>
                                    ${paid_dateTd}
                                    ${priceTd}
                                    ${is_paidTd}
                                    ${detailTd}
                                </tr>`
                num += 1
            }
        }else {
            ordersList.innerHTML = ordersList.innerHTML + `<tr>
                                    <td class="font-14">هنوز سفارشی ثبت نکرده اید.</td>
                                </tr>`
        }
    })
