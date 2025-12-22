var avatar = document.getElementById("avatarInput");
var fullname = document.getElementById("fNameInput");
var phone = document.getElementById("phoneInput");
var email = document.getElementById("emailInput");
var address = document.getElementById("addressInput");
var group = document.getElementById("contactGroupInput");
var avatarPreview = document.getElementById("avatarPreview");
var fav = document.getElementById("favCheck");
var eme = document.getElementById("emCheck");
var notes = document.getElementById("contactNotesInput");
var AllContacts = document.querySelector("#all-contacts");
var favListGroup = document.querySelector("#fav-list-group");
var emeListGroup = document.querySelector("#em-list-group");
var modal = document.getElementById("addContactModal");
var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
var FavList = JSON.parse(localStorage.getItem("FavList")) || [];
var EmeList = JSON.parse(localStorage.getItem("EmeList")) || [];
var AddBtn = document.getElementById("addContactBtn");
var UpdateBtn = document.getElementById("updateContactBtn");
var currentIndex;
DisplayContacts();


function getBase64(file, callback) {
  const reader = new FileReader();

  reader.onload = function () {
    callback(reader.result);
  };

  reader.readAsDataURL(file);
}

function AddContact() {
    const file = avatar.files[0];

    if (file) {
    getBase64(file, function (result) {
    var Contact = {
        avatar: result,
        fullname: fullname.value,
        phone: phone.value,
        email: email.value,
        group: group.value,
        address: address.value,
        notes: notes.value,
        fav: fav.checked,
        eme: eme.checked,
    };

    contacts.push(Contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    DisplayContacts();

    var modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) modalInstance.hide();
        ClearForm();
    });
    } else {
    var Contact = {
        avatar: "",
        fullname: fullname.value,
        phone: phone.value,
        email: email.value,
        group: group.value,
        address: address.value,
        notes: notes.value,
        fav: fav.checked,
        eme: eme.checked,
    };

    contacts.push(Contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    DisplayContacts();

    var modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) modalInstance.hide();

    ClearForm();
    }
}


function Icon(fullName) {
    var names = fullName.split(" ");
    var first_letter = names[0][0] + (names[1] ? names[1][0] : "");
    return first_letter.toUpperCase();
}

