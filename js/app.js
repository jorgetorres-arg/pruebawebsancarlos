const showsContainer = document.getElementById('showsContainer');
const jsonFilePath = 'js/shows.json';

/**
 * Función para cargar los datos del JSON y manejar errores.
 */
async function fetchShows() {
    try {
        // Usa la API fetch para obtener el archivo JSON
        const response = await fetch(jsonFilePath);

        // Verifica si la respuesta es exitosa (código 200-299)
        if (!response.ok) {
            throw new Error(`Error HTTP! Estado: ${response.status}`);
        }

        // Convierte la respuesta a un objeto JavaScript
        const shows = await response.json();

        // Llama a la función para renderizar las tarjetas
        renderShows(shows);

    } catch (error) {
        console.error("Error al cargar los datos de los shows:", error);
        showsContainer.innerHTML = '<p class="error-message">No se pudieron cargar los eventos. Intenta de nuevo más tarde.</p>';
    }
}

/**
 * Función para crear y añadir las tarjetas al contenedor.
 */
function renderShows(showsData) {
    showsData.forEach(show => {
        // 1. Crear el elemento principal de la tarjeta (div.show-card)
        const card = document.createElement('div');
        card.classList.add('show-card');

        // 2. Insertar el contenido interno de la tarjeta usando un Template Literal
        card.innerHTML = `
            <div class="card-image-container">
                <img src="${show.image_url}" alt="${show.name}" class="card-image">
            </div>
            <div class="card-content">
                <h3 class="show-name">${show.name}</h3>
                <p class="show-date"><i class="far fa-calendar-alt"></i> ${show.date}</p>
                <a href="${show.ticket_url}" target="_blank" class="buy-button">Comprar Entrada</a>
            </div>
        `;

        // 3. Añadir la tarjeta al contenedor principal
        showsContainer.appendChild(card);
    });
}

// Iniciar la carga de shows al cargar la página
fetchShows();