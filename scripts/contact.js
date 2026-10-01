//Contact javascript zodat alleen javascript logica voor contact hier in zit.

//variabelen
const form = document.getElementById("index-contactForm");
const formNaam = document.getElementById("formNaam");
const formEmail = document.getElementById("formEmail");
const formBericht = document.getElementById("formBericht");
const bevestiging = document.getElementById("form-bevestiging");

const controlNaam = (naam) => {
  if (naam.trim() === "") {
    return "Vul je voornaam en achternaam in alsjeblieft.";
  }
  return "";
};

const controlEmail = (email) => {
  const emailPatroon = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.trim() === "") {
    return "Vul je e-mail in alsjeblieft.";
  }
  if (!emailPatroon.test(email.trim())) {
    return "vul een geldig e-mail in, bijvoorbeeld naam@voorbeeld.nl";
  }
  return "";
};

const controlBericht = (bericht) => {
  if (bericht.trim().length < 5) {
    return "Je bericht moet minimaal 5 tekens lang zijn.";
  }
  return "";
};

const errorMessage = (veld, melding) => {
  const errorVak = document.getElementById(veld.id + "-fout");
  errorVak.textContent = melding;

  if (melding === "") {
    veld.setAttribute("aria-invalid", "false");
  } else {
    veld.setAttribute("aria-invalid", "true");
  }
};

const controlForm = () => {
  const naamError = controlNaam(formNaam.value);
  const emailError = controlEmail(formEmail.value);
  const berichtError = controlBericht(formBericht.value);

  errorMessage(formNaam, naamError);
  errorMessage(formEmail, emailError);
  errorMessage(formBericht, berichtError);

  if (naamError !== "") {
    formNaam.focus();
  } else if (emailError !== "") {
    formEmail.focus();
  } else if (berichtError !== "") {
    formBericht.focus();
  }
};

const verstuurForm = (event) => {
  event.preventDefault();
  bevestiging.textContent = "";

  if (controlForm()) {
    bevestiging.textContent = `Bedankt ${formNaam.value.trim()}! Je bericht is verstuurd.`;
    form.reset();
  }
};

form.addEventListener("submit", verstuurForm);
