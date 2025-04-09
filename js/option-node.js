class OptionNode {
  constructor(name, price = 0) {
    this.name = name;
    this.price = price;
    this.child = {};
  }

  addOption(name, price = 0) {
    const newOption = new OptionNode(name, price);
    this.child[name] = newOption;
    return newOption;
  }
}
