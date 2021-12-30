const profileUrl = "http://localhost:8080/users"

$(document).ready(() => {

    const firstAndLastName = $("#firstAndLastName");

    const userId = localStorage.getItem('id_user');
    if(!userId){
        window.location.href = "./connexion.html";
        return;
    }

    $.ajax({
        url: `${profileUrl}?user_id=${userId}`,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).done((payload) => {
        firstAndLastName.text(payload.firstName + " " + payload.lastName)
    },).fail(() => {
        alert("NOT OK !");
    })

})