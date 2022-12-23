import Visit from "./modul/Visit.js";
import VisitDentist from "./modul/VisitDentist.js";
import VisitCardiologist from "./modul/VisitCardiologist.js";
import VisitTherapist from "./modul/VisitTherapist.js";
import fetchPost from "./async methods/POST.js";
import fetchGetCards from "./async methods/fetchGetCards.js";
import fetchGetCard from "./async methods/fetchGetCard.js";
import fetchDelete from "./async methods/DELETE.js";
import fetchPut from "./async methods/PUT.js";


// LOGIN FORM      email: 'notmy@email.com', password: '123456'

const loginBtn = document.querySelector(`[data-bs-target="#loginModal"]`);
const visitBtn = document.querySelector(`[data-bs-target="#visitModal"]`);
const loginModal = document.querySelector("#loginModal");
const loginModalObj = new bootstrap.Modal(
  document.getElementById("loginModal"),
  { keyboard: false }
);
const loginForm = document.querySelector("#login-form");
const submitLoginForm = document.querySelector(".login-submit");

loginModal.addEventListener("hidden.bs.modal", (ev) => {
  loginForm.email.value = null;
  loginForm.pass.value = null;
});

const getToken = async (email, password) => {
  const response = await fetch(
    "https://ajax.test-danit.com/api/v2/cards/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }
  );
  if (response.status === 200) {
    const result = await response.text();
    localStorage.setItem("token", result);
    loginForm.email.value = null;
    loginForm.pass.value = null;
    loginBtn.style.display = "none";
    visitBtn.style.display = "block";
    alert("Great success");
    loginModalObj.hide();
  } else {
    alert(`Email or password incorrect`);
  }
};

submitLoginForm.addEventListener("click", () => {
  const email = loginForm.email.value;
  const password = loginForm.pass.value;
  getToken(email, password);
});

// LOGIN FORM

// Window ONLOAD
const cardList = document.querySelector(".cardList");
const noCards = document.querySelector('#no-cards');
let token = localStorage.getItem("token");

const creatCard = async (obj) => {
  let card = null;
  if (obj.doctor === "dentist") {
    card = new VisitDentist(obj);
  } else if (obj.doctor === "therapist") {
    card = new VisitTherapist(obj);
  } else if (obj.doctor === "cardiologist") {
    card = new VisitCardiologist(obj);
  }
  if (card !== null) {
    cardList.insertAdjacentElement("afterbegin", card.creatNode());
  }
};

const recoverySession = async () => {
  let cards = Array.prototype.slice.call(await fetchGetCards(token));
  if (cards.length !== 0) {
    noCards.classList.add('d-none')
    cards.forEach((el) => {
      creatCard(el);
    });
  } else {
    noCards.classList.remove('d-none')
  }
};

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("token") !== null) {
    loginBtn.style.display = "none";
    visitBtn.style.display = "block";
    recoverySession();
  }
});

// Window ONLOAD

// VISIT FORM

const visitModal = document.querySelector("#visitModal");
const visitModalObj = new bootstrap.Modal(
  document.getElementById("visitModal"),
  {
    keyboard: false,
  }
);
const visitForm = document.querySelector("#form-visit");
const filterForm = document.querySelector("#form-filter");
const doctorType = document.querySelector("#visitDoctor");
const editButton = document.querySelector("#visit-edit");
const submitButton = document.querySelector("#visit-submit");

visitForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  event.stopPropagation();
  console.log(visitForm.checkValidity());
  visitForm.classList.add("was-validated");
  if (visitForm.checkValidity()) {
    const formData = new FormData(visitForm);
    let newCard = {};
    for (const key of formData.entries()) {
      if (key[1] !== "") {
        newCard[key[0]] = key[1];
      }
    }
    creatCard(await fetchPost(newCard, token), newCard.doctor);
    visitModalObj.hide();
  }
  if (cardList.children.length !== 0) {
    noCards.classList.add('d-none')
  }
});

