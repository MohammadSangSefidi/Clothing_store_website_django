let tabel = document.getElementById('cart-products-tabel')

let cartPricesDiv = document.getElementById('cart-prices-div')
let cartDiscountsDiv = document.getElementById('cart-discounts-div')
let cartFullPriceDiv = document.getElementById('cart-full-price-div')

let cartCountDiv = document.getElementById('cart-count-div')

let userId = document.getElementById('is-login')

let cartEndpoint = baseURL + `/cart/gotProducts/${userId.value}/`
let cartOption = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6'
    }
}

fetch(cartEndpoint, cartOption)
    .then(response => response.json())
    .then(data => {
        if (data.message !== 'user is not valid') {
            cartPricesDiv.innerHTML = `${data.cartInfo.sum_prices} تومان`
            cartDiscountsDiv.innerHTML = `${data.cartInfo.sum_discounts} تومان`
            cartFullPriceDiv.innerHTML = `${data.cartInfo.full_price} تومان`
            cartCountDiv.innerHTML = `(${data.message.length} کالا)`
            for (let item of data.message) {
                let size_div = ''
                let color_div = ''
                if (item.size !== null){
                    size_div = `<div class="item d-flex align-items-center ms-lg-3">
                                                            <div class="icon"><i class="bi bi-bounding-box-circles"></i>
                                                            </div>
                                                            <div class="saller-name mx-2">سایز:</div>
                                                            <div class="saller-name text-muted">${item.size}</div>
                                                        </div>`
                }

                if (item.color !== null){
                    color_div = `<div class="item d-flex align-items-center ms-lg-3">
                                                            <div class="icon"><i class="bi bi-palette2"></i></div>
                                                            <div class="saller-name mx-2">رنگ:</div>
                                                            <div class="saller-name text-muted">
                                                                <div class="product-meta-color-items mt-0"
                                                                     style="line-height: 1">
                                                                    <span class="seller-color"
                                                                          style="background-color: #${item.color}"></span>
                                                                </div>
                                                            </div>
                                                        </div>`
                }

                let product_image = item.product.image
                tabel.innerHTML = `<tbody>
                                            <tr>
                                                <td class="text-center align-middle">
                                                    <a data-bs-toggle="tooltip" class="p-4"
                                                       data-bs-placement="top" data-bs-title="حذف محصول از سبد خرید">
                                                        <i class="bi bi-x-lg" onclick="delete_cart_item('${item.id}')"></i>
                                                    </a>
                                                </td>
                                                <td colspan="2" class="text-center align-middle">
                                                    <a href="http://127.0.0.1:8000/products/detail/${item.product.slug}/">
                                                        <img src="${product_image}" width="100"
                                                             alt="">
                                                    </a>
                                                </td>
                                                <td class="align-middle">
                                                    <h5 class="fw-light">${item.product.title}</h5>

                                                    <div class="d-flex flex-lg-row flex-column mt-4 justify-content-start  align-items-lg-center align-items-start">
                                                        <div class="item d-flex align-items-center">
                                                            <div class="icon"><i class="bi bi-shop"></i></div>
                                                            <div class="saller-name mx-2">فروشنده:</div>
                                                            <div class="saller-name text-muted">${item.product.seller}</div>
                                                        </div>
                                                        ${size_div}
                                                        
                                                        ${color_div}
                                                    </div>

                                                </td>
                                                <td class="counter text-center align-middle">
                                                    <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                                                        <span class="input-group-btn input-group-prepend bootstrap-touchspin-injected" onclick="change_cart_item_count(${item.id}, 1, false, 'item-count-input-${item.id}', 'item-final-price-${item.id}', 'cart-prices-div', 'cart-discounts-div', 'cart-full-price-div')">
                                                        <button class="btn-counter waves-effect waves-light bootstrap-touchspin-down" type="button">-</button>
                                                        </span>
                                                        <input type="number" name="count" readonly class="counter form-counter" value="${item.count}" id="item-count-input-${item.id}">
                                                        <span class="input-group-btn input-group-append bootstrap-touchspin-injected" onclick="change_cart_item_count(${item.id}, 1, true, 'item-count-input-${item.id}', 'item-final-price-${item.id}', 'cart-prices-div', 'cart-discounts-div', 'cart-full-price-div')">
                                                        <button class="btn-counter waves-effect waves-light bootstrap-touchspin-up" type="button">+</button>
                                                        </span>
                                                        </div>
                                                </td>
                                                <td class="text-center align-middle">
                                                    <h5 class="title-font main-color-one-color h2 mb-0" id="item-final-price-${item.id}">${item.final_price} <span
                                                            class="mb-0 text-muted-two font-14 fw-lighter">تومان</span>
                                                    </h5>
                                                </td>
                                            </tr>
                                            </tbody>` + tabel.innerHTML
            }
        }
        else {
            document.location.href = baseURL
        }
    })