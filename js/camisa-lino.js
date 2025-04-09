const root = new OptionNode("root");

const sleeves = root.addOption("mangas");
const left = sleeves.addOption("izquierda", 3);
const right = sleeves.addOption("derecha", 3);
const both = sleeves.addOption("ambas", 4);
[left, right, both].forEach(length => {
  length.addOption("corto");
  length.addOption("medio");
  const full = length.addOption("total");
  full.addOption("cremallera", 4);
  full.addOption("velcro", 3);
  full.addOption("magnético", 5);
  full.addOption("costura", 2);
});

const closure = root.addOption("cierre");
const front = closure.addOption("frontal");
front.addOption("cremallera", 5);
front.addOption("velcro", 3);
front.addOption("magnético", 8);

const completeImages = [
  "img/camisa/original-frente.jpg",
  "img/camisa/original-espalda.jpg"
];

const updatedImages = [
  "img/camisa/mangas-izquierda-medio-frente.png",
  "img/camisa/mangas-izquierda-medio-espalda.png",
  "img/camisa/mangas-izquierda-medio-cierre-frontal-velcro-frente.png",
  "img/camisa/mangas-izquierda-medio-cierre-frontal-velcro-espalda.png",
  "img/camisa/mangas-derecha-total-costura-frente.png",
  "img/camisa/mangas-derecha-total-costura-espalda.png",
];

const sizeTable = [
  "XS","S","M","L","XL","RECOMENDADOR DE TALLA","MEDIDAS DEL PRODUCTO"
];

function openSpecificModal() {
  openModal(completeImages, updatedImages, sizeTable, root, "img/camisa/checkout.png");
}
