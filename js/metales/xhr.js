//--------------------------------------------------------------->
//BEGIN
/*****************************************************************
 *                             BEGIN                             *
 *                         FUNCTION XHR                          *
 *****************************************************************/
 console.log("%cLoad File : %cxhr", "color: cyan", "color: yellow");
 function loadingSaldoActual() {
    //--->
    console.log("%cXHR: %cmetales/detalles loadingSaldoActual", "color: red", "color: green");
    let id_advance = $("#id_advance_x").val();
    $("#saldoActual").fadeIn().empty()
    let jqxhr = $.getJSON(urlSaldoR +"?type=actual&id="+ id_advance, function(data) {
            console.log("Run: Cierres Detalles")
        })
        .done(function(data) {
            //--->
            $.each(data, function(i, val) {
                if(val.Error){
                    $(".saldoActual").html(0)
                }else{$(".saldoActual").html(val.detail_saldo_actual)}
                
            })
            //--->
        })
        .fail(function(data, jqXHR, textStatus, errorThrown) {
            //--->
            console.info("Run: all user loading error");
            xhrError(jqXHR, textStatus, errorThrown);
        })
        .always(function(data) {
            //--->
            console.info("Run: all user always");
        })
        //--->  
}
 function loadingMetalesSaldo() {
    //--->
    console.log("%cXHR: %cmetales/detalles loadingMetalesSaldo", "color: red", "color: green");
    $("#loadingMetalesCierres").fadeIn().empty()

    let id_advance = $("#id_advance_x").val();

    let jqxhr = $.getJSON(urlSaldoR + "/?type=saldo&id=" + id_advance, function(data) {
        })
        .done(function(data) {
            //--->
            $.each(data, function(i, val) {
                if(val.saldo == 0){
                    $("#btnModalSaldo").show()
                    $("#btnModalCierre,#btnModalEntrega,#btnentregasMultipleModal,#btnModalEntregaUnica,#reloadCaja").hide()

                }else{
                    $("#btnModalSaldo").hide()
                    $("#btnModalCierre,#btnModalEntrega,#btnentregasMultipleModal,#btnModalEntregaUnica,#reloadCaja").show()
                }

                })
                //--->
        })
        .fail(function(data, jqXHR, textStatus, errorThrown) {
            //--->
            console.info("Run: all user loading error");
            xhrError(jqXHR, textStatus, errorThrown);
        })
        .always(function(data) {
        })
        //--->  
}
//BEGIN:--------------------->
function loadingMetalesReader() {
    //--->
    console.log("%cXHR: %cmetales/detalles loadingMetalesReader", "color: red", "color: green");
    $("#loadingMetalesCierres").fadeIn().empty()

    let id_advance = $("#id_advance_x").val();

    let jqxhr = $.getJSON(urlMetalesdetallesR + "/?type=cierres&id=" + id_advance, function(data) {
        })
        .done(function(data) {
            //--->
            $.each(data, function(i, val) {
                if(val.Caja == "Error"){

                }else{

                    let m_id = zerocien(parseInt())
                    let mc_id = zerocien(parseInt(val.mc_id))


                    if (parseFloat(val.m_detail_grs) == 0) {
                        colorCierres = "table-danger";
                    } else if (parseFloat(val.m_detail_grs_original) == parseFloat(val.m_detail_grs)) {
                        colorCierres = "table-primary";
                    } else if (parseFloat(val.m_detail_grs) > 0) {
                        colorCierres = "table-success";
                    }else{
                        colorCierres = "";
                    }

                    $("#cliente_nombre")
                        .fadeIn(3000)
                        .html(val.c_firstname + ' ' + val.c_secondname);
                            //#	ID Cierre	Fecha	Tipo	Status	Metal	Precio	Grs	Saldo
                            $("#loadingMetalesCierres")
                                .fadeIn(3000)
                                .append(
                                    '<tr class="cierresItem ' + colorCierres + '" id="' + val.m_id_advance + '">' +
                                    '    <th scope="row"><input type="checkbox" value="' + val.m_id_advance + '" class="btnId" name="id_advance"></th>' +
                                    '    <td>' + val.m_id + '</td>' +
                                    '    <td>' + val.m_time + '</td>' +
                                    '    <td>' + val.m_detail_tipo + '</td>' +
                                    '    <td>' + val.m_detail_status + '</td>' +
                                    '    <td>' + val.m_detail_metal + '</td>' +
                                    '    <td>$ ' + val.m_detail_precio + '</td>' +
                                    '    <td>' + val.m_detail_grs_original + ' Grs </td>' +
                                    '    <td class="pesoactual">' + val.m_detail_grs + ' Grs </td>' +
                                    '</tr>     '
                                );
                }

                })
                //--->
        })
        .fail(function(data, jqXHR, textStatus, errorThrown) {
            //--->
            console.info("Run: all user loading error");
            xhrError(jqXHR, textStatus, errorThrown);
        })
        .always(function(data) {
        })
        //--->  
}

