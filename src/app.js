//4S ready

//4S search
//https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=XKKUF5UZT0J2OHBHPXQ2XHVIMDXEJ2UMFUYO4CPHFQ3Q5TA0&client_secret=VKZFNMJRPRIF1VVLMIOKIWCZMKKY2HMSF1BJZCHTOA5H2JUI&v=YYYYMMDD

var venue = null;
var nearByList = null;
var nearByListJson = null;
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

function readableVenueList(list){
    console.log(list);
    var rHtml = '';
    for(var i = 0; i< list.length; i++ ){
        rHtml  += '<li/>' + list[i].venue.name + '</li>';
    }
    return '<ul>'+rHtml+'</ul>';
};
function showRes(data, jqXHR, textStatus){
    console.log(data);
    nearByList = data.response;

    document.getElementById('title').innerHTML = 'Interesting location in: '+ nearByList.headerFullLocation;
    var resHtml = "No Location found";
    if(nearByList.groups.length>0 && nearByList.groups[0].items.length>0){
        resHtml = readableVenueList(nearByList.groups[0].items);
    }
    document.getElementById('list').innerHTML =  resHtml;
    document.getElementById('resultJson').innerHTML = 'Full json results<pre><code>'+JSON.stringify(nearByList)+'</code></pre>';
};

function saveVenue(data, jqXHR, textStatus){
    console.log(arguments);
    if(data && data.response && data.response.venues.length>0){
        venue = data.response.venues[0];
        var ll = venue.location.lat.toFixed(1) + ',' + venue.location.lng.toFixed(1);
        var urlNearBy = 'https://api.foursquare.com/v2/venues/explore?ll='+ll+'&'+linkQuery;
        getCall(urlNearBy, null, showRes,errorCall)
    }
};

function handleSearch(){
    var val = document.getElementById('search').value;
    if(val){
        var urlVenue = 'https://api.foursquare.com/v2/venues/search?query='+val+'&intent=global&'+linkQuery;
        getCall(urlVenue, null, saveVenue,errorCall);
    }
}

function getCall(url, data, successCB, errorCB, dataType){
    if(!dataType) dataType = 'json';
    $.ajax({
        url: url,
        data: data,
        success: function( data, textStatus, jqXHR ){
            console.log(textStatus);
            if(successCB) successCB(data, jqXHR, textStatus );
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
        document.getElementById('title').innerHTML = '';
        document.getElementById('list').innerHTML = '';
        document.getElementById('resultJson').innerHTML = '';
        handleSearch()
    });
});
function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}