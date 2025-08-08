import { initCatApi } from './cats.js';
import { initGamesApi } from './games.js';
import { initUserApi } from './users.js';
import { initAnimeApi } from './anime.js';

document.addEventListener('DOMContentLoaded', () => {
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');

    const showLoading = (isLoading) => {
        loadingElement.style.display = isLoading ? 'block' : 'none';
        if (isLoading) errorElement.style.display = 'none';
    };
    
    const showError = () => {
        errorElement.style.display = 'block';
    };
    

    document.getElementById('anime-btn').addEventListener('click', () => {
        document.getElementById('anime-controls').style.display = 'flex';
    });
    
    initCatApi({
        button: document.getElementById('cat-btn'),
        result: document.getElementById('cat-result'),
        showLoading,
        showError
    });
    
    initGamesApi({
    button: document.getElementById('games-btn'),
    result: document.getElementById('games-result'),
    showLoading,
    showError
});
    
    initUserApi({
        button: document.getElementById('user-btn'),
        result: document.getElementById('user-result'),
        showLoading,
        showError
    });
    
    initAnimeApi({
        button: document.getElementById('anime-btn'),
        searchButton: document.getElementById('anime-search'),
        result: document.getElementById('anime-result'),
        controls: {
            query: document.getElementById('anime-query'),
            type: document.getElementById('anime-type'),
            limit: document.getElementById('anime-limit')
        },
        showLoading,
        showError
    });

    const apiButtons = document.querySelectorAll('.api-selector button');
    apiButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.result').forEach(result => {
                result.style.display = 'none';
            });
        });
    });
});