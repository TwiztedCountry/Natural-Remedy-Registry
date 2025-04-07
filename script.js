async function loadRemedies() {
  const res = await fetch('remedies.json');
  const remedies = await res.json();
  const container = document.getElementById('remedy-list');
  const filter = document.getElementById('category-filter');

  const categories = new Set(remedies.map(r => r.category));
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    filter.appendChild(option);
  });

  function render(filtered = remedies) {
    container.innerHTML = '';
    filtered.forEach(r => {
      const div = document.createElement('div');
      div.className = 'remedy';
      div.innerHTML = `
        <h2>${r.name} <small><i>(${r.latin_name})</i></small></h2>
        <img src="${r.image}" alt="${r.name}" />
        <p><strong>Category:</strong> ${r.category}</p>
        <p><strong>Description:</strong> ${r.description}</p>
        <p><strong>Instructions:</strong> ${r.instructions}</p>
        <p><strong>Preparation:</strong> ${r.preparation}</p>
        <p><strong>Origin:</strong> ${r.origin}</p>
        <p><strong>Tradition:</strong> ${r.tradition}</p>
        <p><strong>Grow Info:</strong> ${r.grow_info}</p>
        <p><strong>Foraging Notes:</strong> ${r.foraging_notes}</p>
        <p><strong>Pharma Alternative:</strong> ${r.pharma_alternative}</p>
        <p><strong>Freedom Index:</strong> Grow Yourself: ${r.freedom_index.grow_yourself ? "Yes" : "No"}, 
          Corporate Dependency: ${r.freedom_index.corporate_dependency ? "Yes" : "No"}, 
          Accessibility Score: ${r.freedom_index.accessibility_score}/5
        </p>
      `;
      container.appendChild(div);
    });
  }

  filter.addEventListener('change', () => {
    const selected = filter.value;
    render(selected === 'all' ? remedies : remedies.filter(r => r.category === selected));
  });

  render();
}

document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

loadRemedies();
