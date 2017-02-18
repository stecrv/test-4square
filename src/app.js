//4S ready

//4S search
//https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=XKKUF5UZT0J2OHBHPXQ2XHVIMDXEJ2UMFUYO4CPHFQ3Q5TA0&client_secret=VKZFNMJRPRIF1VVLMIOKIWCZMKKY2HMSF1BJZCHTOA5H2JUI&v=YYYYMMDD

var venue = null;
var nearBy = null;
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var todayPar = ''+yyyy+mm+dd;
var a = 'XKKUF5UZT0J2OHBHPXQ2XHVIMDXEJ2UMFUYO4CPHFQ3Q5TA0';
var b = 'VKZFNMJRPRIF1VVLMIOKIWCZMKKY2HMSF1BJZCHTOA5H2JUI';
var linkQuery = 'client_id='+a+'&client_secret='+b+'&v='+todayPar;

function handleSearch(){
    var val = document.getElementById('search').val;
    if(val){
        var urlVenue = 'https://api.foursquare.com/v2/venues/search?query='+val+'&'+linkQuery;
    }
}

function onLoad(){
    $(document).ready(function(){
        $('#searchGo').on('click',handleSearch);
    });
}

onLoad();