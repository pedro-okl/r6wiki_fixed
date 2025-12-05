// Sistema de autenticação com localStorage
class AuthManager {
    constructor() {
        this.storageKey = 'r6wiki_users';
        this.sessionKey = 'r6wiki_session';
    }

    isAuthenticated() {
        const session = JSON.parse(localStorage.getItem(this.sessionKey));
        return session !== null;
    }

    getCurrentUser() {
        const session = JSON.parse(localStorage.getItem(this.sessionKey));
        return session;
    }

    logout() {
        localStorage.setItem(this.sessionKey, JSON.stringify(null));
        return { success: true };
    }
}

const authManager = new AuthManager();

// Verificar autenticação ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    if (authManager.isAuthenticated()) {
        const user = authManager.getCurrentUser();
        // Mostrar informações do usuário
        document.getElementById('usernameDisplay').textContent = user.username;
        document.getElementById('userInfo').style.display = 'flex';
        document.getElementById('accountButton').style.display = 'none';
    } else {
        // Mostrar botão de conta
        document.getElementById('userInfo').style.display = 'none';
        document.getElementById('accountButton').style.display = 'flex';
    }
});

// Logout
document.getElementById('logoutButton').addEventListener('click', () => {
    authManager.logout();
    // Recarregar a página
    window.location.reload();
});

        // Menu lateral
        const menuToggle = document.getElementById('menuToggle');
        const rightSidebar = document.getElementById('rightSidebar');
        const closeMenu = document.getElementById('closeMenu');
        const sidebarOverlay = document.getElementById('sidebarOverlay');

        menuToggle.addEventListener('click', () => {
            rightSidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        function closeSidebar() {
            rightSidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        closeMenu.addEventListener('click', closeSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);