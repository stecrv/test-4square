//4S ready

//4S search
//https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=XKKUF5UZT0J2OHBHPXQ2XHVIMDXEJ2UMFUYO4CPHFQ3Q5TA0&client_secret=VKZFNMJRPRIF1VVLMIOKIWCZMKKY2HMSF1BJZCHTOA5H2JUI&v=YYYYMMDD

var venue = null;
var nearBy = null;
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
mm = (mm>9 ? '' : '0') + mm;
dd = (dd>9 ? '' : '0') + dd;
var yyyy = today.getFullYear();
var todayPar = ''+yyyy+mm+dd;
var a = 'XKKUF5UZT0J2OHBHPXQ2XHVIMDXEJ2UMFUYO4CPHFQ3Q5TA0';
var b = 'VKZFNMJRPRIF1VVLMIOKIWCZMKKY2HMSF1BJZCHTOA5H2JUI';
var linkQuery = 'client_id='+a+'&client_secret='+b+'&v='+todayPar;


function errorCall(){
    alert('No data found');
};

function saveVenue(jqXHR, textStatus, errorThrown){
    console.log(arguments);
};

function handleSearch(){
    var val = document.getElementById('search').value;
    if(val){
        var urlVenue = 'https://api.foursquare.com/v2/venues/search?query='+val+'&intent=global&'+linkQuery;
        getCall(urlVenue, null, errorCall,errorCall);
    }
}

function getCall(url, data, successCB, errorCB, dataType){
    if(!dataType) dataType = 'json';
    $.ajax({
        url: url,
        data: data,
        success: function( data, textStatus, jqXHR ){
            console.log(textStatus);
            if(successCB) successCB(jqXHR, textStatus );
        }.bind(this),
        error: function ( jqXHR, textStatus, errorThrown ){
            console.log(textStatus);
            if(errorCb) errorCB(jqXHR, textStatus, errorThrown );
        }.bind(this),
        dataType: dataType
    });
};
$(document).ready(function(){
    $('#searchGo').click(function(){
        handleSearch()
    });
});
