// Parte III (Creamos clases)
/* Clase hija: Cada uno de estos elementos debe tener un identificador
para que puedan ser eliminados de forma selectiva, al momento de requerirlo*/
class Egreso extends Dato{
    static contadorEgresos = 0;
    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++Egreso.contadorEgresos;
    }
    get id(){
        return this._id;
    }
}