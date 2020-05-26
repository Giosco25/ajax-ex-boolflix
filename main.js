$(document).ready(function() {

var api_url = 'https://api.themoviedb.org/3/';
var api_key = '76070dffeb41350240b137d672a13be3';

    $('#ricerca').keyup(function(event){
        if (event.which == 13) {
            chiamata_api();
        }
    })
    $('#pulsante-ricerca').click(function(){
            chiamata_api();
 }); // fine click
function chiamata_api(){
    // testo inserito dall'utente
    var testo_utente = $('#ricerca').val();
    console.log(testo_utente);
    // resetto l'input testuale
    $('#ricerca').val('');
    // svuoto il contenitore dei risultat
    $('#risultato').empty();
// richiesta API per i film
$.ajax({
    'url': api_url + 'search/movie',
    'method': 'GET',
    'data': {
       'api_key': api_key,
       'query': testo_utente
   }, // fine data
    'success': function(risposta){
        console.log(risposta);
        ciclo_film(risposta,'film');
    }, // fine success
    'error': function(){
        console.log('errore');
    }
}); //fine ajax
// richiamo ajax per le serie tv
$.ajax({
    'url': api_url + 'search/tv',
    'method': 'GET',
    'data': {
       'api_key': api_key,
       'query': testo_utente
   }, // fine data
    'success': function(risposta){
        console.log(risposta.results);
        ciclo_serie(risposta, 'serie tv');
    }, // fine success
    'error': function(){
        console.log('errore');
    }
}); //fine ajax
} // fine function chiamata_api
function ciclo_serie(risposta_api_tv, tipo){

    var dati_serie = risposta_api_tv.results
    console.log(dati_serie);
    for (var i = 0; i < dati_serie.length; i++) {
        // salvo in una variabile i film che mi sta ciclando
        var serie_corrente = dati_serie[i]
        console.log(serie_corrente);
        controllo_film(serie_corrente, tipo);
    } // fine ciclo for
}// fine funzione ciclo serie


function ciclo_film(risultato,tipo){
    // salvo in una variabile i risultati dei film
    var dati_film = risultato.results
    console.log(dati_film);
    // ciclo i risultati per ogni film
    for (var i = 0; i < dati_film.length; i++) {
        // salvo in una variabile i film che mi sta ciclando
        var film_correnti = dati_film[i]
        console.log(film_correnti);
        controllo_film(film_correnti,tipo);
    } // fine ciclo for
}// fine funzione ciclo film

function controllo_film(film, tipologia){
    var html_template = $('#card-template').html();
    var template_function = Handlebars.compile(html_template);
    // trasformo il voto in un numero da 1 a 5
    var voto_intero = Math.ceil ((film.vote_average / 2));
    console.log(voto_intero);
    // creo una var stelle vuota per mettere all'interno le icone
    var stelle = '';
    // ciclo per 5 volte i voti
    for (var i = 1; i <= 5; i++) {
        if (i <= voto_intero) {
            stelle += "<i class='fas fa-star'></i>";
            console.log(stelle);
        }else {
            stelle += "<i class='far fa-star'></i>";
        }
 }
 var title ='';
 var original_title = '';
   if (tipologia == 'film') {
        title = film.title;
        original_title = film.original_title ;
   }else {
        title = film.name;
        original_title = film.original_name;
   }
 // recupero tutti i risultati
 var recupero_risultati = {
     'titolo': title,
     'titolo_originale': original_title,
     'voto': stelle,
     'tipo': tipologia,
     'lingua': function(){
         // metto in un array le lingue che ho a disposizione
         var flag_language = ['it','en','de','fr'];
         // creo un if per vedere le lingue originali sono incluse dentro il mio array
         if (flag_language.includes(film.original_language)) {
             return "<img src='img/flag_" + film.original_language + ".png'>";
            }else {
            // titolo originale
             return film.original_language;
         }
     }


  }
    var card_generata = template_function(recupero_risultati);
    $('#risultato').append(card_generata);
 } // fine funzione controllo film
}); // fine document ready
