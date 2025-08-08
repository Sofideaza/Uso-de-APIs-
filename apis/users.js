export function initUserApi({ button, result, showLoading, showError }) {
    button.addEventListener('click', async () => {
        try {
            showLoading(true);
            const response = await fetch('https://randomuser.me/api/');
            
            if (!response.ok) throw new Error('Error en la API');
            
            const data = await response.json();
            const user = data.results[0];
            result.innerHTML = `
                <h2>Usuario Aleatorio</h2>
                <div class="user-card">
                    <img src="${user.picture.large}" alt="User" class="user-avatar">
                    <div>
                        <p><strong>Nombre:</strong> ${user.name.first} ${user.name.last}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>País:</strong> ${user.location.country}</p>
                    </div>
                </div>
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