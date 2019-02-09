$(document).ready(function() {
    $('#advance-search').hide();
    $('p#warning').text("");
    $('p#warn').text("");

    $('#advance-btn').click(function(){
        $('#advance-search').toggle();
        $('p#warning').text("");
        $('p#warn').text("");
    });
    $.ajax({
        url: "data.json",
        dataType: "json"
    }).done(function(response) {
        console.log(response);
        var t = "";
        response.forEach(element => {
          t += "<tr>"+
          "<td>"+element.song+"</td>"+
          "<td>"+element.artist+"</td>"+
          "<td>"+element.album+"</td>"+
          "<td>"+element.genres+"</td>"+
          "<td>"+element.labels+"</td>";
          $('#table').html(t);
          $('p#warning').text("");
          $('p#warn').text("");
        });
    });
    $.ajax({
        url: "data.json",
        dataType: "json"
        }).done(function(response) {
            var data = response;
            var t = "";
            var genres = [];
            for(var i = 0;i < data.length;i++){
                if(jQuery.inArray(data[i].genres,genres) == -1){
                    genres.push(data[i].genres);
                    t +="<option>"+data[i].genres+"</option>";
                }
            }
            $('#genres-selector').html(t);
        }
    );
});

$('#search-btn').click(function() {
    var input = $('#input-text').val();
    $.ajax({
        url: "data.json",
        dataType: "json"
    }).done(function(response) {
        console.log(response);
        var data = response;
        var t = "";
        var check = false;
        for(var i = 0;i < data.length;i++){
            if(data[i].song.toLowerCase().includes(input.toLowerCase())){
                check = true;
                t +="<tr>";
                t +="<td>"+data[i].song+"</td>"+
                    "<td>"+data[i].artist+"</td>"+
                    "<td>"+data[i].album+"</td>"+
                    "<td>"+data[i].genres+"</td>"+
                    "<td>"+data[i].labels+"</td>";
                $('#table').html(t);
                $('p#warning').text("");
                $('p#warn').text("");
            }
        }
        if (check == false){
            $('p#warning').text("No results found for \"" + input + "\"");
            $('p#warn').text("Please Check you have the right spelling, or try different keywords.");
            $('#table').html("");
        }
    
    })
    $('#input-text').val("");
});


$('#advance-btn-search').click(function(){
    var genres = $('#genres-selector').val();
    var input = $('#adv-input-text').val();
    $.ajax({
    url: "data.json",
    dataType: "json"
    }).done(function(response){
        var data = response;
        var t = "";
        

        for(var i = 0;i < data.length;i++){
            if (input == ""){
                $('p#warning').text("Please complete the information.");
                $('p#warn').text("");
            }
            else if(data[i].genres.includes(genres) && (data[i].artist.toLowerCase().includes(input.toLowerCase()) ||
            data[i].album.toLowerCase().includes(input.toLowerCase()) || data[i].labels.toLowerCase().includes(input.toLowerCase()))){
                t +="<tr>";
                t +="<td>"+data[i].song+"</td>"+
                    "<td>"+data[i].artist+"</td>"+
                    "<td>"+data[i].album+"</td>"+
                    "<td>"+data[i].genres+"</td>"+
                    "<td>"+data[i].labels+"</td>";
                $('#table').html(t);
                $('p#warning').text("");
                $('p#warn').text("");
            }else{
            $('p#warning').text("No results found for \"" + input + "\"");
            $('p#warn').text("Please Check you have the right spelling, or try different keywords.");
            $('#table').html("");
            }
        }
        
        $('#adv-input-text').val("");
    })
    
});


$('#cancel-btn').click(function() {
    $.ajax({
        url: "data.json",
        dataType: "json"
    }).done(function(response) {
        console.log(response);
        var data = response;
        var t = "";
        for(var i = 0; i < data.length; i++){
            t +="<tr>";
            t +="<td>"+data[i].song+"</td>"+
                "<td>"+data[i].artist+"</td>"+
                "<td>"+data[i].album+"</td>"+
                "<td>"+data[i].genres+"</td>"+
                "<td>"+data[i].labels+"</td>";
            $('#table').html(t);
            $('p#warning').text("");
            $('p#warn').text(""); 
        }
       $('#adv-input-text').val(""); 
    });
    
});