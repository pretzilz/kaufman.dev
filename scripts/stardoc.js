var width_of_table = 20;
var final_string = "";
var element_text = document.getElementsByTagName('pre')[0].innerHTML;
var line_list = element_text.split("\n");

var max_line_length = 0
//first get the length of the longest line
line_list.forEach(function(line) {
    if (line.length > max_line_length) {
        max_line_length = line.replace(/<(?:.|\n)*?>/gm, '').length - 1;
    }
}); 

length_of_cap = ((max_line_length + (width_of_table * 2)) / 2);
for (var i = 0; i < line_list.length; i++) {
    if (i == 0) {
        final_string += "* ".repeat(length_of_cap) + "\n";
        //then add a couple of lines of whitespace to center, with ends

        length_of_line = line_list[i].replace(/<(?:.|\n)*?>/gm, '').length;
        final_string += "*" + " ".repeat(width_of_table) + line_list[i] + " ".repeat((max_line_length - length_of_line) + width_of_table - 3) + "*\n";
    }
    else if (i == line_list.length - 1) {
        //add a couple lines of whitespace to center, with ends
        final_string += "* ".repeat(length_of_cap);
    }
    else {
        //otherwise, do the needful on the actual lines
        length_of_line = line_list[i].replace(/<(?:.|\n)*?>/gm, '').length;
        amount_to_add = ((max_line_length - length_of_line) / 2);
        console.log(amount_to_add);
        final_string += "*" + " ".repeat(width_of_table) + line_list[i] + " ".repeat((max_line_length - length_of_line) + width_of_table - 3) + "*\n";
    }

}

document.getElementsByTagName('pre')[0].innerHTML = final_string;
