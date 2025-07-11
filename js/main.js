
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
    let procedencia = document.getElementById('procedencia').value;

    // Para limpiar:   
    // document.getElementById('nombre').value = '';

    let result_val = validar(nombre, apellido, edad, identificacion, correo, celular, procedencia);
    console.log("el resultado es: " + result_val + " y su tipo es " + typeof result_val);
    if (result_val == true) {
        agregar(nombre, apellido, edad, identificacion, correo, celular, procedencia);
    }

}

function validar(name, lastname, age, identification, email, cellphone, city) {

    if (name.trim().length <= 0) {
        document.getElementById('nombre').value = '';
        alert("Debe ingresar un nombre");
        return false;
    }

    if (lastname.trim().length <= 0) {
        alert("Debe ingresar un apellido");
        document.getElementById('apellido').value = '';
        return false;
    }

    if (isNaN(parseInt(identification))) {
        alert("Debe ingresar una identificacion que contenga solo números (sin carácteres especiales)");
        document.getElementById('identificacion').value = '';
        return false;
    }

    if (age == "select") {
        alert("Debe seleccionar una edad");
        document.getElementById('edad').option = "select";
        return false;
    }

    if (!email.includes('@') || email.trim().length <= 1) {
        alert("Debe ingresar un correo que cuente con '@'");
        document.getElementById('correo').value = '';
        return false;
    }

    if (isNaN(parseInt(cellphone))) {
        alert("Debe ingresar un número de celular que contenga solo números (sin carácteres especiales)");
        document.getElementById('celular').value = '';
        return false;
    }

    if (city.trim().length <= 0) {
        document.getElementById('procedencia').value = '';
        alert("Debe ingresar el su lugar de procedencia");
        return false;
    }

    console.log('Nombre:', name);
    console.log('Apellido:', lastname);
    console.log('Age:', age);
    console.log('Identificacion:', identification);
    console.log('Correo:', email);
    console.log('Celular:', cellphone);
    console.log('Procedencia:', city)

    return true;
}

function agregar(name, lastname, age, identification, email, cellphone, city) {
    database.ref('contadorDeUsuarios').once('value')
        .then((snapshot) => {
            let contador = snapshot.val();

            if (contador === null) {
                contador = 0; // Si no existe, empezamos en 0
            }

            const numeroRegistro = contador + 1;
            database.ref('usuarios').push({
                numeroRegistro: numeroRegistro,
                nombre: name,
                apellido: lastname,
                edad: age,
                identificacion: identification,
                correo: email,
                celular: cellphone,
                procedencia: city
            })
                .then(() => {
                    database.ref('contadorDeUsuarios').set(numeroRegistro);
                })
                .then(() => {
                    alert('Registro exitoso! Su número de registro es: ' + numeroRegistro);

                    // Limpiar los campos del formulario después de registrar
                    document.getElementById('nombre').value = '';
                    document.getElementById('apellido').value = '';
                    document.getElementById('edad').value = 'select';
                    document.getElementById('identificacion').value = '';
                    document.getElementById('correo').value = '';
                    document.getElementById('celular').value = '';
                    document.getElementById('procedencia').value = '';
                })
                .catch((error) => {
                    alert.log("Se presentó un error en el sistema. Reinicie la página y vuelva a intentarlo. Disculpe las molestias", error);
                });

        }
        )
}