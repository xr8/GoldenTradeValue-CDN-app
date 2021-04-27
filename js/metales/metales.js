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
    loadingMetales()
    //--------------------->

    //--------------------->
    /*
    */
    clickOne()
    //--------------------->
    
    //--------------------->
    /*
    */
    clickDetallesCierres()
    //--------------------->

   //--------------------->
    /*
    */    
    btnCierres()
    //--------------------->

    //--------------------->
    /*
    */
    cierresNuevosModal()
    //--------------------->

    //--------------------->
    /*
    */
    searchAll()
    //--------------------->

/*############################################################*/
})
//--------------------------------------------------------------------------->

function clickOne(){
  //--->
  console.info("Run: metales clickOne");
  
  $(document).on('click', 'input[type="checkbox"]', function() {      
    x = $('input[type="checkbox"]').not(this).prop('checked', false);     
  
    if( $('input[type="checkbox"]').is(':checked') ) {
      $("#btnDetallesCierres").attr( "disabled", false )
      $(".data_cierres").fadeOut() 
    }else{
      $("#btnDetallesCierres").attr( "disabled", true)
      $(".data_cierres").fadeIn() 
    }

    $(".data_"+$(this).attr('id')).fadeIn()
    
    console.log($(this).attr('id'))
  })
  
  //--->
}
function clickDetallesCierres(){
  $("#btnDetallesCierres").click(function() {
  window.location.replace(url_base + "metales/detalles/?id=" + $("input:checked").attr( "id" ) + "&since=origin")
  })
}
function btnCierres(){
  //--->
  console.info("Run: click reload cierres");
  $("#btnCierres").on('click',function() { 
    loadingMetales()
  })
  //--->
}
function cierresNuevosModal(){
  
  //closecierre
    $("#cirresModalSave").on('click',function() { 
      alert("save")
      $('#cierreNuevoModal').modal('hide')
      saveData()
      clearData()
      loadingMetales()
    })    

  //save cierre
    $("#cirresModalclosed").on('click',function() { 
      $('#cierreNuevoModal').modal('hide')
      clearData()
      loadingMetales()
    })    

           
}
function searchAll(){
    $("#btnNuevoCierres").on('click',function() { 
      dateTime();
      //FormControlCliente
      autoComplete();
      changeSaldo();
    })
}
function dateTime(){
  var d = new Date();
  var x = document.getElementById("demo");
  
  var h = addZero(d.getHours());
  var n = d.getMinutes();
  var s = addZero(d.getSeconds());

  var y = d.getFullYear();
  var m = addZero(d.getMonth() + 1);
  var d = addZero(d.getDate()  + 1);

  $("#detail_fecha").empty().val(y + "-" + m + "-" + d + " " + h + ":" + n + ":" + s);
}
function clearData(){
  console.log("Run clearData");
    $("#detail_fecha,#detail_saldo,#detail_status,#FormControlCliente,#detail_id_advance,#detail_grs,#detail_precio,#detail_tipo,#detail_metal").val("");
      dateTime();
      $("#detail_saldo").val("$000.00");
      $("#detail_status").val("Abierto");
      $("#detail_tipo,#detail_metal").prop('selectedIndex',0);
}
function changeSaldo(){

  $("#detail_grs,#detail_precio").change(function() {
    
    if(isEmpty($("#detail_grs").val())){
      //alert(1)  
    }else if(isEmpty($("#detail_precio").val())){
      //alert(2)
    }else{
      let detail_saldo = parseFloat($("#detail_grs").val()) * parseFloat($("#detail_precio").val());
      $("#detail_saldo").val("$" + detail_saldo);
    }
    
  });
}

