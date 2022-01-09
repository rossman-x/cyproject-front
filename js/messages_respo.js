const messageUrl = "http://localhost:8080/messages";
const profileUrl = "http://localhost:8080/users"

$(document).ready(() => {

    const userId = localStorage.getItem('id_user');
    const roleUser = localStorage.getItem('role_user');
    if (!userId || !roleUser) {
        window.location.href = "./connexion.html";
        return;
    }

    $.ajax({
        url: `${messageUrl}/received?user_id=${userId}`,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).done((payload) => {
        const tbody = $("#body");
        payload.forEach((message) => {
            tbody.append(`
                 <tr>
                    <td>${message.sender.firstName} ${message.sender.lastName}</td>
                    <td>${message.sender.emailAddress}</td>
                    <td>${message.content}</td>
                    <td>${message.option ? "Recours Option " + message.option.name : "Message"}</td>
                    ${message.option ? `<td>
                <button type="submit" onClick="accept_recours(${message.sender.id},${message.option.id},${message.id})" name="Valider" className="btn btn-success">Accepter
                    recours
                </button>
                <button type="submit" onClick="delete_message(${message.id})" name="Valider" className="btn btn-success">Refuser
                    recours
                </button>
            </td>` : `
            <td>
              <button type="submit" onClick="delete_message(${message.id})" name="Valider" className="btn btn-success">Supprimer message
                </button>
            </td>
            `}
                </tr>`)
        })

    },).fail(() => {
        window.location.href = "./connexion.html";
    })
});

function delete_message(messageId) {
    $.ajax({
        url: `${messageUrl}/delete?messageId=${messageId}`,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).done((payload) => {
        alert("Message removed !");
        window.location.href = "./message_respo.html";
    }).fail(() => {
        alert("An error has occurred.");
    })
}

function accept_recours(userId, optionId, messageId) {
    $.ajax({
        url: `${profileUrl}/create_orientation?id_user=${userId}&id_option=${optionId}`,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).done((payload) => {
        alert("User orientation completed !");
        delete_message(messageId);
    }).fail(() => {
        alert("An error has occurred.");
    })
}