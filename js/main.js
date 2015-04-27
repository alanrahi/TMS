var divCountForWidthChanger;

function divCounterForWidth() {
	var $divs = $(".divWidth");

    var divCountForWidthChanger = $divs.length;
    var widthPercent = 100/divCountForWidthChanger;
    console.log(widthPercent);
    $divs.width(widthPercent + "%");
    console.log("There are " + divCountForWidthChanger + " divs.");
    
    return divCountForWidthChanger;

    // var divTotal = divCountForWidthChanger
    // console.log(divTotal);
};

divCounterForWidth();

$().attr("width")



