const profileUrl = "http://localhost:8080/users"

$(document).ready(() => {

    const firstAndLastName = $("#firstAndLastName");

    const userId = localStorage.getItem('id_user');
    const roleUser = localStorage.getItem('role_user');
    if (!userId || !roleUser) {
        window.location.href = "./connexion.html";
        return;
    }

    $("#roleUser").text(roleUser);

    $.ajax({
        url: `${profileUrl}?user_id=${userId}`,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).done((payload) => {
        firstAndLastName.text(payload.firstName + " " + payload.lastName)
    },).fail(() => {
        window.location.href = "./connexion.html";
    })

})