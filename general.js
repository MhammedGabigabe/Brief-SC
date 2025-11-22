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

const partie_experience = document.getElementById("partie-experience");
const btn_ajouter_experience = document.getElementById("btn-ajouter-experience");
//localStorage.clear("employes")
let liste_employes = [];
let id_employe = 0;
let photo = "https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80";

function sauvedarder_employes() {
    localStorage.setItem("employes", JSON.stringify(liste_employes));
}

if (localStorage.getItem("employes")) {
    liste_employes = JSON.parse(localStorage.getItem("employes"));
    id_employe = liste_employes.length;
}

function ajouter_employe() {

    alert("dans la fonction insertion")
    const experiences = [];
    const experiences_injecter = document.querySelectorAll(".ensemble-experience");

    experiences_injecter.forEach(exp => {
        const entreprise = exp.querySelector("#nom-entreprise").value;
        const poste = exp.querySelector("#poste").value;
        const date_debut = exp.querySelector("#date-debut").value;
        const date_fin = exp.querySelector("#date-fin").value;

        experiences.push({
            entreprise_ex: entreprise,
            poste_ex: poste,
            date_debut_ex: date_debut,
            date_fin_ex: date_fin
        });
    });

    const employe = {
        id_em: ++id_employe,
        nom_prenom_em: nom_employe.value,
        role_em: liste_role.value,
        photo_em: photo,
        email_em: email.value,
        phone_em: phone.value,
        experience_em: experiences
    };
    liste_employes.push(employe);
    sauvedarder_employes();
    alert("insertion a été effectué!!")
}

function injecter_element() {

    const element = document.createElement('div');
    element.setAttribute("class", "ensemble-experience");

    element.innerHTML = `
        <div class="flex gap-1 mt-2 w-[100%]">
          <div class="flex flex-col w-[45%] ml-4">
            <label for="nom-entreprise" class="text-sm text-gray-800">Entreprise</label>
            <input type="text" id="nom-entreprise" class="rounded-md border-2 border-gray p-1 text-sm">
            <p id="para-entreprise" class="text-red-500 text-xs hidden"></p>
          </div>
          <div class="flex flex-col w-[45%] ml-4">
            <label for="poste" class="text-sm text-gray-800">Poste</label>
            <input type="text" id="poste" class="rounded-md border-2 border-gray p-1 text-sm">
            <p id="para-poste" class="text-red-500 text-xs hidden"></p>
          </div>
        </div>
        <div class="flex gap-1 mt-2 mb-4 w-[100%]" id="">
          <div class="flex flex-col w-[45%] ml-4">
            <label for="date-debut" class="text-sm text-gray-800">Date de début</label>
            <input type="date" id="date-debut" class="rounded-md border-2 border-gray p-1 text-sm">
            <p id="para-debut" class="text-red-500 text-xs hidden"></p>
          </div>
          <div class="flex flex-col w-[45%] ml-4">
            <label for="date-fin" class="text-sm text-gray-800">Date de fin</label>
            <input type="date" id="date-fin" class="rounded-md border-2 border-gray p-1 text-sm">
            <p id="para-fin" class="text-red-500 text-xs hidden"></p>
          </div>
        </div>`;
    partie_experience.append(element);

}

