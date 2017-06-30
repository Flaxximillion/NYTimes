/**
 * Created by ayu20_000 on 6/30/2017.
 */

function getData(userInput, numberOfRecords, startYear, endYear) {
    for (let i = 1; i <= numberOfRecords; i++) {
            let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
            url += '?'
                + $.param({
                    'api-key': "8550982747844a309bbc3751211f7458"
                    , 'q': userInput
                    , 'page': i.toString()
                    , 'begin_date': startYear + "0101"
                    , 'end_date': endYear + "1231"
                });

            $.get(url).done(function (result) {
                displayData(result.response.docs);
                console.log(result);
            }).fail(function (result) {
                setTimeout(function(){
                    getData(userInput, numberOfRecords, startYear, endYear);
                }, 5000)
            });
    }
}

function displayData(articleSet){
    for(let i = 0; i < articleSet.length; i++){
        let currentArticle = articleSet[i];
        console.log(currentArticle.headline.main, currentArticle.byline.original, currentArticle.web_url, currentArticle.pub_date);

        $(".articleDisplay").append(($("<div>").text(currentArticle.headline.main)), ($("<div>").text(currentArticle.byline.original)), ($("<div>").text(currentArticle.web_url)), ($("<div>").text(currentArticle.pub_date)));
    }
}
getData("cake", 1, "2010", "2010");
