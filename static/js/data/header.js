let menu = document.getElementById('category-menu')

let endpoint = 'http://127.0.0.1:8000/products/categories/gotCategory/'
let option = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Karim 18757dc30ccc50dc0bd54f5f2150c9c0da4228d6'
    }
}

fetch(endpoint, option)
    .then(response => response.json())
    .then(data => {
        let parents = []
        let childs = []
        for (let category of data) {
            if (category.parent === null) {
                parents.push(category)
            }
            else {
                childs.push(category)
            }
        }
        for (let parent of parents){
            let title = JSON.stringify(parent.title)
            let id = JSON.stringify(parent.id)
            let slug = JSON.stringify(parent.slug)
            menu.innerHTML = menu.innerHTML + `<li id="${id}parent"><a href="http://127.0.0.1:8000/products/categories/${slug.replace(/\"/g, "")}/1"><i class="bi bi-chevron-left"> </i>${title.replace(/\"/g, "")}</a><ul class="level-two" id="${id}"> </ul> </li>`
        }
        for (let child of childs){
            let parentStr = JSON.stringify(child.parent.id)
            let parentSlug = JSON.stringify(child.parent.slug)
            let slug = JSON.stringify(child.slug)
            let parent = document.getElementById(parentStr)
            let name = JSON.stringify(child.title)
            parent.innerHTML = parent.innerHTML + `<li><a href="http://127.0.0.1:8000/products/categories/${parentSlug.replace(/\"/g, "")}/${slug.replace(/\"/g, "")}/1">${name.replace(/\"/g, "")}</a></li>`
        }
        for (let parent of parents){
            let parentStr = JSON.stringify(parent.id)
            let title = JSON.stringify(parent.title)
            let slug = JSON.stringify(parent.slug)
            let parentDiv = document.getElementById(parentStr)
            if (parentDiv.innerHTML === ' '){
                let div = document.getElementById(`${parentStr}parent`)
                div.parentNode.removeChild(div)
                menu.innerHTML = menu.innerHTML + `<li><a href="http://127.0.0.1:8000/products/categories/${slug.replace(/\"/g, "")}/1">${title.replace(/\"/g, "")}</a></li>`
            }
        }
    })

let search_button = document.getElementById('search-button')
let search_input_header = document.getElementById('search-input-header')

search_button.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(search_input_header)
    document.location.href = `http://127.0.0.1:8000/products/search/${search_input_header.value}/1`
})



