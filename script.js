async function fetchNFTMetadata(asset_contract_address, token_id) {
  const response = await fetch(`https://api.opensea.io/api/v1/asset/${asset_contract_address}/${token_id}/`);
  const data = await response.json();
  return data;
}

async function displayNFT(asset_contract_address, token_id) {
  const nftData = await fetchNFTMetadata(asset_contract_address, token_id);
  const image_url = nftData.image_original_url || nftData.image_url; // Use the original image if available
  const name = nftData.name;
  const fullDescription = nftData.description;
  const shortDescription = fullDescription.length > 300 ? fullDescription.substr(0, 300) + '...' : fullDescription;
  const properties = nftData.traits;

  // Create elements
  const div = document.createElement('div');
  div.className = 'nft';
  const imgLinkWrapper = document.createElement('div'); // New wrapper div
  imgLinkWrapper.className = 'img-link-wrapper'; // Assign a class to the wrapper
  const img = document.createElement('img');
  const a = document.createElement('a');
  a.href = `https://opensea.io/collection/8ht`; // Replace with your link
  a.className = 'view-on-opensea';
  a.textContent = 'View on OpenSea';
  const details = document.createElement('div');
  details.className = 'details';
  const h2 = document.createElement('h2');
  h2.className = 'title'; 
  const p = document.createElement('p');
  p.className = 'description-text';
  p.textContent = shortDescription;
  const readMore = document.createElement('span');
  readMore.className = 'read-more';
  readMore.textContent = 'Read More';
  const propertyDiv = document.createElement('div');
  propertyDiv.className = 'properties';

 // Adding properties title
 const propertiesTitle = document.createElement('h3');
 propertiesTitle.className = 'properties-title'; // Add this line
 propertiesTitle.textContent = 'Properties';
 propertyDiv.appendChild(propertiesTitle); // Append to propertyDiv, not details


  // Set their attributes and content
  img.src = image_url;
  img.alt = name;
  img.addEventListener('click', function() { /* Add an event listener to the image */
    if (img.style.width === '100%') {
      img.style.width = '';
      img.style.height = '';
    } else {
      img.style.width = '100%';
      img.style.height = 'auto';
    }
  });
  h2.textContent = name;

 // Display properties
 properties.forEach(property => {
  const propertyDivIndividual = document.createElement('div');
  propertyDivIndividual.className = 'property-individual';
  const propertyP = document.createElement('p');
  propertyP.textContent = `${property.trait_type}: ${property.value}`;
  propertyDivIndividual.appendChild(propertyP);
  propertyDiv.appendChild(propertyDivIndividual);
});

  // Append image and link to the wrapper
  imgLinkWrapper.appendChild(img);
  imgLinkWrapper.appendChild(a);

  // Append the wrapper to the nft div
  div.appendChild(imgLinkWrapper);
  div.appendChild(details);
  details.appendChild(h2);

  // Adding description title
  const descriptionTitle = document.createElement('h3');
  descriptionTitle.className = 'description-title'; // Add this line
  descriptionTitle.textContent = 'Description';
  details.appendChild(descriptionTitle);
  details.appendChild(p);
  details.appendChild(readMore);
  details.appendChild(propertyDiv);
  document.getElementById('nft-container').appendChild(div);

  // Toggle read more
  readMore.addEventListener('click', function() {
    if (p.textContent === shortDescription) {
      p.textContent = fullDescription;
      readMore.textContent = 'Read Less';
    } else {
      p.textContent = shortDescription;
      readMore.textContent = 'Read More';
    }
  });
}

// Display the 8 NFTs
for(let i = 1; i <= 9; i++) {
  displayNFT('0xe7Eb1E4AEa7AC03687c1F159b1bdf2d9d29b90dE', i.toString());
}
