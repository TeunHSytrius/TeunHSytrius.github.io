// project.js zodat de project script voor filter en het uitladen van de JSON gescheiden is van de API & Contact

const dataString = "../data/project.json";

const projectContainer = document.getElementById("project-container");
const filterMenu = document.getElementById("tag-filter");
const sorteerMenu = document.getElementById("project-sort");
const resetKnop = document.getElementById("reset-filters");
const teller = document.getElementById("project-count");

let alleProjecten = [];

const laadProjecten = async () => {
  const response = await fetch(dataString);

  if (!response.ok) {
    throw new Error("Projectgegevens konden op het moment niet geladen worden");
  }

  return await response.json();
};

const maakElement = (soort, tekst) => {
  const element = document.createElement(soort);
  element.textContent = tekst;
  return element;
};

const maakProjectKaart = (project) => {
  const kaart = document.createElement("article");
  kaart.className = "project-item";

  kaart.append(
    maakElement("h3", project.title),
    maakElement("p", "Technologieën: " + project.tags.join(", ")),
    maakElement("p", project.description),
    maakElement("h4", "Doel"),
    maakElement("p", project.goal),
  );

  if (project.features) {
    kaart.append(
      maakElement("h4", "Features"),
      maakElement("p", project.features.join(", ")),
    );
  }

  kaart.append(
    maakElement("h4", "Wat ik leer"),
    maakElement("p", project.learned),
  );

  return kaart;
};

const toonProjecten = (projecten) => {
  projectContainer.innerHTML = "";

  projecten.forEach((project) => {
    projectContainer.appendChild(maakProjectKaart(project));
  });
};

const filterProjecten = (projecten, gekozenTag) => {
  if (gekozenTag === "alle") {
    return projecten;
  }

  return projecten.filter((project) => project.tags.includes(gekozenTag));
};

const sorteerProjecten = (projecten, keuze) => {
  if (keuze === "az") {
    projecten.sort((a, b) => a.title.localeCompare(b.title));
  } else if (keuze === "za") {
    projecten.sort((a, b) => b.title.localeCompare(a.title));
  } else {
    projecten.sort((a, b) => a.id - b.id);
  }

  return projecten;
};

const updatePagina = () => {
  const gefilterd = filterProjecten(alleProjecten, filterMenu.value);
  const gesorteerd = sorteerProjecten(gefilterd, sorteerMenu.value);

  toonProjecten(gesorteerd);
  teller.textContent = `${gesorteerd.length} van ${alleProjecten.length} projecten`;
};
const resetFilters = () => {
  filterMenu.value = "alle";
  sorteerMenu.value = "default";
  updatePagina();
};

const start = async () => {
  try {
    alleProjecten = await laadProjecten();
    updatePagina();

    filterMenu.addEventListener("change", updatePagina);
    sorteerMenu.addEventListener("change", updatePagina);
    resetKnop.addEventListener("click", resetFilters);
  } catch (error) {
    console.error(error);
    teller.textContent = "De projecten konden niet geladen worden.";
  }
};

start();
