
class ProjectCard extends HTMLElement{

    constructor(){

        super();
        const shadow = this.attachShadow({ mode: 'open' });

        let title = document.createElement("h2");
        let img = document.createElement("img");
        let description = document.createElement("p");
        let link = document.createElement("a");
        link.textContent = "Read More";
        
        let edit_button = document.createElement("button");
        edit_button.className = "edit";
        edit_button.textContent = "edit";

        let delete_button = document.createElement("button");
        delete_button.className = "delete";
        delete_button.textContent = "delete";

        let style = document.createElement("style");
        style.textContent = `

        img {
            height: 250px;
            width: 100%;
            
        }
        .content_container{
            display: grid;
            place-items: center;
            font-family: Georgia, 'Times New Roman', Times, serif;
        }
        footer{
            display:flex;
            flex-direction: row;
            justify-content: center;

        }
        button{
            margin: 1rem;
        }
        `;

        let footer = document.createElement("footer");
        footer.appendChild(edit_button);
        footer.appendChild(delete_button);
        

        let content_container = document.createElement("section");
        content_container.className = "content_container";
        content_container.appendChild(title);
        content_container.appendChild(description);
        content_container.appendChild(link);
        
        
        shadow.appendChild(img);
        shadow.appendChild(content_container);
        shadow.appendChild(footer);
        shadow.appendChild(style);
    }

    set setData(data){

        if (!data){
            return
        }
        
        let title = this.shadowRoot.querySelector("h2");
        let img = this.shadowRoot.querySelector("img");
        let description = this.shadowRoot.querySelector("p");
        let link = this.shadowRoot.querySelector("a");

        title.textContent = data['title'];
        img.setAttribute("src", data["source"]);
        description.textContent = data['text'];
        link.setAttribute("href", data["link"]);

        let edit_button = this.shadowRoot.querySelector(".edit");
        
        edit_button.addEventListener("click", function(){
            let container = document.querySelector("#update_form_container");
            if (container.firstChild){
                container.removeChild(container.firstChild);
            }
            let form = document.createElement("form");
            form.className = "update";
            form.innerHTML = `
            
            <label for="update_img">image link: </label>
            <input type="text" id="update_img" name="img" required>
            <br>
            <label for="update_title">title: </label>
            <input type="text" id="update_title" name="title" required>
            <br>
            <label for="update_description">Description</label>
            <input type="text" id="update_description" name="description" required>
            <br>
            <label for="update_link">Read more link </label>
            <input type="text" id="update_link" name="link" required>
            <br>
            <button type="button" id="update_btn">submit</button>
            
            `
            container.appendChild(form);
            editCard(data);
        });

        let delete_button = this.shadowRoot.querySelector(".delete");
        delete_button.addEventListener("click", function(){
            
            deleteCard(data["id"], data["type"]);
        })
    }

}

customElements.define("project-card", ProjectCard);


async function editCard(data){
    let project_data;
    if (data.type == "remote"){
        await fetch("https://api.jsonbin.io/v3/b/64ce8eb69d312622a38c728e").then(res => res.json()).
        then(some_data => project_data = some_data.record.data)

        
        let container = document.querySelector("#update_form_container");
        let title = document.querySelector("#update_title");
        title.value = data.title;
        let img = document.querySelector("#update_img");
        img.value = data.source

        let description = document.querySelector("#update_description");
        description.value = data.text;

        let link = document.querySelector("#update_link");
        link.value = data.link
        
        let button = document.querySelector("#update_btn");
        button.addEventListener("click", async function(e){
            e.preventDefault();
            for (let child of project_data){
                
                if (child.id == data.id){
                    
                    child.source = img.value;
                    child.text = description.value;
                    child.title = title.value;
                    child.link = link.value;
                    
                }
            }
            container.removeChild(container.firstChild);
            let new_data = {"data": project_data}
            await fetch("https://api.jsonbin.io/v3/b/64ce8eb69d312622a38c728e",{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": "$2b$10$qMSfokprJCm9trmr4IakZuGMbwYtJOIEyUaAN1CaYdl4KrdpwD8X6",
                },
                body: JSON.stringify(new_data)
            })

            refresh(project_data);
        })
    }else{
        
        project_data = JSON.parse(window.localStorage.getItem("projects"));
        let container = document.querySelector("#update_form_container");
        let title = document.querySelector("#update_title");
        title.value = data.title;
        let img = document.querySelector("#update_img");
        img.value = data.source

        let description = document.querySelector("#update_description");
        description.value = data.text;

        let link = document.querySelector("#update_link");
        link.value = data.link
        
        let button = document.querySelector("#update_btn");
        button.addEventListener("click", function(e){
            debugger
            e.preventDefault();
            for (let child of project_data){
                
                if (child.id == data.id){
                    
                    child.source = img.value;
                    child.text = description.value;
                    child.title = title.value;
                    child.link = link.value;
                    
                }
            }
            container.removeChild(container.firstChild);
            window.localStorage.removeItem("projects");
            window.localStorage.setItem("projects", JSON.stringify(project_data));
            refresh(project_data);
        })

        
        

    }
}

async function deleteCard(id, type){
    
    let project_data;
    if (type == "remote"){
        await fetch("https://api.jsonbin.io/v3/b/64ce8eb69d312622a38c728e").then(res => res.json()).
        then(data => project_data = data.record.data);

        let new_data = project_data.filter((project) => project.id !== id);
        
        let data = {"data": new_data}
        await fetch("https://api.jsonbin.io/v3/b/64ce8eb69d312622a38c728e",{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": "$2b$10$qMSfokprJCm9trmr4IakZuGMbwYtJOIEyUaAN1CaYdl4KrdpwD8X6",
              },
            body: JSON.stringify(data)
        })

        refresh(new_data);

    }else{
        project_data = JSON.parse(window.localStorage.getItem("projects"));

        let new_data = project_data.filter((project) => project.id !== id);
        
        window.localStorage.removeItem("projects");
        window.localStorage.setItem("projects", JSON.stringify(new_data));
        refresh(new_data);

    }



}

function refresh(project_data){
    
    let container = document.querySelector("#card-container");
    while (container.firstChild){
        container.removeChild(container.firstChild);
    }

    for (let child of project_data){
        let card = document.createElement("project-card");
        card.setData = {
            "id": child["id"],
            "title": child["title"],
            "source": child["source"],
            "text": child["text"],
            "link": child["link"],
            "type": child["type"]
        }

        container.appendChild(card);
    }



}
