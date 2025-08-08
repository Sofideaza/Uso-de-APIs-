export function initAnimeApi({ button, searchButton, result, controls, showLoading, showError }) {
    button.addEventListener('click', () => {
        document.getElementById('anime-controls').style.display = 'flex';
    });
    
    searchButton.addEventListener('click', async () => {
        const query = controls.query.value.trim();
        const type = controls.type.value;
        const limit = controls.limit.value;
        
        if (!query) {
            alert('Por favor ingresa un nombre para buscar');
            return;
        }
        
        try {
            showLoading(true);
            const url = new URL('https://api.jikan.moe/v4/anime');
            url.searchParams.append('q', query);
            url.searchParams.append('limit', limit);
            if (type) url.searchParams.append('type', type);
            
            const response = await fetch(url);
            
            if (!response.ok) throw new Error('Error en la API');
            
            const data = await response.json();
            
            if (!data.data || data.data.length === 0) {
                result.innerHTML = '<p>No se encontraron resultados</p>';
            } else {
                result.innerHTML = `
                    <h2>Resultados de Anime</h2>
                    <div class="anime-grid">
                        ${data.data.map(anime => `
                            <div class="anime-card">
                                <img src="${anime.images?.jpg?.image_url || 'https://via.placeholder.com/200x300?text=No+Image'}" 
                                     alt="${anime.title}" class="anime-image">
                                <div class="anime-info">
                                    <h3>${anime.title}</h3>
                                    <p>Tipo: ${anime.type || 'Desconocido'} ${anime.score || 'N/A'}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            result.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
            showError();
        } finally {
            showLoading(false);
        }
    });
}