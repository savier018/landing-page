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
}

window.addEventListener("DOMContentLoaded", loaded);

const formulario = document.getElementById('formulario-pagina'); 

formulario.addEventListener('submit',(event)=>{ 
    event.preventDefault(); 

    const nombre = document.getElementById('inputNombre').value; 
    const email = document.getElementById('inputCorreo').value; 

    const datos = { 
        nombre: nombre, 
        email: email, 
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
    }) .catch(error => console.error(error));
});
