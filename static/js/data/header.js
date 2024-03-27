let menu = document.getElementById('category-menu')

let endpoint = 'http://127.0.0.1:8000/categories/'
let option = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Karim b0bee3d83043a95a22bc0adaf81456b67eb903f6'
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
            menu.innerHTML = menu.innerHTML + `<li id="${id}parent"><a href=""><i class="bi bi-chevron-left"> </i>${title.replace(/\"/g, "")}</a><ul class="level-two" id="${id}"> </ul> </li>`
        }
        for (let child of childs){
            let parentStr = JSON.stringify(child.parent.id)
            let parent = document.getElementById(parentStr)
            let name = JSON.stringify(child.title)
            parent.innerHTML = parent.innerHTML + `<li><a href="">${name.replace(/\"/g, "")}</a></li>`
        }
        for (let parent of parents){
            let parentStr = JSON.stringify(parent.id)
            let title = JSON.stringify(parent.title)
            let parentDiv = document.getElementById(parentStr)
            if (parentDiv.innerHTML === ' '){
                let div = document.getElementById(`${parentStr}parent`)
                div.parentNode.removeChild(div)
                menu.innerHTML = menu.innerHTML + `<li><a href="">${title.replace(/\"/g, "")}</a></li>`
            }
        }
    })



