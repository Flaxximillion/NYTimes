/**
 * Created by ayu20_000 on 6/30/2017.
 */

function getData(userInput){
    let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?'
        + $.param({
            'api-key': "8550982747844a309bbc3751211f7458"
        ,'q': userInput});

    $.get(url).done(function(result){
        console.log(result);
    });
}
