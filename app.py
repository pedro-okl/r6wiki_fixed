# Importar módulos necessários
import os 
from flask import Flask, render_template, request, redirect, url_for, session, flash  

# Criar aplicação Flask com configuração de pastas para templates e arquivos estáticos
app = Flask(__name__, template_folder='templates', static_folder='static')

# Rota para a página inicial
@app.route('/')
def index():
    return render_template('index.html')

# Rota para a página de conta/autenticação
@app.route('/account')
def account():
    return render_template('account.html')

# Rota para a página de operadores (personagens)
@app.route('/op')
def op():
    return render_template('op.html')

# Rota para a página de informações
@app.route('/info')
def info():
    return render_template('info.html')

# Executar o servidor Flask em modo debug (desenvolvimento)
if __name__ == "__main__":
    app.run(debug=True) 

