const gulp  = require('gulp');
const mocha = require('gulp-mocha');

/*
* Definicion de las tareas
* gulp justo => Son las pruebas unitarias en las cuales se realizan las reglas de negocio
**/
gulp.task('justo', function () {
    return gulp.src('*.spec.js', {read: false})
    //Obtiene la informacion y la pasa al plugin mocha
        .pipe(mocha());
});//task => justo