visitModal.addEventListener("hidden.bs.modal", () => {
  const visit = new Visit();
  visit.hideInputs();
  visitForm.reset();
  if (visitForm.classList.contains("was-validated")) {
    visitForm.classList.remove("was-validated");
  }
  if (!editButton.classList.contains("d-none")) {
    editButton.classList.add("d-none");
    submitButton.classList.remove("d-none");
  }
});

editButton.addEventListener("click", async () => {
  event.preventDefault();
  event.stopPropagation();

  console.log(visitForm.checkValidity());
  visitForm.classList.add("was-validated");
  if (visitForm.checkValidity()) {
    const formData = new FormData(visitForm);
    let newCard = {};
    for (const key of formData.entries()) {
      if (key[1] !== "") {
        newCard[key[0]] = key[1];
      }
    }
    let formId = visitForm.getAttribute("data-id");
    document.querySelector(`[data-card="${formId}"]`).parentElement.remove();
    newCard.id = formId;
    console.log(newCard);

    creatCard(await fetchPut(newCard, token), newCard.doctor);

    visitModalObj.hide();
  }
});

const changeDoctor = (ev) => {
  const visit = new Visit();
  visit.hideInputs();
  visit.showInputs(ev.target.value);
};

doctorType.addEventListener("change", changeDoctor);

cardList.addEventListener("click", (ev) => {
  if (ev.target.className != "btn-close btn-remove") return;
  let id = ev.target.closest(".card").getAttribute("data-card");
  fetchDelete(id, token);
  let listItem = ev.target.closest("li");
  listItem.remove();
  if (cardList.children.length === 0) {
    noCards.classList.remove('d-none')
  }
});
const editCard = async (obj) => {
  let card = null;
  if (obj.doctor === "dentist") {
    card = new VisitDentist(obj, visitForm);
  } else if (obj.doctor === "therapist") {
    card = new VisitTherapist(obj, visitForm);
  } else if (obj.doctor === "cardiologist") {
    card = new VisitCardiologist(obj, visitForm);
  }
  if (card !== null) {
    card.fillForm();
  }
};
cardList.addEventListener("click", async (ev) => {
  if (ev.target.className != "btn btn-outline-warning btn-sm") return;
  let node = ev.target.closest(".card");
  let id = node.getAttribute("data-card");
  let cardObj = await fetchGetCard(token, id);
  editCard(cardObj);
});

// Window ONUNLOAD

window.addEventListener("beforeunload", () => {
  visitForm.reset();
  filterForm.reset();
});

// Window ONUNLOAD

// Filter FORM

const search = document.querySelector("#main-search");
const cleanValue = document.querySelector("#main-clean");
const status = document.querySelector("#main-status");
const urgency = document.querySelector("#main-urgency");

const filter = () => {
  let searchValue = search.value.toLowerCase();
  let statusValue = status.value;
  let urgencyValue = urgency.value;

  let cards = document.querySelectorAll(".cardList > li .card");
  cards.forEach((card) => {
    if (card.parentElement.classList.contains("d-none")) {
      card.parentElement.classList.remove("d-none");
    }
    let name = card.getAttribute("data-name");
    let status = card.getAttribute("data-status");
    let urgency = card.getAttribute("data-urgency");

    if (name.indexOf(searchValue) === -1) {
      card.parentElement.classList.add("d-none");
    }
    console.log(statusValue, status);

      if (statusValue !== "" && status !== statusValue
      ) {
        card.parentElement.classList.add("d-none");
      }
      if (urgencyValue !== "" && urgency !== urgencyValue
      ) {
        card.parentElement.classList.add("d-none");
      }
  });
};
search.addEventListener("input", filter);
cleanValue.addEventListener("click", () => {
  filterForm.reset();
  filter();
});
status.addEventListener("change", filter);
urgency.addEventListener("change", filter);

// Filter FORM