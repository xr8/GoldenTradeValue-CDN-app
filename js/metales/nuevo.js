/*
    btnModalCierre
    btnGenerarCierre

    btnModalEntrega
    btnGenerarEntrega
*/
/********************************/
/*          CIERRE              */
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

        let typeX = "nueva"
        loadingVale(typeX)
    })
}

function btnEntrega(){
    $("#btnGenerarEntrega").on('click',function() { 
        saveEntrega()
    })
}
//-------------------------------------------------------------------->