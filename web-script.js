function getStyle(el, styleProp) {
  var value, defaultView = (el.ownerDocument || document).defaultView;
  // W3C standard way:
  if (defaultView && defaultView.getComputedStyle) {
    // sanitize property name to css notation
    // (hypen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el.currentStyle) { // IE
    // sanitize property name to camelCase
    styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
      return letter.toUpperCase();
    });
    value = el.currentStyle[styleProp];
    // convert other units to pixels on IE
    if (/^\d+(em|pt|%|ex)?$/i.test(value)) { 
      return (function(value) {
        var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
        el.runtimeStyle.left = el.currentStyle.left;
        el.style.left = value || 0;
        value = el.style.pixelLeft + "px";
        el.style.left = oldLeft;
        el.runtimeStyle.left = oldRsLeft;
        return value;
      })(value);
    }
    return value;
  }
}

let consoleLog = document.getElementById("console-log");
//let copyright = document.getElementsByClassName("copyright");
let cr1W = document.getElementById("copyright-wrap");
let cr1WWidth = cr1W.getBoundingClientRect().width;
let moveCoEf = "-"+cr1WWidth/4/window.innerWidth*100+"%";
console.log (moveCoEf);
window.onload = (event) => {
    setTimeout(() => {
        console.log("page is fully loaded");
        cr1W.style.left=moveCoEf;
        setTimeout(() => {
                cr1W.style.transition = "left 0s linear";
                cr1W.style.left = "0%";
                setTimeout(() => {
                    cr1W.style.transition = "left 4s linear";
                    cr1W.style.left=moveCoEf;
                }, "1");
            setInterval(() => {
                cr1W.style.transition = "left 0s linear";
                cr1W.style.left = "0%";
                setTimeout(() => {
                    cr1W.style.transition = "left 4s linear";
                    cr1W.style.left=moveCoEf;
                }, "1");
            }, "4001");
        }, "4000");
    }, "2000");
    
};
//console.log(parseInt(getStyle(cr1, "fontSize"), 10));