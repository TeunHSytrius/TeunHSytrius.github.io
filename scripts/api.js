//Javascript file voor de API logica.
const weerApi =
  "https://api.open-meteo.com/v1/forecast?latitude=52.08&longitude=4.31&current=temperature_2m,wind_speed_10m&timezone=auto";

const weerStatus = document.getElementById("weer-status");
const weerInhoud = document.getElementById("weer-inhoud");

const laadWeer = async () => {
  const response = await fetch(weerApi);

  if (!response.ok) {
    throw new Error("Weer kan niet worden opgehaald op het moment.");
  }

  return await response.json();
};
