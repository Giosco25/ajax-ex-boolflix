// Predisporre quindi un layout molto semplice con una barra di ricerca e un pulsante: al click sul pulsante fare partire una chiamata ajax a tmdb per recuperare i film che corrispondo alla query di ricerca inserita dall'utente.
// Ciclare i risultati e per ogni film restituito, stamparne in pagina:
// titolo
// titolo originale
// lingua
// voto
// https://api.themoviedb.org/3/search/movie
$(document).ready(function() {
    // fare click sul pulsante
    $('#pulsante-ricerca').click(function(){
        // testo inserito dall'utente
        var testo_utente = $('#ricerca').val();
        console.log(testo_utente);
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
}

function controllo_film(film){
    // recupero il title del film
    var titolo_film = film.title;
    console.log(titolo_film);
    // recupero il titolo originale
    var titolo_originale = film.original_title;
    console.log(titolo_originale);
    // recupero la lingua del film
    var lingua_film = film.original_language;
    console.log(lingua_film);
    // recupero il voto ricevuto dal film
    var voto_film = film.vote_average;
    console.log(voto_film);
     // creo li dentro ul del film
    var lista_titolo_film = '<li>'+ 'Il titolo del film è :' + titolo_film + '</li>';
    // scrivo in pagina il titolo del film
    $('#risultato ul').append(lista_titolo_film);
    // metto dentro lì il titolo originale del film
    var lista_titolo_originale = '<li>'+ ' Il titolo originale del film è :' + titolo_originale + '</li>';
    // scrivo in pagina il titolo originale
    $('#risultato ul').append(lista_titolo_originale);
    // metto dentro li la lingua del film
    var lista_lingua_film = '<li>'+ 'La lingua del film è :' + lingua_film + '</li>';
    // scrivo in pagina la lingua del film
    $('#risultato ul').append(lista_lingua_film);
    // metto dentro lì il voto che ha preso il film
    var lista_voto_film = '<li>'+'Il voto del film è :' + voto_film + '</li>';
    // scrivo in pagina il voto del film
    $('#risultato ul').append(lista_voto_film);
}
