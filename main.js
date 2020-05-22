// Predisporre quindi un layout molto semplice con una barra di ricerca e un pulsante: al click sul pulsante fare partire una chiamata ajax a tmdb per recuperare i film che corrispondo alla query di ricerca inserita dall'utente.
// Ciclare i risultati e per ogni film restituito, stamparne in pagina:
// titolo
// titolo originale
// lingua
// voto
// Come vi dicevo, per il momento non è importante l'aspetto grafico: i risultati possono essere inseriti in pagina come semplici ul, anche senza handlebars.
// https://api.themoviedb.org/3/search/movie
$(document).ready(function() {

    $.ajax({
        'url':'https://api.themoviedb.org/3/search/movie',
        'method': 'GET',
        'data': {
           'api_key':'76070dffeb41350240b137d672a13be3',
           'query': 'batman'
       }, // fine data
        'success': function(risposta){
            console.log(risposta);
            var dati_film = risposta.results
            console.log(dati_film);
        }, // fine success
        'error': function(){
            console.log('errore');
        }
    }); //fine ajax


}); // fine document ready
