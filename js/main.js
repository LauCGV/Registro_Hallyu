
document.getElementById('data_send').addEventListener('submit', function (event) {
    event.preventDefault(); // evita que se recargue la página
    handleCell(); // aquí llamas tu función (debes tenerla definida también)
});

function handleCell() {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let edad = document.getElementById('edad').value;
    let identificacion = document.getElementById('identificacion').value;
    let correo = document.getElementById('correo').value;
    let celular = document.getElementById('celular').value;

    // Para limpiar:   
    // document.getElementById('nombre').value = '';

    let result_val = validar(nombre, apellido, edad, identificacion, correo, celular);
    console.log("el resultado es: "+result_val + " y su tipo es "+ typeof result_val);
}

function validar(name, lastname, age, identification, email, cellphone) {

    if(name.trim().length <= 0){
        document.getElementById('nombre').value = '';
        alert("Debe ingresar un nombre");
        return false;
    }

    if(lastname.trim().length <= 0){
        alert("Debe ingresar un apellido");
        document.getElementById('apellido').value = '';
        return false;
    }

    if(isNaN(parseInt(identification))){
        alert("Debe ingresar una identificacion que contenga solo números (sin carácteres especiales)");
        document.getElementById('identificacion').value = '';
        return false;
    }

    if(age == "select"){
        alert("Debe seleccionar una edad");
        document.getElementById('edad').option = "select";
        return false;
    }

    if(!email.includes('@') || email.trim().length <= 1){
        alert("Debe ingresar un correo que cuente con '@'");
        document.getElementById('correo').value = '';
        return false;
    }

    if(isNaN(parseInt(cellphone))){
        alert("Debe ingresar un número de celular que contenga solo números (sin carácteres especiales)");
        document.getElementById('celular').value = '';
        return false;
    }

    console.log('Nombre:', name);
    console.log('Apellido:', lastname);
    console.log('Age:', age);
    console.log('Identificacion:', identification);
    console.log('Correo:', email);
    console.log('Celular:', cellphone);

    return true;
}