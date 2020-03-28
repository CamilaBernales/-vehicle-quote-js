class Seguro {
    constructor(marca, anio, tipo) {
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    }

    cotizarSeguro() {
        /* 1 = incrementa el 50% del pago base
             2 = incrementa el 25 % del pago base
             3 = incrementa el 10% del pago base
        */

        let cantidadPagar;
        const pagoBase = 4000;

        switch (this.marca) {
            case '1':
                cantidadPagar = pagoBase + (pagoBase * 0.50);
                break;
            case '2':
                cantidadPagar = pagoBase + (pagoBase * 0.25);
                break;
            case '3':
                cantidadPagar = pagoBase + (pagoBase * 0.10);
                break;
        }

        const diferenciaDeAños = new Date().getFullYear() - this.anio;
        //reduce el 3% mientras mas viejo sea
        cantidadPagar -= ((diferenciaDeAños * 3) * cantidadPagar) / 100;

        /*
        seguro basico = incrementa un 30% mas del total
        seguro completo = incrementa un 50% mas del total
        */
       if(this.tipo === 'basico'){
           cantidadPagar *= 1.30;
       }else{
           cantidadPagar *= 1.50;
       }
        return cantidadPagar

    }

}

class Interfaz {

    mostrarMensaje(mensaje, tipo) {
        const div = document.createElement('div');

        if (tipo === 'error') {

            div.classList.add('mensaje', 'error');
        } else {
            div.classList.add('mensaje', 'correcto');
        }
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('.form-group'));
        setTimeout(function () {
            document.querySelector('.mensaje').remove();
            
        }, 2000)
    }
  
    mostrarResultado(seguro, cantidadPagar) {

        const resultado = document.getElementById('resultado');
        let marca;

        switch (seguro.marca) {
            case '1':
                marca = 'Audi';
                break;
            case '2':
                marca = 'Ferrari';
                break;
            case '3':
                marca = 'Mercedez Benz';
                break;
        }
        //creo div
        const div = document.createElement('div');
        div.innerHTML = `
        <p class="header">Tu Resumen:</p>
        <p>Marca: ${marca}</p>
        <p>Año: ${seguro.anio}</p>
        <p>Tipo: ${seguro.tipo}</p>
        <p>Total: ${cantidadPagar}</p>
        `;

        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(function(){
            spinner.style.display = 'none'; 
            resultado.appendChild(div);

        }, 2000);
    
    }
}


const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    // console.log(marcaSeleccionada);

    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;
    // console.log(anioSeleccionado);

    const tipoSeleccionado = document.querySelector('input[name="tipo"]:checked').value;
    // console.log(tipoSeleccionado)

    const interfaz = new Interfaz();
    if (marcaSeleccionada === '' || anioSeleccionado === '' || tipoSeleccionado === '') {
        interfaz.mostrarMensaje('Complete el formulario', 'error')
    } else {
        const campos = document.querySelector('#resultado div');
        if (campos != null) {
            campos.remove();
        }
        const seguroSeleccionadoUsuario = new Seguro(marcaSeleccionada, anioSeleccionado, tipoSeleccionado);
        const cantidadPagar = seguroSeleccionadoUsuario.cotizarSeguro();

        interfaz.mostrarResultado(seguroSeleccionadoUsuario, cantidadPagar);
        interfaz.mostrarMensaje('Cotizando...', 'correcto');

    }


});

const maxAño = new Date().getFullYear();
const minAño = maxAño - 20;
const selectorAños = document.getElementById('anio');
for (let i = maxAño; i > minAño; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectorAños.appendChild(option);
}