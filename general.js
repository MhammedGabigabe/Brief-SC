const btn_ajouter = document.getElementById("btn-ajouter");
const modale_ajout = document.getElementById("modale-ajout");
const btn_quitter = document.getElementById("btn-quitter");


const nom_employe = document.getElementById("nom-employe");
const liste_role = document.getElementById("role");
const url_photo = document.getElementById("url-photo");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

const btn_enregistrer = document.getElementById("btn-enregistrer");

const para_nom = document.getElementById("para-nom");
const para_role = document.getElementById("para-role");
const para_url = document.getElementById("para-url");
const para_email = document.getElementById("para-email");
const para_phone = document.getElementById("para-phone");
const id_photo = document.getElementById("id-photo");



function verification_presence_format() {

    const format_nom = /^[a-zA-ZÀ-ÿ\s]+$/;
    const format_url = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#\[\]@!$&'()+,;=])?$/;
    const format_telephone = /^(05|06|07)\d{8}$/;
    const format_email = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

    if (nom_employe.value.trim() == "") {
        para_nom.classList.remove('hidden');
        para_nom.textContent = "*Champ obligatoire !!";
    } else if (format_nom.test(nom_employe.value)) {
        para_nom.classList.add('hidden');
    } else {
        para_nom.classList.remove('hidden');
        para_nom.textContent = "*Format n'est pas valide !!"
    }

    if (url_photo.value == "") {
        para_url.classList.remove('hidden');
        para_url.textContent = "*Champ obligatoire !!";
    } else if (format_url.test(url_photo.value)) {
        para_url.classList.add('hidden');
    } else {
        para_url.classList.remove('hidden');
        para_url.textContent = "*Format n'est pas valide !!"
    }

    if (liste_role.value == "") {
        para_role.classList.remove('hidden');
        para_role.textContent = "*Tu doit choisi un rôle !!";
    } else {
        para_role.classList.add('hidden');
    }

    if (phone.value == "") {
        para_phone.classList.remove('hidden');
        para_phone.textContent = "*Champ obligatoire";
    } else if (format_telephone.test(phone.value)) {
        para_phone.classList.add('hidden');
    } else {
        para_phone.classList.remove('hidden');
        para_phone.textContent = "*Format n'est pas valide !!"
    }

    if (email.value == "") {
        para_email.classList.remove('hidden');
        para_email.textContent = "*Champ obligatoire";
    } else if (format_email.test(email.value)) {
        para_email.classList.add('hidden');
    } else {
        para_email.classList.remove('hidden');
        para_email.textContent = "*Format n'est pas valide !!"
    }

}

url_photo.addEventListener('input',()=>{
    
    if(url_photo.value ==""){
        id_photo.src = "worker.png"
    }else{
        id_photo.src = url_photo.value;
    }
})
function ajouter_employe(){
    const employe={

    }
}

btn_ajouter.addEventListener('click', () => {
    modale_ajout.classList.remove('hidden');
})
btn_quitter.addEventListener('click', () => {
    modale_ajout.classList.add('hidden');
})
btn_enregistrer.addEventListener('click', () => {
    verification_presence_format();
})