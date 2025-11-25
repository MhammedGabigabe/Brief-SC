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

const btn_staff = document.getElementById("staff");
const btn_reception = document.getElementById("reception");
const btn_security = document.getElementById("security");
const btn_conference = document.getElementById("conference");
const btn_archives = document.getElementById("archives");
const btn_server = document.getElementById("server");

// localStorage.clear("employes")
let liste_employes = [];
let id_employe = 0;
let photo = "https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80";

let experience_ajouter = false;
let donnees_stockees = localStorage.getItem("employes");

const zone = [{
    id_z: 4,
    name_z: "conference room",
    roles_eligibles_z: ["Receptionists", "IT Technicians", "Security guards", "Manager", "Cleaning"],
    nombre_limite_z: 6,
    employes_eligibles_z: [],
    employes_assignes_z: []
},
{
    id_z: 1,
    name_z: "staff room",
    roles_eligibles_z: ["Receptionists", "IT Technicians", "Security guards", "Manager", "Cleaning"],
    nombre_limite_z: 6,
    employes_eligibles_z: [],
    employes_assignes_z: []
},
{
    id_z: 2,
    name_z: "reception",
    roles_eligibles_z: ["Receptionists", "Manager", "Cleaning"],
    nombre_limite_z: 2,
    employes_eligibles_z: [],
    employes_assignes_z: []
},
{
    id_z: 3,
    name_z: "security room",
    roles_eligibles_z: ["Security guards", "Manager", "Cleaning"],
    nombre_limite_z: 2,
    employes_eligibles_z: [],
    employes_assignes_z: []
},
{
    id_z: 6,
    name_z: "server room",
    roles_eligibles_z: ["IT Technicians", "Manager", "Cleaning"],
    nombre_limite_z: 2,
    employes_eligibles_z: [],
    employes_assignes_z: []
},
{
    id_z: 5,
    name_z: "archives room",
    roles_eligibles_z: ["Receptionists", "IT Technicians", "Security guards", "Manager"],
    nombre_limite_z: 2,
    employes_eligibles_z: [],
    employes_assignes_z: []
}]


function sauvedarder_employes() {
    localStorage.setItem("employes", JSON.stringify(liste_employes));
}

if (donnees_stockees) {
    liste_employes = JSON.parse(donnees_stockees);
    id_employe = liste_employes.length;
    afficher_employes_non_assignes();
}

function restriction_zone(id_zo, id_container_zo) {

    const modale_eligibles = document.getElementById("modale-eligible");
    modale_eligibles.classList.remove('hidden');
    modale_eligibles.innerHTML = "";
    const zone_a_clique = zone.find(obj => obj.id_z === id_zo);

    if (zone_a_clique.employes_assignes_z.length >= zone_a_clique.nombre_limite_z) {
        alert("Espace insuffisant !!");
        modale_eligibles.classList.add('hidden');
        return; 
    }

    zone_a_clique.employes_eligibles_z = [];

    for (let i = 0; i < liste_employes.length; i++) {
        if (zone_a_clique.roles_eligibles_z.includes(liste_employes[i].role_em)) {
            zone_a_clique.employes_eligibles_z.push(liste_employes[i]);
        }
    }
    console.log();

    if (zone_a_clique.employes_eligibles_z.length > 0) {

        const container_emp_elegibles = document.createElement("div");
        container_emp_elegibles.className = "bg-white p-4 rounded-lg flex flex-col gap-3 justify-center items-center"
        // container_emp_elegibles.innerHTML = '';
        container_emp_elegibles.innerHTML = `
            <button id="close-eligible" class="text-white bg-red-600 rounded-lg py-1 px-4"> Close </button>`
        modale_eligibles.append(container_emp_elegibles);

        zone_a_clique.employes_eligibles_z.forEach(emp_elegible => {
            const element_employe = document.createElement("div");
            element_employe.className = "flex items-center gap-2 bg-gray-100 rounded-xl overflow-hidden w-36 h-12 md:w-48 md:ml-2 cursor-pointer";
            // element_employe.innerHTML = '';
            element_employe.innerHTML = `
            <img src="${emp_elegible.photo_em}"
                alt="profil" class="w-12 h-12 rounded-r-full object-cover">
            <div>
                <p class="text-[#1e2939] text-xs">${emp_elegible.nom_prenom_em}</p>
                <p class="text-[#99a1af] text-xs font-light">${emp_elegible.role_em}</p>
            </div>`;

            element_employe.addEventListener('click', () => {
                modale_eligibles.classList.add('hidden');

                zone_a_clique.employes_assignes_z.push(emp_elegible);

                const id_container = document.getElementById(id_container_zo);
                const element_zone = document.createElement('div');
                element_zone.className = "flex items-center gap-2 bg-gray-100 rounded-xl overflow-hidden w-40 h-8 m-2";
                element_zone.innerHTML = `
                    <img src="${emp_elegible.photo_em}"
                        alt="profil" class="w-8 h-8 rounded-r-full object-cover">
                    <div>
                        <p class="text-[#1e2939] text-xs">${emp_elegible.nom_prenom_em}</p>
                        <p class="text-[#99a1af] text-xs font-extralight">${emp_elegible.role_em}</p>
                    </div>
                    <button class="text-red-600">&times;</button>`;
                id_container.append(element_zone);
                for(let i=0; i<liste_employes.length; i++){
                    if(liste_employes[i].id_em == emp_elegible.id_em){
                        liste_employes.splice(i,1);
                    }
                }
                sauvedarder_employes(liste_employes);
                afficher_employes_non_assignes();

            })

            container_emp_elegibles.prepend(element_employe);
        })
    } else {
        modale_eligibles.innerHTML = `
        <div class="bg-white p-4 rounded-lg flex flex-col justify-center items-center">
            <p class="text-xl text-red-600"> Y a pas des employés éligibles</p>
            <button id="close-eligible" class="text-white bg-red-600 rounded-lg py-1 px-4"> Close </button>
        </div>`
    }

    const btn_close = document.getElementById("close-eligible");
    btn_close.addEventListener('click', () => {
        modale_eligibles.classList.add('hidden');
    });
}


