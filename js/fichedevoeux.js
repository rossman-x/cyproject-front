const wishesUrl = "http://localhost:8080/wishes/create_many"
const optionsUrl = "http://localhost:8080/options"

$(document).ready(() => {

    const specialityId = localStorage.getItem("speciality_user");

    if (!specialityId) {
        window.location.href = "./connexion.html";
        return;
    }

    $.ajax({
        url: `${optionsUrl}?speciality_id=${specialityId}`,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).done((payload) => {
        const options = $(".option-class");
        payload.forEach((option) => {
            options.append(`<option value="${option.id}" id="option_${option.id}">${option.name}</option>`)
        })
    },).fail(() => {
        window.location.href = "./connexion.html";
    })

});

function saveWishes() {
    const userId = localStorage.getItem("id_user");
    const firstWish = $("#firstWish").val();
    const secondWish = $("#secondWish").val();
    const thirdWish = $("#thirdWish").val();
    const forthWish = $("#forthWish").val();

    $.ajax({
        url: `${wishesUrl}?id_user=${userId}&first_wish=${firstWish}&second_wish=${secondWish}&third_wish=${thirdWish}&forth_wish=${forthWish}`,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).done(() => {
        alert("Data saved successfully.");
        window.location.href = "./etudiant.html";
    }).fail(() => {
        alert("An error has occurred while sending data !");
    })
};
