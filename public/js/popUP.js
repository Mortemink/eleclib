
function popupOpen(){
    let popUp = document.getElementById("popup")
    let popUpBg = document.getElementById("popupBG")
    popUp.classList.add("activePopUP")
    popUpBg.classList.add("popUp_bgActive")

}


function popupclose(){
    let popUp = document.getElementById("popup")
    let popUpBg = document.getElementById("popupBG")
    popUp.classList.remove("activePopUP")
    popUpBg.classList.remove("popUp_bgActive")

}