function afficher_details_employe(employe) {
    const container_details = document.getElementById("modale-details");
    container_details.classList.remove('hidden');
    container_details.innerHTML = '';

    const informations_employe = document.createElement("div");
    informations_employe.className = "w-full max-w-lg bg-white p-4 rounded-xl flex flex-col items-center gap-6 h-[470px]"
    let html = `
        <div class="flex justify-beetwen relative">
            <img src="${employe.photo_em}"
                alt="profil" class="w-24 h-24 rounded-full object-cover">
            <button id="btn-quitter-details" class="text-red-600 text-3xl absolute left-64 ">&times;</button>
        </div>    
        <div class="border-2 border-dashed p-4 w-full rounded-xl relative">
            <span class="absolute -top-3 left-2 px-1 bg-white">Données personnelles :</span>           
            <div class="mt-2">
                <p class="text-[#1e2939]">Full Name : <span class="text-[#99a1af]">${employe.nom_prenom_em}</span></p>
                <p class="text-[#1e2939]">Role : <span class="text-[#99a1af]">${employe.role_em}</span></p>
                <p class="text-[#1e2939]">Email : <span class="text-[#99a1af]">${employe.email_em}</span></p>
                <p class="text-[#1e2939]">Phone : <span class="text-[#99a1af]">${employe.phone_em}</span></p>
            </div>
        </div>
        `;
    if (employe.experiences_em.length > 0) {
        html += `<div class="w-full max-h-64 overflow-y-auto flex flex-col gap-2 p-2">`;
        employe.experiences_em.forEach((exp, index) => {
            html += `
                <div class="border-2 border-dashed p-3 mb-2 rounded-xl relative">
                    <span class="absolute -top-3 left-2 px-1 bg-white">Expérience ${index + 1}</span>
                    <p class="text-[#1e2939]">Entreprise : <span class="text-[#99a1af]">${exp.entreprise_ex}</span></p>
                    <p class="text-[#1e2939]">Poste : <span class="text-[#99a1af]">${exp.poste_ex}</span></p>
                    <p class="text-[#1e2939]">Début : <span class="text-[#99a1af]">${exp.date_debut_ex}</span></p>
                    <p class="text-[#1e2939]">Fin : <span class="text-[#99a1af]">${exp.date_fin_ex}</span></p>
                </div>
            `;
        });
        html += `</div>`;
    }
    informations_employe.innerHTML = html;
    container_details.appendChild(informations_employe);
    const btn_quitter_details = document.getElementById("btn-quitter-details");
    btn_quitter_details.addEventListener('click', () => {
        container_details.classList.add('hidden');
    });
}

