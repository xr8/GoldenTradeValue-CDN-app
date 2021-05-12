console.log("%cLoad File : %cbtndetalles", "color: cyan", "color: yellow");
//--------------------------------------------------------------->
//BEGIN


/*Begin: A)*/
// Click -> Btn saldo base*/
function clickModalSaldo(){
    $("#btnModalSaldo").on('click',function(){
        console.info("Run: Click Btn saldo")
    })
}
/* BTN -> click  sava Generar Cierre*/
function btnSaldo(){
    $("#btn_Save_saldo").on('click',function() { 
        console.info("Run: Click Btn saldo")
        $('#saldoModal').modal('hide')
        saveSaldoGenerar() 
        refreshXhr()
    })
}

/********************************/
/*         Generar Cierre       */
/********************************/
function clickModalCierre(){
    $("#btnModalCierre").on('click',function() {
        console.info("Run: Click Btn cierre 123321")
    })
}
/* BTN -> click  sava Generar Cierre*/
function btnCierre(){
    $("#btnGenerarCierre").on('click',function() { 
        console.log("Btn generar cierre")
        $('#cierreModal').modal('hide')
        saveDataGenerar()
    }) 
}

/********************************/
/*   Generar Cierre Simple      */
/********************************/
// Click -> Btn cierre simple*/
function clickModalCierreS(){
    $("#btnModalCierreSimple").on('click',function(){

        inputCalcular_cs_clear()
        $("#input_cs_precio").val($('.'+$('input[type="checkbox"]').val()+'.precio').html())

        loadingVale('cierresimple')
        
        changeCierreS()
    })
}
/* BTN -> click  sava Generar Cierre*/
function btnCierreS(){
    $("#btnSaveCierreS").on('click',function() { 
        console.info("Run: Click Btn cierre simple")
        $('#cierreSimple').modal('hide')
        
        saveCierreSimple()
        
    })
}

/********************************/
/*           Entrega Nueva      */
/********************************/
function clickModalEntrega(){
    $("#btnModalEntrega").on('click',function() {
        
        $(".ge-show").fadeOut().addClass("d-none")
        $(".ge-show-load").fadeIn().removeClass("d-none")

        btnId = $('input[type="checkbox"]:checked').val();
        
        $("#metalesPrecio").empty().append($(".precio_id." + btnId).text())
        $("#metalesPrecioInput").empty().val($(".precio_id." + btnId).text())
        
        /*carga la informacion del cierre*/
        loadingMetalesOne(btnId)

        let typeX = "nueva"
        loadingVale(typeX)
    })
}

function btnEntrega(){
    $("#btnGenerarEntrega").on('click',function() { 
        saveEntrega()
    })
}

/********************************/
/*          Cierre             */
/********************************/
function clickModalCierreSdos(){
    $("#btnModalCierreDos").on('click',function(){
        loadingMetalesOne2($('input[type="checkbox"]:checked.checkEntregas').attr("name"))
        loadingVale("save_cierredos")
    })
}