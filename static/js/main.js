 const API_BASE_URL = 'http://localhost:5000/api';

        // Verificar autenticação ao carregar a página
        window.addEventListener('DOMContentLoaded', async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/check-auth`, {
                    credentials: 'include'
                });
                const data = await response.json();
                
                if (data.authenticated) {
                    // Mostrar informações do usuário
                    document.getElementById('usernameDisplay').textContent = data.user.username;
                    document.getElementById('userInfo').style.display = 'flex';
                    document.getElementById('accountButton').style.display = 'none';
                } else {
                    // Mostrar botão de conta
                    document.getElementById('userInfo').style.display = 'none';
                    document.getElementById('accountButton').style.display = 'flex';
                }
            } catch (error) {
                console.error('Erro ao verificar autenticação:', error);
            }
        });

        // Logout
        document.getElementById('logoutButton').addEventListener('click', async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/logout`, {
                    method: 'POST',
                    credentials: 'include'
                });
                const data = await response.json();
                
                if (data.success) {
                    // Recarregar a página
                    window.location.reload();
                }
            } catch (error) {
                console.error('Erro ao fazer logout:', error);
            }
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