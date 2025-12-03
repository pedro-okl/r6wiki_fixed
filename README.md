# Rainbow Six Wiki

Wiki sobre Rainbow Six Siege com sistema de autenticação.

## 🚀 Como executar

### Pré-requisitos
- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)

### Instalação

1. **Instale as dependências:**
```bash
pip install -r requirements.txt
```

2. **Execute o servidor Flask:**
```bash
python app.py
```

3. **Acesse o site:**
Abra seu navegador e acesse: `http://localhost:5000`

## 📁 Estrutura do Projeto

```
r6wiki/
├── app.py              # Backend Flask
├── requirements.txt    # Dependências Python
├── r6wiki.db          # Banco de dados SQLite (criado automaticamente)
├── account.html        # Página de login/cadastro
├── index.html         # Página inicial
├── op.html            # Página de operadores
├── info.html          # Página de informações
└── style/
    └── style.css      # Estilos CSS
```

## 🔐 Funcionalidades

- ✅ Cadastro de usuários
- ✅ Login com email e senha
- ✅ Sessão persistente
- ✅ Validação de dados
- ✅ Hash de senhas (segurança)
- ✅ API RESTful

## 🛠️ Tecnologias

- **Backend:** Flask (Python)
- **Banco de Dados:** SQLite
- **Frontend:** HTML, CSS, JavaScript
- **Autenticação:** Sessions do Flask

## 📝 Notas

- O banco de dados SQLite será criado automaticamente na primeira execução
- As senhas são criptografadas usando Werkzeug
- A sessão persiste enquanto o servidor estiver rodando
- Para produção, altere a `SECRET_KEY` no arquivo `app.py`

## 🔒 Segurança

⚠️ **Importante:** Este é um projeto de exemplo. Para produção, considere:
- Usar variáveis de ambiente para a SECRET_KEY
- Implementar HTTPS
- Adicionar rate limiting
- Implementar CSRF protection
- Usar um banco de dados mais robusto (PostgreSQL, MySQL)
