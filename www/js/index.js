let submenus = document.querySelectorAll('.submenu')
let submenu_is_open = false;
for (i = 0; i < submenus.length; i++) {
    submenus[i].addEventListener('click', function () {
        submenu_open(this)
    });
    submenus[i].addEventListener('mouseover', function hover() {
        if (!submenu_is_open) {
            submenu_open(this)
        }
    });

    submenus[i].addEventListener('mouseleave', function leave() {
        submenu_close(this)

    });
}
window.onclick = function (event) {
    // document.querySelectorAll('input[name="pwd"]')
}

function submenu_open(el) {
    submenu_style = el.querySelector('ul').style.display;
    if (submenu_style == "") submenu_style = "none"
    submenu_is_open = true;
    console.log("submenu_style", submenu_style)
    el.querySelector('ul').style.display = "table-row" ;
}

function submenu_close(el) {
    submenu_style = el.querySelector('ul').style.display;
    if (submenu_style == "") submenu_style = "none"
    submenu_is_open = false;
    console.log("submenu_style", submenu_style)
    el.querySelector('ul').style.display =  "none";
}


window.onload = function(event) {
    var msnry = new Masonry( '.grid', {
        columnWidth: 40,
        itemSelector: '.grid-item',
        "isFitWidth": true,
        "gutter": 10
      });    
};
