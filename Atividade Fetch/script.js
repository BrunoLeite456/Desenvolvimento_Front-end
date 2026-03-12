const URL_API = "https://rickandmortyapi.com/api/character"

const lista = document.getElementById("lista")
const busca = document.getElementById("busca")
const carregando = document.getElementById("carregando")
const mensagemErro = document.getElementById("mensagemErro")
const mensagemVazio = document.getElementById("mensagemVazio")
const modal = document.getElementById("modal")
const detalhe = document.getElementById("detalhe")
const fecharModal = document.getElementById("fecharModal")
const botaoAnterior = document.getElementById("botaoAnterior")
const botaoProximo = document.getElementById("botaoProximo")
const infoPagina = document.getElementById("infoPagina")

// Variáveis de controle
let todosPersonagens = []          // Todos personagens carregados da API
let personagensExibidos = []       // Personagens filtrados ou da página atual
let paginaAtual = 1
const tamanhoPagina = 20           // Número de cards por página

// Função para carregar todos personagens da API
async function carregarTodosPersonagens(){
    carregando.classList.remove("oculto")
    mensagemErro.classList.add("oculto")
    try{
        const respostaPrimeira = await fetch(URL_API)
        if(!respostaPrimeira.ok) throw new Error("HTTP "+respostaPrimeira.status)
        const dadosPrimeira = await respostaPrimeira.json()

        let todos = dadosPrimeira.results
        const totalPaginas = dadosPrimeira.info.pages

        for(let i=2;i<=totalPaginas;i++){
            const resposta = await fetch(`${URL_API}?page=${i}`)
            if(!resposta.ok) throw new Error("HTTP "+resposta.status)
            const dados = await resposta.json()
            todos = todos.concat(dados.results)
        }

        todosPersonagens = todos
        personagensExibidos = todosPersonagens
        paginaAtual = 1
        renderizarPaginaAtual()
    }catch(err){
        console.error("Erro ao carregar personagens:", err)
        mensagemErro.classList.remove("oculto")
    }finally{
        carregando.classList.add("oculto")
    }
}

// Renderizar a página atual
function renderizarPaginaAtual(){
    const inicio = (paginaAtual-1)*tamanhoPagina
    const fim = inicio + tamanhoPagina
    const itens = personagensExibidos.slice(inicio,fim)
    renderizarLista(itens)
    infoPagina.textContent = `Página ${paginaAtual} / ${Math.ceil(personagensExibidos.length/tamanhoPagina)}`
}

// Renderizar os cards
function renderizarLista(itens){
    lista.innerHTML=""
    if(itens.length===0){
        mensagemVazio.classList.remove("oculto")
        return
    }
    mensagemVazio.classList.add("oculto")
    itens.forEach(personagem=>{
        const card = document.createElement("div")
        card.className="card"
        card.innerHTML = `
            <img src="${personagem.image}">
            <h3>${personagem.name}</h3>
            <p>${personagem.species}</p>
        `
        card.addEventListener("click", ()=> mostrarDetalhe(personagem))
        lista.appendChild(card)
    })
}

// Mostrar detalhes no modal
function mostrarDetalhe(personagem){
    detalhe.innerHTML = `
        <h2>${personagem.name}</h2>
        <img src="${personagem.image}">
        <p>Status: ${personagem.status}</p>
        <p>Espécie: ${personagem.species}</p>
        <p>Gênero: ${personagem.gender}</p>
        <p>Origem: ${personagem.origin.name}</p>
    `
    modal.classList.remove("oculto")
}

// Fechar modal
fecharModal.onclick = ()=> modal.classList.add("oculto")

// Busca client-side
busca.addEventListener("input", ()=>{
    const texto = busca.value.toLowerCase()
    paginaAtual = 1
    if(texto===""){
        personagensExibidos = todosPersonagens
    } else {
        personagensExibidos = todosPersonagens.filter(p => p.name.toLowerCase().includes(texto))
    }
    renderizarPaginaAtual()
})

// Paginação
botaoProximo.onclick = ()=>{
    const maxPagina = Math.ceil(personagensExibidos.length/tamanhoPagina)
    if(paginaAtual<maxPagina){
        paginaAtual++
        renderizarPaginaAtual()
    }
}

botaoAnterior.onclick = ()=>{
    if(paginaAtual>1){
        paginaAtual--
        renderizarPaginaAtual()
    }
}

// Iniciar carregamento
carregarTodosPersonagens()