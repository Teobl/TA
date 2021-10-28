const form = document.querySelector("form");
const input = document.querySelector("input");
const todos = document.getElementById("todos");

form.onsubmit = async event => {
    event.preventDefault();

    let text = input.value;
    let number = 0;

    document.addEventListener("keyup", function(event) {
        if (event.key === 'Enter') {
            let todoLi = document.createElement("li");
            let div = document.createElement("div");
            todoLi.appendChild(div);

            let complete = document.createElement("input");
            complete.setAttribute("id", "toggle");
            complete.setAttribute("type", "checkbox");

            let label = document.createElement("label");
            label.innerText = text;

            let remove = document.createElement("button");
            remove.setAttribute("id", "remove");
            remove.setAttribute("type", "button");

            div.appendChild(complete);
            div.appendChild(label);
            div.appendChild(remove);
            
            todos.appendChild(todoLi);      
           
            input.value = ""; 
        }    
    });

}
