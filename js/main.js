let lenguajeActual = 'es'; // o 'en'

//AVISOS EN ESPAÑOL Y EN INGLÉS PARA LAS ACCIONES REALIZADAS POR EL USUARIO
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
        ad_franja: "Debe seleccionar una franja de ingreso",
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
        ad_franja: "Debe seleccionar una franja de ingreso",
        ad_exito: "Registration successful! Your registration number is: ",
        ad_exito2: ". Please take a screenshot of the number for future drawings",
        ad_error: "An error occurred. Please reload the page and try again. Sorry for the inconvenience."
    }
};

//BOTÓN DE CAMBIO DE IDIOMA
document.getElementById("btn_lenguaje").addEventListener("click", function () {
    lenguajeActual = lenguajeActual === 'es' ? 'en' : 'es';
    console.log("Idioma cambiado a:", lenguajeActual);
});

//OBTENER LA INFORMACIÓN DEL FORMULARIO CUANDO SE HIZO EL ENVÍO Y REALIZAR ACCIÓN CORRESPONDUENTE
document.getElementById('data_send').addEventListener('submit', function (event) {
    event.preventDefault(); // evita que se recargue la página
    handleCell(); // 
});

//ACCIONES AL OBTENER LA INFORMACIÓN
function handleCell() {

    //DECLARAR CADA DATO Y OBTENER SU VALOR
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
    let franja = document.getElementById('franja').value;
    let horaIngreso;
    let cantidadFranja;

    // Para limpiar:   
    // document.getElementById('nombre').value = '';

    //LLAMAR LA VALIDACIÓN
    let result_val = validar(nombre, apellido, edad, identificacion, correo, celular, procedencia, acompanante, cantAcomp, conocimiento, cultura, franja);
    console.log("el resultado es: " + result_val + " y su tipo es " + typeof result_val);

    //AGREGAR AL USUARIO
    if (result_val == true) {
        cantAcomp = numeroAcompanante(acompanante, cantAcomp);
        horaIngreso = HoraIngreso();
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
            franja,
            horaIngreso
        );
    }

    //OBTENER HORA DE INGRESO
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

    //OBTENER NÚMERO DE ACOMPAÑANTE Y ASIGNAR 0 CUANDO NO HAY ACOMPAÑANTE
    function numeroAcompanante(accompany, cantAcomp) {
        if (accompany == "no") {
            cantAcomp = 0;
        }
        return cantAcomp;
    }

    //VALIDAR LOS DATOS OBTENIDOS PARA MOSTRAR ADVERTENCIAS
    function validar(name, lastname, age, identification, email, cellphone, city, accompany, numberAccomp, find, culture, slot) {

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

        if (culture == "select") {
            alert(mensajes[lenguajeActual].ad_cultura);
            document.getElementById('cultura').option = "select";
            return false;
        }

        if (slot == "select") {
            alert(mensajes[lenguajeActual].ad_franja);
            document.getElementById('franja').option = "select";
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
        console.log('Conocimiento:', find);
        console.log('Cultura:', culture);
        console.log('Franja:', slot);

        return true;
    }

    //AGREGAR LOS DATOS DEL USUARIO A FIREBASE Y EXCEL
    function agregar(name, lastname, age, identification, email, cellphone, city, accompany, numberAccomp, find, culture, slot, hour) {

        database.ref("contador" + slot).transaction((contadorFranja) => {

            if (contadorFranja == null) {
                contadorFranja = 0;
            }

            return contadorFranja + 1;

        })
            .then((resultadoFranja) => {

                const contadorFranja = resultadoFranja.snapshot.val();
                return database.ref("contadorDeUsuarios").transaction((contadorGeneral) => {

                    if (contadorGeneral == null) {
                        contadorGeneral = 0;
                    }

                    return contadorGeneral + 1;
                }).then((resultadoGeneral) => {
                    return { resultadoGeneral, contadorFranja };
                });

            })

            .then(({resultadoGeneral, contadorFranja}) => {

                if (!resultadoGeneral.committed) {
                    throw new Error("ERROR_CONTADOR");
                }

                const numeroRegistro = resultadoGeneral.snapshot.val();

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
                    franja: slot,
                    cantidadFranja: contadorFranja,
                    horaIngreso: hour
                };

                return database.ref().update({
                    ["usuarios/" + nuevaKey]: datosUsuarios
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
                document.getElementById('acompanante').value = 'no';
                document.getElementById('cantAcomp').value = 'select';
                document.getElementById('conocimiento').value = 'select';
                document.getElementById('cultura').value = 'select';
                document.getElementById('franja').value = 'select';

            })
            .catch((error) => {

                console.error(error);

                switch (error.message) {

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