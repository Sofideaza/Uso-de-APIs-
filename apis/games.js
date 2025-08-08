export function initGamesApi({ button, result, showLoading, showError }) {
    button.addEventListener('click', async () => {
        try {
            showLoading(true);
            
            // Obtener ofertas de juegos (límite de 6 resultados)
            const response = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=6');
            
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            
            const deals = await response.json();
            
            if (!deals || deals.length === 0) {
                throw new Error('No se encontraron ofertas');
            }
            
            renderGameDeals(result, deals);
            
        } catch (error) {
            console.error('Error:', error);
            showError();
            result.innerHTML = '<p>No se pudieron cargar las ofertas. Intenta nuevamente.</p>';
        } finally {
            showLoading(false);
        }
    });
}

function renderGameDeals(element, deals) {
    element.innerHTML = `
        <h2>Ofertas de Videojuegos</h2>
        <div class="game-deals">
            ${deals.map(deal => `
                <div class="game-card">
                    <img src="${deal.thumb}" 
                         alt="${deal.title}" 
                         class="game-image"
                         onerror="this.src='https://via.placeholder.com/200x100?text=No+Image'">
                    <div class="game-info">
                        <h3>${deal.title}</h3>
                        <div class="game-prices">
                            <span class="original-price">$${deal.normalPrice}</span>
                            <span class="sale-price">$${deal.salePrice}</span>
                            <span class="discount">-${deal.savings.substr(0,2)}%</span>
                        </div>
                        <a href="https://www.cheapshark.com/redirect?dealID=${deal.dealID}" 
                           target="_blank" 
                           class="deal-link">
                            Ver oferta
                        </a>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    element.style.display = 'block';
}