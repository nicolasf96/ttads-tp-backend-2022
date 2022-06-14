const API_URL = 'http://localhost:3000/api';


const divResponse = document.querySelector('#divResponse');


document.getElementById('ListarStores').addEventListener("click", () => {
    const ul = document.createElement('ul');
    ul.setAttribute("id","storesID");
    fetch(`${API_URL}/stores`,
    { method: 'GET',
    mode: 'cors'
    }).then((response) => response.json())
        .then((stores) => {
            let Stores = stores.data;
            Stores.forEach(store => {
                
                let elem = document.createElement('li');
                let negrita = document.createElement('p');
                negrita.className = 'title is-5'
                elem.appendChild(negrita);
                negrita.appendChild(document.createTextNode(`${store.name} - User: ${store.username} - ${store.address}`));
                ul.appendChild(elem);
            });
            divResponse.appendChild(ul);
        })

} );

document.getElementById('ListarCategories').addEventListener("click", () => {
    const table = document.createElement('table');
    table.className = "table"
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    fetch(`${API_URL}/categories`,
    { method: 'GET',
    mode: 'cors'
    }).then((response) => response.json())
        .then((categories) => {
            let Categories = categories.data;
            Categories.forEach(cat => {
                
                let tr = document.createElement('tr')
                let tdDescription = document.createElement('td');
                tdDescription.appendChild(document.createTextNode(`${cat.description}`)) 
                tr.appendChild(tdDescription);
                let tdIdParent = document.createElement('td');
                tdIdParent.appendChild(document.createTextNode(`${cat.idCategoryParent}`)) 
                tr.appendChild(tdIdParent);
                tbody.appendChild(tr);

            });
            divResponse.appendChild(table);
        })

} );


function inicializar() { 
    
    document.getElementById('BorrarTodo').addEventListener("click", () => {
    divResponse.remove();

} );
}