//Javascript file voor de API logica.
const weerApi =
  "https://api.open-meteo.com/v1/forecast?latitude=52.08&longitude=4.31&current=temperature_2m,wind_speed_10m&timezone=auto";

const weerStatus = document.getElementById("weer-status");
const weerInhoud = document.getElementById("weer-inhoud");
const weerLocatie = "Den Haag";

const laadWeer = async () => {
  const response = await fetch(weerApi);

  if (!response.ok) {
    throw new Error("Weer kan niet worden opgehaald op het moment.");
  }

  return await response.json();
};

const toonWeer = (data) => {
  const locatieWeer = document.createElement("p");
  locatieWeer.textContent = `Locatie: ${weerLocatie} (${data.latitude.toFixed(2)}, ${data.longitude.toFixed(2)})`;

  const tempWeer = document.createElement("p");
  tempWeer.textContent = `Temperatuur: ${data.current.temperature_2m} ${data.current_units.temperature_2m}`;

  const windWeer = document.createElement("p");
  windWeer.textContent = `Wind: ${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`;

  weerInhoud.appendChild(locatieWeer);
  weerInhoud.appendChild(tempWeer);
  weerInhoud.appendChild(windWeer);

  const tijdStempel = data.current.time.split("T")[1];
  weerStatus.textContent = `Bijgewerkt om ${tijdStempel}`;
};

const toonWeerFout = () => {
  weerStatus.textContent =
    "Het weer kon niet geladen worden. Probeer het later opnieuw.";
  weerStatus.classList.add("weer-fout");
};

const startWeer = async () => {
  try {
    const data = await laadWeer();
    toonWeer(data);
  } catch (error) {
    console.error(error);
    toonWeerFout();
  }
};
startWeer();
