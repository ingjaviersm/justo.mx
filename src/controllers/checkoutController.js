/**
 * Importamos la matriz de datos para trabajarlos
 * Cargar un módulo
 */
const productosxprecio = require('../data/productos.json');

/**
 * Promocion: Departamento de CFO
 * @param nProducto Cantidad de productos
 * @returns {number}
 */
const descuentoDptoCfo = function (nProducto) {
    //Declaracion de variables a usar en la funcion
    let rTotal = 0;

    //Validamos que la cantidad de productos sea mayor o igual a 3
    if (nProducto.count >= 3) {
        rTotal = (nProducto.price * nProducto.count) - (nProducto.count);
        //De lo contrario no se aplica la promocion
    } else {
        rTotal = nProducto.price * nProducto.count;
    }
    return rTotal;
};//descuentoDptoCfo

/**
 * Promocion: Departamento de marketing
 * @param nProducto Cantidad de productos
 * @returns {*|number}
 */
const descuentoDptoMktng = function (nProducto) {
    //Declaracion de variables a usar en la funcion
    let rTotal = 0;

    //Validamos que la cantidad de productos sea mayor a 1
    if (nProducto.count > 1) {
        if (nProducto.count % 2 === 0) {
            rTotal = (nProducto.price / 2) * nProducto.count;
        } else {
            rTotal = nProducto.price + (((nProducto.price / 2) * (nProducto.count - 1)));
        }
        //De lo contrario
    } else {
        rTotal = nProducto.price * nProducto.count;
    }
    return rTotal;
};//descuentoDptoMktng

/**
 * Precio total por producto
 * @param oProducto  Objeto producto
 * @returns {rTotal} Resultado
 */
const obtenerPrecioTotal = function (oProducto) {
    //Realizamos el calulo, extrallendo del Objeto oProducto su precio, para calcularlo segun la cantidad
    let rTotal = oProducto.price * oProducto.count;

    return rTotal;
};//obtenerPrecioTotal

//Proceso de compra
const procesoDeCompra = function (reglasDePromocion) {
	this.reglasDePromocion     = reglasDePromocion;
	this.productosTotalxPrecio = [];
};//procesoDeCompra

procesoDeCompra.prototype.scan = function (oProducto) {
    oProducto = oProducto.toUpperCase();
	
	//Validamos que el producto exista
	if (!this.productosTotalxPrecio[oProducto]) {
	    //Si el producto no existe, le asignamos el precio
		this.productosTotalxPrecio[oProducto] = productosxprecio[oProducto];
		//Agregamos como cantidad 1
		this.productosTotalxPrecio[oProducto].count = 1;
	} else {
	    //Aumentamos la cantidad de productos en el arreglo
		this.productosTotalxPrecio[oProducto].count++;
	}
	return this;
};//procesoDeCompra

/**
 * Realiza el proceso de promocion
 * @returns {number}
 */
procesoDeCompra.prototype.realizarPromocion = function () {
    let rTotal = 0;
    let oProducto;

    //Recorremos el arreglo de productos: productosTotalxPrecio[]
    for (oProducto in this.productosTotalxPrecio) {

        //Si el objeto tiene la propiedad especificada, entonces calculamos el total
        if (this.productosTotalxPrecio.hasOwnProperty(oProducto)) {
            rTotal += this.realizarReglasDeNegocio(this.productosTotalxPrecio[oProducto]);
        }
    }
    return rTotal;
};

/**
 * Realiza las reglas de negocio del documento:
 * J - Test Back End Developer
 * @param oProducto
 * @returns {rTotal}
 */
procesoDeCompra.prototype.realizarReglasDeNegocio = function (oProducto) {
	let rTotal = 0;

	//Realizamos las reglas de negocio del proceso, segun la documentacion
	if (this.reglasDePromocion) {
	    //VOUCHER
		if (oProducto.code === 'VOUCHER') {
			rTotal += descuentoDptoMktng(oProducto);

		//TSHIRT
		} else if (oProducto.code === 'TSHIRT') {
			rTotal += descuentoDptoCfo(oProducto);

		//Realizar operaciones
		} else {
			rTotal += obtenerPrecioTotal(oProducto);
		}
	}else{
		rTotal += obtenerPrecioTotal(oProducto);
	}
	return rTotal;
};//realizarReglasDeNegocio


//Exportamos el modulo
module.exports = procesoDeCompra;