console.info("Run: File Metales");

//--------------------------------------------------------------------------->
$(function(){
/*############################################################*/
    
    //--------------------->
    /*
    */
    apiConecction()
    //--------------------->


    //--------------------->
    /*
    */
    loadingMetalesReader()
    //--------------------->

    btnEntrega()

    clickEntrega()
    
    clickGenerarEntrega()
    
    changeFino()
/*############################################################*/
})
//--------------------------------------------------------------------------->


function btnEntrega(){
      $(document).on('click', 'input[type="checkbox"]', function() {      
        x = $('input[type="checkbox"]').not(this).prop('checked', false);     
      
        if( $('input[type="checkbox"]').is(':checked') ) {
          $("#btnNewEntrega").attr( "disabled", false )
        }else{
          $("#btnNewEntrega").attr( "disabled", true)
        }
      })
}

function clickEntrega(){
    
    $("#btnNewEntrega").click(function() {
        btnId = $('input[type="checkbox"]').val();
        $("#metalesPrecio").empty().append($(".precio_id." + btnId).text())
        $("#metalesPrecioInput").empty().val($(".precio_id." + btnId).text())
        
        loadingMetalesOne(btnId)
        })
}

function clickGenerarEntrega(){
    $("#generarEntrega").click(function() {
        saveEntrega()
    })  
}

/*****************************
*       FUNCTION XHR
*****************************/
//BEGIN:--------------------->
function loadingMetalesReader(){
    //--->
    console.info("Run: metales loadingMetales");
      
      $("#loadingMetales").fadeOut().empty().fadeIn()
      
      let jqxhr = $.getJSON(urlMetales_metales_reader + "cierres",function (data) {
        console.log("Run: Cierres")
      })
      .done(function(data) {
          //--->
          $.each(data, function (i, val) {
 
            clientes_id = parseInt(val.id);

            //x >1,=1,<9,=9   x = 1...9                      0009
            if( clientes_id       == 1  || clientes_id   <= 9){
              detail_cliente_id = "000" + clientes_id;           
            //x >= 10 and x x == 99 x = 10...99     0099
            }else if(clientes_id  == 10  || clientes_id  <= 99){
              detail_cliente_id = "00" + clientes_id;
            //x >= 100 and x x == 999 x = 100...999 0999
            }else if(clientes_id  == 100 || clientes_id  <= 999){
              detail_cliente_id = "0" + clientes_id;
            //x >= 1000 x = 1000 .... °°            9999
            }else if(clientes_id  >= 1000){
              detail_cliente_id = clientes_id;
            }else{detail_cliente_id = clientes_id;}

            $("#loadingMetalesCierres")
              .fadeIn(3000)
              .append(
                '<tr class="table-primary">' +
                '    <th scope="row"><input type="checkbox" value="' + val.id_advance + '" class="btnId" name="id_advance"></th>' +
                '    <td>' +    detail_cliente_id        + '</td>' +
                '    <td>' + val.detail_fecha + '</td>' +
                '    <td class="font-weight-bold text-uppercase">' + val.firstname + ' ' + val.secondname + '</td>' +

                '    <td>Cerrado</td>' +
                '    <td>' + val.detail_metal  + '</td>' +

                '    <td>' + val.detail_grs + ' grs</td>' +
                '    <td  class="precio_id '  + val.id_advance + '" >' + val.detail_precio+ '</td>' +
                '    <td> 0 grs</td>' +
                '</tr>     '   
              );
  
          })
          //--->
      })        
      .fail(function (data,jqXHR, textStatus, errorThrown) {
        //--->
        console.info("Run: all user loading error");
        xhrError(jqXHR, textStatus, errorThrown);
      })
      .always(function (data) {
        //--->
        console.info("Run: all user always");
      })
    //--->  
  }
