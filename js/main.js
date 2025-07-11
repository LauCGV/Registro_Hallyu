
const textos = {
    es: {
        bienvenida: "¡Bienvenidx al Hallyu Festa!",
        parrafo: `Regístrate aquí para acceder al evento, participar en nuestras actividades especiales y entrar
      en los sorteos de experiencias únicas. ¡Gracias por ser parte de esta experiencia Hallyu! 💜
      <br><br>
      Autorización para el tratamiento de datos personales:
      Al diligenciar este formulario, autorizas el uso de tus datos personales para fines internos de
      control, registro y evaluación del Hallyu Festa, en cumplimiento de la Ley 1581 de 2012 (Colombia).`,
        nombre: "Nombre:",
        apellido: "Apellido:",
        identificacion: "Número de identificación:",
        edad: "Edad:",
        correo: "Correo:",
        celular: "Celular:",
        procedencia: "Procedencia:",
        boton: "Enviar",
        idiomaBtn: "🌐 English"
    },
    en: {
        bienvenida: "Welcome to the Hallyu Festa!",
        parrafo: `Register here to access the event, participate in our special activities, and enter
      exclusive prize draws. Thank you for being part of this Hallyu experience! 💜
      <br>
      <br>
      Authorization for the processing of personal data:
      By completing this form, you authorize the use of your personal data for internal control,
      registration, and evaluation of Hallyu Festa, in accordance with Colombian Law 1581 of 2012.`,
        nombre: "First Name:",
        apellido: "Last Name:",
        identificacion: "ID Number:",
        edad: "Age:",
        correo: "Email:",
        celular: "Phone Number:",
        procedencia: "City",
        boton: "Submit",
        idiomaBtn: "🌐 Español"
    }
};

let idiomaActual = "es";

document.getElementById("btn_lenguaje").addEventListener("click", () => {
    idiomaActual = idiomaActual === "es" ? "en" : "es";
    const t = textos[idiomaActual];

    document.getElementById("bienvenida").innerHTML = t.bienvenida;
    document.querySelector(".informacion").innerHTML = t.parrafo;
    document.getElementById("label_name").innerText = t.nombre;
    document.getElementById("label_apellido").innerText = t.apellido;
    document.getElementById("label_id").innerText = t.identificacion;
    document.getElementById("label_edad").innerText = t.edad;
    document.getElementById("label_correo").innerText = t.correo;
    document.getElementById("label_celular").innerText = t.celular;
    document.getElementById("label_procedencia").innerText = t.procedencia;
    document.querySelector('button[type="submit"]').innerText = t.boton;
    document.getElementById("btn_lenguaje").innerText = t.idiomaBtn;
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