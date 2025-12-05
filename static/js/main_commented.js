// URL base da API para requisições de autenticação
const API_BASE_URL = 'http://localhost:5000/api';

// Verificar autenticação ao carregar a página
window.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fazer requisição à API para verificar se há um usuário autenticado
        const response = await fetch(`${API_BASE_URL}/check-auth`, {
            credentials: 'include' // Enviar cookies de autenticação
        });
        const data = await response.json();
        
        if (data.authenticated) {
            // Se autenticado: mostrar nome do usuário e opções de logout
            document.getElementById('usernameDisplay').textContent = data.user.username;
            document.getElementById('userInfo').style.display = 'flex';
            document.getElementById('accountButton').style.display = 'none';
        } else {
            // Se não autenticado: mostrar botão de login
            document.getElementById('userInfo').style.display = 'none';
            document.getElementById('accountButton').style.display = 'flex';
        }
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
    }
});

// Evento de logout
document.getElementById('logoutButton').addEventListener('click', async () => {
    try {
        // Fazer requisição POST para fazer logout
        const response = await fetch(`${API_BASE_URL}/logout`, {
            method: 'POST',
            credentials: 'include' // Enviar cookies de autenticação
        });
        const data = await response.json();
        
        if (data.success) {
            // Após logout bem-sucedido, recarregar a página
            window.location.reload();
        }
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
});

// ========== LÓGICA DO MENU LATERAL ==========
// Obter referências aos elementos do menu
const menuToggle = document.getElementById('menuToggle'); // Botão hamburguer
const rightSidebar = document.getElementById('rightSidebar'); // Menu lateral direito
const closeMenu = document.getElementById('closeMenu'); // Botão de fechar menu
const sidebarOverlay = document.getElementById('sidebarOverlay'); // Máscara do fundo

// Evento ao clicar no botão hamburguer: abrir menu
menuToggle.addEventListener('click', () => {
    rightSidebar.classList.add('active'); // Mostrar menu
    sidebarOverlay.classList.add('active'); // Mostrar máscara
    document.body.style.overflow = 'hidden'; // Desabilitar scroll da página
});

// Função para fechar o menu
function closeSidebar() {
    rightSidebar.classList.remove('active'); // Ocultar menu
    sidebarOverlay.classList.remove('active'); // Ocultar máscara
    document.body.style.overflow = ''; // Habilitar scroll da página
}

// Evento ao clicar no botão de fechar menu
closeMenu.addEventListener('click', closeSidebar);

// Evento ao clicar na máscara: fechar menu (clique fora)
sidebarOverlay.addEventListener('click', closeSidebar);
