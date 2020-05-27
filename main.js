$(document).ready(function() {
// mi salvo in una variabile l'url dell'API così posso utilizzarla in Ajax in maniera più semplice
var api_url = 'https://api.themoviedb.org/3/';
// mi salvo in una variabile la key_API personale così posso utilizzare in Ajax la variabile
var api_key = '76070dffeb41350240b137d672a13be3';
// mi salvo in una variabile l'immagine o post che poi prenderò dalla API
var img_url = 'https://image.tmdb.org/t/p/w342';
 // evento Invio tastiera
    $('#ricerca').keyup(function(event){
        if (event.which == 13) {
            chiamata_api();
        }
    })// fine evento keyup
    // evento click sul pulsante
    $('#pulsante-ricerca').click(function(){
            chiamata_api();
 }); // fine click
// funzione per chiamare le due Ajax
function chiamata_api(){
    // testo inserito dall'utente
    var testo_utente = $('#ricerca').val();
    console.log(testo_utente);
    // resetto l'input testuale
    $('#ricerca').val('');
    // svuoto il contenitore dei risultat
    $('#risultato').empty();
// richiesta ajax per i film
$.ajax({
    'url': api_url + 'search/movie',
    'method': 'GET',
    'data': {
       'api_key': api_key,
       'query': testo_utente
   }, // fine data
    'success': function(risposta){
        console.log(risposta);
        ciclo_serie_film(risposta, 'film');
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
        ciclo_serie_film(risposta, 'serie tv');
    }, // fine success
    'error': function(){
        console.log('errore');
    }
}); //fine ajax
} // fine function chiamata_api

function ciclo_serie_film(risposta_api_tv, tipo){
    // mi salvo in una variabile i risultati dei film
    var dati_serie_film = risposta_api_tv.results
    console.log(dati_serie_film);
    // ciclo tutti i dati che arrivano dall'API
    for (var i = 0; i < dati_serie_film.length; i++) {
        // salvo in una variabile i film che mi sta ciclando
        var film_serie_corrente = dati_serie_film[i]
        console.log(film_serie_corrente);
        controllo_film(film_serie_corrente, tipo);
 }// fine for
}// fine funzione ciclo_serie_film

function controllo_film(film, tipologia){
    console.log(film.poster_path);
    // salvo i poster dei film dentro una variabile
    var poster_film = film.poster_path;
    // uso Handlebars
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
            // concateno la var stelle con l'icona cioè metto dentro la variabile l'icona piena
            stelle += "<i class='fas fa-star'></i>";
            console.log(stelle);
        }else {
            // icona vuota
            stelle += "<i class='far fa-star'></i>";
        }
 }// fine cilo for
// imposto 2 variabile vuote per poi sovrascrivere il nome film o serie TV
 var title ='';
 var original_title = '';
  if (tipologia == 'film') {
    // titolo film
    title = film.title;
    // titolo originale film
    original_title = film.original_title ;
  }else {
   // titolo serie TV
    title = film.name;
    // titolo originale serie TV
    original_title = film.original_name;
   }// fine else

 // recupero tutti i risultati
 var recupero_risultati = {
     'poster': genera_poster(poster_film, img_url),
     'titolo': title,
     'titolo_originale': original_title,
     'voto': stelle,
     'tipo': tipologia,
     'overview': film.overview,
     'lingua': function(){
         // metto in un array le lingue che ho a disposizione
         var flag_language = ['it','en','de','fr'];
         // creo un if per vedere le lingue originali sono incluse dentro il mio array
         if (flag_language.includes(film.original_language)) {
             // se sono incluse mi ritorna l'immagine della bandierina con la nazione corrente
             return "<img src='img/flag_" + film.original_language + ".png'>";
            }else {
            // ritorna la lingua originale senza bandierina
             return film.original_language;
         } // fine else
     }// fine 'lingua'
  } // var recupero_risultati
    var card_generata = template_function(recupero_risultati);
    // usando handlebars stampo su html tutta la card che viene generata tramite le funzioni
    $('#risultato').append(card_generata);
 } // fine funzione controllo film

 function genera_poster(poster, img_url) {
     // dichiaro una variabile con valore no poster iniziale così se non entra nel l'if perchè non c'è il poster, spunta immagine non disponibile
     var img_poster = '<img src="img/no_poster.png" alt="">';
     if (poster) {
         //se il poster c'è allora inseriscilo dentro il tag img nel template
         img_poster = '<img src="'+ img_url + poster + '" alt="">'
     }
     return img_poster;

 }
}); // fine document ready
