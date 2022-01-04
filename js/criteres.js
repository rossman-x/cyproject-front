const optionsUrl = "http://localhost:8080/options"
const specUrl = "http://localhost:8080/specialities";
const criteriaUrl = "http://localhost:8080/criterias"

$(document).ready(() => {
    const userId = localStorage.getItem('id_user');
    const roleUser = localStorage.getItem('role_user');
    if (!userId || !roleUser) {
        window.location.href = "./connexion.html";
        return;
    }

    $.ajax({
        url: `${optionsUrl}/list`,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).done((payload) => {
        const options = $(".option-class");
        payload.forEach((option) => {
            options.append(`<option value="${option.id}" id="option_${option.id}">${option.name}</option>`)
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
            $(".critere-option").append(`<option value="MOYENNE_${mat.id}" id="option_${mat.name}">Moyenne ${mat.name}</option>`);
        })
    },).fail(() => {
        window.location.href = "./connexion.html";
    })
});

function sendCriteres() {
    const criteria1 = $("#critere1").val();
    const criteria2 = $("#critere2").val();

    const option = $(".option-class").val();

    $.ajax({
        type: "POST",
        url: `${criteriaUrl}/create`,
        data: JSON.stringify({
            option,
            criteria1,
            criteria2
        }),
        success: () => {
            alert("Criterias created !");
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