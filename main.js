// https://api.themoviedb.org/3/search/movie
$(document).ready(function() {
    // fare click sul pulsante
    $('#pulsante-ricerca').click(function(){
        // testo inserito dall'utente
        var testo_utente = $('#ricerca').val();
        console.log(testo_utente);
        // resetto l'input testuale
        $('#ricerca').val('');
        // svuoto il contenitore dei risultat
        $('#risultato ul').empty();
    // richiesta API
    $.ajax({
        'url':'https://api.themoviedb.org/3/search/movie',
        'method': 'GET',
        'data': {
           'api_key':'76070dffeb41350240b137d672a13be3',
           'query': testo_utente
       }, // fine data
        'success': function(risposta){
            console.log(risposta);
            ciclo_film(risposta);
        }, // fine success
        'error': function(){
            console.log('errore');
        }
    }); //fine ajax
}); // fine click

}); // fine document ready

function ciclo_film(risultato){
    // salvo in una variabile i risultati dei film
    var dati_film = risultato.results
    console.log(dati_film);
    // ciclo i risultati per ogni film
    for (var i = 0; i < dati_film.length; i++) {
        // salvo in una variabile i film che mi sta ciclando
        var film_correnti = dati_film[i]
        console.log(film_correnti);
        controllo_film(film_correnti);
    } // fine ciclo for
}// fine funzione ciclo film

function controllo_film(film){
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
 // recupero tutti i risultati
 var recupero_risultati = {
     'titolo': film.title,
     'titolo_originale': film.original_title,
     'voto': stelle,
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
