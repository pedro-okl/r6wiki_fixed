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

// ===== Adicionar operador: modal + persistência =====
(function(){
    const addOpButton = document.getElementById('addOpButton');
    const modalOverlay = document.getElementById('opModalOverlay');
    const modalClose = document.getElementById('opModalClose');
    const modalCancel = document.getElementById('opCancel');
    const addOpForm = document.getElementById('addOpForm');
    const opList = document.querySelector('.op-list');
    const STORAGE_KEY = 'r6_ops';

    function openModal(){
        if(!modalOverlay) return;
        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden','false');
        document.body.style.overflow = 'hidden';
        const inpt = document.getElementById('opName'); if(inpt) inpt.focus();
    }
    function closeModal(){
        if(!modalOverlay) return;
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden','true');
        document.body.style.overflow = '';
        if(addOpForm) addOpForm.reset();
    }

    function loadStored(){
        try{ const raw = localStorage.getItem(STORAGE_KEY); if(!raw) return null; const arr = JSON.parse(raw); return Array.isArray(arr)?arr:null;}catch(e){return null}
    }
    function saveStored(arr){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }catch(e){console.error(e)} }

    function render(op,prepend=true){
        if(!opList) return;
        const card = document.createElement('div'); card.className='op-card';
        const header = document.createElement('div'); header.className='op-card-header';
        const h3 = document.createElement('h3'); h3.textContent = op.name;
        const span = document.createElement('span'); span.className = `op-role ${op.role==='attacker'?'attacker':'defender'}`;
        span.textContent = op.role==='attacker' ? 'Atacante' : 'Defensor';
        header.appendChild(h3); header.appendChild(span);
        const body = document.createElement('div'); body.className='op-card-body';
        const ability = document.createElement('p'); ability.className='op-ability'; ability.innerHTML=`<strong>Gadget:</strong> ${op.gadget||'—'}`;
        const desc = document.createElement('p'); desc.className='op-description'; desc.textContent = op.description||'';
        body.appendChild(ability); body.appendChild(desc);
        card.appendChild(header); card.appendChild(body);
        if(prepend) opList.insertBefore(card, opList.firstChild); else opList.appendChild(card);
    }

    function initFromStorageOrDOM(){
        const stored = loadStored();
        if(stored && stored.length){
            if(opList) opList.innerHTML='';
            stored.forEach(op=>render(op,false));
            return;
        }
        // no storage: capture existing DOM cards and save
        const existing = Array.from(document.querySelectorAll('.op-list .op-card'));
        if(existing.length){
            const ops = existing.map(card=>{
                const name = card.querySelector('.op-card-header h3')?.textContent?.trim()||'';
                const role = card.querySelector('.op-card-header .op-role')?.classList.contains('attacker')? 'attacker':'defender';
                const gadget = card.querySelector('.op-ability')?.textContent.replace('Habilidade:','').replace('Gadget:','').trim()||'';
                const description = card.querySelector('.op-description')?.textContent||'';
                return {name,role,gadget,description};
            }).filter(Boolean);
            if(ops.length) saveStored(ops);
        }
    }

    if(addOpButton) addOpButton.addEventListener('click', openModal);
    if(modalClose) modalClose.addEventListener('click', closeModal);
    if(modalCancel) modalCancel.addEventListener('click', closeModal);
    if(modalOverlay) modalOverlay.addEventListener('click', e=>{ if(e.target===modalOverlay) closeModal(); });

    if(addOpForm){
        addOpForm.addEventListener('submit', e=>{
            e.preventDefault();
            const name = document.getElementById('opName')?.value.trim();
            const role = document.getElementById('opRole')?.value || 'attacker';
            const gadget = document.getElementById('opGadget')?.value.trim()||'';
            const description = document.getElementById('opDescription')?.value.trim()||'';
            if(!name){ alert('Informe o nome do operador'); return; }
            const op = { name, role, gadget, description };
            // persist
            const arr = loadStored()||[]; arr.unshift(op); saveStored(arr);
            // render
            render(op,true);
            closeModal();
        });
    }

    window.addEventListener('DOMContentLoaded', initFromStorageOrDOM);
})();
