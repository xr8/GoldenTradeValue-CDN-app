/*==============================================
                API URLS                  
==============================================*/
//url_base
var local = true;
if (local == true) {
    var txtServe  = "on the server localhost";
    var hostlocal = "localhost/server/DevOps/GoldenTradeValue/";
        url_base  = "//" + hostlocal + "GoldenTradeValue-APP/index.php/";
        url_api   = "//" + hostlocal + "GoldenTradeValue-API/index.php/";
        url_cdn   = "//" + hostlocal + "GoldenTradeValue-APP/";
} else {
    var txtServe = "on the server web";
    var hostweb  = "gtvsa.com";
        url_base = "//app." + hostweb + "/";
        url_api  = "//api." + hostweb + "/";
        url_cdn  = "//cdn." + hostweb + "/";
}
//--->
function apiConecction() {
    $.getJSON(url_api_api, function(data) {
        console.log("%c            Api Connection            ",                   "color: red; text-transform: uppercase,text-decoration: underline");
        console.log("%cApi Connection : %cSuccess",                   "color: red; text-transform: uppercase", "color: green; text-transform: lowercase");
        console.log("%cAPI Token      : %c" + data['Api Connection'], "color: red; text-transform: uppercase", "color: green; text-transform: lowercase");
        console.log("%cAPI Time       : %c" + data['Api Time'],       "color: red; text-transform: uppercase", "color: green; text-transform: lowercase");  
        }).fail(function(jqXHR, textStatus, errorThrown) {
            xhrError(jqXHR, textStatus, errorThrown);
            }).always(function() {
                });
}
//--->  
console.log("%c Run APP: " + txtServe + " ", "color:green; text-decoration: underline");
//*********************************************************************************//
//                                                                                 //
//                                      REAL                                       //
//                                                                                 //
//*********************************************************************************//  
//0.- url_api
url_api_api = url_api + "";
url_api_search = url_api + "search/querys?";
//1.- url_user
url_user_one = url_api + "user/readerdata";
url_user_all = url_api + "user/readerdata";
url_user_new = url_api + "user/createdata";
url_user_update = url_api + "user/updatedata";
url_user_delete = url_api + "user/deletedata";
url_user_find = url_api + "user/finddata?user=";
//2.- url_clientes
url_clientes_one = url_api + "clientes/readerdata";
url_clientes_all = url_api + "clientes/readerdata";
url_clientes_new = url_api + "clientes/createdata";
url_clientes_update = url_api + "clientes/updatedata";
url_clientes_delete = url_api + "clientes/deletedata";
//clientes/readerdata?id_advance=C-zr8h0iji96crde4&a181a603769c1f98ad927e7367c7aa51=68934a3e9455fa72420237eb05902327
urlClienteC = url_api
urlClienteR = url_api + "clientes/readerdata";
urlClienteU = url_api;
urlClienteD = url_api;

//3.- url_clientes
url_proveedores_one = url_api + "proveedores/readerdata";
url_proveedores_all = url_api + "proveedores/readerdata";
url_proveedores_new = url_api + "proveedores/createdata";
url_proveedores_update = url_api + "proveedores/updatedata";
url_proveedores_delete = url_api + "proveedores/deletedata";
//4.- url_clientes
url_caja_one = url_api + "caja/readerdata?a181a603769c1f98ad927e7367c7aa51=68934a3e9455fa72420237eb05902327&date=&id_advance=";
url_caja_all = url_api + "caja/readerdata";
url_caja_cancelados = url_api + "caja/utilitydata?type=cancelados&id_advance=&a181a603769c1f98ad927e7367c7aa51=b326b5062b2f0e69046810717534cb09&a181a603769c1f98ad927e7367c7aa51=b326b5062b2f0e69046810717534cb09&date=";
url_caja_new = url_api + "caja/createdata";
url_caja_update = url_api + "caja/updatedata";
url_caja_delete = url_api + "caja/deletedata";
url_caja_utility = url_api + "caja/utilitydata?type=";
url_saldo_read = url_api + "cajasaldo/readerdata?aMiEgqwaxoVhBqo8yJze=";
url_saldo_create = url_api + "cajasaldo/createdata";
urlBuscadorAutocomplete = url_api + "caja/utilitydata?type=buscar";

//5.- url_metales
/*
* urlMetalsC sirve para generar cierre nuevo basico
*/
urlMetalsC  = url_api + "metales/createdata";
urlMetalsR  = url_api + "metales/readerdata";
urlMetalsU  = url_api; 
urlMetalsD  = url_api; 

//6.- url_metalesentrega
//metalesdetalles/readerdata/?type=cierres&id=C-zr8h0iji96crde4
//-------------------------------------------------------------->
urlMetalesdetallesC = url_api + "metalesdetalles/createdata";
urlMetalesdetallesR = url_api + "metalesdetalles/readerdata";
urlMetalesdetallesU = url_api;
urlMetalesdetallesD = url_api;

url_metalesdetalles_reader          = url_api + "metalesdetalles/readerdata/?type=cierres&id=";
url_metalesdetalles_reader_entregas = url_api + "metalesdetalles/readerdata/?type=entregas&id=";
url_metalesdetalles_reader_cierres  = url_api + "metalesdetalles/readerdata/?type=cierresdos&id=";
url_metalesdetalles_reader_pagos    = url_api + "metalesdetalles/readerdata/?type=pagos&id=";
url_metalesdetalles_reader_one      = url_api + "metalesdetalles/readerdata/?type=one&id=";

//-------------------------------------------------------------->
//6.- url_metalesentrega
//metalesdetalles/readerdata/?type=cierres&id=C-zr8h0iji96crde4
//-------------------------------------------------------------->
urlSaldoC = url_api + "saldo/createdata";
urlSaldoR = url_api + "saldo/readedata";
urlSaldoU = url_api;
urlSaldoD = url_api;
//saldo/readedata?type=actual&id=C-zr8h0iji96crde4
/*
url_metalessaldo = url_api + 'metalesdetalles/readerdata/?type=saldo&id=';
url_metalessaldoctual = url_api + 'metalesdetalles/readerdata/?type=saldoactual';
*/

//-------------------------------------------------------------->
//7.- Vale
//-------------------------------------------------------------->
urlValeC = url_api + "vale/createdata";
urlValeR = url_api + "vale/readedata";
urlValeU = url_api;
urlValeD = url_api;