let lenguajeActual = 'es'; // o 'en'

const mensajes = {
    es: {
        ad_nombre: "Debe ingresar un nombre",
        ad_apellido: "Debe ingresar un apellido",
        ad_identificacion: "Debe ingresar una identificación que contenga solo números (sin carácteres especiales)",
        ad_edad: "Debe seleccionar una edad",
        ad_correo: "Debe ingresar un correo que cuente con '@'",
        ad_celular: "Debe ingresar un número de celular que contenga solo números (sin carácteres especiales)",
        ad_procedencia: "Debe ingresar su lugar de procedencia",
        ad_exito: "Registro exitoso! Su número de registro es: ",
        ad_exito2: ". Por favor, realice una captura de pantalla del número para posteriores sorteos",
        ad_error: "Se presentó un error en el sistema. Reinicie la página y vuelva a intentarlo. Disculpe las molestias."
    },
    en: {
        ad_nombre: "You must enter a name",
        ad_apellido: "You must enter a last name",
        ad_identificacion: "You must enter a valid ID with only numbers (no special characters)",
        ad_edad: "You must select an age",
        ad_correo: "You must enter an email containing '@'",
        ad_celular: "You must enter a phone number with only digits (no special characters)",
        ad_procedencia: "You must enter your place of origin",
        ad_exito: "Registration successful! Your registration number is: ",
        ad_exito2: ". Please take a screenshot of the number for future drawings",
        ad_error: "An error occurred. Please reload the page and try again. Sorry for the inconvenience."
    }
};

document.getElementById("btn_lenguaje").addEventListener("click", function () {
    lenguajeActual = lenguajeActual === 'es' ? 'en' : 'es';
    console.log("Idioma cambiado a:", lenguajeActual);
});

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
    let acompanante = document.getElementById('acompanante').value;
    let cantAcomp = document.getElementById('cantAcomp').value;
    let conocimiento = document.getElementById('conocimiento').value;
    let cultura = document.getElementById('cultura').value;
    let horaIngreso;

    // Para limpiar:   
    // document.getElementById('nombre').value = '';

    let result_val = validar(nombre, apellido, edad, identificacion, correo, celular, procedencia, acompanante, cantAcomp, conocimiento, cultura);
    console.log("el resultado es: " + result_val + " y su tipo es " + typeof result_val);
    if (result_val == true) {
        cantAcomp = numeroAcompanante(acompanante, cantAcomp);
        horaIngreso = HoraIngreso();
        agregar(nombre, apellido, edad, identificacion, correo, celular, procedencia, acompanante, cantAcomp, conocimiento, cultura, horaIngreso);
    }

}

function HoraIngreso() {
    const ahora = new Date();

    const hora = String(ahora.getHours()).padStart(2, '0');
    const minuto = String(ahora.getMinutes()).padStart(2, '0');
    const segundo = String(ahora.getSeconds()).padStart(2, '0');
    console.log("hora: ");
    console.log(`${hora}:${minuto}:${segundo}`);
    const hour = `${hora}:${minuto}:${segundo}`;
    return hour;
}

function numeroAcompanante(accompany, cantAcomp) {
    if (accompany == "no") {
        cantAcomp = 0;
    }
    return cantAcomp;
}

function validar(name, lastname, age, identification, email, cellphone, city, accompany, numberAccomp, find, culture) {

    if (name.trim().length <= 0) {
        document.getElementById('nombre').value = '';
        alert(mensajes[lenguajeActual].ad_nombre);
        return false;
    }

    if (lastname.trim().length <= 0) {
        alert(mensajes[lenguajeActual].ad_apellido);
        document.getElementById('apellido').value = '';
        return false;
    }

    if (isNaN(parseInt(identification))) {
        alert(mensajes[lenguajeActual].ad_identificacion);
        document.getElementById('identificacion').value = '';
        return false;
    }

    if (age == "select") {
        alert(mensajes[lenguajeActual].ad_edad);
        document.getElementById('edad').option = "select";
        return false;
    }

    if (!email.includes('@') || email.trim().length <= 1) {
        alert(mensajes[lenguajeActual].ad_correo);
        document.getElementById('correo').value = '';
        return false;
    }

    if (isNaN(parseInt(cellphone))) {
        alert(mensajes[lenguajeActual].ad_celular);
        document.getElementById('celular').value = '';
        return false;
    }

    if (city.trim().length <= 0) {
        document.getElementById('procedencia').value = '';
        alert(mensajes[lenguajeActual].ad_procedencia);
        return false;
    }


    console.log('Nombre:', name);
    console.log('Apellido:', lastname);
    console.log('Age:', age);
    console.log('Identificacion:', identification);
    console.log('Correo:', email);
    console.log('Celular:', cellphone);
    console.log('Procedencia:', city);
    console.log('Acompañante:', accompany);
    console.log('Número de acompañantes:', numberAccomp);
    console.log('Conocimiento:', find)


    return true;
}

function agregar(name, lastname, age, identification, email, cellphone, city, accompany, numberAccomp, find, culture, hour) {
    database.ref('contadorDeUsuarios').transaction((contador) => {
        return (contador || 0) + 1;
    })
        .then((resultado) => {

            if (!resultado.committed) {
                throw new Error("No se pudo actualizar el contador.");
            }

            const numeroRegistro = resultado.snapshot.val();

            return database.ref('usuarios').push({
                numeroRegistro: numeroRegistro,
                nombre: name,
                apellido: lastname,
                edad: age,
                identificacion: identification,
                correo: email,
                celular: cellphone,
                procedencia: city,
                acompanante: accompany,
                cantAcomp: numberAccomp,
                conocimiento: find,
                cultura: culture,
                horaIngreso: hour
            })
                .then(() => {

                    return fetch("https://script.google.com/macros/s/AKfycbx4odZKdQC7TzKiyw1aMllSRKalqDp9yhpWzCINpmjZP1Nv-I9uRmaeVTDVMdaUVbkR/exec", {

                        method: "POST",

                        mode: "no-cors",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            numeroRegistro: numeroRegistro,
                            nombre: name,
                            apellido: lastname,
                            edad: age,
                            identificacion: identification,
                            correo: email,
                            celular: cellphone,
                            procedencia: city,
                            acompanante: accompany,
                            cantAcomp: numberAccomp,
                            conocimiento: find,
                            cultura: culture,
                            horaIngreso: hour

                        })

                    });

                })

                .then(() => numeroRegistro);

        })
        .then((numeroRegistro) => {

            alert(
                mensajes[lenguajeActual].ad_exito +
                numeroRegistro +
                mensajes[lenguajeActual].ad_exito2
            );

            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('edad').value = 'select';
            document.getElementById('identificacion').value = '';
            document.getElementById('correo').value = '';
            document.getElementById('celular').value = '';
            document.getElementById('procedencia').value = '';

        })
        .catch((error) => {

            console.error(error);

            alert(mensajes[lenguajeActual].ad_error);

        });

}