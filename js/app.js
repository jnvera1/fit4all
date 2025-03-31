function openModal(completeImages, updatedImages, sizeTable, optionsTree, checkoutPage) {
  fetch('modal.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('modal-placeholder').innerHTML = data;
      document.getElementById('modal').style.display = 'flex';
      document.getElementById('modal-overlay').style.display = 'block';
      document.getElementById('modal-overlay').addEventListener('click', closeModal);

      let currentImageIndex = 0;
      let carouselImages = completeImages;
      const nextBtn = document.getElementById("next-btn");
      const backBtn = document.getElementById("back-btn");
      const carousel = document.getElementById("carousel");

      // Create and set the initial image
      const carouselImage = document.createElement('img');
      carouselImage.id = 'carousel-image';
      carouselImage.alt = 'preview';
      carouselImage.src = carouselImages[currentImageIndex];
      carousel.appendChild(carouselImage);

      function updateButtons() {
        backBtn.style.display = currentImageIndex > 0 ? 'block' : 'none';
        nextBtn.style.display = currentImageIndex < carouselImages.length - 1 ? 'block' : 'none';
      }

      nextBtn.addEventListener("click", () => {
        if (currentImageIndex < carouselImages.length - 1) {
          currentImageIndex++;
          carouselImage.src = carouselImages[currentImageIndex];
          updateButtons();
        }
      });

      updateButtons();

      backBtn.addEventListener("click", () => {
        if (currentImageIndex > 0) {
          currentImageIndex--;
          carouselImage.src = carouselImages[currentImageIndex];
          updateButtons();
        }
      });

      new OptionSelector(optionsTree);

      document.getElementById('apply-btn').addEventListener('click', () => {
        // Show loading state
        const modal = document.getElementById('modal');
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-content">
            <div class="spinner"></div>
                <p>Estamos creando tu prenda...</p>
            </div>
        `;
        modal.appendChild(loadingOverlay);

        document.getElementById('apply-btn').disabled = true;

        const totalPrice = document.querySelector('.summary-total .total-price').textContent;

        // Simulate AI processing time (2 seconds)
        setTimeout(() => {
          carouselImages = updatedImages;
          carouselImage.src = carouselImages[0];

          const priceElement = document.getElementById('price-element');
          priceElement.textContent = 'Coste adicional por prenda editada +' + totalPrice;

          loadingOverlay.remove();
          document.getElementById('apply-btn').disabled = false;
          document.getElementById('add-btn').disabled = false;
        }, 2000);
      });

      document.getElementById('add-btn').addEventListener('click', function (e) {
        e.stopPropagation();

        // Create size selector overlay
        const sizeSelector = document.createElement('div');
        sizeSelector.className = 'size-selector-overlay';

        // Position it above the button
        const btnRect = this.getBoundingClientRect();
        sizeSelector.style.width = `${btnRect.width}px`;
        sizeSelector.style.bottom = `${window.innerHeight - btnRect.top + 10}px`;
        sizeSelector.style.left = `${btnRect.left}px`;

        // Add size options
        let sizeOptions = '';
        for (let i = 0; i < sizeTable.length; i++) {
          sizeOptions += '<div class="size-option">' + sizeTable[i] + '</div>';
        }

        sizeSelector.innerHTML = sizeOptions;

        document.body.appendChild(sizeSelector);

        sizeSelector.querySelectorAll('.size-option').forEach(option => {
          option.addEventListener('click', function () {
            // Close modal and size selector
            const modal = document.getElementById('modal');
            modal.style.animation = 'fadeOut 0.5s forwards';
            sizeSelector.remove();

            // Create image container
            const productImage = document.createElement('div');
            productImage.className = 'product-image-container';

            // Create image element
            const img = document.createElement('img');
            img.src = checkoutPage;
            img.className = 'product-image';

            productImage.appendChild(img);
            document.body.appendChild(productImage);

            // Calculate positioning
            const imgAspectRatio = 7 / 8;
            const windowHeight = window.innerHeight;
            const imageWidth = windowHeight * imgAspectRatio;

            // Set initial position (off-screen right)
            productImage.style.right = `-${imageWidth}px`;
            productImage.style.width = `${imageWidth}px`;

            // Force reflow before animation
            void productImage.offsetWidth;

            // Start slide-in animation
            productImage.style.right = '0';

            // Close when clicking the image
            productImage.addEventListener('click', function () {
              productImage.style.right = `-${imageWidth}px`;
              setTimeout(() => {
                productImage.remove();
              }, 500);
            });

            // Remove modal after animation
            setTimeout(() => {
              modal.style.display = 'none';
            }, 500);
          });
        });
        // Close selector when clicking outside
        document.addEventListener('click', function closeSelector(e) {
          if (!sizeSelector.contains(e.target) && e.target.id !== 'add-btn') {
            sizeSelector.remove();
            document.removeEventListener('click', closeSelector);
          }
        });
      });
    });
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('modal-overlay').style.display = 'none';
}
