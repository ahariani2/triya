/** Lightbox Item **/
const lightbox = document.getElementById('product-lightbox');
const lightboxDetailsContainer = document.getElementById('lightbox-details-container');
const closeButton = document.querySelector('.close-button');

function openLightbox(listing) {
    // Populate the lightbox with product details using the new structure
    lightboxDetailsContainer.innerHTML = `
    <div class="lightbox-image-container">
      <img src="${listing.imageUrl}" alt="${listing.shortenedTitle || listing.title}">
    </div>
    <div class="lightbox-text-content">
      <h3>${listing.title}</h3>
      <p>${listing.subtitle}</p>
      <div class="lightbox-buttons">
        ${listing.etsyLink ? `<a href="${listing.etsyLink}" target="_blank" class="lightbox-button etsy-button">View on Etsy</a>` : ''}
        ${listing.amazonLink ? `<a href="${listing.amazonLink}" target="_blank" class="lightbox-button amazon-button">View on Amazon</a>` : ''}
        ${listing.michaelsLink ? `<a href="${listing.michaelsLink}" target="_blank" class="lightbox-button michaels-button">View on Michaels</a>` : ''}
      </div>
    </div>
  `;
    lightbox.style.display = 'block'; // Show the lightbox
}

closeButton.addEventListener('click', () => {
    lightbox.style.display = 'none'; // Hide the lightbox
});

// Close the lightbox if the user clicks outside of it
window.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        lightbox.style.display = 'none';
    }
});
