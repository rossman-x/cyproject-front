const authUrl = "http://localhost:8080/users/auth"

const submitEmailAndPassword = () => {

    const email = $("#email").val();
    const password = $("#password").val();

    connectWithEmailAndPassword(email, password);
}

const connectWithEmailAndPassword = (email, password) => {
    $.ajax({
        url: `${authUrl}?email=${email}&password=${password}`,
        headers: {"Access-Control-Allow-Origin": "*"}
    }).done((payload) => {
        localStorage.setItem('id_user', payload.id);
        localStorage.setItem('speciality_user', payload.speciality.id);
        localStorage.setItem('role_user', payload.status);
        if(payload.status == "ETUDIANT"){
            window.location.href = "./etudiant.html";
            return;
        }
        if(payload.status == "RESPO_ADMIN"){
            window.location.href = "./respo_admin.html";
        }
        if(payload.status == "ADMIN"){
            window.location.href = "./admin.html";
        }
    },).fail(() => {
        alert("NOT OK !");
    })
}