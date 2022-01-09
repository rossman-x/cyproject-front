const profileUrl = "http://localhost:8080/users"
const specUrl = "http://localhost:8080/specialities";

$(document).ready(() => {


    const userId = localStorage.getItem('id_user');
    const roleUser = localStorage.getItem('role_user');
    if (!userId || !roleUser) {
        window.location.href = "./connexion.html";
        return;
    }

    $.ajax({
        url: `${specUrl}/list`,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).done((payload) => {
        payload.forEach(spec => {
            $("#speciality").append(`<option value="${spec.id}" id="spec_${spec.name}">${spec.name}</option>`);
        })
    },).fail(() => {
        window.location.href = "./connexion.html";
    });

    $.ajax({
        url: `${profileUrl}/list`,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).done((payload) => {
        payload.forEach(u => {
            $("#userToDelete").append(`<option value="${u.id}" id="spec_${u.id}">${u.firstName} ${u.lastName} - ${u.emailAddress}</option>`);
        })
    },).fail(() => {
        window.location.href = "./connexion.html";
    })


})

function onCreateUser() {
    $.ajax({
        type: "POST",
        url: `${profileUrl}/create`,
        data: JSON.stringify({
            "firstName": $("#nom").val(),
            "lastName": $("#prenom").val(),
            "password": $("#password").val(),
            "birthdayDate": $("#date_de_naissance").val(),
            "emailAddress": $("#email").val(),
            "address": $("#adresse").val(),
            "status": $("#statut").val(),
            "speciality": {
                "id": $("#speciality").val(),
            }
        }),
        success: () => {
            alert("User added !");
            window.location.href = "./admin.html";
        },
        error: () => {
            alert("Error, not added !");
        },
        headers: {
            //"content-type": "text/plain;charset=UTF-8" // Add this line
            "content-type": "application/json;charset=UTF-8" // Or add this line
        },
    });

}

function onDeleteUser() {
    $.ajax({
        url: `${profileUrl}/delete?user_id=${$("#userToDelete").val()}`,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).done(() => {
        alert("User deleted");
        window.location.href = "./admin.html";
    },).fail(() => {
        window.location.href = "./connexion.html";
    })
}