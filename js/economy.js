
const divEco = document.querySelector("#eco_content")

function xhr_request(callback_functions=[], args={} ) {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
        if(xhr.readyState==4 && xhr.status == 200) {
               items = xhr.responseXML.querySelectorAll("item")

            for(let callback of callback_functions) {
                items = callback(items, args)
            }

               display_data1(divEco, items)
              
        }
        if(xhr.readyState==4 && xhr.status > 400) { 
            divEco.innerHTML = `"<h1>Error: ${xhr.status}</h1>"
            <p>${xhr.statusText}</p>`
        }
    }
    xhr.open("GET", "https://fivethirtyeight.com/economics/feed/")
    xhr.send()

}

function display_data1(divEco, items) {
    divEco.innerHTML = ""
    for(let item of items) {
        const title = item.querySelector("title").textContent
        const link = item.querySelector("link").textContent
        const guid = item.querySelector("guid").textContent
        const pubDate = item.querySelector("pubDate").textContent
        const description = item.querySelector("description").textContent
        const category = item.querySelector("category").textContent
        const wrapThumb = item.querySelector("img")
        const thumb = (wrapThumb != null) ? wrapThumb.getAttribute("src") : "https://www.da.style/uploads/shop/nophoto/nophoto.jpg"

        divEco.innerHTML += `
        <div class='card mb-3' style='max-width: 940px;'><div class='row g-0'><div class='col-md-4'><img src='${thumb}' class='img-fluid rounded-start'>
        </div><div class='col-md-8'><div class='card-body'><h5 class='card-title'>${title}</h5><p class='card-text'>${description}</p><p class='card-text'><small class='text-muted'>
        ${pubDate}</small></p>
        <p class='card-text'><p>Category: <a href="#category/${category}">${category}</a>
        </p><a href='${link}'target='_blank'>${link}</a></div></div></div></div>`
        
    }
}




function filter_by_category(items, args) {
    const divFilters = document.querySelector("#filters")
    divFilters.innerHTML = `
    Selected category: <span class="badge rounded-pill bg-secondary">
    ${args['category']}
    <button id="close_filter_category" type="button" class="btn-close" aria-label="Close"></button>  
    </span>`

    let filtered_items = []
    for(let item of items) {
        const category = item.querySelector("category").textContent

        if(args['category'] == category) {
            filtered_items.push(item)
        }

    }
    return filtered_items
}

    window.onload = (e) => xhr_request()

    document.body.onclick = (e) => {
        if (e.target.tagName == "A" && e.target.getAttribute("href").indexOf("#category") > -1) {
            const url = e.target.getAttribute("href")
            const split_url = url.split("/")
        xhr_request([filter_by_category], {"category": split_url[1] })
        }
        if(e.target.tagName === "BUTTON" && e.target.id == "close_filter_category") {
            xhr_request()
            const divFilters = document.querySelector("#filters")
            divFilters.innerHTML=""
        }
    }