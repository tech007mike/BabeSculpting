function showItems(category, items) {
    const overlay = document.querySelector('.overlay');
    overlay.style.display = 'none';
    
    const container = document.getElementById('floating-container');
    container.innerHTML = '';

    items.forEach((item, index) => {
        // Load saved data from local storage if available
        const savedData = JSON.parse(localStorage.getItem(`${category}-${item.name}`)) || item;

        const box = document.createElement('div');
        box.className = 'floating-box';

        // Editable inputs for weight and reps
        box.innerHTML = `
            <img src="${savedData.img}" alt="${savedData.name}">
            <span>${category} - ${savedData.name}</span>
            <label>Weight: <input type="text" value="${savedData.weight}" class="weight-input"></label>
            <label>Reps: <input type="text" value="${savedData.reps}" class="reps-input"></label>
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
    // Find the parent container of the button to access inputs
    const box = buttonElement.parentElement;
    const weightInput = box.querySelector('.weight-input').value;
    const repsInput = box.querySelector('.reps-input').value;

    const dataToSave = {
        img: box.querySelector('img').src,
        name: itemName,
        weight: weightInput,
        reps: repsInput
    };

    // Save to localStorage
    localStorage.setItem(`${category}-${itemName}`, JSON.stringify(dataToSave));
    alert(`Data for "${itemName}" saved successfully!`);
}

function hideBoxes() {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelectorAll('.floating-box').forEach(box => {
        box.classList.remove('show');
    });
}