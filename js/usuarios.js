console.log("Load Js Usuarios");

$(document).ready(function(){
	
	console.info('2 Run -> Data')

		//---> Load User
		console.info('Run: Load User');
		allUser();
		
		//---> Update User
		console.info('Run: Update User');		
		

		$("#btnUpdateUser").click(function(event) {			
			updateUser();
			});	

		//---> New User
		console.info('Run: New User');
	    $("#b-nuew-user").click(function(){
	        newUser();
	    	});

	})
	
	//---> all user
	function allUser(){
		//--->

		//--->
		console.info('Run: all user clear div')
		$("#allUser").empty()
		
		//--->
		console.info('Run: all user print div')
		$.getJSON(url_user_all + "?id_advance=&a181a603769c1f98ad927e7367c7aa51=b326b5062b2f0e69046810717534cb09",function(data) {
			
			//--->
			$.each(data, function(i, val) {
				if (val.telefono == null) {telefono = "vacio"}else{telefono = val.telefono}
				if (val.puesto == null) {puesto = "vacio"}else{puesto = val.puesto}
					$("#allUser").fadeIn(3000).append("<tr><th scope=\"row\"><input name=\"idX\" type=\"checkbox\" class=\"idAcheckbox\" id=\"" + val.id_advance + "\"></th><td>" + val.firstname  + "</td><td>" + val.secondname + "</td><td>" + val.email      + "</td><td>" + telefono   + "</td><td>" + puesto + "</td></tr>");
				})				
			//--->

			//--->
			console.info('Run: all user checkbox only one')
			$('input[name="idX"]').click(function(){$('input[name="idX"]').not(this).prop("checked", false);});				

			$('input[name="idX"]').change(function(){
				id_advance = $(this).attr("id");

				$("#iduserupdate").val(id_advance);

				oneUser(id_advance);
				$("#user-update").prop("disabled",false);
				})
			
				$("#user-update").prop("disabled",true);

			//--->					
			}).fail(function(jqXHR, textStatus , errorThrown) {

				//--->
				console.info('Run: all user loading error')
				xhrError(jqXHR, textStatus , errorThrown);

		  		}).always(function() {
		    	
					//--->
					console.info('Run: all user always')

		  			});			
		//--->		
		}		
	//---> all user
	function oneUser(id_advance){
		//--->			
		
			$.getJSON(url_user_one + "?id_advance="+id_advance+"&a181a603769c1f98ad927e7367c7aa51=b326b5062b2f0e69046810717534cb09",function(data) {
				
				//--->
				$.each(data, function(i, val) {
					/*
					Message: "Datasuccessful"
					email: "biohizard@gmail.com"
					firstname: "jorge"
					id_advance: "CLjFxfEC16HE9AZ948Ws"
					permissions: "admin"
					puesto: "vendedor"
					secondname: "garibaldo"
					telefono: "55555"
					time: "2019-08-26 17:37:55"
					user: "admin"
					*/
					$("#updateInputUsuario").val(val.user);
					$("#updateInputPermiso").val(val.permissions).change();
					$("#updateInputEmail").val(val.email);
					$("#updateInputNombre").val(val.firstname);
					$("#updateInputApellido").val(val.secondname);
					$("#updateInputTelefono").val(val.telefono);
					$("#updateInputPuesto").val(val.puesto);
					
					})
				//--->

				console.info('4 Run -> Tiempo Aire Load data')
				//--->					
				}).fail(function(jqXHR, textStatus , errorThrown) {

	                xhrError(jqXHR, textStatus , errorThrown);
			  		console.info('5 Run -> Tiempo Aire Load data Error')

			  		}).always(function() {
			    	
			    		console.log( "complete COBRO" );
			  		
			  			});	
			  			
		//--->		
		}

	function newUser(){

		var settings = {
		  "async"       : true,
		  "crossDomain" : true,
		  "url"         : "http://localhost/server/DevOps/GoldenTradeValue/GoldenTradeValue-API/index.php/user/createdata",
		  "method"      : "POST",
		  "headers": {
		  	"xr8-api-key" : "ewf45r4435trge",
		    "content-type" : "application/x-www-form-urlencoded",
		    "cache-control": "no-cache"
		  },"data": {
		    "user"        : $("#exampleInputUsuario").val(),
		    "permissions" : $("#exampleInputPermiso").val(),
		    "email"       : $("#exampleInputEmail").val(),
		    "password"    : $("#exampleInputPassword").val(),
		    "first"       : $("#exampleInputNombre").val(),
		    "second"      : $("#exampleInputApellido").val(),
		    "tel"         : $("#exampleInputTelefono").val(),
		    "puesto"      : $("#exampleInputPuesto").val()

		  	}
		}

		//--->
		console.info('Run: user new xhr')
		$.ajax(settings).done(function(data) {
			
			//--->
			console.info('Run: reload alluser')
    			$("#exampleModal").modal('hide');
				allUser();

				}).fail(function(jqXHR, textStatus , errorThrown) {
					
					//--->
					console.info('Run: error alluser')
	                	xhrError(jqXHR, textStatus , errorThrown);

			  		}).always(function() {
						//--->
						console.info('Run: allways alluser')
			    		});

		}		

	function updateUser(){

		var settings = {
		  "async"       : true,
		  "crossDomain" : true,
		  "url"         : "http://localhost/server/DevOps/GoldenTradeValue/GoldenTradeValue-API/index.php/user/update",
		  "method"      : "POST",
		  "headers": {
		  	"xr8-api-key" : "ewf45r4435trge",
		    "content-type" : "application/x-www-form-urlencoded",
		    "cache-control": "no-cache"
		  },"data": {
		    "id_advance"  : $("#iduserupdate").val(),
		    "user"        : $("#updateInputUsuario").val(),
		    "permissions" : $("#updateInputPermiso").val(),
		    "email"       : $("#updateInputEmail").val(),
		    "password"    : $("#updateInputPassword").val(),
		    "first"       : $("#updateInputNombre").val(),
		    "second"      : $("#updateInputApellido").val(),
		    "tel"         : $("#updateInputTelefono").val(),
		    "puesto"      : $("#updateInputPuesto").val()

		  	}
		}

		//--->
		console.info('Run: user new xhr')
		$.ajax(settings).done(function(data) {
			
			//--->
			console.info('Run: reload alluser')
    			$("#updateModal").modal('hide');
				allUser();

				}).fail(function(jqXHR, textStatus , errorThrown) {
					
					//--->
					console.info('Run: error alluser')
	                	xhrError(jqXHR, textStatus , errorThrown);

			  		}).always(function() {
						//--->
						console.info('Run: allways alluser')
			    		});

		}				