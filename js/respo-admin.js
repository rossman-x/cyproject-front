const profileUrl = "http://localhost:8080/users"

$(document).ready(() => {


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
        $("#firstName").text(payload.firstName);
        $("#email").text(payload.emailAddress);
        $("#lastName").text(payload.lastName);
    },).fail(() => {
        window.location.href = "./connexion.html";
    })

})