function DisplayAvatar() {
    if (avatar.files[0]) {
        getBase64(avatar.files[0], function(result) {
            avatarPreview.innerHTML = `<img src="${result}" class="w-100 h-100 object-fit-cover rounded-circle" alt="Avatar Preview">`;
        });
    }
}
function DisplayContacts() {
    var contact = "";
    var favContact = "";
    var emeContact = "";
    var emptycontact = `
    <div class="empty-state w-100 d-flex align-items-center justify-content-center">
            <div>
                <div class="icon d-flex align-items-center justify-content-center mx-auto mb-4">
                    <i class="fa fa-address-book"></i>
                </div>
                <p class="m-0 fw-medium text-center">No contacts found</p>
                <p class="mt-1 text-center">Click "Add Contact" to get started</p>
            </div>
        </div>`;
    var favEmpty = ` 
    <div
                                class="empty col-12 col-sm-6 col-xl-12 d-flex align-items-center justify-content-center">
                                <p>No favorites yet</p>
                    </div>`;
    var emeEmpty = ` 
    <div
                                class="empty col-12 col-sm-6 col-xl-12 d-flex align-items-center justify-content-center">
                                <p>No emergency contacts</p>
                            </div>`;
    var FavCount = 0;
    var EmeCount = 0;

    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].fav) {
            FavCount++;
            favContact += `
        <div class="col-12 col-sm-6 col-xl-12 mb-2">
                                <li
                                    class="list-group-item border-0 d-flex align-items-center justify-content-between gap-3 ">
                                    <div
                                        class="icon d-flex align-items-center justify-content-center text-white fw-semibold flex-shrink-0">
                                        ${contacts[i].avatar
                    ? `<img class="icon object-fit-cover" src="${contacts[i].avatar}" alt="">`
                    : Icon(contacts[i].fullname)
                }
                                    </div>
                                    <div class="flex-shrink-1 w-100">
                                        <h4 class="m-0 text-truncate fw-medium">${contacts[i].fullname}</h4>
                                        <p class="m-0 text-truncate">${contacts[i].phone}</p>
                                    </div>
                                    <a href="tel:${contacts[i].phone}" title="Call"
                                        class="f-contact-phone flex-shrink-0 d-flex align-items-center justify-content-center">
                                        <i class="fa fa-phone"></i>
                                    </a>
                                </li>
        </div>`;
        }
        if (contacts[i].eme) {
            EmeCount++;
            emeContact += `<div class="col-12 col-sm-6 col-xl-12 mb-2">
                                <li
                                    class="list-group-item border-0 d-flex align-items-center justify-content-between gap-3 ">
                                    <div
                                        class="icon d-flex align-items-center justify-content-center text-white fw-semibold flex-shrink-0">
                                        ${contacts[i].avatar
                    ? `<img class="icon object-fit-cover" src="${contacts[i].avatar}" alt="">`
                    : Icon(contacts[i].fullname)
                }
                                    </div>
                                    <div class="flex-shrink-1 w-100">
                                        <h4 class="m-0 text-truncate fw-medium">${contacts[i].fullname}</h4>
                                        <p class="m-0 text-truncate">${contacts[i].phone}</p>
                                    </div>
                                    <a href="tel:${contacts[i].phone}" title="Call"
                                        class="f-contact-phone flex-shrink-0 d-flex align-items-center justify-content-center">
                                        <i class="fa fa-phone"></i>
                                    </a>
                                </li>
        </div>`;
        }

        contact += `   <div class="col">
                                <div class="inner">
                                    <div class="card mb-3 bg-white d-flex flex-column">
                                        <div class="card-body d-flex flex-column gap-2">
                                            <div class="d-flex align-items-center gap-3">
                                                <div class="position-relative flex-shrink-0">
                                                    <div
                                                        class="section-icon d-flex align-items-center justify-content-center text-white fw-semibold">
                                                        ${contacts[i].avatar
                ? `<img class="section-icon object-fit-cover" src="${contacts[i].avatar}" alt="">`
                : Icon(contacts[i].fullname)
            }</div>
                                                    <div
                                                        class="em-icon position-absolute rounded-circle d-flex align-items-center justify-content-center ${contacts[i].eme? "": "d-none"
            }">
                                                        <i class="fa-solid fa-heart-pulse text-white"></i>
                                                    </div>

                                                    <div
                                                        class="fav-icon position-absolute rounded-circle d-flex align-items-center justify-content-center ${contacts[i].fav? "": "d-none"}">
                                                        <i class="fa-solid fa-star text-white"></i>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 class="fw-semibold text-gray-900 text-base  m-0">
                                                        ${contacts[i].fullname}</h3>
                                                    <div class="contact-phone d-flex align-items-center gap-2 mt-1">
                                                        <div
                                                            class="icon bg-blue-100 d-flex align-items-center justify-content-center flex-shrink-0">
                                                            <i class="fa fa-phone"></i>
                                                        </div>
                                                        <span >${contacts[i].phone}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="contact-email d-flex align-items-center gap-2 mt-1">
                                                <div
                                                    class="icon bg-blue-100 d-flex align-items-center justify-content-center flex-shrink-0">
                                                    <i class="fa fa-envelope"></i>
                                                </div>
                                                <span class="">${contacts[i].email}</span>
                                            </div>
                                            <div class="contact-address d-flex align-items-center gap-2 mt-1">
                                                <div
                                                    class="icon bg-blue-100 d-flex align-items-center justify-content-center flex-shrink-0">
                                                    <i class="fa fa-location-dot"></i>
                                                </div>
                                                <span >${contacts[i].address}</span>
                                            </div>
                                            <div class="d-flex flex-wrap gap-2 mt-2">
                                                <span
                                                    class="${contacts[i].group == ""? "d-none": " "} card-badge ${contacts[i].group}-badge d-inline-flex align-items-center fw-medium">${contacts[i].group }</span>
                                                <span
                                                    class="card-badge em-badge d-inline-flex align-items-center fw-medium ${contacts[i].emCheck? "": "d-none"}"><i
                                                        class="fa-solid fa-heart-pulse me-1"></i>emergency</span>
                                            </div>
                                        </div>
                                        <div class="card-footer d-flex align-items-center justify-content-between">
                                            <div class="f-contact d-flex align-items-center gap-1">
                                                <a href="tel:${contacts[i].phone}" title="Call"
                                                    class="f-contact-phone d-flex align-items-center justify-content-center">
                                                    <i class="fa fa-phone"></i>
                                                </a>
                                                <a href="mailto:${contacts[i].email
            }" title="Email"
                                                    class="f-contact-email d-flex align-items-center justify-content-center">
                                                    <i class="fa fa-envelope"></i>
                                                </a>
                                            </div>
                                            <div class="f-control d-flex align-items-center gap-1">
                                                <div onclick="favtogle(${i})"
                                                    class="${contacts[i].fav
                ? "f-control-fav-clk"
                : "f-control-fav"
            } d-flex align-items-center justify-content-center">
                                                    <i class="fa${contacts[i].fav
                ? ""
                : "-regular"
            } fa-star"></i>
                                                </div>
                                                <div onclick="emetogle(${i})"
                                                    class="${contacts[i].eme
                ? "f-control-em-clk"
                : "f-control-em"
            } d-flex align-items-center justify-content-center">
                                                    <i
                                                        class="fa${contacts[i].eme
                ? ""
                : "-regular"
            } fa-heart${contacts[i].eme ? "-pulse" : ""
            }"></i>
                                                </div>
                                                <div class="f-control-update d-flex align-items-center justify-content-center"
                                                    data-bs-toggle="modal" data-bs-target="#addContactModal"
                                                    onclick="GetData(${i})">

                                                    <i class="fa fa-pen"></i>
                                                </div>
                                                <div class="f-control-del d-flex align-items-center justify-content-center"
                                                    onclick="deleteContact(${i})">
                                                    <i class="fa fa-trash"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>`;

        
    }

    AllContacts.innerHTML = contact == "" ? emptycontact : contact;
    favListGroup.innerHTML = favContact == "" ? favEmpty : favContact;
    emeListGroup.innerHTML = emeContact == "" ? emeEmpty : emeContact;
    document.getElementById("total").innerHTML = contacts.length;
    document.getElementById("totall").innerHTML = contacts.length;
    document.getElementById("fav").innerHTML = FavCount;
    document.getElementById("eme").innerHTML = EmeCount;
}


