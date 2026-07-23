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
        ad_acompanante: "Debe seleccionar una opción de acompañante",
        ad_cantAcomp: "Debe ingresar un número",
        ad_conocimiento: "Debe seleccionar cómo conoció el evento",
        ad_cultura: "Debe seleccionar un interés cultural",
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
        ad_acompanante: "You must select an accompany option",
        ad_cantAcomp: "You must enter a number",
        ad_conocimiento: "You must select how did you find out about the event",
        ad_cultura: "You must select an interests about Korean culture",
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
    let franja;

    // Para limpiar:   
    // document.getElementById('nombre').value = '';

    let result_val = validar(nombre, apellido, edad, identificacion, correo, celular, procedencia, acompanante, cantAcomp, conocimiento, cultura);
    console.log("el resultado es: " + result_val + " y su tipo es " + typeof result_val);
    if (result_val == true) {
        cantAcomp = numeroAcompanante(acompanante, cantAcomp);
        horaIngreso = HoraIngreso();
        const franja = obtenerFranja();

        if (franja == null) {

            alert("El registro no está habilitado en este horario.");

            return;

        }

        validarFranja(franja)

            .then(contador => {

                if (contador >= 300) {

                    if (franja.siguiente != null) {

                        alert(
                            "Esta franja ya alcanzó el máximo de 300 personas.\n\n" +
                            "Podrás registrarte nuevamente a partir de las " +
                            franja.siguiente
                        );

                    } else {

                        alert(
                            "La última franja del evento ya alcanzó su capacidad."
                        );

                    }

                    return;

                }

                agregar(nombre,
                    apellido,
                    edad,
                    identificacion,
                    correo,
                    celular,
                    procedencia,
                    acompanante,
                    cantAcomp,
                    conocimiento,
                    cultura,
                    horaIngreso,
                    franja.nombre
                );

            });

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

        if (accompany !== "no" && numberAccomp.trim().length <= 0) {
            document.getElementById('cantAcomp').value = '';
            alert(mensajes[lenguajeActual].ad_cantAcomp);
            return false;
        }

        if (find == "select") {
            alert(mensajes[lenguajeActual].ad_conocimiento);
            document.getElementById('conocimiento').option = "select";
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

    function obtenerFranja() {

        const ahora = new Date();

        const minutos = ahora.getHours() * 60 + ahora.getMinutes();

        if (minutos >= 600 && minutos < 690) {

            return {
                nombre: "franja1",
                inicio: "10:00",
                fin: "11:30",
                siguiente: "11:31"
            };

        }

        if (minutos >= 690 && minutos < 780) {

            return {
                nombre: "franja2",
                inicio: "11:30",
                fin: "13:00",
                siguiente: "13:01"
            };

        }

        if (minutos >= 780 && minutos < 930) {

            return {
                nombre: "franja3",
                inicio: "13:00",
                fin: "15:30",
                siguiente: "15:31"
            };

        }

        if (minutos >= 930 && minutos < 1020) {

            return {
                nombre: "franja4",
                inicio: "15:30",
                fin: "17:00",
                siguiente: null
            };

        }

        return null;

    }

    function validarFranja(datosFranja) {

        return database
            .ref("contadorHorarios/" + datosFranja.nombre)
            .once("value")
            .then(snapshot => {

                return snapshot.val() || 0;

            });

    }


    function agregar(name, lastname, age, identification, email, cellphone, city, accompany, numberAccomp, find, culture, hour, slot) {

        database.ref("contadorHorarios/" + franja).transaction((contadorFranja) => {

            contadorFranja = contadorFranja || 0;

            if (contadorFranja >= 300) {
                return; // Cancela la transacción
            }

            return contadorFranja + 1;

        })
            .then((resultadoFranja) => {

                if (!resultadoFranja.committed) {
                    throw new Error("La franja ya alcanzó su capacidad.");
                }

                return database.ref("contadorDeUsuarios").transaction((contadorGeneral) => {

                    contadorGeneral = contadorGeneral || 0;
                    return contadorGeneral + 1;

                });
            })

            .then((resultadoGeneral) => {

                if (!resultadoGeneral.committed) {
                    throw new Error("No se pudo actualizar el contador general.");
                }

                const numeroRegistro = resultado.snapshot.val();

                const nuevaKey = database.ref("usuarios").push().key;

                const datosUsuarios = {
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
                    horaIngreso: hour,
                    franja: slot
                };

                return database.ref().update({
                    ["usuarios/" + nuevaKey]: datosUsuario
                })
                    .then(() => {
                        return fetch("https://script.google.com/macros/s/AKfycbx4odZKdQC7TzKiyw1aMllSRKalqDp9yhpWzCINpmjZP1Nv-I9uRmaeVTDVMdaUVbkR/exec", {
                            method: "POST",
                            mode: "no-cors",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(datosUsuarios)
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

                switch (error.message) {

                    case "FRANJA_LLENA":

                        alert(
                            "Lo sentimos. El cupo de esta franja ya fue completado."
                        );

                        break;

                    case "ERROR_CONTADOR":

                        alert(
                            "No fue posible generar el número de registro."
                        );

                        break;

                    default:

                        alert(mensajes[lenguajeActual].ad_error);

                }

            });
    }

}