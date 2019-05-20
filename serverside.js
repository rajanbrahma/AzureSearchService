function clean_string(res1,search_string,max_sample_len){
    var json_array_for_FE = [];
    var data_returned = res1.data.value;
    data_returned.forEach(element => {
        var search_result = {};
        let content = element.content;
        content = content.trim();
        content = content.replace(/\r?\n|\r/g, '');
        content = content.replace(/\s+/g,' ');
        var re = /\b(\w\.\w\.)|([.?!])\s+(?=[A-Za-z])/g; 
        var result = content.replace(re, function(m, g1, g2){
        return g1 ? g1 : g2+"\r";
        });
        var splitted_string = result.split("\r");
        var strings_for_frontend = splitted_string.find((current) => {
        if(current.includes(search_string)){
            return current;
        }
        });
        if(!strings_for_frontend){
        strings_for_frontend = splitted_string.reduce(function (a, b) { return a.length > b.length ? a : b; });
        }
        if (strings_for_frontend.length > max_sample_len) {
        strings_for_frontend = strings_for_frontend.substring(0, max_sample_len) + "...";
        } else {
        return strings_for_frontend;
        }
        var file_path = element.metadata_storage_path;
        search_result['raw_data'] = strings_for_frontend;
        search_result['file_path'] = file_path;
        json_array_for_FE.push(search_result);
    });
    return({
        "data":json_array_for_FE,
        "status":200
    });
}

module.exports = clean_string;