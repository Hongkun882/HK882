
const project_data = [

    {
        "id": "3",
        "title": "My Journal",
        "source": "https://images.unsplash.com/photo-1483546363825-7ebf25fb7513?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
        "text": "Basic CRUD project using HTML,CSS, and Javascript. Developed with 8 people in Agile development.",
        "link": "https://cse110-fa22-group7.github.io/cse110-fa22-group7-project/source/main.html"
    },
    {
        "id": "4",
        "title": "TritonLink",
        "source": "https://images.unsplash.com/photo-1656139788417-3e2ece93d244?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
        "text": "A Basic class enrollment Project using JSP, Apache Tomcat, and PostgreSql. Users are able to add their students and enroll classes.",
        "link": "https://remarkable-bienenstitch-a51f87.netlify.app/"
    }
    
]

window.addEventListener('DOMContentLoaded', init);

function init(){
    

    const button_local = document.querySelector("#local");
    button_local.addEventListener("click",function(){

        localStorage_load();
    })

    const button_remote = document.querySelector("#remote");
    button_remote.addEventListener("click",function(){

        remote_load();
    })


}



function localStorage_load(){
    
    if (!window.localStorage.getItem("projects")){
        window.localStorage.setItem("projects", JSON.stringify(project_data));
    }

    const local_data = JSON.parse(window.localStorage.getItem('projects'));
    const body = document.querySelector('#card-container');
    for (let child of local_data){
        let card = document.createElement("project-card");
        card.setData = {
            "id": child["id"],
            "title": child["title"],
            "source": child["source"],
            "text": child["text"],
            "link": child["link"],
            "type": child["type"]
        }

        body.appendChild(card);
    }
    

}

async function remote_load(){
    let online_data;

    await fetch("https://api.jsonbin.io/v3/b/64ce8eb69d312622a38c728e").then(res => res.json()).
    then(data => online_data = data.record.data)
    const body = document.querySelector('#card-container');
    for (let child of online_data){
        let card = document.createElement("project-card");
        card.setData = {
            "id": child["id"],
            "title": child["title"],
            "source": child["source"],
            "text": child["text"],
            "link": child["link"],
            "type": child["type"]
        }

        body.appendChild(card);
    }
}