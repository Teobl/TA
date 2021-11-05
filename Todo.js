const form = document.querySelector("form");
const input = document.querySelector("input");
const todos = document.getElementById("todos");
const footer = document.getElementById("extra");
const item = document.getElementById("item");
const number = document.getElementById("number");
const buttonClear = document.getElementById("clear");
const buttonSelect = document.getElementById("select");

let counter = 0; 
const todoList = [];
let activeList = [];
let completeList = [];

form.onsubmit = async event => {
    event.preventDefault();

    document.addEventListener("keyup", function(event) {

//Körs om från keyup-event, if-satsen hindrar        
        if (input.value != "")
        {
        let text = input.value;
        
//Skapar en "todo" när man trycker enter
        if (event.key === 'Enter') 
        {
            counter++;

            let todoLi = document.createElement("li");
            todoLi.setAttribute("id", "Li"+ counter);
            todoLi.setAttribute("value", "active");

            let div = document.createElement("div");
            div.setAttribute("id", "div");
            div.style.display = "grid";
            todoLi.appendChild(div);

            let complete = document.createElement("input");
            complete.setAttribute("id", "toggle"+ counter);
            complete.setAttribute("type", "checkbox");

            let label = document.createElement("label");
            label.setAttribute("id", "active");
            label.innerText = text;

            let remove = document.createElement("button");
            remove.setAttribute("id", "remove");
            remove.setAttribute("type", "button");
            remove.innerHTML = "❌";

            div.appendChild(complete);
            div.appendChild(label);
            div.appendChild(remove);
            
            todos.appendChild(todoLi);
            todoList.push(todoLi); 
            activeList.push(todoLi);

            amount();

            input.value = "";
        }     
    }
    });
}

//Körs när pil-neråt knappen trycks
buttonSelect.addEventListener("click", function(event) {
  
    if(todoList.length != completeList.length)
    {
        activeList = [];
        select(completeList, "completed", true);
    }

    else
    {
        completeList = [];
        select(activeList, "active", false);
    }

});

//Click-events om något klickas i en todo
todos.addEventListener("click", function(event) {
    
    const target = event.target;

//Delete-knappen
    if(target.type == "button")
    {
        buttonRed(target);
        amount();
    }

//Checkboxen
    if(target.type == "checkbox")
    {
        if(target.checked)
        {   
            check(target, "completed");
        }

        if(target.checked === false)
        {
            check(target, "active");
        }
    }
});


//Click-events om något klickas i footern
footer.addEventListener("click", function(event) {
    
    const target = event.target;

    if(target.value == "all")
    {
        option("grid", "grid");
    }

    if(target.value == "active")
    {
        option("none", "grid");
    }

    if(target.value == "completed")
    {
        option("grid", "none");
    }

    if(target.value == "clear")
    {
        clear();
    }

});

//Check körs för checkboxen, hjälper med att hantera statusen för todos
function check(target, label) {
    
    const parent = target.parentElement;
    const text = parent.getElementsByTagName("label")[0];
    text.setAttribute("id", label);
    const list = parent.parentElement;
    list.setAttribute("value", label);

    if(label == "active")
    {
        editList(list, activeList, completeList);
    }

    if(label == "completed")
    {
        editList(list, completeList, activeList);
    }
}

//Ändrar listorna beroende på om todon är klar eller inte
function editList(list, addList, removeList) {
    
    addList.push(list);
    removeIndex(removeList, list, false);
    amount();
}

//Tar bort todo
function buttonRed(target) {
    
    let removed = target.parentElement;
    removed = removed.parentElement;
    
    if(removed.attributes.value.nodeValue == "completed")
    {
        removeIndex(completeList, removed, false);
    }
    
    if(removed.attributes.value.nodeValue == "active")
    {
        removeIndex(activeList, removed, false);
    }
    
    removeIndex(todoList, removed, true);
}

//Körs för knapparna i footern, hjälper med vad som visas
function option(style1, style2) {
    
    const nodeList = todos.childNodes;

        for (let i = 0; nodeList.length > i; i++ )
        {
            if(nodeList[i].attributes.value.nodeValue == "completed") 
            {
                nodeList[i].style.display = style1;
            }

            if(nodeList[i].attributes.value.nodeValue == "active") 
            {
                nodeList[i].style.display = style2;
            }
        }
}

//Selectar eller deselectar alla todos och ändrar listorna
function select(onList, text, checkBool) {
   
    for(let i = 0; i <= todoList.length - 1; i++)
    {
        const div = todoList[i].firstElementChild;

        const label = div.childNodes[1];
        label.setAttribute("id", text);

        const checkbox = div.firstElementChild;
        checkbox.checked = checkBool;

        if(!onList.includes(todoList[i]))
        {
            todoList[i].setAttribute("value", text);
            onList.push(todoList[i]);
        }

        }
    
    amount();
}

//Tar bort todos som är "completed"
function clear() {

    const nodeList = todos.childNodes;
    let length = nodeList.length - 1;

        for (let i = length; i >= 0; i-- )
        {
            if(nodeList[i].attributes.value.nodeValue == "completed") 
            {
                removeIndex(todoList ,nodeList[i], true);
            }
        }
    completeList = [];    
    amount();
}

//Tar bort element i listor
function removeIndex(targetList, element, bool) {

    let index = targetList.indexOf(element);
    targetList.splice(index, 1);
    
    if(bool == true)
    {
        element.remove();
    }
}

//Körs efter varje ändring i listorna, hanterar displayen på "item" och footern
function amount() {
    
    if(activeList.length == 1)
    {
        item.innerText = " item left";
    }

    else
    {
        item.innerText = " items left";
    }
    
    number.innerText = activeList.length;

    if(completeList.length <= 0) 
    {
        buttonClear.hidden = true;
    }

    else
    {
        buttonClear.hidden = false;
    }

    if(todoList.length <= 0)
    {
        footer.hidden = true;
    }

    else
    {
        footer.hidden = false;
    }
}