//BEGIN:--------------------->
function loadingMetalesReaderEntregas() {
    //--->
    /*
        entregas_barra: "1"
        entregas_fecha: "2021-04-01"
        entregas_fino: "1.00"
        entregas_grs_af: "1"
        entregas_ley: "1.00"
        entregas_no_ext: "2"
        entregas_no_vale: "1"
        id: "182"
        id_advance: "55ad68fb8e8a6c8482e0"
        metales_detail_id_advance: "C-zr8h0iji96crde4"
        metales_detail_type: "clientes"
        time: "2021-04-25 16:44:43"
    */
    console.log("%cXHR: %cmetales/detalles loadingMetalesReaderEntregas", "color: red", "color: green");
    $("#loadingMetalesEntregas").fadeIn().empty()

    let id_advance = $("#id_advance_x").val();

    let jqxhr = $.getJSON(urlMetalesdetallesR + "/?type=entregas&id=" + id_advance, function(data) {
        })
        .done(function(data) {
            //--->
            $.each(data, function(i, val) {
                if(val.Error == 104){

                }else{
                    $("#loadingMetalesEntregas")
                        .fadeIn(3000)
                        .append(
                            '<tr class="' + val.m_id_advance + '">' +
                            '    <th scope="row"><input type="checkbox" value="' + val.m_id_advance + '" class="btnId" name="id_advance"></th>' +
                            '    <td>' + val.id + '</td>' +
                            '    <td>' + val.entregas_fecha + '</td>' +
                            '    <td>' + zerocien(val.entregas_no_vale) + '</td>' +
                            '    <td>' + zeronull(val.entregas_no_ext) + '</td>' +
                            '    <td>' + val.entregas_grs_af + '</td>' +
                            '    <td>' + val.entregas_barra + ' Grs</td>' +
                            '    <td>' + val.entregas_ley + '</td>' +
                            '    <td>' + val.entregas_fino + ' Grs</td>' +
                            '</tr>     '
                        );
                }

                })
                //--->
        })
        .fail(function(data, jqXHR, textStatus, errorThrown) {
            //--->
            console.info("Run: all user loading error");
            xhrError(jqXHR, textStatus, errorThrown);
        })
        .always(function(data) {
        })
        //--->  
}

