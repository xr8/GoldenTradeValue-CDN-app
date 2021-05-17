/*****************************************************************
 *                              BEGIN                            *
 *                           Load Tabs                           *
 *****************************************************************/
 //BEGIN---------------------------------------------------------->

     //BEGIN:--------------------->
     function loadXhr(){
        console.log("%cXHR: %cmetales/detalles loadXhr", "color: red", "color: green");
        
        //loadingSaldoActual()
            
        loadingTabsCierres()

        loadingMetalesReaderEntregas()
        loadingMetalesReaderCierres()

        loadingTabsPagos()

        loadingMetalesSaldo()

    //--------------------->
    }

    //BEGIN:--------------------->
    function refreshXhr(){
        console.log("%cXHR: %cmetales/detalles refreshXhr", "color: red", "color: green");
        loadingTabsCierres()

        loadingMetalesReaderEntregas()
        loadingMetalesReaderCierres()

        loadingTabsPagos()

        loadingMetalesSaldo()
    //--------------------->
    }

//END------------------------------------------------------------>
/*****************************************************************
 *                               End                             *
 *                           Load Tabs                           *
 *****************************************************************/

/*****************************************************************
 *                              BEGIN                            *
 *                              TABS                             *
 *****************************************************************/
 //BEGIN---------------------------------------------------------->

    //BEGIN:---------------------> tabs Cierres
    function loadingTabsCierres(){
        //--->
        console.log("%cXHR: %cmetales/detalles loadingTabsCierres", "color: red", "color: green");
        $("#loadingMetalesCierres").fadeIn().empty()

        let id_advance = $("#id_advance_x").val();

        let jqxhr = $.getJSON(urlMetalesdetallesR + "/?name=tabsCierres&type=cierres&id=" + id_advance, function(data) {
            })
            .done(function(data) {
                //--->
                $.each(data, function(i, val) {
                    
                    if(val.Code == 104){

                        $("#loadingMetalesCierres")
                            .fadeIn(3000)
                            .append(
                                '<tr><th>Sin Cierres</th></tr>'
                            );

                    }else{

                        let m_id = zerocien(parseInt())
                        let mc_id = zerocien(parseInt(val.mc_id))
                        
                        if (parseFloat(val.m_detail_grs) == 0) {
                            checkbox =  '    <th scope="row"></th>';
                        } else {
                            checkbox = '    <th scope="row"><input type="checkbox" value="' + val.m_id_advance + '" class="btnId" name="id_advance"></th>';
                        }


                        if (parseFloat(val.m_detail_grs) == 0) {
                            colorCierres = "table-danger";
                        } else if (parseFloat(val.m_detail_grs_original) == parseFloat(val.m_detail_grs)) {
                            colorCierres = "table-primary";
                        } else if (parseFloat(val.m_detail_grs) > 0) {
                            colorCierres = "table-success";
                        }else{
                            colorCierres = "";
                        }

                        //Compra de Metales cliente $saldo
                        $("#cliente_nombre")
                            .fadeIn(3000)
                            .html(val.c_firstname + ' ' + val.c_secondname)

                        //#	ID Cierre	Fecha	Tipo	Status	Metal	Precio	Peso Original	Peso Actual
                        let x_pagos = new Intl.NumberFormat("en-US").format(val.m_detail_precio)
                        
                        $("#loadingMetalesCierres")
                            .fadeIn(3000)
                            .append(
                                '<tr class="cierresItem ' + colorCierres + '" id="' + val.m_id_advance + '">' +
                                     checkbox                                         +
                                '    <td class="'+ val.m_id_advance  +'">'            + val.m_id                  + '</td>'      +
                                '    <td class="'+ val.m_id_advance  +'">'            + val.m_time                + '</td>'      +
                                '    <td class="'+ val.m_id_advance  +'">'            + val.m_detail_tipo         + '</td>'      +
                                '    <td class="'+ val.m_id_advance  +'">'            + val.m_detail_status       + '</td>'      +
                                '    <td class="'+ val.m_id_advance  +' precio">  $ ' + x_pagos                   + '</td>'      +
                                '    <td class="'+ val.m_id_advance  +'">'            + val.m_detail_grs_original + ' Grs </td>' +
                                '    <td class="'+ val.m_id_advance  +' pesoactual">' + val.m_detail_grs          + ' Grs </td>' +
                                '</tr>'
                            )
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

    //BEGIN:---------------------> tabs Cierres
    function loadingMetalesReaderEntregas() {
        //--->
        console.log("%cXHR: %cmetales/detalles loadingMetalesReaderEntregas", "color: red", "color: green");
        $("#loadingMetalesEntregas").fadeIn().empty()

        let id_advance = $("#id_advance_x").val();

        let jqxhr = $.getJSON(urlMetalesdetallesR + "/?name=tabsEntrgas&type=entregas&id=" + id_advance, function(data) {
            })
            .done(function(data) {
                //--->
                $.each(data, function(i, val) {
                    $("")
                    if(val.Code == 104){

                        $("#loadingMetalesEntregas")
                            .fadeIn(3000)
                            .append(
                                '<tr><th>Sin Entregas</th></tr>'
                            )

                    }else{
                        $("#loadingMetalesEntregas")
                            .fadeIn(3000)
                            .append(
                                '<tr class="' + val.m_id_advance + '">' +
                                '    <th scope="row"><input type="checkbox" class="checkEntregas" name="' + val.id_advance_metales + '"></th>' +
                                '    <td>' + val.id_metales + '</td>' +
                                '    <td>' + val.entregas_fecha + '</td>' +
                                '    <td>' + zerocien(val.entregas_no_vale) + '</td>' +
                                '    <td>' + zeronull(val.entregas_no_ext) + '</td>' +
                                '    <td>' + val.entregas_grs_af + '</td>' +
                                '    <td>' + val.entregas_barra + ' Grs</td>' +
                                '    <td>' + val.entregas_ley + '</td>' +
                                '    <td>' + val.entregas_fino + ' Grs</td>' +
                                '</tr>     '
                        )
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
    //BEGIN:---------------------> tabs cierres dos
    function loadingMetalesReaderCierres() {
        //--->
        console.log("%cXHR: %cmetales/detalles loadingMetalesReaderCierre", "color: red", "color: green");
        $("#loadingMetalesCierresdos").fadeIn().empty()

        let id_advance = $("#id_advance_x").val();

        let jqxhr = $.getJSON(urlMetalesdetallesR + "/?name=tabsCierresDos&type=cierresdos&id=" + id_advance, function(data) {
            })
            .done(function(data) {
                //--->
                $.each(data, function(i, val) {
                    if(val.Code == 104){

                        $("#loadingMetalesCierresdos")
                            .fadeIn(3000)
                            .append(
                                '<tr><th>Sin Cierres Dos</th></tr>'
                            )

                    }else{

                        $("#loadingMetalesCierresdos")
                        .fadeIn(3000)
                        .append(
                            '<tr>' +
                            '    <th scope="row"><input type="checkbox" value="' + val.m_id_advance + '" class="btnId" name="id_advance"></th>' +
                            '    <td>' + val.m_id + '</td>' +
                            '    <td>' + val.entregas_fecha + '</td>' +
                            '    <td>' + val.cierres_fino + ' Grs</td>' +
                            '    <td> $ ' + val.detail_precio + '</td>' +
                            '    <td> $ ' + val.cierres_precio + '</td>' +
                            '</tr>     '
                        )

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

    //BEGIN:---------------------> tabs pagos
    function loadingTabsPagos() {
        //--->
        console.log("%cXHR: %cmetales/detalles loadingMetalesReaderPagos", "color: red", "color: green");
        $("#loadingMetalesPagos").fadeIn().empty()

        let id_advance = $("#id_advance_x").val();

        let jqxhr = $.getJSON(urlMetalesdetallesR + "/?name=tabsPagos&type=pagos&id=" + id_advance, function(data) {
            })
            .done(function(data) {
                //--->
                $.each(data, function(i, val) {

                    if(val.Code == 104){

                        $("#loadingMetalesPagos")
                            .fadeIn(3000)
                            .append(
                                '<tr><th>Sin Pagos</th></tr>'
                            )

                    }else{
                        
                        let y_total = new Intl.NumberFormat("en-US").format(val.pagos_total)
                        let y_pagos = new Intl.NumberFormat("en-US").format(val.pagos_pagos)
                        let y_saldo = new Intl.NumberFormat("en-US").format(val.pagos_saldos )
                        
                        $("#loadingMetalesPagos")
                            .fadeIn(3000)
                            .append(
                                '<tr class=' + val.m_id_advance + '">' +
                                '    <th scope="row"><input type="checkbox" value="' + val.m_id_advance + '" class="btnId" name="id_advance"></th>' +
                                '    <td>   ' + val.m_id + '</td>' +
                                '    <td>   ' + val.entregas_fecha + '</td>' +
                                '    <td> $ ' + y_total + '</td>' +
                                '    <td> $ ' + y_pagos + '</td>' +
                                '    <td> $ ' + y_saldo+ '</td>' +
                                '    <td>'    + val.pagos_observaciones + '</td>' +
                                '</tr>'
                            )
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


    //BEGIN:---------------------> saldo
    function loadingMetalesSaldo() {
        //--->
        console.log("%cXHR: %cmetales/detalles loadingMetalesSaldo", "color: red", "color: green");
        $("#loadingMetalesCierres").fadeIn().empty()

        let id_advance = $("#id_advance_x").val();

        let jqxhr = $.getJSON(urlSaldoR + "/?name=Saldo&type=saldo&id=" + id_advance, function(data) {
            })
            .done(function(data) {
                //--->
                $.each(data, function(i, val) {
                    if(val.Error){
                        console.error("%cXHR: %cmetales/detalles Error DB saldo", "color: red", "color: yellow");
                    }else{
                        //$("#btnModalSaldo").hide()
                        //$("#btnModalCierre,#btnModalEntrega,#btnentregasMultipleModal,#btnModalEntregaUnica,#reloadCaja").show()

                        $(".saldoActual").html(val.detail_saldo_actual)
                
                        $("#xhrCliente").html(val.firstname + " " + val.secondname)
                        $("#xhrSaldo").html(val.detail_saldo_actual)
                        $("#xhrCliente").show()
                        $("#xhrSaldotxt").show()
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

//END------------------------------------------------------------>
/*****************************************************************
 *                               End                             *
 *                              TABS                             *
 *****************************************************************/

/*****************************************************************
 *                            - BEGIN -                          *
 *                              TABS                             *
 *                            Save Btn                           *
 *****************************************************************/
 //BEGIN---------------------------------------------------------->
    
    //BEGIN:---------------------> generar cierre
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
            let generar_c_grs    = $("#generar_c_grs").val();
            let generar_c_precio = $("#generar_c_precio").val();

            $('#cierreModal').modal('hide')
        
            let settings = {
                "url": urlMetalesC + '?type=generarcierre',
                "method": "POST",
                "timeout": 0,
                "headers": {
                    /*"Authorization": "Basic cm9vdDphZG1pbg==",*/
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                "data": {
                    "id_advance"       : id_advance,
                    "save_id_advance"  : save_id_advance,
                    "generar_c_fecha"  : generar_c_fecha,
                    "generar_c_tipo"   : generar_c_tipo,
                    //"generar_c_metal"  : generar_c_metal,
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
                    clearUnicaInput()
                    refreshXhr()      
                    console.info("Run: all user always");
                }) 

    }
//metalesdetalles/readerdata/?type=saldo&id=C-zr8h0iji96crde
//BEGIN:--------------------->  
/*Entrega Unica*/
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
   /*
    let xyz = $("#metales_precio").html();
        xyz = xyz.split(" ");

    let abc = $("#metales_saldo_actual").html();
        abc = abc.split(" ");
    */

    let save_id_advance = $("#input_id_advance").val();
    
    //let save_precio     = xyz[1];
    //let metales_saldo_actual = abc[1];
    
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

    let input_emnvaleE1 = $("#input_novale").val();
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


        save_preio: 
        metales_saldo_actual: 
        save_nolext: 0
        save_grsaf: 0
        save_barra: 150
        save_ley: 12
        save_fino: 75.00
        save_id_advance_user: C-zr8h0iji96crde4
        save_vale: 101
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
            /*"Authorization": "Basic cm9vdDphZG1pbg==",*/
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "save_id_advance" : save_id_advance,
            //"save_preio"      : save_precio,
            //"metales_saldo_actual": metales_saldo_actual,
            "save_nolext"     : save_nolext,
            "save_grsaf"      : save_grsaf,
            "save_vale"       : input_emnvaleE1,

            "save_barra"      : save_barra,
            "save_ley"        : save_ley,
            "save_fino"       : save_fino,
            /*
            "save_finopza"    : save_finopza,
            "save_pagos"      : save_pagos,
            "save_total"      : save_total,
            "save_saldo"      : save_saldo,*/
            //"save_id_advance"         : $('input[type="checkbox"]:checked').val(),
            "save_id_advance_user"    : $("#id_advance_x").val()
            
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
 //BEGIN---------------------------------------------------------->

    //BEGIN:--------------------->
    function loadingVale(typeX) {
        //--->
        console.log("%cXHR: %cloadinngVale", "color: red", "color: green");
        
        if(typeX == "unica"){
            x_id="input_eu_nvale"
        }else if(typeX == "nueva"){
            x_id="input_emnvaleE1"
        }else if(typeX == "entrega"){
            x_id="input_novale"
        }else if(typeX == "cierresimple"){
            x_id="save_vale_cs"
        }else if(typeX == "save_cierredos"){
            x_id="save_cierredos"
    }

        let jqxhr = $.getJSON(urlValeR + "/?name=novale&type=actual", function(data) {
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
//                $("#input_cs_precio").val($('.'+$('input[type="checkbox"]').val()+'.precio').html())
            })
            //--->  
    }


 //END---------------------------------------------------------->

    //BEGIN:---------------------> pagos
    function saveTabsPagos(){
        console.log("BTN SAVE");

        let generarPagoTotal     = $("#generarPagoTotal").val()
        let generarPago          = $("#generarPago").val()
        let generarTipoPago      = $("#generarTipoPago").val()
        let generarSaldo         = $("#generarSaldo").val()
        let generarObservaciones = $("#generarObservaciones").val()
        
        let settings = {
            "url": urlMetalesdetallesC + '?type=saveTabsPago',
            "method": "POST",
            "timeout": 0,
            "headers": {
                /*"Authorization": "Basic cm9vdDphZG1pbg==",*/
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "save_id_advance"         : $('input[type="checkbox"]:checked').val(),
                "save_id_advance_user"    : $("#id_advance_x").val(),
                "generarPagoTotal"        : generarPagoTotal     ,
                "generarPago"             : generarPago          ,
                "generarTipoPago"         : generarTipoPago      ,
                "generarSaldo"            : generarSaldo         ,
                "generarObservaciones"    : generarObservaciones 
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
                //btnDisables()
                refreshXhr()
                console.info("Run: all user always");
            })

    }

//END------------------------------------------------------------>
/*****************************************************************
 *                            - BEGIN -                          *
 *                              TABS                             *
 *                            Save Btn                           *
 *****************************************************************/