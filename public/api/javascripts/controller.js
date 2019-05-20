//Will be called on page load

window.onload = function() {
    $('#search-box').change((req,res) => {
        console.log("User Input = ",req.target.value);
        if(req.target.value) updateSearchResults(req.target.value);
    });
}

function updateSearchResults(searchItem){
    let search_value = searchItem;

    $('#append-to').empty();
    $('#append-to').append('<div id="spinner-loading" class="spinner-border" role="status" style="left:50%"><span class="sr-only">Loading...</span></div>');

    $.ajax({
        url: '/api/callapi',
        type: 'POST',
        data: {
            "value":search_value
        },
        success:function(res){

            $("#spinner-loading").remove();

            var responded_data = res.data;
            var counter = 0;

            responded_data.forEach(element => {

                var div = $('<div id="div-'+counter+'" class="link-div" style="width:100%; padding-top: 1%; padding-bottom: 1%">');
                var div_div = $('<div class="w3-white w3-hover-shadow w3-padding-64 w3-left" style="width:100%;">');
                var div_div_a = $('<a href="'+element.file_path+'" style="color:#001ba0;"><h2 style="padding-left:10px">Click here to download</h2></a>');
                var div_div_div = $('<div style="padding-left:10px" id="appended-text'+counter+'"></div>');
                
                div.append(div_div);
                div_div.append(div_div_a);
                div_div.append(div_div_div);
                
                $('#append-to').append(div);
                $('#appended-text'+counter+'').append('<p>'+element.raw_data+'</p>');

                counter++;
                
            });
        },
        error:function(error){
        }
    });
}