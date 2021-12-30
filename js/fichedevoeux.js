const profileUrl = "http://localhost:8080/options"

$(document).ready(() => {

    const specialityId = localStorage.getItem("speciality_user");

    if (!specialityId) {
        window.location.href = "./connexion.html";
        return;
    }

    $.ajax({
        url: `${profileUrl}?speciality_id=${specialityId}`,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).done((payload) => {
        const options = $(".option-class");
        payload.forEach((option) => {
            options.append(`<option id="${option.id}">${option.name}</option>`)
        })
    },).fail(() => {
        window.location.href = "./connexion.html";
    })

});