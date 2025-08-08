export function initCatApi({ button, result, showLoading, showError }) {
    button.addEventListener('click', async () => {
        try {
            showLoading(true);
            const response = await fetch('https://catfact.ninja/fact');
            
            if (!response.ok) throw new Error('Error en la API');
            
            const data = await response.json();
            result.innerHTML = `
                <h2>Dato sobre gatos</h2>
                <p>${data.fact}</p>
                <p><em>Longitud: ${data.length} caracteres</em></p>
            `;
            result.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
            showError();
        } finally {
            showLoading(false);
        }
    });
}