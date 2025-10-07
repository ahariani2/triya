/** const dataUrl = 'https://gist.githubusercontent.com/ahariani2/42185f9c9fb55596e7c605a0ddb62c63/raw/547c09b4e7746448ad12f15feb94875e4691a275/listings.json';

// Fetch the data from the source
fetch(dataUrl)
  .then(response => response.json())
  .then(listingsData => {
    initializeApp(listingsData);
  })
  .catch(error => {
    console.error('Something went wrong!', error);
  });

  */


// Paste the Web app URL you copied from Google Apps Script
const dataUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhmrAUoqN5WtzIQs__HJal-zuFhX5xIfOjhzheJCbFcLeDSEYbfWk0jo2DTG-IhCPCKsO4yGvxVh1v9Qg8KhKDOHgVfzSDTqesOpjHfzGX7PHjRdbPciuuRnc12WTYELK8rYzDp1e5_RD0gRVSigaWLxjU2gsFB7SzzEh0v2EAw0o9awXgl7Jm1nTS5ZjI6ia7k4_Ll48UodE18G_DQgegHqOK1fmBYtMu_4TeF9Bh6e1LOdF0yDbOuuFMu2VOUDWUsZGj4CEky7vsdhSlYKxeHvDx9oA&lib=MBT0RtRqQxoyFZd0nPZUuS_mAJA9d-Djn';

// Fetch the data from the source
fetch(dataUrl)
  .then(response => response.json())
  .then(listingsData => {
    initializeApp(listingsData);
  })
  .catch(error => {
    console.error('Something went wrong fetching from Google Sheets!', error);
  });



// Fetch the data from the source
fetch(dataUrl)
  .then(response => response.json())
  .then(listingsData => {
    initializeApp(listingsData);
  })
  .catch(error => {
    console.error('Something went wrong fetching from Google Sheets!', error);
  });


