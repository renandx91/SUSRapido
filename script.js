const modal = document.getElementById("triagemModal");
const conteudoInicial = document.getElementById("triagemConteudo");

function abrirTriagem() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function fecharTriagem() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function escapeHTML(text) {
  return text.replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function mostrarResultado() {
  const sintomas = document.getElementById("sintomas").value.trim();
  const duracao = document.getElementById("duracao").value;
  const grave = document.getElementById("grave").checked;
  const erro = document.getElementById("formError");

  if (!sintomas || !duracao) {
    erro.textContent = "Preencha os sintomas e selecione há quanto tempo começou.";
    return;
  }

  erro.textContent = "";

  const titulo = grave
    ? "Procure atendimento de urgência"
    : "Consulte uma unidade de saúde";

  const mensagem = grave
    ? "Como você informou sintomas intensos ou piora rápida, procure uma UPA ou pronto atendimento agora. Se for uma emergência, ligue 192 (SAMU)."
    : "Esta demonstração não consegue determinar a gravidade dos sintomas. Para orientação adequada, procure uma UBS ou um profissional de saúde. Se houver piora ou sinais de emergência, procure atendimento urgente.";

  conteudoInicial.innerHTML = `
    <span class="eyebrow">ORIENTAÇÃO DEMONSTRATIVA</span>
    <h2>${titulo}</h2>
    <div class="result-panel ${grave ? "result-warning" : ""}">
      <strong>${grave ? "Atenção à sua segurança" : "Próximo passo"}</strong>
      <p>${mensagem}</p>
    </div>
    <p><strong>Informações registradas nesta demonstração:</strong><br>${escapeHTML(sintomas)}<br>${escapeHTML(duracao)}</p>
    <p>Este resultado é apenas ilustrativo: não é uma classificação pelo Protocolo de Manchester, não é diagnóstico e não envia alertas a unidades de saúde.</p>
    <button class="primary-btn full-btn" onclick="concluirTriagem()">Encontrar unidades próximas →</button>
    <button class="primary-btn full-btn" onclick="reiniciarTriagem()">Fazer novamente</button>
    <button class="secondary-link" style="border:0;background:none;margin-top:18px" onclick="fecharTriagem()">Fechar</button>
  `;
}

function reiniciarTriagem() {
  conteudoInicial.innerHTML = `
    <span class="eyebrow">ORIENTAÇÃO INICIAL</span>
    <h2 id="modalTitle">Vamos começar?</h2>
    <p>Responda às perguntas abaixo. Esta demonstração não substitui uma avaliação feita por um profissional de saúde.</p>
    <label for="sintomas">O que você está sentindo?</label>
    <textarea id="sintomas" placeholder="Ex.: dor de cabeça, tosse, febre..."></textarea>
    <label for="duracao">Há quanto tempo está sentindo isso?</label>
    <select id="duracao"><option value="">Selecione uma opção</option><option>Começou hoje</option><option>Há alguns dias</option><option>Há uma semana ou mais</option></select>
    <label class="check-label"><input type="checkbox" id="grave"> Estou com sintomas intensos ou piorando rapidamente.</label>
    <button class="primary-btn full-btn" onclick="mostrarResultado()">Ver orientação demonstrativa →</button>
    <p class="form-error" id="formError"></p>
  `;
}

function concluirTriagem() {
  window.location.href = "unidades.html";
}

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("navMenu").classList.toggle("show");
});

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navMenu").classList.remove("show");
  });
});

modal.addEventListener("click", event => {
  if (event.target === modal) {
    fecharTriagem();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    fecharTriagem();
  }
});
