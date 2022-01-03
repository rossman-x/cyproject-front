const profileUrl = "http://localhost:8080/users"
const specUrl = "http://localhost:8080/specialities";
const scoreUrl = "http://localhost:8080/scores";

$(document).ready(() => {

    const userId = localStorage.getItem('id_user');
    const roleUser = localStorage.getItem('role_user');
    if (!userId || !roleUser) {
        window.location.href = "./connexion.html";
        return;
    }

    $.ajax({
        url: `${profileUrl}/list`,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).done((payload) => {
        const options = $(".list-etudiant");
        payload.forEach((receiver) => {
            options.append(`<option value="${receiver.id}" id="option_${receiver.id}">${receiver.firstName} ${receiver.lastName}</option>`)
        })

    },).fail(() => {
        window.location.href = "./connexion.html";
    })

    $.ajax({
        url: `${specUrl}/list`,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).done((payload) => {
        const listMatiere = [];
        payload.forEach(ue => {
            if (!ue || !ue.subjectSet || ue.subjectSet.length == 0)
                return;
            ue.subjectSet.forEach(subject => {
                if (!listMatiere.find((m) => m.id == subject.id)) {
                    listMatiere.push(subject);
                }
            })

        })
        listMatiere.forEach(mat => {
            console.log(mat)
            $(".matiere").append(`<option value="${mat.id}" id="option_${mat.name}">${mat.name}</option>`);
        })
    },).fail(() => {
        window.location.href = "./connexion.html";
    })

});

function add_score() {
    const student = $("#student").val();
    const subject = $("#subject").val();
    const score = $("#note").val();
    const scoreMax = $("#note_max").val();

    $.ajax({
        type: "POST",
        url: `${scoreUrl}/create`,
        data: JSON.stringify({
            score: score,
            scoreMax: scoreMax,
            userId: student,
            subjectId: subject
        }),
        success: () => {
            alert("Score added !");
            window.location.href = "./respo_admin.html";
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