/*****************************
*       FUNCTION XHR
*****************************/
//BEGIN:--------------------->
function loadingMetales(){
  //--->
  console.info("Run: metales loadingMetales");
    
    $("#loadingMetales").fadeOut().empty().fadeIn()
    
    let jqxhr = $.ajax(urlMetalesdetallesR,function (data) {
      console.log("Run: Cierres")
    })
    .done(function(data) {
        //--->
        $.each(data, function (i, val) {
          /**
           *
            Time_minify: "2021-04-23"
            detail_cliente: {clientes_rfc: "rdgrj831228", clientes_telefono: "5515067867", clientes_apellido: "garibaldo",…}
            clientes_activo: "true"
            clientes_apellido: "garibaldo"
            clientes_curp: "curp"
            clientes_direccion: "c 26 n 84 col edo de mexico cd neza estado de mexico cp 57210"
            clientes_email: "biohizard@gmail.com"
            clientes_id: "1"
            clientes_id_advance: "C-zr8h0iji96crde4"
            clientes_nombre: "jorge"
            clientes_rfc: "rdgrj831228"
            clientes_telefono: "5515067867"
            clientes_time: "2019-08-26 17:37:55"
            detail_fecha: "2021-04-22 00:00:00"
            detail_grs: "-1.27"
            detail_id_advance: "C-zr8h0iji96crde4"
            detail_precio: "1244.34"
            detail_status: "abierto"
            detail_tipo: "compra"
            detail_total_operaciones: "1"
            metales_id: "10"
            metales_id_advance: "a79c7a16f9e59cd03281"
            metales_time: "2021-04-23 16:03:28"
           */
          /*###################*/
          
          /*
          detail_cliente
            clientes_rfc
            */
 
          
          clientes_id = parseInt(val.detail_cliente['clientes_id']);

          //x >1,=1,<9,=9   x = 1...9                      0009
          if( clientes_id       == 1  || clientes_id   <= 9){
            detail_cliente_id = "000" + val.detail_cliente['clientes_id']           
          //x >= 10 and x x == 99 x = 10...99     0099
          }else if(clientes_id  == 10  || clientes_id  <= 99){
            detail_cliente_id = "00" +val.detail_cliente['clientes_id'];
          //x >= 100 and x x == 999 x = 100...999 0999
          }else if(clientes_id  == 100 || clientes_id  <= 999){
            detail_cliente_id = "0" + val.detail_cliente['clientes_id']
          //x >= 1000 x = 1000 .... °°            9999
          }else if(clientes_id  >= 1000){
            detail_cliente_id =val.detail_cliente['clientes_id'];
          }else{detail_cliente_id = val.detail_cliente['clientes_id']}
          /*###################*/
          
          $("#loadingMetales")
            .fadeIn(3000)
            .append(
                '<tr>' +
                  '<th scope="row"><input type="checkbox" class="idAdvance" id="' + val.detail_id_advance +'"></th>' +
                  '<td> ' + detail_cliente_id + '</td>' +
                  '<td> ' + val.Time_minify + '</td>' +
                  '<td class=\'text-capitalize\'> ' + val.detail_cliente['clientes_nombre'] + ' ' + val.detail_cliente['clientes_apellido'] +'</td>' +
                  '<td> ' + val.detail_total_operaciones + '</td>' +
                '</tr>'   
            );
        })
        //--->

        //--->
        console.info("Run: all user checkbox only one");
        $('input[name="idX"]').click(function () {
          $('input[name="idX"]').not(this).prop("checked", false)
        })

        $('input[name="idX"]').change(function () {
          id_advance = $(this).attr("id");

          $("#iduserupdate").val(id_advance);

          oneClientes(id_advance);
          $("#user-update").prop("disabled", false);
          $("#user-delete").prop("disabled", false);
          $("#user-resume").prop("disabled", false);
        })

        $("#user-update").prop("disabled", true);
        $("#user-delete").prop("disabled", true);
        $("#user-resume").prop("disabled", true);

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
function saveData(){

  let detail_id_advance = $("#detail_id_advance").val();
  let detail_fecha      = $("#detail_fecha").val();
  detail_type_result    = detail_id_advance.split("-");
  if(detail_type_result[0] == "C"){type_result = "clientes";}

  //let detail_saldo      = $("#detail_saldo").val();
  //let detail_status     = $("#detail_status").val();
  

 let detail_saldo      = 0;
 let detail_status     = "abierto";

  let detail_tipo       = $("#detail_tipo").val();
  let detail_metal      = $("#detail_metal").val();
  let ddetail_grs       = $("#detail_grs").val();
  let detail_precio     = $("#detail_precio").val();



  let settings = {
    "url"    : url_metales_create,
    "method" : "POST",
    "timeout": 0,
    "headers": {
      "Authorization": "Basic cm9vdDphZG1pbg==",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      "detail_id_advance": detail_id_advance,
      "detail_type"      : type_result,
      "detail_fecha"     : detail_fecha,

      
      "detail_status"    : detail_status,
      
      "detail_tipo"      : detail_tipo ,
      "detail_metal"     : detail_metal,
      "detail_grs"       : ddetail_grs,
      "detail_precio"    : detail_precio,
      "detail_saldo"     : detail_saldo
    }
  };
  
  let jqxhr2 = $.ajax(settings).done(function (response) {
    console.log("Run: Cierres")
  })
  .done(function(data) {
    window.location.replace(url_base + "metales/detalles/?id=" + detail_id_advance + "&since=origin")
      $.each(data, function (i, val) {})
  })        
  .fail(function (data,jqXHR, textStatus, errorThrown) {
    console.info("Run: all user loading error");
    xhrError(jqXHR, textStatus, errorThrown);
  })
  .always(function (data) {
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
        let generar_c_fecha  = $("#generar_c_fecha").val();
        let generar_c_tipo   = $("#generar_c_tipo").val();
        let generar_c_metal  = $("#generar_c_metal").val();
        let generar_c_grs    = $("#generar_c_grs").val();
        let generar_c_precio = $("#generar_c_precio").val();

        console.log("Data: " + generar_c_fecha + generar_c_tipo + generar_c_metal + generar_c_grs + generar_c_precio )
}

function autoComplete(){
  //--->
  $("#FormControlCliente").autocomplete({
    minLength: 4,
    delay: 100,
    source: function (req, add) {
      // XMLHttpRequest --->
      $.getJSON(url_api_search, req, function (data) {
        var suggestions = [];
        $.each(data, function (i, val) {
          if (val.Error == "101") {
            suggestions.push({
              id    : "Error 101",
              value : "Búsqueda no encontrada"
            });
          } else {
            suggestions.push({
              id    : val.id_advance,
              value : val.firstname + " " + val.secondname
            });
          }
        });

        add(suggestions);

      });
      // XMLHttpRequest --->
    },
    select: function (event, ui) {
      $("#detail_id_advance").val(" ").val(ui.item.id);
    },
  });
  //--->
}
//END:----------------------->

/*****************************
*       FUNCTION UTILITY
*****************************/
//BEGIN:--------------------->
function addZero(i){
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function isEmpty(val){
  return (val === undefined || val == null || val.length <= 0) ? true : false;
}
//END:----------------------->

//--------------------------------------------------------------------------->
$("#btnGenerarCierre").click(function() {
    /*
    #cierreNuevoFolio
    #cierreNuevoFecha
    #cierreNuevoCliente
    #cierreNuevoGrs
    #cierreNuevoPrecio
    #cierreNuevoSaldo
    */
   var cierreNuevoFolio   = $("#cierreNuevoFolio").val()
   var cierreNuevoFecha   = $("#cierreNuevoFecha").val()
   var cierreNuevoCliente = $("#cierreNuevoCliente").val()

   var cierreNuevoGrs     = $("#cierreNuevoGrs").val()
   var cierreNuevoPrecio  = $("#cierreNuevoPrecio").val()
   var cierreNuevoSaldo  = $("#cierreNuevoSaldo").val()

  console.log("generar click" + cierreNuevoFolio + cierreNuevoFecha + cierreNuevoCliente + cierreNuevoGrs + cierreNuevoPrecio + cierreNuevoSaldo)

  alert("generar click" + cierreNuevoFolio + cierreNuevoFecha + cierreNuevoCliente + cierreNuevoGrs + cierreNuevoPrecio + cierreNuevoSaldo)
})
//--------------------------------------------------------------------------->   