function verification_presence_format() {

    const format_nom = /^[a-zA-ZÀ-ÿ\s]+$/;
    const format_url = /^(https?:\/\/)[\w\-]+(\.[\w\-]+)+([\/\w\-._~:/?#\[\]@!$&'()*+,;=]*)$/;
    const format_telephone = /^(05|06|07)\d{8}$/;
    const format_email = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

    const format_entreprise = /^(?=.*[a-zA-ZÀ-ÿ])[a-zA-ZÀ-ÿ\s\d]+$/;
    const format_poste = /^[a-zA-ZÀ-ÿ\s]+$/;

    if (nom_employe.value.trim() == "") {
        nom_employe.value = null;
        para_nom.classList.remove('hidden');
        para_nom.textContent = "*Champ obligatoire !!";
        return;
    } else if (format_nom.test(nom_employe.value)) {
        para_nom.classList.add('hidden');
    } else {
        para_nom.classList.remove('hidden');
        para_nom.textContent = "*Format invalide !!"
        return;
    }

    if (liste_role.value == "") {
        para_role.classList.remove('hidden');
        para_role.textContent = "*Tu doit choisi un rôle !!";
        return;
    } else {
        para_role.classList.add('hidden');
    }

    if (url_photo.value.trim()) {
        if (format_url.test(url_photo.value)) {
            para_url.classList.add("hidden");
            photo = url_photo.value;
        } else {
            para_url.classList.remove("hidden");
            para_url.textContent = "*Format invalive !!"
            return;
        }
    }

    if (email.value.trim() == "") {
        email.value = null;
        para_email.classList.remove('hidden');
        para_email.textContent = "*Champ obligatoire";
        return;
    } else if (format_email.test(email.value)) {
        para_email.classList.add('hidden');
    } else {
        para_email.classList.remove('hidden');
        para_email.textContent = "*Format invalide !!"
        return;
    }

    if (phone.value.trim() == "") {
        phone.value = null;
        para_phone.classList.remove('hidden');
        para_phone.textContent = "*Champ obligatoire";
        return;
    } else if (format_telephone.test(phone.value)) {
        para_phone.classList.add('hidden');
    } else {
        para_phone.classList.remove('hidden');
        para_phone.textContent = "*Format invalide !!"
        return;
    }

    // alert("avant selectione les experiences !!")
    const experiences_injecter = document.querySelectorAll(".ensemble-experience");
    const nb_experience = experiences_injecter.length;
    // alert(nb_experience)

    let experience_isValid = true;
    experiences_injecter.forEach(experience => {

        //let saisi;
        let cmp = 0;
        alert("avant validation experience");
        // if (experience.querySelector("#nom-entreprise").value.trim() == "" && experience.querySelector("#poste").value.trim() == ""
        //     && experience.querySelector("#date-debut").value.trim() == "" && experience.querySelector("#date-fin").value.trim() == "") {
        //     saisi = false;
        //     alert("n'a pas saisi experience");
        // } else {
        //     saisi = true;
        //     alert("il a saisi experience");
        // }

        while (cmp < nb_experience && experience_isValid == true) {
            // alert("avant validation d entreprise");
            if (format_entreprise.test(experience.querySelector("#nom-entreprise").value)) {
                // alert(" entreprise correct");
                experience.querySelector("#para-entreprise").classList.add('hidden');
            } else {
                // alert("entreprise incorect !!");
                experience.querySelector("#para-entreprise").classList.remove('hidden');
                experience.querySelector("#para-entreprise").textContent = "*Champ obligatoire ou Format invalide !!";
                experience_isValid = false;
            }

            if (format_poste.test(experience.querySelector("#poste").value)) {
                experience.querySelector("#para-poste").classList.add('hidden');
            } else {
                experience.querySelector("#para-poste").classList.remove('hidden');
                experience.querySelector("#para-poste").textContent = "*Champ obligatoire ou Format invalide !!";
                experience_isValid = false;
            }

            if (experience.querySelector("#date-debut").value == "") {
                experience.querySelector("#para-debut").classList.remove('hidden');
                experience.querySelector("#para-debut").textContent = "*Tu doit saisi la date début d'éxpérience !!"
                experience_isValid = false;
            } else {
                experience.querySelector("#para-debut").classList.add('hidden');
            }

            if (experience.querySelector("#date-fin").value == "") {
                experience.querySelector("#para-fin").classList.remove('hidden');
                experience.querySelector("#para-fin").textContent = "*Tu doit saisi la date fin d'éxpérience !!"
                experience_isValid = false;
            } else {
                experience.querySelector("#para-fin").classList.add('hidden');
            }

            if (experience.querySelector("#date-debut").value >= experience.querySelector("#date-fin").value) {
                if (experience.querySelector("#date-debut").value != "") {
                    experience.querySelector("#para-debut").classList.remove('hidden');
                    experience.querySelector("#para-debut").textContent = "*Date début expérience doit étre avant la date fin !!"
                    experience_isValid = false;
                }
            }
            cmp++;
        }
        if (!experience_isValid) {
        //alert("experience invalid il faut sortie de la boucle 1 et 2 !!");
        return;
    }
    })
    if (!experience_isValid) {
        //alert("format experience invalid !!");
        return;
    }

    //alert("validation correct avant insertion")
    ajouter_employe();
}

btn_ajouter_experience.addEventListener('click', () => {
    injecter_element();
})

url_photo.addEventListener('input', () => {

    if (url_photo.value.trim() == "") {
        url_photo.value = null;
        id_photo.src = photo;
        para_url.classList.add("hidden");
    } else {
        id_photo.src = url_photo.value;
    }
})

btn_ajouter.addEventListener('click', () => {
    modale_ajout.classList.remove('hidden');
})

btn_quitter.addEventListener('click', () => {
    modale_ajout.classList.add('hidden');
    nom_employe.value = "";
    liste_role.value = "";
    url_photo.value = "";
    id_photo.src = "worker.png"
    email.value = "";
    phone.value = "";
    para_nom.classList.add('hidden');
    para_role.classList.add('hidden');
    para_url.classList.add('hidden');
    para_email.classList.add('hidden');
    para_phone.classList.add('hidden');

    const para_poste = document.getElementById("para-poste");
    const para_debut = document.getElementById("para-debut");
    const para_fin = document.getElementById("para-fin");
    const para_entreprise = document.getElementById("para-entreprise");
    const nom_entreprise = document.getElementById("nom-entreprise");
    const poste = document.getElementById("poste");
    const date_debut = document.getElementById("date-debut");
    const date_fin = document.getElementById("date-fin");
    nom_entreprise.value = "";
    poste.value = "";
    date_debut.value = "";
    date_fin.value = "";
    para_entreprise.classList.add('hidden');
    para_poste.classList.add('hidden');
    para_debut.classList.add('hidden');
    para_fin.classList.add('hidden');

    const experiences_injecter = document.querySelectorAll(".ensemble-experience");
    experiences_injecter.forEach(el => el.remove());
})
btn_enregistrer.addEventListener('click', () => {
    verification_presence_format();
})