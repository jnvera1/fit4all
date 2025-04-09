const root = new OptionNode("root");

const sleeves = root.addOption("piernas");
const left = sleeves.addOption("izquierda", 3);
const right = sleeves.addOption("derecha", 3);
const both = sleeves.addOption("ambas", 4);
[left, right, both].forEach(length => {
  let short = length.addOption("corto");
  short.addOption("abierto");
  short.addOption("cremallera", 4);
  short.addOption("velcro", 3);
  short.addOption("magnético", 5);
  short.addOption("costura", 2);
  let half = length.addOption("medio");
  short.addOption("abierto");
  half.addOption("cremallera", 4);
  half.addOption("velcro", 3);
  half.addOption("magnético", 5);
  half.addOption("costura", 2);
  const full = length.addOption("total");
  short.addOption("abierto");
  full.addOption("cremallera", 4);
  full.addOption("velcro", 3);
  full.addOption("magnético", 5);
  full.addOption("costura", 2);
});

const hem = root.addOption("bajo");
hem.addOption("elastico", 2);

const closure = root.addOption("cierre");
const front = closure.addOption("frontal");
front.addOption("cordon", 5);
front.addOption("velcro", 3);
front.addOption("magnético", 8);

const completeImages = [
  "img/pantalon/original-frente.jpg",
  "img/pantalon/original-dorso.jpg"
];

const updatedImages = [
  "img/pantalon/piernas-derecha-corto-abierto-cierre-frontal-cordon-frente.png",
  "img/pantalon/piernas-derecha-corto-abierto-cierre-frontal-cordon-dorso.png"
];

const sizeTable = [
  "36","38","40","42","44","46","48","RECOMENDADOR DE TALLA","MEDIDAS DEL PRODUCTO"
];

function openSpecificModal() {
  openModal(completeImages, updatedImages, sizeTable, root, "img/pantalon/checkout.png");
}
