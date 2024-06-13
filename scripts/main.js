
// SCRIPTS PAGINA JUEGOS

function loadGame(game) {
    const gameContainer = document.getElementById('game-container');
    
    // Limpia el contenido actual del contenedor de juegos
    gameContainer.innerHTML = '';

    // Carga el juego correspondiente
    switch(game) {
        case 'game1':
            gameContainer.innerHTML = '<iframe src="../pages/juego-albornoz.html" frameborder="0" width="100%" height="100%"></iframe>';
            break;
        case 'game2':
            gameContainer.innerHTML = '<iframe src="../pages/juego-emerson.html" frameborder="0" width="100%" height="100%"></iframe>';
            break;
        case 'game3':
            gameContainer.innerHTML = '<iframe src="../pages/juego-antoniow.html" frameborder="0" width="100%" height="100%"></iframe>';
            break;
        default:
            gameContainer.innerHTML = '<p>Selecciona un juego para empezar a jugar.</p>';
    }
}