const showsContainer = document.getElementById('showsContainer');
const searchInput = document.getElementById('searchInput'); // Nuevo: Referencia al campo de búsqueda
const searchForm = document.getElementById('searchForm'); // Nuevo: Referencia al formulario
const jsonFilePath = 'js/shows.json';

// Nuevo: Variable para guardar TODOS los shows una vez cargados
let allShows = [];

/**
 * Función para cargar los datos del JSON y manejar errores.
 * Almacena los shows en 'allShows' y los renderiza.
 */
async function fetchShows() {
    try {
        const response = await fetch(jsonFilePath);

        if (!response.ok) {
            throw new Error(`Error HTTP! Estado: ${response.status}`);
        }

        const shows = await response.json();

        // 1. Guardar todos los shows cargados
        allShows = shows;

        // 2. Renderizar todos los shows inicialmente
        renderShows(allShows);

    } catch (error) {
        console.error("Error al cargar los datos de los shows:", error);
        showsContainer.innerHTML = '<p class="error-message">No se pudieron cargar los eventos. Intenta de nuevo más tarde.</p>';
    }
}

/**
 * Función para crear y añadir las tarjetas al contenedor.
 * @param {Array} showsData - La lista de shows a renderizar (puede ser la lista completa o una filtrada).
 */
function renderShows(showsData) {
    // 1. Limpiar el contenedor antes de añadir nuevos resultados
    showsContainer.innerHTML = '';

    if (showsData.length === 0) {
        showsContainer.innerHTML = '<p class="no-results-message">No se encontraron eventos que coincidan con la búsqueda.</p>';
        return;
    }

    showsData.forEach(show => {
        const card = document.createElement('div');
        card.classList.add('show-card');

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

        showsContainer.appendChild(card);
    });
}

/**
 * NUEVA FUNCIÓN: Lógica para filtrar los shows.
 * Se ejecuta al hacer clic en Buscar o presionar Enter.
 */
function handleSearch(event) {
    // 1. Evitar que el formulario recargue la página
    event.preventDefault();

    // 2. Obtener el texto de búsqueda y convertirlo a minúsculas
    const searchText = searchInput.value.toLowerCase().trim();

    // 3. Filtrar el array 'allShows'
    const filteredShows = allShows.filter(show => {
        // La búsqueda se basa en el nombre del show
        return show.name.toLowerCase().includes(searchText);
    });

    // 4. Renderizar la lista filtrada (o la lista completa si el campo está vacío)
    renderShows(filteredShows);
}

// Iniciar la carga de shows al cargar la página
fetchShows();

// Nuevo: Asignar el evento 'submit' al formulario
if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
}

// Opcional: Para buscar en tiempo real mientras el usuario escribe
if (searchInput) {
    searchInput.addEventListener('keyup', handleSearch);
}