function deleteContact(i) {
    contacts.splice(i, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    DisplayContacts();

}


function GetData(i){

    currentIndex = i;
    avatarPreview.innerHTML = contacts[i].avatar 
        ? `<img src="${contacts[i].avatar}" class="w-100 h-100 object-fit-cover rounded-circle" alt="Avatar Preview">`
        : Icon(contacts[i].fullname);
    fullname.value = contacts[i].fullname;
    phone.value = contacts[i].phone;
    email.value = contacts[i].email;
    address.value = contacts[i].address;
    group.value = contacts[i].group;
    notes.value = contacts[i].notes;
    fav.checked = contacts[i].fav;
    eme.checked = contacts[i].eme;
    AddBtn.classList.add("d-none");
    UpdateBtn.classList.remove("d-none");
    
}

function UpdateContact(){
    contacts[currentIndex].avatar = avatarPreview.querySelector("img").src
    contacts[currentIndex].fullname = fullname.value;
    contacts[currentIndex].phone = phone.value;
    contacts[currentIndex].email = email.value;
    contacts[currentIndex].address = address.value;
    contacts[currentIndex].group = group.value;
    contacts[currentIndex].notes = notes.value;
    contacts[currentIndex].fav = fav.checked;
    contacts[currentIndex].eme = eme.checked;
    localStorage.setItem("contacts", JSON.stringify(contacts));
    DisplayContacts();
    var modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) {modalInstance.hide();}
    ClearForm();
    AddBtn.classList.remove("d-none");
    UpdateBtn.classList.add("d-none");
}




function favtogle(i) {
    contacts[i].fav = !contacts[i].fav;
    localStorage.setItem("contacts", JSON.stringify(contacts));
    DisplayContacts();
}
function emetogle(i) {
    contacts[i].eme = !contacts[i].eme;
    localStorage.setItem("contacts", JSON.stringify(contacts));
    DisplayContacts();
}

function ClearForm() {
    avatar.value = "";
    fullname.value = "";
    phone.value = "";
    email.value = "";
    address.value = "";
    group.value = "";
    notes.value = "";
    fav.checked = false;
    eme.checked = false;
    avatarPreview.innerHTML = `<i class="fa-solid fa-user"></i>`;
}

