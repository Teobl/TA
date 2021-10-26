const apiKey = "23627121-077833d750d6870252b4975b1";

const form = document.querySelector("form");
let images = document.getElementById("images");
let previous = document.getElementById("previous");
let next = document.getElementById("next");

let pageCounter = 1;
let divCounter;

form.onsubmit = async event => {
   
    event.preventDefault();
    
    const query = form.elements.color.value + "+" + form.elements.query.value;
    const queryString = new URLSearchParams({
        key: apiKey,
        q: query,
        per_page: 10,
        page : 1
    })

    const response = await fetch("https://pixabay.com/api/?" + queryString);
    const searchResult = await response.json();

    next.hidden = false;
    previous.hidden = true;
    divCounter = 1;
    images.innerHTML = "";
   
    if(searchResult.hits.length < 10)
        {
            next.hidden = true;
        }
    
    for(let i = 0; i < searchResult.hits.length; i++)
    {
        var img = document.createElement("img");
        var text = document.createElement("p");
        var author = document.createElement("p");
        var div = document.createElement("div");
        div.setAttribute("id", "div"+divCounter);
        
        img.src = searchResult.hits[i].webformatURL;
        text.textContent = searchResult.hits[i].tags;
        author.textContent = "Taken by: " + searchResult.hits[i].user;
        
        images.appendChild(div);
        div.appendChild(img);
        div.appendChild(text);
        div.appendChild(author);

        divCounter++;
    }  

    next.onclick = async event => {

        images.innerHTML = "";
        divCounter = 1;
        pageCounter++;

        queryString.set("page", pageCounter);
        const response = await fetch("https://pixabay.com/api/?" + queryString);
        const searchResult = await response.json();

        for(let i = 0; i < searchResult.hits.length; i++)
        {
            var img = document.createElement("img");
            var text = document.createElement("p");
            var author = document.createElement("p");
            var div = document.createElement("div");
            div.setAttribute("id", "div"+divCounter);
            
            img.src = searchResult.hits[i].webformatURL;
            text.textContent = searchResult.hits[i].tags;
            author.textContent = "Taken by: " + searchResult.hits[i].user;
            
            images.appendChild(div);
            div.appendChild(img);
            div.appendChild(text);
            div.appendChild(author);

            divCounter++;
        }

        if(searchResult.hits.length < 10  || pageCounter >= 51)
        {
            next.hidden = true;
        }
       
        previous.hidden = false;      
    }

    previous.onclick = async event => {
        
        images.innerHTML = "";
        divCounter = 1;
        pageCounter--;

        queryString.set("page", pageCounter);
        const response = await fetch("https://pixabay.com/api/?" + queryString);
        const searchResult = await response.json();

        for(let i = 0; i < searchResult.hits.length; i++)
        {
            var img = document.createElement("img");
            var text = document.createElement("p");
            var author = document.createElement("p");
            var div = document.createElement("div");
            div.setAttribute("id", "div"+divCounter);
            
            img.src = searchResult.hits[i].webformatURL;
            text.textContent = searchResult.hits[i].tags;
            author.textContent = "Taken by: " + searchResult.hits[i].user;
            
            images.appendChild(div);
            div.appendChild(img);
            div.appendChild(text);
            div.appendChild(author);

            divCounter++;
        }

        if(pageCounter == 1)
        {
            previous.hidden = true;
        }

        next.hidden = false;
    }
}



