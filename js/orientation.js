const profileUrl = "http://localhost:8080/users"
const optionsUrl = "http://localhost:8080/options/get"

$(document).ready(() => {
    const userId = localStorage.getItem('id_user');

    if (!userId) {
        window.location.href = "./connexion.html";
        return;
    }

    $.ajax({
        url: `${profileUrl}?user_id=${userId}`,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).done((payload) => {
        const idOption = payload?.orientation?.option?.id;
        if(!idOption){
            $("#option_adm").html("Pas encore définie!");
            return;
        }
        $.ajax({
            url: `${optionsUrl}?option_id=${idOption}`,
            headers: {"Access-Control-Allow-Origin": "*"}
        }).done((payload) => {
            $("#option_adm").html(payload.name);
        }).fail(() => {
            $("#option_adm").html("Non trouvé !");
        })
    },).fail(() => {
        $("#option_adm").html("Non trouvé !");
        })

});