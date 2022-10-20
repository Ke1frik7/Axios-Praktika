let parentArray = []
axios("https://www.omdbapi.com/?&apikey=d2a95b94&s=hack")
.then(response => {
    clones(response.data.Search)
})
let template = renderElement("template").content
let parent = renderElement(".result")
function clones(data){
    let varieble = data
    options(varieble)
    for(let i = 0; i<data.length; i++){
        let clon =structuredClone( data[i])
        let clone = template.cloneNode(true)
        let img = clone.querySelector(".img_top")
        img.src = clon.Poster
        let title = clone.querySelector(".card_title")
        title.textContent = clon.Title
        let year = clone.querySelector(".year")
        year.textContent = clon.Year
        let btn = clone.querySelector("#local")
        btn.dataset.id = clon.imdbID
        parent.appendChild(clone)
    }
}
let optionsArray = []
function options(arr){
    
    for(let i = 0; i<arr.length; i++){
        let types = arr[i].Type
        if(!optionsArray.includes(arr[i].Type)){
            optionsArray.push(arr[i].Type)
            optionreate(arr[i].Type)        }
            // values(arr[i].Type)
        }
}
let optionElementArray = []
function optionreate(element){
    if(!optionElementArray.includes(element)){
        optionElementArray.push(element) 
        values(optionElementArray)       
    }
}
let cates_select = renderElement("#cates_select")
function values(arr){
    for(let i = 0; i<arr.length; i++){
        console.log(arr[i])
        let option = createTag("option")
        option.appendChild(textNode(arr[i]))
        cates_select.appendChild(option)
    }
}
let input = renderElement(".input")
let selectSort = elementId("sorts_select")
function filter(e){
    e.preventDefault()
    let allArray = []
    let optionValue = cates_select.value
    let rejex1 = new RegExp(optionValue, "gi")
    axios("https://www.omdbapi.com/?&apikey=d2a95b94&s=hack")
    .then((response) => {
        let result = response.data.Search
        if(optionValue == "all"){
            allArray = result
            parent.innerHTML = null
            for(let i = 0; i<allArray.length; i++){
                let clon =structuredClone( allArray[i])
                let clone = template.cloneNode(true)
                let img = clone.querySelector(".img_top")
                img.src = clon.Poster
                let title = clone.querySelector(".card_title")
                title.textContent = clon.Title
                let year = clone.querySelector(".year")
                year.textContent = clon.Year
                let btn = clone.querySelector("#local")
                btn.dataset.id = clon.imdbID
                parent.appendChild(clone)
            }
        }else if(optionValue !=="all"){
            console.log(result)
            allArray = result.filter((item) => item.Type.match(rejex1))
            console.log(allArray)
            parent.innerHTML = null
            for(let i = 0; i<allArray.length; i++){
                let clon =structuredClone( allArray[i])
                let clone = template.cloneNode(true)
                let img = clone.querySelector(".img_top")
                img.src = clon.Poster
                let title = clone.querySelector(".card_title")
                title.textContent = clon.Title
                let year = clone.querySelector(".year")
                year.textContent = clon.Year
                let btn = clone.querySelector("#local")
                btn.dataset.id = clon.imdbID
                parent.appendChild(clone)
            }
        }
        let inputValue = input.value
        let rejex = new RegExp(inputValue, "gi")
        if(inputValue == "all"){
            allArray = result
            parent.innerHTML = null
            for(let i = 0; i<allArray.length; i++){
                let clon =structuredClone( allArray[i])
                let clone = template.cloneNode(true)
                let img = clone.querySelector(".img_top")
                img.src = clon.Poster
                let title = clone.querySelector(".card_title")
                title.textContent = clon.Title
                let year = clone.querySelector(".year")
                year.textContent = clon.Year
                let btn = clone.querySelector("#local")
                btn.dataset.id = clon.imdbID
                parent.appendChild(clone)
            }
        }else if(inputValue !== "all"){
            parent.innerHTML = null
            allArray = allArray.filter((item) => item.Title.match(rejex))   
            for(let i = 0; i<allArray.length; i++){
                let clon =structuredClone( allArray[i])
                let clone = template.cloneNode(true)
                let img = clone.querySelector(".img_top")
                img.src = clon.Poster
                let title = clone.querySelector(".card_title")
                title.textContent = clon.Title
                let year = clone.querySelector(".year")
                year.textContent = clon.Year
                let btn = clone.querySelector("#local")
                btn.dataset.id = clon.imdbID
                parent.appendChild(clone)
            }
        }
        sorting(result)
    })
}
renderElement("#form").addEventListener("submit", filter)
let object = {
    az: function(a, b) {
        if(a.Title < b.Title){
            return 1
        }else{
            return -1
        }
    }, 
    new: function(a, b){
        if(a.Year < b.Year){
            return -1
        }else{
            return 1
        }
    }, 
    old: function(a,b){
        if(a.Year > b.Year){
            return -1
        }else{
            return 1
        }
    }   ,
    rating: function(a,b){
        if(a.Title > b.Title){
            return 1
        }else{
            return -1
        }
    }
}
function sorting(arr){
    let sortValue = selectSort.value
    let sortingArray = arr.sort(object[sortValue])
    parent.innerHTML = null
    sortingArray.map((item) => {
        let clon = structuredClone(item)
        let clone = template.cloneNode(true)
        let img = clone.querySelector(".img_top")
        img.src = clon.Poster
        let title = clone.querySelector(".card_title")
        title.textContent = clon.Title
        let year = clone.querySelector(".year")
        year.textContent = clon.Year
        let btn = clone.querySelector("#local")
        btn.dataset.id = clon.imdbID
        parent.appendChild(clone)       
    })
    console.log(sortingArray)
}
let localsStorage = {
    name: null,
    year: null,
    image: null
}
let resultLocals = renderElement(".result_locals")
let images = createTag("img")
window.addEventListener("click", (e) => {
    if(e.target.matches("#local")){
        let id = e.target.dataset.id
        axios(`https://www.omdbapi.com/?&apikey=d2a95b94&s=hack`)
        .then((response) => {
            let array = response.data.Search
            for(let i = 0 ; i<10; i++){
                if(array[i].imdbID == id){
                    localsStorage.name = array[i].Title
                    localsStorage.year = array[i].Year
                    localsStorage.image = array[i].Poster
                    window.localStorage.setItem("localAxios", JSON.stringify(localsStorage))
                    console.log(JSON.parse(window.localStorage.getItem("localAxios")).name)
                    images.src = JSON.parse(window.localStorage.getItem("localAxios")).image
                    resultLocals.appendChild(images)
                }  
            }
        })
    }else{
        console.log(false)
    }
})
images.src = JSON.parse(window.localStorage.getItem("localAxios")).image
resultLocals.appendChild(images)
renderElement(".local_btn").addEventListener("click", () =>{
    resultLocals.classList.toggle("minuss")
})