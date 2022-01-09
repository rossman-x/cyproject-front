const profileUrl = "http://localhost:8080/users"
const optionsUrl = "http://localhost:8080/options"
const messageUrl = "http://localhost:8080/messages";

$(document).ready(() => {

    const userId = localStorage.getItem('id_user');
    const roleUser = localStorage.getItem('role_user');
    const specialityId = localStorage.getItem("speciality_user");

    if (!userId || !roleUser || !specialityId) {
        window.location.href = "./connexion.html";
        return;
    }

    $.ajax({
        url: `${profileUrl}/list`,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).done((payload) => {
        const options = $("#destin");
        payload.forEach((receiver) => {
            if (receiver.status !== "RESPO_ADMIN")
                return;
            options.append(`<option value="${receiver.id}" id="option_${receiver.id}">${receiver.firstName} ${receiver.lastName}</option>`)
        })

    },).fail(() => {
        window.location.href = "./connexion.html";
    })

    $.ajax({
        url: `${optionsUrl}?speciality_id=${specialityId}`,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).done((payload) => {
        const options = $("#option");
        payload.forEach((option) => {
            options.append(`<option value="${option.id}" id="option_${option.id}">${option.name}</option>`)
        })
    },).fail(() => {
        window.location.href = "./connexion.html";
    })


});

function sendMessage() {
    const receiver = $("#destin").val();
    const sender = localStorage.getItem('id_user');
    const optionId = $("#option").val();
    const content = $("#content").val()

    $.ajax({
        type: "POST",
        url: `${messageUrl}/create`,
        data: JSON.stringify({
            content: content,
            sender: {
                "id": sender
            },
            receiver: {
                "id": receiver
            },
            option: {
                "id": optionId
            }
        }),
        success: () => {
            alert("Message sent !");
            window.location.href = "./etudiant.html";
        },
        error: () => {
            alert("Error, not sent !");
        },
        headers: {
            //"content-type": "text/plain;charset=UTF-8" // Add this line
            "content-type": "application/json;charset=UTF-8" // Or add this line
        },
    });
}