//BEGIN:--------------------->
function loadingMetalesReaderCierres() {
    //--->
    /*

    */
    console.log("%cXHR: %cmetales/detalles loadingMetalesReaderCierre", "color: red", "color: green");
    $("#loadingMetalesCierresdos").fadeIn().empty()

    let id_advance = $("#id_advance_x").val();

    let jqxhr = $.getJSON(urlMetalesdetallesR + "/?type=cierresdos&id=" + id_advance, function(data) {
        })
        .done(function(data) {
            //--->
            $.each(data, function(i, val) {

                    /*
            $.each(data, function(i, val) {

                    /*
                      let m_id= zerocien(parseInt(val.m_id))
                      let mc_id= zerocien(parseInt(val.mc_id))
                      $("#cliente_nombre")
                      .fadeIn(3000)
                      .html(val.c_firstname + ' ' + val.c_secondname );
                      */
                    /**
                      entregas_barra: "0"
                    entregas_fecha: "2021-03-24"
                    entregas_fino: "0.00"
                    entregas_grs_af: null
                    entregas_no_ext: null
                    entregas_no_vale: null
                    id: "49"
                    id_advance: "dEadpz2RCkcKiGGXsAJq"
                    m_id: "48"
                    m_id_advance: "Un6jmxDklzUwyJBGbw9r"
                    metales_detail_id_advance: "C-zr8h0iji96crde4"
                    metales_id_advance: "Un6jmxDklzUwyJBGbw9r"
                    time: "2021-03-24 00:08:32"
                    */
                    $("#loadingMetalesCierresdos")
                        .fadeIn(3000)
                        .append(
                            '<tr>' +
                            '    <th scope="row"><input type="checkbox" value="' + val.m_id_advance + '" class="btnId" name="id_advance"></th>' +
                            '    <td>' + val.id + '</td>' +
                            '    <td>' + val.entregas_fecha + '</td>' +
                            '    <td>' + val.cierres_fino + ' Grs</td>' +
                            '    <td> $ ' + val.cierres_precio + '</td>' +
                            '    <td> $ ' + val.cierres_importe + '</td>' +
                            '</tr>     '
                        );
                })
                //--->
        })
        .fail(function(data, jqXHR, textStatus, errorThrown) {
            //--->
            console.info("Run: all user loading error");
            xhrError(jqXHR, textStatus, errorThrown);
        })
        .always(function(data) {
        })
        //--->  
}

//BEGIN:--------------------->
function loadingMetalesReaderPagos() {
    //--->
    /*

    */
    console.log("%cXHR: %cmetales/detalles loadingMetalesReaderPagos", "color: red", "color: green");
    $("#loadingMetalesPagos").fadeIn().empty()

    let id_advance = $("#id_advance_x").val();

    let jqxhr = $.getJSON(urlMetalesdetallesR + "/?type=pagos&id=" + id_advance, function(data) {
        })
        .done(function(data) {
            //--->
            $.each(data, function(i, val) {

                    /*
                      {
                        "id": "49",
                        "id_advance": "dEadpz2RCkcKiGGXsAJq",
                        "time": "2021-03-24 00:08:32",
                        "metales_id_advance": "Un6jmxDklzUwyJBGbw9r",
                        "metales_detail_id_advance": "C-zr8h0iji96crde4",
                        "pagos_total": "66954.25",
                        "pagos_pagos": "66954.25",
                        "pagos_saldos": "116916.22",
                        "pagos_observaciones": null,
                        "m_id": "2",
                        "m_id_advance": "Un6jmxDklzUwyJBGbw9r"
                      },
                      */
                    $("#loadingMetalesPagos")
                        .fadeIn(3000)
                        .append(
                            '<tr class=' + val.m_id_advance + '">' +
                            '    <th scope="row"><input type="checkbox" value="' + val.m_id_advance + '" class="btnId" name="id_advance"></th>' +
                            '    <td>' + val.id + '</td>' +
                            '    <td>' + val.entregas_fecha + '</td>' +
                            '    <td> $ ' + val.pagos_total + '</td>' +
                            '    <td> $ ' + val.pagos_pagos + '</td>' +
                            '    <td> $ ' + val.pagos_saldos + '</td>' +
                            '    <td>' + zeronull(val.pagos_observaciones) + '</td>' +
                            '</tr>'
                        );
                })
                //--->
        })
        .fail(function(data, jqXHR, textStatus, errorThrown) {
            //--->
            console.info("Run: all user loading error");
            xhrError(jqXHR, textStatus, errorThrown);
        })
        .always(function(data) {
        })
        //--->  
}

