// Seleciona o botão que abre o menu
const menuToggle = document.getElementById('menuToggle');

// Seleciona a sidebar (menu lateral)
const rightSidebar = document.getElementById('rightSidebar');

// Seleciona o botão de fechar dentro da sidebar
const closeMenu = document.getElementById('closeMenu');

// Seleciona o fundo escuro atrás da sidebar (overlay)
const sidebarOverlay = document.getElementById('sidebarOverlay');

// Quando clicar no botão de abrir o menu
menuToggle.addEventListener('click', () => {
    // Mostra a sidebar adicionando a classe "active"
    rightSidebar.classList.add('active');

    // Mostra o overlay adicionando a classe "active"
    sidebarOverlay.classList.add('active');

    // Impede que a página role enquanto o menu estiver aberto
    document.body.style.overflow = 'hidden';
});

// Função que fecha a sidebar e o overlay
function closeSidebar() {
    // Esconde a sidebar removendo a classe "active"
    rightSidebar.classList.remove('active');

    // Esconde o overlay removendo a classe "active"
    sidebarOverlay.classList.remove('active');

    // Libera a rolagem da página
    document.body.style.overflow = '';
}

// Fecha o menu ao clicar no botão de fechar
closeMenu.addEventListener('click', closeSidebar);

// Fecha o menu ao clicar no overlay
sidebarOverlay.addEventListener('click', closeSidebar);
