/**
 * Created by ayu20_000 on 6/30/2017.
 */

$("document").ready(function(){
    $("#submitSearch").click(function(){
        event.preventDefault();
        console.log($("#endYear").val());
        getData($("#searchTerm").val(), $("#numberOfRecords").val(), $("#startYear").val(), $("#endYear").val());
    })
});

function getData(userInput, numberOfRecords, startYear, endYear) {
    let parameters={
        'api-key': "20ee80a3bd064782998614ecf5e2941a"
        , 'q': userInput
        , 'page':""
        , 'begin_date': startYear + "0101"
        , 'end_date': endYear + "1231"
    };
    if(startYear === ''){
        parameters['begin_date'] = "19900101";
    }
    if(endYear === ''){
        parameters['end_date'] = "20170101";
    }
    //console.log(parameters);
    for (let i = 1; i <= numberOfRecords; i++) {
            let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
            parameters['page'] = i.toString();
            console.log(parameters);
            url += '?'
                + $.param(parameters);

            $.get(url).done(function (result) {
                displayData(result.response.docs);
                console.log(result);
            }).fail(function (result) {
                setTimeout(function(){
                    getData(userInput, i, startYear, endYear);
                }, 5000)
            });
    }
}

function displayData(articleSet){
    for(let i = 0; i < articleSet.length; i++){
        let currentArticle = articleSet[i];
        let byline;
        if(currentArticle.byline === null){
            byline = "";
        } else {
            byline = currentArticle.byline.original;
        }
        $(".articleDisplay").append(($("<div>").text(currentArticle.headline.main)), ($("<div>").text(byline)), ($("<div>").text(currentArticle.web_url)), ($("<div>").text(currentArticle.pub_date)));
    }
}