//BEGIN:--------------------->
function loadingMetalesOne(btnId) {
    //--->
    console.log("%cXHR: %cmetales/detalles loadingMetalesOne", "color: red", "color: green");
    
    $("#loadingMetales").fadeOut().empty().fadeIn()
    clearUnicaInput()

    let jqxhr = $.getJSON(urlMetalesdetallesR + "/?type=one&id=" + btnId, function(data) {
            console.log("Run: Cierres")
        })
        .done(function(data) {
            //--->
            $.each(data, function(i, val) {
                /*
                detail_fecha: "2021-04-22 00:00:00"
                detail_grs: "82.60"
                detail_grs_original: "82.60"
                detail_id_advance: "C-zr8h0iji96crde4"
                detail_metal: "oro"
                detail_precio: "1244.34"
                detail_status: "abierto"
                detail_tipo: "compra"
                detail_type: "clientes"
                email: "biohizard@gmail.com"
                firstname: "jorge"
                id: "10"
                id_advance: "a79c7a16f9e59cd03281"
                saldo_saldo: "102782.48"
                saldo_saldo_actual: "102782.48"
                secondname: "garibaldo"
                time: "2021-04-23 16:03:28"
                */

                /*
                    ID Cierre 10
                    Tipo  compra
                    Fecha 2021-04-22 00:00:00
                */

                $("#metales_id").empty().append(val.id);
                $("#input_id_advance").empty().val(val.id_advance);
                $("#metalesAccion").empty().append(val.detail_tipo);
                $("#metalesFecha").empty().append(val.detail_fecha);
                
                /*
                    Precio $ 1244.34
                    Metal  000
                    Status abierto                
                */
                $("#metales_precio").empty().append("$ " + val.detail_precio);
                $("#metalesTipo").empty().append(val.detail_metal);
                $("#metalesStatus").empty().append(val.detail_status);

                    
                    

                    $("#metales_peso").empty().append(val.detail_grs_original + " Grs.");
                    $("#metales_peso_actual").empty().append(val.detail_grs + " Grs.");
                    
                    $("#metales_saldo").empty().append("$ " + val.saldo_saldo);
                    $("#metales_saldo_actual").empty().append("$ " + val.saldo_saldo_actual);
            })
            //--->_actual
            $(".ge-show-load").fadeOut().addClass("d-none")
            $(".ge-show").fadeIn().removeClass("d-none")
            $(".ge_hiden").removeClass("d-none").fadeIn()


        })
        .fail(function(data, jqXHR, textStatus, errorThrown) {
            //--->
            console.info("Run: all user loading error");
            xhrError(jqXHR, textStatus, errorThrown);
        })
        .always(function(data) {
            //--->
            console.info("Run: all user always");
        })
        //--->  
}

