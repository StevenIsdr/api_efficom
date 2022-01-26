// document.addEventListener("DOMContentLoaded", async () => {

//     const request = await fetch("/cards.php");
//     const cards = await request.json();
//     const contentElement = document.getElementById("content");
//     for (const card of cards) {
//         //document.write(`name: ${card.name}, hp: ${card["base-stats"].hp} <br> `);
//         contentElement.innerHTML += `
//         <div class="card">
//                 <div class="container">
//                     <h4><b>${card.name}</b></h4>
//                     <p><svg xmlns="http://www.w3.org/2000/svg" style="width:20px; color: red" viewBox="0 0 20 20" fill="currentColor">
//                         <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
//                          </svg> ${card.hp}</p> 
//                          </div>
//                     </div>`;
//     }
// });
load_data()

const errorHtml = document.getElementById("error");

async function load_data() {
    const contentElement = document.getElementById("content");
    const request = await fetch("/list.php");
    const cards = await request.json();
    contentElement.innerHTML = "";
    for (const card of cards) {
        contentElement.innerHTML += `<div class="card" id='${card.name}'>
                                        <div id='${card.name}-editor' style='display:none; padding-top:40px ;padding-left:5px; padding-bottom:5px'>
                                        Name: <input type="text" id="${card.name}_name_input" value="${card.name}">
                                        HP: <input type="number" id="${card.name}_hp_input" value="${card.hp}">
                                        Mana: <input type="number" id="${card.name}_mana_input" value="${card.mana}">
                                        Description: <input type="text" id="${card.name}_desc_input" value="${card.desc}">
                                        Rareté: <input type="text" id="${card.name}_rarity_input" value="${card.rarity}">
                                        Image: <input type="text" id="${card.name}_img_input" value="${card.imageSrc}">
                                        <button onclick="edit_card('${card.name}')">Modifier</button>
                                        </div>
                                        <span id='${card.name}-edit'>
                                        <img src="${card.imageSrc}" style="width:100%">
                                            <div class="container">
                                            <h3 class='cardname'><b>${card.name}</b></h3>
                                            <p class="text">${card.desc}</p>
                                            <span class='infos'><p><svg xmlns="http://www.w3.org/2000/svg" style="width:20px; color: red" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                                          </svg> : ${card.hp}</p><p> <svg xmlns="http://www.w3.org/2000/svg" style="width:20px; color: blue" viewBox="0 0 20 20" fill="currentColor">
                                          <path fill-rule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z" clip-rule="evenodd" />
                                        </svg> : ${card.mana}</p></span>   
                                        </span>                
                                            
                                            <p>Rarity : ${card.rarity}</p>

                                            <span class="btns">
                                            <span class="btn" onclick='delete_card("${card.name}")'> <svg xmlns="http://www.w3.org/2000/svg" style="width:20px;color: red" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                          </svg> </span>
                                            <span class="btn" onclick='editor_card("${card.name}")'> <svg xmlns="http://www.w3.org/2000/svg" style="width:20px;color: blue" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                                          </svg> </span></span>
                                            </div>
                                        </div>`              
    }
}

async function send_card() {
    // Création du card
    const name = document.getElementById("name_input").value;
    const hp = parseInt(document.getElementById("hp_input").value);
    const mana = parseInt(document.getElementById("mana_input").value);
    const desc = document.getElementById("desc_input").value;
    const rarity = document.getElementById("rarity_input").value;
    const image = document.getElementById("img_input").value;
    const card = {
        "name": name, "hp": hp, "mana" : mana, "desc" : desc , "rarity" : rarity ,
        "imageSrc": image
    };
    // envoi du card en POST
    await fetch("/add.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
    }).then(response => {
        if(response['status'] != 200) {
            errorHtml.innerHTML = `ERREUR ${response['status']} : ${response['statusText']}`;
        }
    });
    await load_data();
}

async function delete_card(cardName){
    console.log(cardName);
    await fetch("/delete.php", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/text'
        },
        body: cardName
    }).then(response => {
        if(response['status'] != 200) {
            errorHtml.innerHTML = `ERREUR ${response['status']} : ${response['statusText']}`;
        }
    });
    await load_data();
}

async function editor_card(cardName){
    const cardToDisable = document.getElementById(`${cardName}-edit`);
    const cardToEnable = document.getElementById(`${cardName}-editor`);
    cardToDisable.style.display = "none";
    cardToEnable.style.display = "table";
    // await fetch("/delete.php", {
    //     method: "DELETE",
    //     headers: {
    //         'Content-Type': 'application/text'
    //     },
    //     body: cardName
    // });
    // await load_data();
}

async function edit_card(cardName){
    const originName = cardName;
    const name = document.getElementById(`${originName}_name_input`).value;
    const hp = parseInt(document.getElementById(`${originName}_hp_input`).value);
    const mana = parseInt(document.getElementById(`${originName}_mana_input`).value);
    const desc = document.getElementById(`${originName}_desc_input`).value;
    const rarity = document.getElementById(`${originName}_rarity_input`).value;
    const image = document.getElementById(`${originName}_img_input`).value;
    const card = {
        "origin" : originName,"name": name, "hp": hp, "mana" : mana, "desc" : desc , "rarity" : rarity ,
        "imageSrc": image
    };

    await fetch("/edit.php", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
    }).then(response => {
        if(response['status'] != 200) {
            errorHtml.innerHTML = `ERREUR ${response['status']} : ${response['statusText']}`;
        }
    });

    const cardToDisable = document.getElementById(`${cardName}-edit`);
    const cardToEnable = document.getElementById(`${cardName}-editor`);
    cardToDisable.style.display = "table";
    cardToEnable.style.display = "none";

    await load_data();
}

// });