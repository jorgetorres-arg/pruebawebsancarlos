function createEquipmentItemHTML(item) {
    // Genera el bloque HTML con la estructura deseada: imagen a la izq, texto a la der.
    return `
        <div class="equipment-item">
            <img src="${item.image}" alt="${item.name}" class="equipment-image">
            <div class="equipment-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p><strong>Specs:</strong> ${item.technical_specs ? item.technical_specs.join(' | ') : (item.amenities ? item.amenities.join(' | ') : 'N/A')}</p>
            </div>
        </div>
    `;
}

async function loadTabContent(tabName, jsonFile) {
    const contentContainer = document.getElementById(tabName);
    contentContainer.innerHTML = 'Cargando información...'; // Mensaje de carga

    try {
        const response = await fetch(jsonFile);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Limpia el contenido anterior y genera el nuevo HTML
        let htmlContent = data.map(createEquipmentItemHTML).join('');
        contentContainer.innerHTML = htmlContent;

    } catch (error) {
        console.error("Error al cargar los datos del JSON:", error);
        contentContainer.innerHTML = `<p class="error">Error al cargar la lista de equipos. Por favor, inténtelo más tarde. (${error.message})</p>`;
    }
}


function openTab(evt, tabName, jsonFile) {
    var i, tabcontent, tablinks;

    // 1. Ocultar todos los contenidos y desactivar botones (código de la respuesta anterior)
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // 2. Mostrar la pestaña actual y activar su botón
    document.getElementById(tabName).classList.add("active");
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");

    // 3. CARGAR EL CONTENIDO DINÁMICO
    loadTabContent(tabName, jsonFile);
}

// Carga inicial:
document.addEventListener("DOMContentLoaded", function () {
    // Busca el primer botón de pestaña y simula un clic para cargar su contenido
    const initialTabButton = document.querySelector('.tab-button.active');
    if (initialTabButton) {
        // Necesitas obtener el nombre de la pestaña y el archivo JSON del primer botón
        const tabName = initialTabButton.textContent.trim() === 'Sonido' ? 'Sound' : ''; // Ajusta esto
        const jsonFile = '../json/sound_equipment.json';
        loadTabContent(tabName, jsonFile);
    }
});