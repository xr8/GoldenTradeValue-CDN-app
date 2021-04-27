//-------------------------------------------------------------------->
console.log("%cLoad File : %centregamultiple", "color: cyan", "color: yellow");
/********************************/
/*          ENTREGA MULTIPLE    */
/********************************/
function clickModalEntregaMultiple(){
    $("#btnentregasMultipleModal").on('click',function() {
        let typeX = "multiple"
        loadingVale(typeX)
    })
}

function btnEntregaMultiple(){
    $("#btnGenerarEntregaMultiple").on('click',function() {    

        let emfecha = $("#input_emfecha").val();
        let emnvale = $("#input_emnvale").val();
        let emnoext = $("#input_emnoext").val();

        let emAntesf =[]; 
        $(".input_emAntesf").each(function(){
            emAntesf.push($(this).val());
        })
        
        let emGrs =[]; 
        $(".input_emGrs").each(function(){
            emGrs.push($(this).val());
        })
        
        let emLey =[]; 
        $(".input_emLey").each(function(){
            emLey.push($(this).val());
        })
        
        let emFinos =[]; 
        $(".input_emFinos").each(function(){
            emFinos.push($(this).val());
        })

        saveMultipleEntrega(emfecha,emnvale,emnoext,emAntesf,emGrs,emLey,emFinos)
        
    })
}
//-------------------------------------------------------------------->
//-------------------------------------------------------------------->
function plusEntrada(){
    console.log("Run: plusEntrada")
    $("#plusEntrega").on('click',function(){
    let x = makeid(5);
        var large =
        '<div class="col-12 rowEntrada ' + x + '">'+
        '<!-- Begin: cierres no ' + x + '-->'+
        '<div class="cmItem row col-10 offset-1 shadow-lg p-3 mb-5 bg-body rounded">'+
        '    <!--Begin:-->'+
        '    <div class="col-2 offset-10 text-right text-danger text-xl"><i class="cmIBtn btnDeleteEntregas ' + x + ' bi bi-dash-circle-fill"></i></div>'+
        '    <div class="col-6">'+
        '        <div class="mb-3">'+
        '          <label for="firstName">Antes de Fundir</label>'+
        '          <input type="text" class="form-control input_emAntesf" placeholder="" value="0" required="">'+
        '          <div class="invalid-feedback">Antes de Fundir</div>'+
        '        </div>'+
        '        <div class="mb-3">'+
        '          <label for="firstName">Grs.</label>'+
        '          <input type="text" class="form-control input_emGrs"    placeholder="" value="0" required="">'+
        '          <div class="invalid-feedback">Grs.</div>'+
        '        </div>              '+
        '    </div>'+
        '    <div class="col-6">'+
        '        <div class="mb-3">'+
        '          <label for="firstName">Ley</label>'+
        '          <input type="text" class="form-control input_emLey"    placeholder="" value="0" required="" data-toggle="tooltip" data-placement="top" title="precio * Fino/Pza">'+
        '          <div class="invalid-feedback">Ley</div>'+
        '        </div>'+
        '        <div class="mb-3">'+
        '          <label for="firstName">Finos</label>'+
        '          <input type="text" class="form-control input_emFinos"  placeholder="" value="0" required="" data-toggle="tooltip" data-placement="top" title="precio * Fino/Pza">'+
        '          <div class="invalid-feedback">Finos</div>'+
        '        </div>'+
        '    </div>'+
        '    <!--End:-->'+
        '</div>'+
        '<!-- End: cierres no' + x + '-->'+
        '</div>'
        ;
        $("#multiEntregas").append(large)
        btnDeleteEntregas()
    })
}
//-------------------------------------------------------------------->