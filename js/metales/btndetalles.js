console.log("%cLoad File : %cbtndetalles", "color: cyan", "color: yellow");
//--------------------------------------------------------------->
//BEGIN
/*
    menu top 
    activate modal
       a) #btnNewCierre
       b) #btnNewEntrega
    
    btn modal
        a) #btn_Save_generar => Generar cierre
        b) #btn_Save         => Generar entrega
        c) #btn_Save_saldo   => Generar saldo base
*/

/*Begin: A)*/
/* BTN top click  activa el loading y ventana modal*/


/********************************/
/*          SALDO               */
/********************************/
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
//-------------------------------------------------------------------->

/********************************/
/*          CIERRE              */
/********************************/
function clickModalCierre(){
    $("#btnModalCierre").on('click',function() {
        console.info("Run: Click Btn cierre")
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
//-------------------------------------------------------------------->

/********************************/
/*          ENTREGA             */
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
    })
}

function btnEntrega(){
    $("#btnGenerarEntrega").on('click',function() { 
        saveEntrega()
    })
}
//-------------------------------------------------------------------->