//BEGIN:--------------------->  
function loadingMetalesEntrega(btnId) {
    //--->
    console.log("%cXHR: %cmetales/detalles loadingMetalesEntrega", "color: red", "color: green");
    $("#loadingMetales").fadeOut().empty().fadeIn()

    let jqxhr = $.getJSON(urlMetales_metalesentrega_reader_emtrega + btnId, function(data) {
            console.log("Run: Cierres")
        })
        .done(function(data) {
            //--->
            $.each(data, function(i, val) {



                    $("#loadingMetalesCierres")
                        .fadeIn(3000)
                        .append(

                        );

                })
                //--->
        })
        .fail(function(data, jqXHR, textStatus, errorThrown) {
            //--->
            console.info("Run: all user loading error");
            xhrError(jqXHR, textStatus, errorThrown);
        })
        .always(function(data) {
            //--->
            console.info("Run: all user always");
        })
        //--->  
}
//metalesdetalles/readerdata/?type=saldo&id=C-zr8h0iji96crde
//BEGIN:--------------------->  
function saveEntrega() {
    console.log("BTN SAVE");
    /*
    --->    Generar Entrega
    input_id_advance

    --->    Entregas
    input_nolext
    input_grsaf

    input_barra
    input_ley
    input_fino

    --->    Cierres
     input_finopza
     input_importe

    --->    Pagos     
    input_pagos

    input_total
    input_saldo
    */
    let xyz = $("#metales_precio").html();
        xyz = xyz.split(" ");

    let abc = $("#metales_saldo_actual").html();
        abc = abc.split(" ");
            

    let save_id_advance = $("#input_id_advance").val();
    
    let save_precio     = xyz[1];
    let metales_saldo_actual = abc[1];

    let save_nolext     = $("#input_nolext").val();
    let save_grsaf      = $("#input_grsaf").val();

    let save_barra      = $("#input_barra").val();
    let save_ley        = $("#input_ley").val();

    let save_fino       = $("#input_fino").val();
    let save_finopza    = $("#input_finopza").val();

    let save_importe    = $("#input_importe").val();
    let save_pagos      = $("#input_pagos").val();

    let save_total      = $("#input_total").val();
    let save_saldo      = $("#input_saldo").val();
    /*
save_id_advance: Un6jmxDklzUwyJBGbw9r
save_nolext: 
save_grsaf: 
save_barra: 0
save_ley : 0
save_fino: 53.35
save_finopza: 53.35
save_pagos: 0
save_total: 66954.25
save_saldo: 116916.22    
    */
    //BEGIN: Entrega --------------------->
    /* 
    FECHA | N. VALE | NO. EXT | GRS A/F | BARRA | LEY | FINO | 
      *                                     *      *     *
    */

    //END: Entrega --------------------->
    //alert(": " + save_id_advance + ": " + save_nolext + ": " + save_grsaf + ": " + save_barra + ": " + save_ley + ": " + save_fino + ": " + save_finopza + ": " + save_importe + ": " + save_pagos + ": " + save_total + ": " + save_saldo )
    
    
    $('#entregaModal').modal('hide')

    let settings = {
        "url": urlMetalesdetallesC + '?type=generarcierre',
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "Basic cm9vdDphZG1pbg==",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "save_id_advance" : save_id_advance,
            "save_preio"      : save_precio,
            "metales_saldo_actual": metales_saldo_actual,
            "save_nolext"     : save_nolext,
            "save_grsaf"      : save_grsaf,
            "save_barra"      : save_barra,
            "save_ley"        : save_ley,
            "save_fino"       : save_fino,
            "save_finopza"    : save_finopza,
            "save_pagos"      : save_pagos,
            "save_total"      : save_total,
            "save_saldo"      : save_saldo,
            "save_id_advance_user" : $("#id_advance_x").val()
        }
    };

    let jqxhr1 = $.ajax(settings).done(function(response) {
            console.log("Run: Cierres")
        })
        .done(function(data) {
            $.each(data, function(i, val) {})
        })
        .fail(function(data, jqXHR, textStatus, errorThrown) {
            console.info("Run: all user loading error");
            xhrError(jqXHR, textStatus, errorThrown);
        })
        .always(function(data) {
            clearInput()
            refreshXhr()            
            console.info("Run: all user always");
        })

}
function saveDataGenerar(){
    /*
        id="generar_c_fecha"
        id="generar_c_tipo"
        id="generar_c_metal"
        id="generar_c_grs"
        id="generar_c_precio"
    */
        let id_advance      = $("#id_advance").val();
        let save_id_advance = $("#id_advance_x").val();
        
        let generar_c_fecha  = $("#generar_c_fecha").val();
        let generar_c_tipo   = $("#generar_c_tipo").val();
        let generar_c_metal  = $("#generar_c_metal").val();
        let generar_c_grs    = $("#generar_c_grs").val();
        let generar_c_precio = $("#generar_c_precio").val();

        $('#cierreModal').modal('hide')
    
        let settings = {
            "url": urlMetalsC + '?type=generarcierre',
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": "Basic cm9vdDphZG1pbg==",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "id_advance"       : id_advance,
                "save_id_advance"  : save_id_advance,
                "generar_c_fecha"  : generar_c_fecha,
                "generar_c_tipo"   : generar_c_tipo,
                "generar_c_metal"  : generar_c_metal,
                "generar_c_grs"    : generar_c_grs,
                "generar_c_precio" : generar_c_precio
            }
        };
    
        let jqxhr1 = $.ajax(settings).done(function(response) {
                console.log("Run: Cierres")
            })
            .done(function(data) {
                $.each(data, function(i, val) {})
            })
            .fail(function(data, jqXHR, textStatus, errorThrown) {
                console.info("Run: all user loading error");
                xhrError(jqXHR, textStatus, errorThrown);
            })
            .always(function(data) {
                clearInput()
                refreshXhr()      
                console.info("Run: all user always");
            }) 

}
//Genera saldo base
function saveSaldoGenerar() {
    //--->

    /*
        id="generar_c_fecha"
        id="generar_c_tipo"
        id="generar_c_metal"
        id="generar_c_grs"
        id="generar_c_precio"
    */
        let id_advance          = $("#id_advance").val();
        let save_id_advance     = $("#id_advance_x").val();
        let generar_fecha_saldo = $("#generar_fecha_saldo").val();
        let generar_saldo_saldo = $("#generar_saldo_saldo").val();

        $('#cierreModal').modal('hide')
    
        let settings = {
            "url": urlSaldoC,
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": "Basic cm9vdDphZG1pbg==",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "id_advance"          : id_advance,
                "save_id_advance"     : save_id_advance ,
                "generar_fecha_saldo" : generar_fecha_saldo ,
                "generar_saldo_saldo" : generar_saldo_saldo 
            }
        };
            let jqxhr1 = $.ajax(settings).done(function(response) {
                console.log("Run: Cierres")
            })
            .done(function(data) {
                $.each(data, function(i, val) {})
            })
            .fail(function(data, jqXHR, textStatus, errorThrown) {
                console.info("Run: all user loading error");
                xhrError(jqXHR, textStatus, errorThrown);
            })
            .always(function(data) {
                clearInput()
                refreshXhr()      
                console.info("Run: all user always");
            }) 


    //--->
}
function saveEntregaUnica(){
    console.log("BTN SAVE");
    let id_advance          = "00000000000000000000";
    let save_id_advance     = $("#id_advance_x").val();

    let save_nolext     = $("#input_eu_nolext").val();
    let save_grsaf      = $("#input_eu_grsaf").val();

    
    let save_precio     = $("#metales_eu_precio").val();
    let save_barra      = $("#input_eu_barra").val();
    let save_ley        = $("#input_eu_ley").val();
    let save_fino       = $("#input_eu_fino").val();

    let save_finopza    = $("#input_eu_finopza").val();
    let save_importe    = $("#input_eu_importe").val();

    let save_pagos      = $("#input_eu_pagos").val();
    let save_total      = $("#input_eu_total").val();
    let save_saldo      = $("#input_eu_saldo").val();

    $('#entregaUnicaModal').modal('hide')

    let settings = {
        "url": urlMetalesdetallesC + '?type=generarcierreunico',
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "Basic cm9vdDphZG1pbg==",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "id_advance"          : id_advance,
            "save_id_advance"     : save_id_advance ,
            "save_nolext" : save_nolext,
            "save_grsaf" : save_grsaf,
            "save_precio" : save_precio,
            "save_barra" : save_barra,
            "save_ley" : save_ley,
            "save_fino" : save_fino,
            "save_finopza" : save_finopza,
            "save_importe" : save_importe,
            "save_pagos" : save_pagos,
            "save_total" : save_total,
            "save_saldo" : save_saldo
        }
    };

    let jqxhr1 = $.ajax(settings).done(function(response) {
            console.log("Run: Cierres")
        })
        .done(function(data) {
            $.each(data, function(i, val) {})
        })
        .fail(function(data, jqXHR, textStatus, errorThrown) {
            console.info("Run: all user loading error");
            xhrError(jqXHR, textStatus, errorThrown);
        })
        .always(function(data) {
            clearUnicaInput()
            refreshXhr()            
            console.info("Run: all user always");
        })

}
/*****************************************************************
*                              END                              *
*                         FUNCTION XHR                          *
*****************************************************************/

