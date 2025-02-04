function showItems(category, items) {
    const overlay = document.querySelector('.overlay');
    overlay.style.display = 'none';

    const container = document.getElementById('floating-container');
    container.innerHTML = '';

    items.forEach((item, index) => {
        // Load saved data from localStorage or use initial item values
        const savedData = JSON.parse(localStorage.getItem(`${category}-${item.name}`)) || item;

        const box = document.createElement('div');
        box.className = 'floating-box';
        box.innerHTML = `
            <img src="${savedData.img}" alt="${savedData.name}">
            <span>${category} - ${savedData.name}</span>
            <label>Weight: <input type="text" value="${savedData.weight}" class="weight-input"></label>
            <p>Reps: ${savedData.reps}</p>
            <button onclick="saveItem('${category}', '${savedData.name}', this)">Save</button>
        `;

        box.style.position = 'relative';
        container.appendChild(box);

        setTimeout(() => {
            box.classList.add('show');
        }, 100 * index);
    });
}

function saveItem(category, itemName, buttonElement) {
    const box = buttonElement.parentElement;
    const weightInput = box.querySelector('.weight-input').value;

    // Create a data object to save
    const dataToSave = {
        img: box.querySelector('img').src,
        name: itemName,
        weight: weightInput,
        reps: box.querySelector('p').textContent.replace('Reps: ', '')
    };

    // Save data to localStorage
    localStorage.setItem(`${category}-${itemName}`, JSON.stringify(dataToSave));

    alert(`Weight for "${itemName}" saved successfully!`);
}

function hideBoxes() {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelectorAll('.floating-box').forEach(box => {
        box.classList.remove('show');
    });
}
