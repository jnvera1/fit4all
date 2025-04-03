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

const pockets = root.addOption("Bolsillos");
pockets.addOption("internos", 4);

const completeImages = [
  "img/bomber/original-frente.jpg",
  "img/bomber/original-espalda.jpg"
];

const updatedImages = [
  "img/bomber/cierre-frontal-velcro-frente.png",
  "img/bomber/cierre-frontal-velcro-espalda.jpg"
];

const sizeTable = [
  "6-7 AÑOS (120 CM)",
  "8-9 AÑOS (130 CM)",
  "9-10 AÑOS (140 CM)",
  "11-12 AÑOS (152 CM)",
  "13-14 AÑOS (164 CM)",
  "MEDIDAS DEL PRODUCTO"
];

function openSpecificModal() {
  openModal(completeImages, updatedImages, sizeTable, root, "img/bomber/checkout.png");
}