function afficher_employes_non_assignes() {
    const employe_non_assignes = document.getElementById("employes-non-assignes");
    employe_non_assignes.innerHTML="";
    liste_employes.forEach(emp => {
        const element_employe = document.createElement("div");
        element_employe.className = "flex items-center gap-3 bg-gray-100 rounded-xl overflow-hidden shrink-0 md:shrink w-52 h-12 md:w-60 md:ml-2 cursor-pointer";
        element_employe.innerHTML = `
            <img src="${emp.photo_em}"
                alt="profil" class="w-12 h-12 rounded-r-full object-cover">
            <div>
                <p class="text-[#1e2939] text-xs">${emp.nom_prenom_em}</p>
                <p class="text-[#99a1af] text-xs font-light">${emp.role_em}</p>
            </div>`;

        element_employe.addEventListener('click', () => {
            afficher_details_employe(emp)
        });

        employe_non_assignes.prepend(element_employe);
    });
}

function ajouter_employe() {

    // alert("dans la fonction insertion")
    const experiences = [];
    const experiences_injecter = document.querySelectorAll(".liste-experience");

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
        experiences_em: experiences
    };
    liste_employes.push(employe);
    sauvedarder_employes();
    // alert("insertion a été effectué!!")
}

function injecter_experience() {

    const element = document.createElement('div');
    element.setAttribute("class", "liste-experience");

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

function vider_champs() {
    //alert("dans le vide")
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
    // alert("dans le vide1")
    const para_poste = document.getElementById("para-poste");
    const para_debut = document.getElementById("para-debut");
    const para_fin = document.getElementById("para-fin");
    const para_entreprise = document.getElementById("para-entreprise");
    const nom_entreprise = document.getElementById("nom-entreprise");
    const poste = document.getElementById("poste");
    const date_debut = document.getElementById("date-debut");
    const date_fin = document.getElementById("date-fin");
    // alert("dans le vide2")
    if (experience_ajouter) {
        nom_entreprise.value = "";
        // alert("dans le vide3")
        poste.value = "";
        date_debut.value = "";
        date_fin.value = "";

        para_entreprise.classList.add('hidden');
        para_poste.classList.add('hidden');
        para_debut.classList.add('hidden');
        para_fin.classList.add('hidden');
        // alert("tout est bien1")
        const experiences_injecter = document.querySelectorAll(".liste-experience");
        experiences_injecter.forEach(el => el.remove());
        // alert("tout est bien2")
    }

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
    const experiences_injecter = document.querySelectorAll(".liste-experience");
    const nb_experience = experiences_injecter.length;
    // alert(nb_experience)

    let experience_isValid = true;
    experiences_injecter.forEach(experience => {

        //let saisi;
        let cmp = 0;

        while (cmp < nb_experience && experience_isValid == true) {
            // alert("avant validation d entreprise");
            if (format_entreprise.test(experience.querySelector("#nom-entreprise").value.trim())) {
                // alert(" entreprise correct");
                experience.querySelector("#para-entreprise").classList.add('hidden');
            } else {
                // alert("entreprise incorect !!");
                experience.querySelector("#para-entreprise").classList.remove('hidden');
                experience.querySelector("#para-entreprise").textContent = "*Champ obligatoire ou Format invalide !!";
                experience_isValid = false;
            }

            if (format_poste.test(experience.querySelector("#poste").value.trim())) {
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

            if (experience.querySelector("#date-fin").value && experience.querySelector("#date-debut").value
                && experience.querySelector("#date-debut").value >= experience.querySelector("#date-fin").value) {
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

    // alert("validation correct avant insertion")
    ajouter_employe();
    // alert("vieder les champs !!")
    vider_champs();
    // alert("avant refresh")
    //location.reload();

    afficher_employes_non_assignes();
}

btn_ajouter_experience.addEventListener('click', () => {
    injecter_experience();
    experience_ajouter = true;
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
    vider_champs();
})

btn_enregistrer.addEventListener('click', () => {
    verification_presence_format();
    afficher_employes_non_assignes();
})

btn_staff.addEventListener('click', () => {
    restriction_zone(1, "container-staff");
});

btn_reception.addEventListener('click', () => {
    restriction_zone(2, "container-reception");
});

btn_security.addEventListener('click', () => {
    restriction_zone(3, "container-security");
});

btn_conference.addEventListener('click', () => {

});

btn_archives.addEventListener('click', () => {

});

btn_server.addEventListener('click', () => {

});