function initializeApp(listingsData) {


listingsData.forEach(listing => {
  if (listing.title && listing.title.includes('|')) {
    listing.shortenedTitle = listing.title.split('|')[0].trim();
  } else {
    listing.shortenedTitle = listing.title;
  }
          
      //    listing.rankingOrder = listing.l52Sales ? parseInt(listing.l52Sales.replace('$', '').replace(/,/g, '')) : 0
                listing.rankingOrder = listing.l52Sales;

});
        
        /** Constants **/
        const itemListName = 'Physical Product Listings';
        const itemListId = 'listings';
        
        /** Lightbox Item **/
        
        
const lightbox = document.getElementById('product-lightbox');
const lightboxDetailsContainer = document.getElementById('lightbox-details-container');
const closeButton = document.querySelector('.close-button');


function openLightbox(listing) {
  // Populate the lightbox with product details
  lightboxDetailsContainer.innerHTML = `
    <div class="lightbox-image-container">
      <img src="${listing.imageUrl}" alt="${listing.title}">
    </div>
    <div class="lightbox-text-container">
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

      
  /** Filter Bar **/
        
        const filterBar = document.getElementById('filter-bar');

// Function to get unique tags from listingsData
function getUniqueTags() {
  const tags = ['All']; // Always include 'All'
  listingsData.forEach(listing => {
    listing.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });
  return tags;
}

        const uniqueTags = getUniqueTags();


// Generate the filter chips dynamically
uniqueTags.forEach(tag => {
  const chip = document.createElement('div');
  chip.classList.add('filter-chip');
  chip.dataset.filter = tag;
  chip.textContent = tag;

  if (tag === 'All') {
    chip.classList.add('active'); // Initially select 'All'
  }

  chip.addEventListener('click', () => {
 //   gtag('event', 'filter_click', { // Track filter click
   //   'filter_tag': tag
 //   });
    
    filterChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    filterListings(tag);
  });

  filterBar.appendChild(chip);
});

        const filterChips = filterBar.querySelectorAll('.filter-chip');
        
         // Function to display listings based on the selected tag
        function filterListings(tag) {
          const listings = document.querySelectorAll('#listings-list li');
          listings.forEach(listing => {
            listing.style.display = 'none';
          });

          listingsData.forEach((listing, index) => {
            if (listing.tags.includes(tag) || tag === 'All') {
              listings[index].style.display = 'flex';
            }
          });
          
            // Update active chip
  filterChips.forEach(chip => {
    chip.classList.remove('active');
    if (chip.dataset.filter === tag) {
      chip.classList.add('active');
    }
  });
        }
        
        
        
        
        
     
        
        /** Listings **/
        const listingsContainer = document.getElementById('listings-list');

        function renderListings() {
            listingsContainer.innerHTML = ''; // Clear existing list [cite: 286, 287]

        listingsData.forEach(listing => {
  const listItem = document.createElement('li');

  const photo = document.createElement('img');
  photo.src = listing.imageUrl;
  listItem.appendChild(photo);

  if (listing.badge) { // Check if listing.badge has a value
    const badge = document.createElement('div');
    badge.textContent = listing.badge; // Use the badge string as text
    badge.classList.add('best-seller-badge');
    listItem.appendChild(badge);
  }

  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add('details-container');

  const title = document.createElement('h3');
  title.textContent = listing.shortenedTitle;
  detailsContainer.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.textContent = listing.subtitle;
  detailsContainer.appendChild(subtitle);

  listItem.appendChild(detailsContainer);

 const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons-container');

  const viewStoresRow = document.createElement('div'); // New container for label and buttons
  viewStoresRow.classList.add('view-stores-row');
  buttonsContainer.appendChild(viewStoresRow);

  const viewOnLabel = document.createElement('div');
  viewOnLabel.textContent = 'View on:';
  viewOnLabel.classList.add('view-on-label');
  viewStoresRow.appendChild(viewOnLabel);

  const storesContainer = document.createElement('div');
  storesContainer.classList.add('stores-container');
  viewStoresRow.appendChild(storesContainer);

  // Refined button creation
const createStoreButton = (href, logoSrc, altText, className) => {
    const button = document.createElement('a');
    button.href = href;
    button.classList.add('store-button', className);
    button.target = '_blank';
  
/**   button.onclick = () => { // Track click
 gtag('event', 'product_click', {
 'item_id': listing.listingId,
 'item_name': listing.title,
 'item_category': listing.tags.join(', '),
 'item_list_name': itemListName,
 'item_list_id': itemListId,
 'destination_url': href, // URL clicked
 'store': altText // E.g., 'Etsy', 'Amazon'
 });
 }; */

    const logo = document.createElement('img');
    logo.src = logoSrc;
    logo.alt = altText; // Accessibility
    button.appendChild(logo);

    const text = document.createElement('span');
    text.textContent = altText;
    text.classList.add('button-text'); // For visually hidden text
    button.appendChild(text);

    storesContainer.appendChild(button);
  };

  if (listing.etsyLink) {
    createStoreButton(listing.etsyLink, 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgMnHEM_czqumrqkrOc3rHteFx2lJxC7PF1NtA2Sj7wWa5p9KvCDwhJ_MdNl1Bcq8pTpJ2Wzk5Uu5wTSFyCs5vRD8z6ZuGQxYAinK6sROfV658qpkOMuaEqXQB6JOy8YLLyQr15qqb1F8PP3ftsNSv1Xjjx0PtZ8q2JRBwzDMTLnX1YuwP-YmapvS0dVfDb/s1600/Etsy%20Logo.png', 'Etsy', 'etsy-button');
  }

  if (listing.amazonLink) {
    createStoreButton(listing.amazonLink, 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjlIR0SAB3jtUQywGjoPyNdYu8QXjHGoshQ1_DzGfA3AWGsjAgH3LZsUQ6kFsHAyuuMjD6Ua5DyW9l6l-L_bNYOR9NwzpXUhi6uU1d5ZsRC3iYv9Jn9gtLVogDADnTJaWD7USRO52Q0ZtSaMg1Z7JQJWXmn9WR-D0zYeOIKPk94kjJU5GDY9tzSg64Lj_y2/s1600/Amazon%20Logo.png', 'Amazon', 'amazon-button');
  }

  if (listing.michaelsLink) {
    createStoreButton(listing.michaelsLink, 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg__AD_hRG5KhCOV8Ii_iRDwW0vh9LH-a28a2NP1k9PVNmnF94deuclF0tsOd4BYXT1wqJR_EDh9jlmtuxFU7Z_WpkW9F93gFpzDflGu3Q0fnR4haT14P38WDMZHr6Y-Pfx0t3mkva-y6hZLvBOQGq5xX9TBkEpQhqYMQHoMtH1op1Rg11YdISVHRJQxBFY/s1600/Michaels%20Logo.png', 'Michaels', 'michaels-button');
  }

  listItem.appendChild(buttonsContainer);
          
          
           // Track impression
/** gtag('event', 'product_impression', { 
 'item_id': listing.listingId,
 'item_name': listing.title,
 'item_category': listing.tags.join(', '), // Join tags into a string
 'item_list_name': itemListName,
 'item_list_id': itemListId,
 }); */
          
          // On Click
          
             
           listItem.addEventListener('click', () => {
    openLightbox(listing);
  });
          
          
 listingsContainer.appendChild(listItem);
 setTimeout(() => {
 listItem.classList.add('fade-in');
 }, 10); // Add class with a slight delay
 });
 }
     /* Query param */
        
        function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
   
      
        
       const sortBySelect = document.getElementById('sort-by');
        let currentSort = 'default'; // Track current sort order

        // Function to sort listings
function sortListings() {
  currentSort = sortBySelect.value;
  sortListingsData(); // Sort the data first
   renderListings(); // Re-render the list
 filterListings(document.querySelector('.filter-chip.active').dataset.filter); // Re-filter to apply the sort
}

function sortListingsData() {
  if (currentSort === 'az') {
    listingsData.sort((a, b) => a.title.localeCompare(b.title));
  } else if (currentSort === 'popular') {
    listingsData.sort((a, b) => {      
      return b.rankingOrder - a.rankingOrder;
    });
  } else {
    // For 'default' or any other case, you might want to keep the original order or sort by a different criteria (e.g., popularity)
    // For now, let's assume original order is "most popular" and do nothing
  }
}

// Initial display and sort
sortListings();

// Add event listener for sort select change
sortBySelect.addEventListener('change', sortListings);
        
          
// Initial filter on page load
const initialFilter = getQueryParam('filter');
if (initialFilter) {
  filterListings(initialFilter);
} 

}
     
