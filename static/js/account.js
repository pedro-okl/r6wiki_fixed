 // Função para exibir mensagens
        function showMessage(message, type = 'success') {
            // Remove mensagens anteriores
            const existingMessage = document.querySelector('.message-box');
            if (existingMessage) {
                existingMessage.remove();
            }

            // Cria nova mensagem
            const messageBox = document.createElement('div');
            messageBox.className = `message-box ${type}`;
            messageBox.textContent = message;
            messageBox.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 10px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                animation: slideIn 0.3s ease;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                ${type === 'success' 
                    ? 'background: linear-gradient(135deg, #00cc66 0%, #00aa55 100%);' 
                    : 'background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);'}
            `;

            document.body.appendChild(messageBox);

            // Remove após 5 segundos
            setTimeout(() => {
                messageBox.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => messageBox.remove(), 300);
            }, 5000);
        }

        // Alternar entre Login e Cadastro
        const loginTab = document.getElementById('loginTab');
        const registerTab = document.getElementById('registerTab');
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
            // Limpar mensagens ao trocar de aba
            const messageBox = document.querySelector('.message-box');
            if (messageBox) messageBox.remove();
        });

        registerTab.addEventListener('click', () => {
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
            // Limpar mensagens ao trocar de aba
            const messageBox = document.querySelector('.message-box');
            if (messageBox) messageBox.remove();
        });

        // Formulário de cadastro
        const registerFormElement = document.getElementById('registerFormElement');
        registerFormElement.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = registerFormElement.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Cadastrando...';

            const formData = {
                username: document.getElementById('registerName').value.trim(),
                email: document.getElementById('registerEmail').value.trim(),
                password: document.getElementById('registerPassword').value,
                confirmPassword: document.getElementById('confirmPassword').value
            };

            try {
                console.log('Enviando dados:', formData);
                const response = await fetch(`${API_BASE_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(formData)
                });

                console.log('Resposta recebida:', response.status, response.statusText);
                
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
                    throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
                }

                const data = await response.json();
                console.log('Dados recebidos:', data);

                if (data.success) {
                    showMessage(data.message, 'success');
                    // Limpar formulário
                    registerFormElement.reset();
                    // Trocar para aba de login após 1.5 segundos
                    setTimeout(() => {
                        loginTab.click();
                    }, 1500);
                } else {
                    showMessage(data.message || 'Erro ao cadastrar', 'error');
                }
            } catch (error) {
                console.error('Erro completo:', error);
                const errorMessage = error.message || 'Erro ao conectar com o servidor. Verifique se o backend está rodando em http://localhost:5000';
                showMessage(errorMessage, 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });

        // Formulário de login
        const loginFormElement = document.getElementById('loginFormElement');
        loginFormElement.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitButton = loginFormElement.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Entrando...';

            const formData = {
                email: document.getElementById('loginEmail').value.trim(),
                password: document.getElementById('loginPassword').value,
                rememberMe: document.getElementById('rememberMe').checked
            };

            try {
                const response = await fetch(`${API_BASE_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include', // Importante para cookies/sessão
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (data.success) {
                    showMessage(data.message, 'success');
                    // Redirecionar para a página inicial após 1 segundo
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                } else {
                    showMessage(data.message, 'error');
                }
            } catch (error) {
                showMessage('Erro ao conectar com o servidor. Verifique se o backend está rodando.', 'error');
                console.error('Erro:', error);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });

        // Verificar se usuário já está logado ao carregar a página
        window.addEventListener('DOMContentLoaded', async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/check-auth`, {
                    credentials: 'include'
                });
                const data = await response.json();
                
                if (data.authenticated) {
                    // Usuário já está logado, redirecionar
                    window.location.href = 'index.html';
                }
            } catch (error) {
                console.error('Erro ao verificar autenticação:', error);
            }
        });
   

   