let orders = document.getElementById('orders')
let ordersButton = document.getElementById('orders-button')
let ordersText = document.getElementById('orders-text')

let changePassword = document.getElementById('change-password')
let changePasswordButton = document.getElementById('change-password-button')
let changePasswordText = document.getElementById('change-password-text')

let address = document.getElementById('address')
let addressButton = document.getElementById('address-button')
let addressText = document.getElementById('address-text')

let createAddressButton = document.getElementById('add-address-button')
let addressCreate = document.getElementById('address-create')

let favorites = document.getElementById('favorites')
let favoritesButton = document.getElementById('favorites-button')
let favoritesText = document.getElementById('favorites-text')



let activePage = orders
let activeButton = ordersButton
let activeText = ordersText


function changePage(button, text, page) {
    if (activePage !== page){
        page.classList.remove('dis-none')
        page.classList.add('dis-block')
        activePage.classList.remove('dis-block')
        activePage.classList.add('dis-none')

        addressCreate.classList.remove('dis-block')
        addressCreate.classList.add('dis-none')

        button.classList.add('active')
        activeButton.classList.remove('active')

        text.classList.add('panel-active')
        activeText.classList.remove('panel-active')


        activePage = page
        activeButton = button
        activeText = text
    }
}

ordersButton.addEventListener('click', function (event) {
    event.preventDefault()
    changePage(ordersButton, ordersText, orders)
})
changePasswordButton.addEventListener('click', function (event) {
    event.preventDefault()
    changePage(changePasswordButton, changePasswordText, changePassword)
})
addressButton.addEventListener('click', function (event) {
    event.preventDefault()
    changePage(addressButton, addressText, address)
})
favoritesButton.addEventListener('click', function (event) {
    event.preventDefault()
    changePage(favoritesButton, favoritesText, favorites)
})

createAddressButton.addEventListener('click', function (event){
    event.preventDefault()
    addressCreate.classList.remove('dis-none')
    addressCreate.classList.add('dis-block')
    activePage.classList.remove('dis-block')
    activePage.classList.add('dis-none')
})
