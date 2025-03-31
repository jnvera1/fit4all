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
  "img/camisa/camisa-completa-frente.jpg",
  "img/camisa/camisa-completa-espalda.jpg"
];

const updatedImages = [
  "img/camisa/camisa-modificada-frente.png",
  "img/camisa/camisa-modificada-espalda.png"
];

const sizeTable = [
  "XS","S","M","L","XL","RECOMENDADOR DE TALLA","MEDIDAS DEL PRODUCTO"
];

function openSpecificModal() {
  openModal(completeImages, updatedImages, sizeTable, root, "img/camisa/camisa-lino-checkout.png");
}