function loadXhr(){
    console.log("%cXHR: %cmetales/detalles loadXhr", "color: red", "color: green");
    loadingMetalesSaldo()
    loadingSaldoActual()
    //--------------------->
    /*Loading XHR Cierresz*/
    loadingMetalesReader()
    /*Loading XHR Entregas*/
        loadingMetalesReaderEntregas()
    /*Loading XHR Cierresz Dos*/
        loadingMetalesReaderCierres()
    /*Loading XHR Pagos*/
        loadingMetalesReaderPagos()
//--------------------->
}

function refreshXhr(){
    console.log("%cXHR: %cmetales/detalles refreshXhr", "color: red", "color: green");
    loadingMetalesSaldo();
    //--------------------->
    /*Loading XHR Cierresz*/
        loadingMetalesReader()
    /*Loading XHR Entregas*/
        loadingMetalesReaderEntregas()
    /*Loading XHR Cierresz Dos*/
        loadingMetalesReaderCierres()
    /*Loading XHR Pagos*/
        loadingMetalesReaderPagos()
//--------------------->
}

//END
//-------
/***********************************************************
*                       Cierre Simple                      *
*                       FUNCTION XHR                       *
* XHR sirve para la generacion de cierres censillo         *
************************************************************/

/***********************************************************
*                      Entregas Multiple                   *
*                       FUNCTION XHR                       *
* XHR sirve para la generacion de entregas multimple sin   *
* cierre previamente creado en ets caso se genera un cierre*
* automatico                                               *
************************************************************/
function saveMultipleEntrega(emfecha,emnvale,emnoext,emAntesf,emGrs,emLey,emFinos){
//----------------------------->
console.log("%cXHR: %cmetales/detalles loadingSaldoActual", "color: red", "color: green");
let id_advance = $("#id_advance_x").val();

let settings = {
    "url"    : urlMetalesdetallesC + '?type=generarmultipleentrada',
    "method" : "POST",
    "timeout": 0,
    "headers": {
        "Authorization": "Basic cm9vdDphZG1pbg==",
        "Content-Type" : "application/x-www-form-urlencoded"
    },
    "data"   : {       
        "id_advance" :id_advance,
        "emfecha"    : emfecha,
        "emnvale"    : emnvale,
        "emnoext"    : emnoext,
        "emAntesf"   : emAntesf,
        "emGrs"      : emGrs,
        "emLey"      : emLey,
        "emFinos"    : emFinos 
    }
}
let jqxhr1 = $.ajax(settings).done(function(response) {    
                /*
                $.each(data, function(i, val) {
                    if(val.Error){
                        alert(1)
                        }else{
                            alert(2)
                            }
                })
                */
                }).fail(function(data, jqXHR, textStatus, errorThrown) {
                    xhrError(jqXHR, textStatus, errorThrown);
                }).always(function(data) {
                    $("#input_emfecha,#input_emnvale,#input_emnoext").val("")
                    $(".input_emAntesf,.input_emGrs,.input_emLey,.input_emFinos").val("0")
                    
                    refreshXhr()
                    $('#entregasMultipleModal').modal('hide')
                })
//----------------------------->                
}

//BEGIN:--------------------->
function loadingVale(typeX) {
    //--->
    console.log("%cXHR: %cloadinngVale", "color: red", "color: green");
    
    if(typeX == "unica"){
         x_id="input_eunvale"
    }else{
         x_id="input_emnvale"
    }

    let jqxhr = $.getJSON(urlValeR + "/?type=actual", function(data) {
        })
        .done(function(data) {
            $.each(data, function(i, val) {

                if(val.detail_id_advance == null){

                    }else{

                        }
                $("#"+x_id).val(parseInt(val.id)+1)

                })
        })
        .fail(function(data, jqXHR, textStatus, errorThrown) {
            //--->
            console.info("Run: all user loading error");
            xhrError(jqXHR, textStatus, errorThrown);
        })
        .always(function(data) {
        })
        //--->  
}