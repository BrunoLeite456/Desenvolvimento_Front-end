/* 1) Banco de dados na memoria - VETOT */
const pets = [];

/* 2) Pegar os elementos HTML - DOM*/
const tbodyPets = document.getElementById('pets');
const counter = document.getElementById('counter');
const formCadastro = document.getElementById('formCadastro');
const btnLimparLista = document.getElementById('btnLimparLista');

const editBox = document.getElementById('editBox');
const btnFecharEdicao = document.getElementById('btnFecharEdicao');
const formedit = document.getElementById('formedit');

const imputNome = document.getElementById('pet');
const imputIdade = document.getElementById('idade');
const imputTutor = document.getElementById('tutor');

const editNome = document.getElementById('editNome');
const editIdade = document.getElementById('editIdade');
const editTutor = document.getElementById('editTutor');

/* Guardar qual item esta sendo editado */
let indiceEdicao = null;
/* Eventos */
formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = imputNome.value.trim();
    const tutor = imputNome.value.trim();
    const idade = Number(imputIdade.value);
    /* Validacao dos campos */
    if (!nome || !tutor || Number.isNaN(idade)) {
        alert('Preenchaos campos nome, idade e tutor corretamente!');
        return;
    }

    pets.push({ nome, idade, tutor });
    renderizarTabela();
});

function atulizarContador(){
    const total = pets.length;
    counter.textContent = total === 0 ? "Nenhum pet cadastrado" : `´${total} ${total === 1 ? "pet" : "pets"}`;
}

function renderizarTabela() {
    tbodyPets.innerHTML = ""; //limpa a tabela

    pets.forEach((pets, index) => {

        const tr = document.createElement('tr');

        const tdNome = document.createElement('td');
        tdNome.textContent = pets.nome;

        const tdIdade = document.createElement('td');
        tdIdade.textContent = pets.idade;

        const tdTutor = document.createElement('td');
        tdTutor.textContent = pets.tutor;

        const tdAcoes = document.createElement('td');
        tdAcoes.className = "acoes";

        const btnEditar = document.createElement('button');
        btnEditar.type = "button";
        btnEditar.textContent = "Editar";
        btnEditar, addEventListener('click', () => abrirEdicao(index));

        const btnExcluir = document.createElement('button');
        btnExcluir.type = "button";
        btnExcluir.textContent = "Excluir";
        btnExcluir, addEventListener('click', () => excluir(index));

        tdAcoes.append(btnEditar, btnExcluir)

        tr.append(tdNome, tdIdade, tdTutor, tdAcoes);

        tbodyPets.append(tr);
    })
}