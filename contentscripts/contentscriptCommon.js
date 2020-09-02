var loggingEnabled = false;

/* #region Constants here */
const STORAGE_KEY_SELECTED_PRODUCTS = "SELECTED_PRODUCTS";
/* #endregion */

/* #region General Utilities */
function log(message)
{
    if(!loggingEnabled){
        return;
    }
       
    var now = new Date().getTime() / 1000;
    console.log(now + " - " + message);
}

function logError(message)
{
    if(!message){
        return;
    }
    
    console.warn(message);
}

function logObject(object)
{
    console.log(object);
}

function ShowButtonConfirmationTick($button, revertBack){
    var originalHTML = $button.html();
    var textOnlyHTML = originalHTML.substring(0, originalHTML.indexOf("<"));
    var newHTML = textOnlyHTML + "&nbsp;" + tickHTML;
    $button.hide().html(newHTML).fadeIn('slow');  

    if(revertBack){
        setTimeout(() => {
            $button.hide().html(originalHTML).fadeIn(2000);
        }, 3000); 
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function GetTodaysDate()
{
    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var output = d.getFullYear() + '-' +
        ((''+month).length<2 ? '0' : '') + month + '-' +
        ((''+day).length<2 ? '0' : '') + day;

        return output;
}

function toDate(dateStr) {
    var parts = dateStr.split("-")
    return new Date(parts[0], parts[1] - 1, parts[2])
  }

function getDayName(date){
    var day = date.getDay();

    return DAY_NAMES[day];
}

function getMonthName(date){
    var month = date.getMonth();

    return MONTH_NAMES[month];
}

function ClickAndPopulateTextbox(selector, value, setValue = true){
    var e = jQuery.Event("keypress");
    e.which = 32;
    if(setValue == true){
        $(selector).focus().val(value).trigger(e);
    }

    var element = $(selector)[0];
    var event = new Event('input', {
        'bubbles': true,
        'cancelable': true
    });

    if(element){
        element.dispatchEvent(event);
    }
}


function FindASIN(textToSearch)
{
    var regex = /[A-Z0-9]{10}/;
    var matches = textToSearch.match(regex);
    var asin = null;
    if(matches && matches[0])
    {
         asin = matches[0];
    }
    return asin;
}

/* #endregion */