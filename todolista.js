$(document).ready(function(){

	var lista = preuzmiLokalniFajl('todolista');
	var izabrani;
	ucitajListu(lista);
	
	$('#dodaj').click(function(){
            var vrednost = $('#zadatak').val();
            if(vrednost.length !== 0) {
                var clan =  { "zadatak":vrednost, "klasa":""};
                lista.push(clan);
                $('#zadatak').val('');
                ucitajListu(lista);
                sacuvajLokalno('todolista', lista);
            }
	});
        
	// obrisi zadatak
	$('ul').delegate("span.ox", "click", function(event){
		event.stopPropagation();
		izabrani = $('span.ox').index(this);
		$('li').eq(izabrani).remove();
		lista.splice(izabrani, 1);
		sacuvajLokalno('todolista', lista);
		
	});
        
        // oznaci da je uradjen zadatak
	$('ul').delegate("span.did", "click", function(event){
		event.stopPropagation();
		izabrani = $('span.did').index(this);
		$('li').eq(izabrani).addClass('odradjen');
                lista[izabrani].klasa = 'odradjen';
		sacuvajLokalno('todolista', lista);
		
	});

	// izmeni modal
	$('ul').delegate('li', 'click', function(){
		izabrani = $('li').index(this);
		var content = lista[izabrani].zadatak;
		console.log(content);
		$('#izmenjeni').val(content );
	});

	$('#izmeni').click(function(){
		lista[izabrani].zadatak = $('#izmenjeni').val();
		ucitajListu(lista);
		sacuvajLokalno("todolista", lista);
	});
        
        //obrisi sve
        $('#obrisisve').click(function(){
            var pomocna = lista;
           
            for (var i = 0; i < pomocna.length; i++) {
                if (pomocna[i].klasa === 'odradjen'){
                    lista.splice(i, 1);
                }
            }
            ucitajListu(lista);
            sacuvajLokalno("todolista", lista);
	});

	// ucitajListu
	function ucitajListu(lista){
            $('li').remove();
            if(lista.length > 0) {
                for(var i = 0; i < lista.length; i++) {
                    $('ul').append('<li class= "list-group-item ' + lista[i].klasa + '" data-toggle="modal" data-target="#izmeniModal">' + lista[i].zadatak + '<span class="ox"><strong> &#10006; </strong></span><span class="did text-danger">&#10004;&nbsp;&nbsp;</span></li>');
                }
            }
	};

	function sacuvajLokalno(key, lista){
            console.log(JSON.stringify(lista));
		localStorage[key] = JSON.stringify(lista);
	}

	function preuzmiLokalniFajl(key){
            if(localStorage[key])
                return JSON.parse(localStorage[key]);
            else 
                return [];
	}

});
