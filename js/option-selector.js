class OptionSelector {
  constructor(rootNode) {
    this.root = rootNode;
    this.selections = new Map(); // Using Map for better performance
    this.currentPath = [];
    this.renderContainer();
    this.renderOptions(this.root);
  }

  renderContainer() {
    this.container = document.createElement('div');
    this.container.id = 'options-container';

    this.optionsSection = document.createElement('div');
    this.optionsSection.className = 'options-section';
    this.container.appendChild(this.optionsSection);

    this.summarySection = document.createElement('div');
    this.summarySection.className = 'summary-section';
    this.container.appendChild(this.summarySection);

    document.querySelector(".left-section").appendChild(this.container);
  }

  renderOptions(node, path = []) {
    this.optionsSection.innerHTML = '<h2>Ajustes:</h2>';

    if (path.length > 0) {
      const breadcrumbs = document.createElement('div');
      breadcrumbs.className = 'breadcrumbs';

      const rootLink = document.createElement('span');
      rootLink.textContent = 'inicio';
      rootLink.className = 'breadcrumb-link';
      rootLink.addEventListener('click', () => {
        this.currentPath = [];
        this.renderOptions(this.root);
      });
      breadcrumbs.appendChild(rootLink);

      let currentPath = [];
      path.forEach((part, i) => {
        breadcrumbs.appendChild(document.createTextNode(' > '));
        currentPath.push(part);
        const link = document.createElement('span');
        link.textContent = part;
        link.className = 'breadcrumb-link';
        if (i < path.length - 1) {
          link.addEventListener('click', () => {
            this.currentPath = currentPath.slice(0, i + 1);
            this.renderOptions(this.getNodeByPath(this.currentPath), this.currentPath);
          });
        }
        breadcrumbs.appendChild(link);
      });
      this.optionsSection.appendChild(breadcrumbs);
    }

    for (const childName in node.child) {
      const childNode = node.child[childName];
      const isLeaf = Object.keys(childNode.child).length === 0;
      const optionPath = [...path, childName];
      const pathStr = optionPath.join('/');

      const optionBox = document.createElement('div');
      optionBox.className = `option-box ${isLeaf ? '' : 'has-children'}`;

      const optionText = document.createElement('span');
      optionText.className = 'option-text';
      optionText.textContent = childName;
      optionBox.appendChild(optionText);

      if (childNode.price > 0) {
        const optionPrice = document.createElement('span');
        optionPrice.className = 'option-price';
        optionPrice.textContent = `(+${childNode.price} EUR)`;
        optionBox.appendChild(optionPrice);
      }

      if (this.selections.has(pathStr)) {
        optionBox.classList.add('selected');
      }

      optionBox.addEventListener('click', () => {
        if (isLeaf) {
          const branchPath = path.join('/');
          this.clearSelectionsInBranch(branchPath);

          this.selections.set(pathStr, {
            path: pathStr,
            price: this.calculatePrice(childNode),
            branchPath: branchPath
          });
          this.currentPath = [];
          this.renderOptions(this.root);
        } else {
          this.currentPath = optionPath;
          this.renderOptions(childNode, optionPath);
        }
        this.renderSummary();
      });

      this.optionsSection.appendChild(optionBox);
    }

    if (path.length > 0) {
      const backButton = document.createElement('div');
      backButton.className = 'back-button';
      backButton.innerHTML = 'VOLVER';

      backButton.addEventListener('click', () => {
        this.currentPath = path.slice(0, -1);
        this.renderOptions(this.getNodeByPath(this.currentPath), this.currentPath);
      });
      this.optionsSection.appendChild(backButton);
    }

    this.renderSummary();
  }

  clearSelectionsInBranch(branchPath) {
    for (const [path] of this.selections) {
      if (path.startsWith(branchPath + '/') || path === branchPath) {
        this.selections.delete(path);
      }
    }
  }

  getNodeByPath(path) {
    let node = this.root;
    for (const part of path) {
      node = node.child[part];
      if (!node) break;
    }
    return node;
  }

  calculatePrice(node) {
    let price = 0;
    while (node && node !== this.root) {
      price += node.price;
      node = this.getParentNode(node);
    }
    return price;
  }

  getParentNode(node) {
    const stack = [{node: this.root, path: []}];
    while (stack.length) {
      const {node: current} = stack.pop();
      for (const childName in current.child) {
        if (current.child[childName] === node) return current;
        stack.push({node: current.child[childName]});
      }
    }
    return null;
  }

  renderSummary() {
    this.summarySection.innerHTML = '<h2>Tu selección:</h2>';

    if (this.selections.size === 0) {
      this.summarySection.innerHTML += '<p>Ningun ajuste seleccionado</p>';
      return;
    }

    const summaryList = document.createElement('div');
    summaryList.className = 'summary-list';

    this.selections.forEach((selection, pathStr) => {
      const item = document.createElement('div');
      item.className = 'summary-item';

      const pathWithoutRoot = pathStr.split('/').join('/');

      const pathElement = document.createElement('span');
      pathElement.className = 'summary-path';
      pathElement.textContent = pathWithoutRoot;
      item.appendChild(pathElement);

      const priceElement = document.createElement('span');
      priceElement.className = 'summary-price';
      priceElement.textContent = `${selection.price} EUR`;
      item.appendChild(priceElement);

      const removeBtn = document.createElement('button');
      removeBtn.className = 'summary-remove';
      removeBtn.innerHTML = '&times;';
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selections.delete(pathStr);
        this.renderSummary();
        const pathParts = pathStr.split('/').slice(1);
        const parentPath = pathParts.slice(0, -1);
        this.renderOptions(
          this.getNodeByPath(parentPath),
          parentPath
        );
      });
      item.appendChild(removeBtn);

      summaryList.appendChild(item);
    });

    this.summarySection.appendChild(summaryList);

    const total = Array.from(this.selections.values()).reduce((sum, sel) => sum + sel.price, 0);
    const totalElement = document.createElement('div');
    totalElement.className = 'summary-total';
    totalElement.innerHTML = `
      <span class="total-label">Total:</span>
      <span class="total-price">${total} EUR</span>
    `;
    this.summarySection.appendChild(totalElement);
  }
}
