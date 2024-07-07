let orders = document.getElementById('orders')
let ordersButton = document.getElementById('orders-button')
let ordersText = document.getElementById('orders-text')

let ordersButtonMobile = document.getElementById('orders-button-mobile')
let ordersTextMobile = document.getElementById('orders-text-mobile')

let changePassword = document.getElementById('change-password')
let changePasswordButton = document.getElementById('change-password-button')
let changePasswordText = document.getElementById('change-password-text')

let changePasswordButtonMobile = document.getElementById('change-password-button-mobile')
let changePasswordTextMobile = document.getElementById('change-password-text-mobile')

let address = document.getElementById('address')
let addressButton = document.getElementById('address-button')
let addressText = document.getElementById('address-text')

let addressButtonMobile = document.getElementById('address-button-mobile')
let addressTextMobile = document.getElementById('address-text-mobile')

let createAddressButton = document.getElementById('add-address-button')
let addressCreate = document.getElementById('address-create')

let orderDetail = document.getElementById('order_detail')

let favorites = document.getElementById('favorites')
let favoritesButton = document.getElementById('favorites-button')
let favoritesText = document.getElementById('favorites-text')

let favoritesButtonMobile = document.getElementById('favorites-button-mobile')
let favoritesTextMobile = document.getElementById('favorites-text-mobile')

let closeButton = document.getElementById('close-button')

let activePage = orders

let activeButton = ordersButton
let activeButtonMobile = ordersButtonMobile

let activeText = ordersText
let activeTextMobile = ordersTextMobile


function changePage(button, text, page, is_mobile) {
    if (activePage !== page){
        page.classList.remove('dis-none')
        page.classList.add('dis-block')
        activePage.classList.remove('dis-block')
        activePage.classList.add('dis-none')

        addressCreate.classList.remove('dis-block')
        addressCreate.classList.add('dis-none')

        orderDetail.classList.remove('dis-block')
        orderDetail.classList.add('dis-none')

        button.classList.add('active')
        if (is_mobile){
            activeButtonMobile.classList.remove('active')
        }
        else {
            activeButton.classList.remove('active')
        }

        text.classList.add('panel-active')
        if (is_mobile){
            activeTextMobile.classList.remove('panel-active')
        }
        else {
            activeText.classList.remove('panel-active')
        }

        activePage = page
        if (is_mobile){
            activeButtonMobile = button
            activeTextMobile = text
            closeButton.click()
        }
        else {
            activeButton = button
            activeText = text
        }
    }
}

ordersButtonMobile.addEventListener('click', function (event) {
    event.preventDefault()
    changePage(ordersButtonMobile, ordersTextMobile, orders, true)
})
changePasswordButtonMobile.addEventListener('click', function (event) {
    event.preventDefault()
    changePage(changePasswordButtonMobile, changePasswordTextMobile, changePassword, true)
})
addressButtonMobile.addEventListener('click', function (event) {
    event.preventDefault()
    changePage(addressButtonMobile, addressTextMobile, address, true)
})
favoritesButtonMobile.addEventListener('click', function (event) {
    event.preventDefault()
    changePage(favoritesButtonMobile, favoritesTextMobile, favorites, true)
})

ordersButton.addEventListener('click', function (event) {
    event.preventDefault()
    changePage(ordersButton, ordersText, orders, false)
})
changePasswordButton.addEventListener('click', function (event) {
    event.preventDefault()
    changePage(changePasswordButton, changePasswordText, changePassword, false)
})
addressButton.addEventListener('click', function (event) {
    event.preventDefault()
    changePage(addressButton, addressText, address, false)
})
favoritesButton.addEventListener('click', function (event) {
    event.preventDefault()
    changePage(favoritesButton, favoritesText, favorites, false)
})



createAddressButton.addEventListener('click', function (event){
    event.preventDefault()
    addressCreate.classList.remove('dis-none')
    addressCreate.classList.add('dis-block')
    activePage.classList.remove('dis-block')
    activePage.classList.add('dis-none')
})
