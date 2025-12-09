// Sistema de autenticação com localStorage
class AuthManager {
    constructor() {
        this.storageKey = 'r6wiki_users';
        this.sessionKey = 'r6wiki_session';
        this.initializeStorage();
    }

    // Inicializa o localStorage com dados padrão se não existir
    initializeStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.sessionKey)) {
            localStorage.setItem(this.sessionKey, JSON.stringify(null));
        }
    }

    // Validar email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validar senha (mínimo 6 caracteres)
    isValidPassword(password) {
        return password.length >= 6;
    }

    // Verificar se email já existe
    emailExists(email) {
        const users = JSON.parse(localStorage.getItem(this.storageKey));
        return users.some(user => user.email.toLowerCase() === email.toLowerCase());
    }

    // Registrar novo usuário
    register(username, email, password) {
        // Validações
        if (!username || !email || !password) {
            return { success: false, message: 'Por favor, preencha todos os campos' };
        }
        if (!this.isValidEmail(email)) {
            return { success: false, message: 'Email inválido' };
        }
        if (!this.isValidPassword(password)) {
            return { success: false, message: 'Senha deve ter pelo menos 6 caracteres' };
        }
        if (this.emailExists(email)) {
            return { success: false, message: 'Este email já está cadastrado' };
        }

        // Criar novo usuário
        const users = JSON.parse(localStorage.getItem(this.storageKey));
        const newUser = {
            id: Date.now(),
            username: username.trim(),
            email: email.toLowerCase(),
            password: this.hashPassword(password),
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem(this.storageKey, JSON.stringify(users));

        return { success: true, message: 'Cadastro realizado com sucesso!' };
    }

    // Login
    login(email, password, rememberMe = false) {
        // Validações
        if (!email || !password) {
            return { success: false, message: 'Por favor, preencha email e senha' };
        }

        // Procurar usuário
        const users = JSON.parse(localStorage.getItem(this.storageKey));
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            return { success: false, message: 'Email não encontrado' };
        }

        // Verificar senha
        if (!this.verifyPassword(password, user.password)) {
            return { success: false, message: 'Senha incorreta' };
        }

        // Criar sessão
        const session = {
            userId: user.id,
            username: user.username,
            email: user.email,
            loginAt: new Date().toISOString(),
            rememberMe: rememberMe
        };

        localStorage.setItem(this.sessionKey, JSON.stringify(session));

        return { success: true, message: 'Logado com sucesso!', user: { username: user.username, email: user.email } };
    }

    // Logout
    logout() {
        localStorage.setItem(this.sessionKey, JSON.stringify(null));
        return { success: true, message: 'Deslogado com sucesso!' };
    }

    // Verificar se usuário está logado
    isAuthenticated() {
        const session = JSON.parse(localStorage.getItem(this.sessionKey));
        return session !== null;
    }

    // Obter usuário logado
    getCurrentUser() {
        const session = JSON.parse(localStorage.getItem(this.sessionKey));
        return session;
    }

    // Hash simples de senha (para desenvolvimento)
    hashPassword(password) {
        return btoa(password);
    }

    // Verificar hash de senha
    verifyPassword(password, hash) {
        return btoa(password) === hash;
    }
}

const authManager = new AuthManager();

// Função para exibir mensagens
function showMessage(message, type = 'success') {
    const existingMessage = document.querySelector('.message-box');
    if (existingMessage) {
        existingMessage.remove();
    }

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
    const messageBox = document.querySelector('.message-box');
    if (messageBox) messageBox.remove();
});

registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    const messageBox = document.querySelector('.message-box');
    if (messageBox) messageBox.remove();
});

// Formulário de cadastro
const registerFormElement = document.getElementById('registerFormElement');
registerFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    // Validações adicionais
    if (!agreeTerms) {
        showMessage('Você deve concordar com os termos de uso', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showMessage('As senhas não coincidem', 'error');
        return;
    }

    const result = authManager.register(username, email, password);
    showMessage(result.message, result.success ? 'success' : 'error');

    if (result.success) {
        registerFormElement.reset();
        setTimeout(() => {
            loginTab.click();
        }, 1500);
    }
});

// Formulário de login
const loginFormElement = document.getElementById('loginFormElement');
loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitButton = loginFormElement.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Entrando...';

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    const result = authManager.login(email, password, rememberMe);
    showMessage(result.message, result.success ? 'success' : 'error');

    if (result.success) {
        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
    } else {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
});

// Verificar se usuário já está logado ao carregar a página
function updateHeaderAuthState() {
    const session = authManager.getCurrentUser();
    const userInfo = document.getElementById('userInfo');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const logoutButton = document.getElementById('logoutButton');

    if (session && userInfo && usernameDisplay) {
        userInfo.style.display = 'flex';
        usernameDisplay.textContent = session.username || session.email || '';
    } else if (userInfo) {
        userInfo.style.display = 'none';
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            authManager.logout();
            updateHeaderAuthState();
            showMessage('Você saiu da conta', 'success');
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    updateHeaderAuthState();
});