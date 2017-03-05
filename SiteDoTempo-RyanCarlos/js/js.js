// API OpenWeatherMap
//Acesso a conteúdo previsão do tempo atual.
function ativa(cidade){
	$.ajax({
		method:"GET",
		url:"http://api.openweathermap.org/data/2.5/weather",
		data:{
			q:cidade,// cidade recebida como parametro na função.
			lang:"pt",
			units:"metric",
			APPID: "8d77287c311d4b473a8fd792e96aa8bb"
		},
		dataType:"json",
		success: function(response){
			var armDes=response.weather[0].description;
			if (armDes == "chuva" || armDes == "tempestade" || armDes == "neve" || armDes == "chuva fraca" || armDes == "Névoa" || armDes == "tempo nublado" || armDes == "Chuva moderada"){
				$(".card-config").css({background:"url('images/wp_chuva.jpg')", 'background-size':"cover", 'background-position': "center center"});
			}

			else if(armDes == "céu claro" || armDes == "nuvens quebrados" || armDes == "Algumas nuvens" || armDes == "nuvens dispersas"){
				$(".card-config").css({background:"url('images/wpp_geral.jpg')", 'background-size':"cover", 'background-position': "center center"});
			}

			console.log(response);
			var dayName = new Array ("Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado");
			var monName = new Array ("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho","Agosto","Setembro", "Outubro", "Novembro", "Dezembro");
			var now = new Date();
			var icon=response.weather[0].icon;
			$(".tempo-atual").html(response.main.temp+"°C");
			$(".min-max").html(response.main.temp_min+"°C" + "/" + response.main.temp_max+"°C");
			$(".cidade").html(response.name);
			$("#press").html(response.main.pressure+ " " +"hPa");
			$("#vel-vento").html(response.wind.speed+" "+"m/s");
			$("#humidade").html(response.main.humidity+"%");
			$("#cond-temp").html(response.weather[0].description);
			$(".icone-temp").attr("src", "http://openweathermap.org/img/w/"+icon+".png");
			$("#data").html((dayName[now.getDay()]+", "+now.getDate()+" de "+monName[now.getMonth()]+" de "+now.getFullYear() + "."));
			Materialize.toast(response.name+" está com "+response.weather[0].description, 4000, "rounded");
		},
		failure: function(response){
			console.error(response);
		}
	});
	//Acesso a conteúdo previsão do tempo dos próximos 5 dias.
	$.ajax({
		method:"GET",
		url:"http://api.openweathermap.org/data/2.5/forecast",
		data:{
			q:cidade,
			lang:"pt",
			units:"metric",
			APPID: "8d77287c311d4b473a8fd792e96aa8bb"
		},
		dataType:"json",
		success: function(response){
			console.log(response);
			indice = 0;
			list_datas = [];
			list_medias = [];
			list_humidades = [];
			list_icones = [];
			list_min_max = [];
			list_press = [];
			list_conds = [];
			while(indice < response.list.length){
				if(response.list[indice].dt_txt.substring(11,19) == "12:00:00"){

					// Principal
					list_datas.push(response.list[indice].dt_txt);
					list_medias.push(response.list[indice].main.temp+"°C");
					list_humidades.push(response.list[indice].main.humidity+"%");
					// Detalhado
					list_icones.push(response.list[indice].weather[0].icon);
					list_min_max.push(response.list[indice].main.temp_min+"°C"+"/"+response.list[indice].main.temp_max+"°C");
					list_press.push(response.list[indice].main.pressure+"hPa");
					list_conds.push(response.list[indice].weather[0].description);
				}
				indice ++;
			}
			// Principal
			$("#data-1").html(list_datas[0]);
			$("#media-1").html(list_medias[0]);
			$("#humidade-1").html(list_humidades[0]);
			// Detalhado
			$("#cond-temp-1").html(list_conds[0]);
			$("#min-max-1").html(list_min_max[0]);
			$("#press-1").html(list_press[0]);
			$("#icon-1").attr("src", "http://openweathermap.org/img/w/"+list_icones[0]+".png");
			// Principal
			$("#data-2").html(list_datas[1]);
			$("#media-2").html(list_medias[1]);
			$("#humidade-2").html(list_humidades[1]);
			// Detalhado
			$("#cond-temp-2").html(list_conds[1]);
			$("#min-max-2").html(list_min_max[1]);
			$("#press-2").html(list_press[1]);
			$("#icon-2").attr("src", "http://openweathermap.org/img/w/"+list_icones[1]+".png");
			// Principal
			$("#data-3").html(list_datas[2]);
			$("#media-3").html(list_medias[2]);
			$("#humidade-3").html(list_humidades[2]);
			// Detalhado
			$("#cond-temp-3").html(list_conds[2]);
			$("#min-max-3").html(list_min_max[2]);
			$("#press-3").html(list_press[2]);
			$("#icon-3").attr("src", "http://openweathermap.org/img/w/"+list_icones[2]+".png");
			if(list_datas.length == 3 || list_datas.length == 4){
				// Principal
				$("#data-4").html("Conteúdo indisponível neste horário.");
				$("#media-4").html("Indisponível");
				$("#humidade-4").html("Indisponível");
				// Detalhado
				$("#cond-temp-4").html("Indisponível");
				$("#min-max-4").html("Indisponível");
				$("#press-4").html("Indisponível");

				// Principal
				$("#data-5").html("Conteúdo indisponível neste horário.");
				$("#media-5").html("Indisponível");
				$("#humidade-5").html("Indisponível");
				// Detalhado
				$("#cond-temp-5").html("Indisponível");
				$("#min-max-5").html("Indisponível");
				$("#press-5").html("Indisponível");
			}
			else if(list_datas.length == 5){
				// Principal
				$("#data-4").html(list_datas[3]);
				$("#media-4").html(list_medias[3]);
				$("#humidade-4").html(list_humidades[3]);
				// Detalhado
				$("#cond-temp-4").html(list_conds[3]);
				$("#min-max-4").html(list_min_max[3]);
				$("#press-4").html(list_press[3]);
				$("#icon-4").attr("src", "http://openweathermap.org/img/w/"+list_icones[3]+".png");
				// Principal
				$("#data-5").html(list_datas[4]);
				$("#media-5").html(list_medias[4]);
				$("#humidade-5").html(list_humidades[4]);
				// Detalhado
				$("#cond-temp-5").html(list_conds[4]);
				$("#min-max-5").html(list_min_max[4]);
				$("#press-5").html(list_press[4]);
				$("#icon-5").attr("src", "http://openweathermap.org/img/w/"+list_icones[4]+".png");
			}
		},
		failure: function(response){
			console.error(response);
		}
	});
}
// Chamada de função onde passamos uma cidade padrão.
ativa("Concordia,BR");
$(document).ready(function(){
	// Autocomplete-Plugin Jquery
	$("#autocomplete-input").autocomplete({
		data: {
			"Concordia": null,
			"Capinzal": null,
			"Chapeco": null,
			"Blumenau": null,
			"Bombinhas": null,
			"Florianopolis": null,
			"Itajai": null,
			"Salvador": null,
			"São Francisco do Sul": null
		}
	});
	// Captura do evento de click da tecla ENTER
	$(document).keypress(function(elemento){
		// 13 é o código do ENTER
		// 'elemento' é o evento
		if(elemento.keyCode == 13){
			// Acesso com jquery para controle do evento click, quando clicado pega o valor do input e insere no ajax.
			ativa(($("#autocomplete-input").val()));
		}
	});
	$(".modal-trigger").leanModal();
	var online = navigator.onLine;
	if(online == true){
		console.log("Conexão com internet verificada com êxito!");
	}
	else{
			console.log("Verifique sua conexão com a internet!");
	}
});
