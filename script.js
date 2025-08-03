const carrosselContainerImagens = document.querySelector(
  ".carrosselContainerImagens"
);
const carrosselImagens = document.querySelectorAll(".carrosselImagem");
const botaoAnterior = document.querySelector(".carrosselBotao.anterior");
const botaoProximo = document.querySelector(".carrosselBotao.proximo");
const containerIndicadores = document.querySelector(".carrosselIndicadores");

let slideAtualIndex = 0;
const totalSlides = carrosselImagens.length;

const botaoLike = document.querySelector(".icones").firstElementChild;
const likes = document.querySelector("#numeroLikes").firstElementChild;
let numeroLikes = Number(likes.innerHTML);
const botaoComentario = document.querySelector(".icones").lastElementChild;
const areaComentarios = document.querySelector("#comentarios");

const botao3Pontos = document.querySelector("#botaoPontos");
const caixaFlutuante = document.querySelector("#caixaFlutuante");
const listaFlutuante = document.querySelector("#listaFlutuante");

const listaComentarios = document.querySelector(".listaComentarios");
const inputComentario = document.querySelector("#inputComentario");
const botaoEnviarComentario = document.querySelector("#botaoEnviarComentario");

const botaoSalvar = document.querySelector(".fa-bookmark");

const imagemPerfil = document.querySelector("#imagemPerfil");

function criarIndicadores() {
  for (let i = 0; i < totalSlides; i++) {
    const indicador = document.createElement("i");
    indicador.classList.add("fa-solid", "fa-circle");
    indicador.dataset.slideIndex = i;
    containerIndicadores.appendChild(indicador);

    indicador.addEventListener("click", function () {
      apareceSlide(i);
    });
  }
}

function apareceSlide(index) {
  if (index < 0) {
    slideAtualIndex = 0;
  } else if (index >= totalSlides) {
    slideAtualIndex = totalSlides - 1;
  } else {
    slideAtualIndex = index;
  }

  const direcaoSlides = -slideAtualIndex * 100;
  carrosselContainerImagens.style.transform = `translateX(${direcaoSlides}%)`;

  atualizaIndicadores();
}

function atualizaIndicadores() {
  const todosIndicadores = document.querySelectorAll(".fa-circle");
  todosIndicadores.forEach((indicador) => {
    indicador.classList.remove("ativo");
  });

  containerIndicadores.children[slideAtualIndex].classList.add("ativo");
}

botaoAnterior.addEventListener("click", function () {
  apareceSlide(slideAtualIndex - 1);
});

botaoProximo.addEventListener("click", function () {
  apareceSlide(slideAtualIndex + 1);
});

botaoLike.addEventListener("click", daLike);
carrosselContainerImagens.addEventListener("dblclick", daLike);

function daLike() {
  botaoLike.classList.toggle("curtido");
  if (botaoLike.classList.contains("curtido")) {
    numeroLikes++;
    likes.textContent = numeroLikes;
  } else {
    numeroLikes--;
    likes.textContent = numeroLikes;
  }
}

botaoComentario.addEventListener("click", function () {
  areaComentarios.classList.toggle("hide");
  botaoComentario.classList.toggle("comentarioAtivo");
});

botao3Pontos.addEventListener("click", function () {
  caixaFlutuante.classList.toggle("hide");
  listaFlutuante.firstElementChild.classList.add("denunciar");
});

listaFlutuante.lastElementChild.addEventListener("click", function () {
  caixaFlutuante.classList.toggle("hide");
});

function enviarComentario() {
  const valorComentario = inputComentario.value.trim();

  if (valorComentario === "") {
    alert("Por favor, digite um comentário.");
    return;
  }

  const novoItemComentario = document.createElement("li");
  novoItemComentario.classList.add("itemListaComentarios");

  const iconeUsuario = document.createElement("i");
  iconeUsuario.classList.add("fa-solid", "fa-circle-user");

  const nomeUsuarioComentario = document.createElement("strong");
  nomeUsuarioComentario.textContent = "username";

  const textoComentario = document.createTextNode(` ${valorComentario}`);

  novoItemComentario.appendChild(iconeUsuario);
  novoItemComentario.appendChild(nomeUsuarioComentario);
  novoItemComentario.appendChild(textoComentario);

  listaComentarios.appendChild(novoItemComentario);

  inputComentario.value = "";
}

botaoEnviarComentario.addEventListener("click", enviarComentario);

inputComentario.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    enviarComentario();
  }
});

botaoSalvar.addEventListener("click", function () {
  botaoSalvar.classList.toggle("salvo");
  if (botaoSalvar.classList.contains("salvo")) {
    setTimeout(function () {
      alert("Post salvo com sucesso!");
    }, 350);
  } else {
    setTimeout(function () {
      alert("Post não está mais salvo!");
    }, 350);
  }
});

imagemPerfil.addEventListener("mouseenter", function () {
  imagemPerfil.classList.add("zoom");
});

imagemPerfil.addEventListener("mouseleave", function () {
  imagemPerfil.classList.remove("zoom");
});

criarIndicadores();
apareceSlide(slideAtualIndex);
