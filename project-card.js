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


    }

}

customElements.define("project-card", ProjectCard);