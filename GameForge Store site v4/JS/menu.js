let menu = document.querySelector('ul#menu')

menu.style.display = 'none'

function btnMenu () {
    if(menu.style.display == 'none'){
        menu.style.display = 'block'
    }else {
        menu.style.display = 'none'
    }
}