function loadingMetalesOne(btnId){
    //--->
    console.info("Run: metales loadingMetales");
      
      $("#loadingMetales").fadeOut().empty().fadeIn()
      
      let jqxhr = $.getJSON(urlMetales_metales_reader + "one" + "&id=" + btnId,function (data) {
        console.log("Run: Cierres")
      })
      .done(function(data) {
          //--->
          $.each(data, function (i, val) {
            /*
                [
                {
                    "id": "24",
                    "id_advance": "34bdc627bdf488d0e703",
                    "time": "2021-03-19 03:03:39",
                    "detail_type": "clientes",
                    "detail_id_advance": "C-zr8h0iji96crde4",
                    "firstname": "jorge",
                    "secondname": "garibaldo",
                    "detail_fecha": "2021-03-20 03:54:59",
                    "detail_status": "Abierto",
                    "detail_tipo": "compra",
                    "detail_metal": "oro",
                    "detail_grs": "82.60",
                    "detail_precio": "1244.34",
                    "detail_saldo": "0.00"
                }
]            
            */
            $("#metalesFolio").empty().append(val.id);
            $("#metalesIdadvance").empty().val(val.id_advance);
            $("#metalesFecha").empty().append(val.detail_fecha);
            $("#metalesNombre").empty().append(val.firstname + " " + val.secondname);
            $("#metalesStatus").empty().append(val.detail_status);
  
          })
          //--->
      })        
      .fail(function (data,jqXHR, textStatus, errorThrown) {
        //--->
        console.info("Run: all user loading error");
        xhrError(jqXHR, textStatus, errorThrown);
      })
      .always(function (data) {
        //--->
        console.info("Run: all user always");
      })
    //--->  
}
function saveEntrega(){
        let btnId        = $("input[name='id_advance']:checked").val()
        let generarFecha = $("#generarFecha").val()
        let generarVale  = $("#generarVale").val()
        let generarNoext = $("#generarNoext").val()
        let generarGrsaf = $("#generarGrsaf").val()
        let generarBarra = $("#generarBarra").val()
        let generarLey   = $("#generarLey").val()
        let generarFino  = $("#generarFino").val() 
        let metalesPrecioInput = $("#metalesPrecioInput").val() 
        
        //BEGIN: Entrega --------------------->
        /* 
        FECHA | N. VALE | NO. EXT | GRS A/F | BARRA | LEY | FINO | 
          *                                     *      *     *
        */

        //END: Entrega --------------------->

        $('#entregaModal').modal('hide')
        
        let settings = {
            "url"    : urlMetales_metalesentrega_create,
            "method" : "POST",
            "timeout": 0,
            "headers": {
              "Authorization": "Basic cm9vdDphZG1pbg==",
              "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "metales_id_advance" : btnId,
                "entregas_fecha"     : generarFecha,
                "entregas_no_vale"   : generarVale,
                "entregas_no_ext"    : generarNoext,
                "entregas_grs_af"    : generarGrsaf,
                "entregas_barra"     : generarBarra,
                "entregas_ley"       : generarLey,
                "entregas_fino"      : generarFino,
                "metalesPrecioInput" : metalesPrecioInput
            }
          };
          
          let jqxhr1 = $.ajax(settings).done(function (response) {
            console.log("Run: Cierres")
          })
          .done(function(data) {
              $.each(data, function (i, val) {})
          })        
          .fail(function (data,jqXHR, textStatus, errorThrown) {
            console.info("Run: all user loading error");
            xhrError(jqXHR, textStatus, errorThrown);
          })
          .always(function (data) {
            loadingMetalesEntrega(btnId)
            console.info("Run: all user always");
          })
          
}
function loadingMetalesEntrega(btnId){
    //--->
    console.info("Run: metales loadingMetales");
      
      $("#loadingMetales").fadeOut().empty().fadeIn()
      
      let jqxhr = $.getJSON(urlMetales_metalesentrega_reader_emtrega  + btnId,function (data) {
        console.log("Run: Cierres")
      })
      .done(function(data) {
          //--->
          $.each(data, function (i, val) {
 


            $("#loadingMetalesCierres")
              .fadeIn(3000)
              .append(
   
              );
  
          })
          //--->
      })        
      .fail(function (data,jqXHR, textStatus, errorThrown) {
        //--->
        console.info("Run: all user loading error");
        xhrError(jqXHR, textStatus, errorThrown);
      })
      .always(function (data) {
        //--->
        console.info("Run: all user always");
      })
    //--->  
  }
//END:----------------------->

function changeFino(){

    $("#generarBarra,#generarLey").change(function() {
      
      if(isEmpty($("#generarBarra").val())){
        //alert(1)  
      }else if(isEmpty($("#generarLey").val())){
        //alert(2)
      }else{
          let a = parseFloat($("#generarBarra").val());
          let b = parseFloat($("#generarLey").val());
          let c = parseInt(24);

          let detail_fino =  (a*b)/c;
          $("#generarFino").val(detail_fino.toFixed(2));

      }
      
    });
  }