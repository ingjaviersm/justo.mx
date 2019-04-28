
//MochaJS
let assert = require('assert'),
    procesoDeCompra = require('./src/controllers/checkoutController'),
    expect = require('chai').expect,
    co,
    reglasDePromocion = true;

/**
 * Recorre el arreglo de productoxprecio
 * @param productosxprecio
 */
function recorrerArrProductosxPrecio(productosxprecio) {

    //Ejecutamos la función indicada una vez por cada elemento del array
    productosxprecio.forEach(function (oProducto) {
        co.scan(oProducto);
    });
}//recorrerArrProductosxPrecio

//Realizamos las pruebas unitarias con mochajs
describe('Descuentos por departamento: ', function () {

    //Establecemos condiciones previas
    beforeEach(function () {
        co = new procesoDeCompra(reglasDePromocion);
    });

    //Nueva Regla
    it('Acepta multiple productos satisfactoriamente.', function () {

        //Definimos el arreglo de productos
        let arrProducto = ['voucher', 'tshirt', 'mug'];

        //Afirmacion de la promocion
        expect(co.scan(arrProducto[0]).scan(arrProducto[1]).scan(arrProducto[2]).realizarPromocion()).to.equal(32.5);
    });

    //Nueva Regla
    it('No aplica descuentos a productos vendidos por unidad..', function () {

        //Definimos el arreglo de productos
        let arrProducto = ['voucher', 'tshirt', 'mug'];

        recorrerArrProductosxPrecio(arrProducto);

        //Afirmacion de la promocion
        expect(co.realizarPromocion()).to.equal(32.5);
    });

    //Nueva Regla
    it('Acepta arreglos vacios satisfactoriamente.', function () {

        //Definimos el arreglo de productos vacio
        let arrProducto = [];
        recorrerArrProductosxPrecio(arrProducto);

        //Afirmacion de la promocion
        expect(co.realizarPromocion()).to.equal(0);
    });


    describe('Descuentos del departamento de marketing: ', function () {
        //Nueva Regla
        it('Acepta el descuento correcto 2 por 1 en los artículos VOUCHER. ', function () {

            //Definimos el arreglo de productos
            let arrProducto = ['voucher', 'voucher', 'tshirt'];

            //Realizamos las reglas de negocio
            recorrerArrProductosxPrecio(arrProducto);

             //Afirmacion de la promocion
            expect(co.realizarPromocion()).to.equal(25);
        });
        //Nueva Regla
        it('Acepta el descuento correcto 2 por 1 en los artículos VOUCHER, en la venta par de los articulos antes mencionados. ', function () {

            //Definimos el arreglo de productos
            let arrProducto = ['voucher', 'voucher', 'voucher', 'voucher', 'voucher', 'voucher', 'mug'];

            //Realizamos las reglas de negocio
            recorrerArrProductosxPrecio(arrProducto);

             //Afirmacion de la promocion
            expect(co.realizarPromocion()).to.equal(22.5);
        });
        //Nueva Regla
        it('Acepta el descuento correcto 2 por 1 en los artículos VOUCHER, en la venta impar de los articulos antes mencionados.', function () {

            //Definimos el arreglo de productos
            let arrProducto = ['tshirt', 'voucher', 'voucher', 'voucher', 'voucher', 'voucher'];

            //Realizamos las reglas de negocio
            recorrerArrProductosxPrecio(arrProducto);

             //Afirmacion de la promocion
            expect(co.realizarPromocion()).to.equal(35);
        });
    });

    describe('Descuentos del departamento de CFO:', function () {
        //Nueva Regla
        it('Acepta el descuento correcto si se compran 3 o más T SHIRT.', function () {

            //Definimos el arreglo de productos
            let arrProducto = ['voucher', 'tshirt', 'tshirt', 'tshirt', 'tshirt'];

            //Realizamos las reglas de negocio
            recorrerArrProductosxPrecio(arrProducto);

             //Afirmacion de la promocion
            expect(co.realizarPromocion()).to.equal(81);
        });
        //Nueva Regla
        it('No acepta el descuento si se compran menos de 3 T SHIRT.', function () {

            //Definimos el arreglo de productos
            let arrProducto = ['tshirt', 'tshirt', 'mug', 'voucher'];

            //Realizamos las reglas de negocio
            recorrerArrProductosxPrecio(arrProducto);

             //Afirmacion de la promocion
            expect(co.realizarPromocion()).to.equal(52.5);
        });
        //Nueva Regla
        it('Acepta el descuento correcto si solo se compran 3 T SHIRT.', function () {

            //Definimos el arreglo de productos
            let arrProducto = ['tshirt', 'tshirt', 'voucher', 'voucher', 'tshirt'];

            //Realizamos las reglas de negocio
            recorrerArrProductosxPrecio(arrProducto);

             //Afirmacion de la promocion
            expect(co.realizarPromocion()).to.equal(62);
        });
    });

    describe('Proceso de compra: ', function () {
        //Nueva Regla
        it('Acepta el proceso de compra de modo que los artículos que se escaneen pueden estar en cualquier orden, y este devuelve el monto total a ser pagado. ', function () {

            //Definimos el arreglo de productos
            let arrProducto = ['voucher', 'voucher', 'voucher', 'tshirt', 'tshirt', 'mug', 'tshirt'];

            //Realizamos las reglas de negocio
            recorrerArrProductosxPrecio(arrProducto);

             //Afirmacion de la promocion
            expect(co.realizarPromocion()).to.equal(74.5);
        });
    });

    describe('Las siguientes promociones no seran aplicadas: ', function () {
        //Nueva Regla
        it('No se realiza ningun descuento, cuando el proceso de compra no coincide con ninguna promoción dadas por los departamentos de Marketing & CFO.', function () {
            co = new procesoDeCompra();

            //Definimos el arreglo de productos
            let arrProducto = ['voucher', 'mug', 'voucher', 'tshirt', 'tshirt', 'tshirt', 'voucher'];

            //Realizamos las reglas de negocio
            recorrerArrProductosxPrecio(arrProducto);

             //Afirmacion de la promocion
            expect(co.realizarPromocion()).to.equal(82.5);
        });
    });
});