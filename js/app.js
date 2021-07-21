/* Parte IV (Definicion de arreglos): Usamos arreglos para guardar
los objetos que vamos creando con nuestras clases*/

const ingresos = [
    new Ingreso ('Salario', 2100.00),
    new Ingreso("Venta coche", 1500.00)
];

const egresos = [
    new Egreso("Renta departamento", 600),
    new Egreso ("Ropa", 1000)
];

// Parte IV: Definimos funcion 
let cargarApp = ()=>{
    // Mandamos a llamar a estas funciones al momento de cargar la pagina
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

/* Parte V: Definimos funciones para determinar el total de
los ingresos y el total de los egresos, ya que esta informacion 
la usaremos para colocarla en el cabecero de nuestra app*/
let totalIngresos = () =>{
    let totalIngreso = 0;
    for (let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso
}
let totalEgresos = () =>{
    let totalEgreso = 0;
    for (let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso
}




/* Parte IV: Definimos funcion que se encargue de actualizar la informacion
en los elementos HTML para que se muestren por pantalla*/
let cargarCabecero= ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto); // Aplicamos formato moneda
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso); // Aplicamos formato porcentaje
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos()); //Aplicamos formato moneda
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos()); //Aplicamos formato moneda

}

/* Parte VI: Aplicamos formato moneda a los numeros que se muestras,
por medio de "internacionalizacion". Esto puede ser tambien aplicado a fechas*/
const formatoMoneda = (valor) => {
    /*toLocalString : Por medio de esta funcion podemos realizar el cambio a formato moneda
    'en-US' : Indicamos la region a la que nos queremos referir
    style:'currency' : Formato moneda
    currency:'USD' : Indicamos la moneda
    minimumFractionDigits:2 : Indicamos el numero minimo de digitos*/
    return valor.toLocaleString('en-US', {style:'currency', currency:'USD', minimumFractionDigits:2});
}

/* Parte VI : Aplicamos formato porcentaje*/
const formatoPorcentaje = (valor) =>{
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2});
}

/* Parte IX: Cargamos los elementos de ingresos de forma dinamica
en HTML por medio de JS*/
const cargarIngresos = () =>{
    let ingresosHTML = "";
    for (let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML; 
}

/* Parte IX: Creamos una funcion para crear los ingresos*/
const crearIngresoHTML = (ingreso) =>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_porcentaje">21%</div>
        <!-- Parte VIII: Agregamos un boton -->
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <!-- Parte VIII: Etiqueta de Icono -->
                <ion-icon name="close-circle-outline"
                /* Parte XI: Modificamos esta funcion para eliminar elementos*/ 
                onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return ingresoHTML;
}

/* Parte XI: Creamos funcion para eliminar ingresos*/
const eliminarIngreso =  (id) =>{
    /* En principio vamos a pasar un parametro a nuestra funcion (id)
    Tomamos un objeto de tipo "Ingreso" desde el arreglo de "Ingresos" y accedemos a su atributo "Id" (ingreso => ingreso.id) 
    Comparamos ese atributo del objeto con el "Id" que estamos proporcionando como parametro (ingreso.id === id)
    Para obtener el indice que tiene ese objeto dentro del arreglo de "Ingresos" (ingresos.findIndex)*/
    let indiceEliminar= ingresos.findIndex( ingreso => ingreso.id === id);
    /*splice : Nos permite eliminar o agg un elemento(s) de un arreglo
    El primer valor es para indicar el indice desde donde empezaremos a modificar el arreglo (indiceEliminar)
    El segundo es para indicar cuantos elementos se van a eliminar (1)*/
    ingresos.splice(indiceEliminar, 1);
    // Cargamos funciones de nuevo
    cargarCabecero();
    cargarIngresos();
}

/*Parte X: Funcion para cargar egresos de forma dinamica*/
const cargarEgresos = () =>{
    let egresosHTML = "";
    for (let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

/*Parte X: Funcion apra crear egresos de forma dinamica*/
const crearEgresoHTML= (egreso) =>{
    let egresoHTML=`
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <!-- Parte VIII: Agregamos un boton -->
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <!-- Parte VIII: Etiqueta de Icono -->
                <ion-icon name="close-circle-outline"
                /* Parte XII: Modificamos esta funcion para eliminar elementos*/ 
                onclick="eliminarEgreso(${egreso.id})"></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return egresoHTML;
}

/* Parte XII: Creamos funcion para eliminar egresos*/
const eliminarEgreso =  (id) =>{
    /* En principio vamos a pasar un parametro a nuestra funcion (id)
    Tomamos un objeto de tipo "Ingreso" desde el arreglo de "Ingresos" y accedemos a su atributo "Id" (ingreso => ingreso.id) 
    Comparamos ese atributo del objeto con el "Id" que estamos proporcionando como parametro (ingreso.id === id)
    Para obtener el indice que tiene ese objeto dentro del arreglo de "Ingresos" (ingresos.findIndex)*/
    let indiceEliminar= egresos.findIndex( egreso => egreso.id === id);
    /*splice : Nos permite eliminar o agg un elemento(s) de un arreglo
    El primer valor es para indicar el indice desde donde empezaremos a modificar el arreglo (indiceEliminar)
    El segundo es para indicar cuantos elementos se van a eliminar (1)*/
    egresos.splice(indiceEliminar, 1);
    // Cargamos funciones de nuevo
    cargarCabecero();
    cargarEgresos();
}

/*Parte V: Funcion agregar dato*/
let agregarDato = () =>{
    // Recuperamos el formulario
    let forma = document.forms['forma'];
    // Recuperamos el tipo (- :egreso O + :ingreso ) del select
    let tipo = forma['tipo'];
    // Recuperamos la descripcion de input text
    let descripcion = forma['descripcion'];
    // Recuperamos el valor de input number
    let valor = forma['valor'];
    // Vemos si los valores no son cadenas vacias
    if(descripcion.value !== "" && valor.valor !== ""){
        /*Analizamos los valores de "tipo" (ingreso o egreso)*/
        if(tipo.value == "ingreso"){
            ingresos.push( new Ingreso( descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value == 'egreso'){
            egresos.push ( new Egreso( descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
            
        }
    }
}