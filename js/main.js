let loaded = ( eventLoaded ) => {
  
    window.alert("landing page loaded");
    console.log( eventLoaded );
    let myform = document.getElementById('formulario-pagina');
    debugger;

    myform.addEventListener('submit', ( eventSubmit ) => { 
        eventSubmit.preventDefault();
        let nombreValue = inputNombre.value;
        let correoValue = inputCorreo.value;
        
        if( nombreValue.length == 0 ) {
            inputNombre.focus()
            alert('Ingrese un texto válido')
            return; 
        }

        if ( correoValue == 0 ) {
            inputCorreo.focus()
            alert('Ingrese un texto válido')
            return;
        }
    })
    obtenerDatos();
}

window.addEventListener("DOMContentLoaded", loaded);

const formulario = document.getElementById('formulario-pagina'); 

formulario.addEventListener('submit',(event)=>{ 
    event.preventDefault(); 

    const nombre = document.getElementById('inputNombre').value; 
    const email = document.getElementById('inputCorreo').value; 
    const seleccionarJuego = document.getElementById('selectJuego').value;

    const datos = { 
        nombre: nombre, 
        email: email,
        seleccionarJuego: seleccionarJuego 
    }; 

    fetch('https://dawm-landingpage-default-rtdb.firebaseio.com/collection.json', { 
        method: 'POST', 
        body: JSON.stringify(datos), 
        headers: { 
            'Content-Type': 'application/json' 
        } 
    }) 
    .then(respuesta => respuesta.json()) 
    .then(datos => { 
        console.log(datos); 
        obtenerDatos();
    }) .catch(error => console.error(error));
    obtenerDatos();
});

async function obtenerDatos() {
    const url = 'https://dawm-landingpage-default-rtdb.firebaseio.com/collection.json';
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
        console.error("Error:", respuesta.status);
        return;
    }

    const datos = await respuesta.json();
    const map = new Map;
    for (let data in datos) {
        const MapB= datos[data]
        console.log(MapB.seleccionarJuego);
        const Topic= MapB.seleccionarJuego
        if(map.has(Topic)){
            map.get(Topic).push(MapB.nombre);
        } else {
            map.set(Topic,[MapB.nombre])
        }
    }
    const newMap = Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length); 
    const sortedMap = new Map(newMap);
    
    const Tabla = document.getElementById("tablebody");
    Tabla.innerHTML = "";
    sortedMap .forEach((nombre, Topic)=>{
    const fila = Tabla.insertRow();
    fila.insertCell().textContent = Topic;
    fila.insertCell().textContent = nombre.length;
    })
}