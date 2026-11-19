const chapters = [
{
 title:"A Vila dos Aprendizes", subtitle:"Uma ideia simples: transformar um problema em outro.", roman:"I",
 lesson:`Imagine que você tem um problema difícil para resolver e conhece outro problema para o qual já existe uma solução. E se pudesse transformar o primeiro problema em uma versão do segundo? Essa é a ideia central da <b>redução</b>.<br><br>Em vez de resolver um problema diretamente, convertemos sua pergunta para outro problema, aproveitando uma maneira conhecida de resolvê-lo.`,
 example:`Pense em dois desafios de um jogo. O desafio A pergunta: “existe uma rota entre duas salas?”. O desafio B pergunta: “a sala final pode ser alcançada?”. Se conseguirmos transformar cada pergunta de A em uma pergunta equivalente de B, podemos usar a solução de B para responder A.`,
 question:"Qual frase melhor descreve a ideia de uma redução?",
 choices:["Transformar uma pergunta de um problema em uma pergunta equivalente de outro problema.","Apagar um problema para que ele deixe de existir.","Provar que dois problemas têm exatamente o mesmo nome.","Executar todos os programas possíveis."], answer:0,
 explain:"Reduzir é transformar instâncias de um problema em instâncias de outro, preservando a resposta. Assim, uma solução para o segundo pode ajudar a resolver o primeiro.",
 reward:"Mapa das Transformações"
},
{
 title:"A Floresta dos Símbolos", subtitle:"Aprenda a ler A ≤m B sem medo da notação.", roman:"II",
 lesson:`A expressão <span class="key">A ≤m B</span> é lida como “A é redutível a B por redução many-one” (ou redução mapeável). Não é uma conta de matemática comum.<br><br><b>A</b> é o problema que queremos transformar. <b>B</b> é o problema para o qual vamos transformar. A seta aponta para o problema que recebe a transformação: começamos em A e chegamos a B.`,
 example:`Uma função computável <span class="key">f</span> recebe uma entrada <span class="key">x</span> do problema A e produz uma nova entrada <span class="key">f(x)</span> para o problema B. O ponto essencial é preservar a resposta: <span class="key">x ∈ A ⇔ f(x) ∈ B</span>. O símbolo ⇔ significa “se, e somente se”.`,
 question:"Em A ≤m B, qual problema é transformado para qual?",
 choices:["B é transformado em A.","A é transformado em B.","A e B são misturados sem regra.","A transformação vai sempre para um problema mais fácil."], answer:1,
 explain:"A é o problema de origem e B é o destino. A função f transforma cada entrada x de A em uma entrada f(x) de B.",
 reward:"Pergaminho da Notação"
},
{
 title:"A Biblioteca dos Decidíveis", subtitle:"O que significa um problema ser decidível?", roman:"III",
 lesson:`Um problema é <b>decidível</b> quando existe um algoritmo que sempre termina e responde corretamente “SIM” ou “NÃO” para qualquer entrada válida.<br><br>“Sempre termina” é fundamental: não basta acertar quando responde; ele não pode ficar executando para sempre em alguma entrada.`,
 example:`Imagine um programa que verifica se um número é par. Para qualquer número inteiro, ele calcula o resultado e termina. Portanto, esse problema é decidível. Já um programa que pode ficar preso em um laço infinito não é, por esse motivo sozinho, um decisor.`,
 question:"Qual característica é obrigatória para um algoritmo decisor?",
 choices:["Responder apenas quando a entrada é pequena.","Sempre terminar e dar a resposta correta SIM ou NÃO.","Ser escrito em C++.","Usar inteligência artificial."], answer:1,
 explain:"Um decisor precisa parar em todas as entradas e responder corretamente. Terminar sempre é parte da definição de decidibilidade.",
 reward:"Chave dos Decidíveis"
},
{
 title:"A Oficina da Função", subtitle:"A função de redução precisa ser computável.", roman:"IV",
 lesson:`A redução é construída por uma função <span class="key">f</span>. Para ser uma redução many-one válida, essa função precisa ser <b>computável</b>: deve existir um procedimento efetivo que, recebendo x, consiga produzir f(x) e terminar.<br><br>Ela não precisa resolver o problema B. Sua tarefa é apenas preparar a nova entrada.`,
 example:`Se recebemos uma descrição de máquina M e uma palavra w, a função pode construir a descrição de outra máquina N. Construir essa descrição deve ser um processo que termina. Depois, a pergunta sobre N será analisada pelo problema B.`,
 question:"A função f usada na redução precisa:",
 choices:["Resolver completamente o problema B.","Ser computável e terminar ao produzir f(x).","Saber antecipadamente se x pertence a A.","Ser aleatória."], answer:1,
 explain:"A função de redução apenas transforma a entrada. Ela precisa ser computável e terminar para cada entrada, mas não precisa resolver B.",
 reward:"Ferramenta do Construtor"
},
{
 title:"A Fortaleza da Contradição", subtitle:"Como uma redução ajuda a provar indecidibilidade.", roman:"V",
 lesson:`Uma técnica comum é a <b>prova por contradição</b>. Começamos supondo que um problema B é decidível. Depois mostramos que, se B tivesse um decisor, poderíamos usar a redução para decidir um problema A que já sabemos ser indecidível.<br><br>Isso é impossível. Portanto, a suposição inicial — de que B é decidível — deve estar errada.`,
 example:`A direção importa: para transferir a indecidibilidade de A para B, precisamos construir <span class="key">A ≤m B</span>. Se B fosse decidível, a redução permitiria decidir A. Como A é indecidível, chegamos à contradição e concluímos que B também é indecidível.`,
 question:"Para provar que B é indecidível usando um problema A já conhecido como indecidível, qual direção devemos demonstrar?",
 choices:["B ≤m A.","A ≤m B.","A = B obrigatoriamente.","Nenhuma redução é necessária."], answer:1,
 explain:"A ≤m B é a direção correta. Se B fosse decidível, poderíamos transformar entradas de A em entradas de B e decidir A, contradizendo sua indecidibilidade.",
 reward:"Escudo da Contradição"
},
{
 title:"O Reino das Máquinas", subtitle:"A grande construção: HALT_MT ≤m NE_MT.", roman:"VI",
 lesson:`Agora vamos entender a demonstração central do material.<br><br><b>HALT_MT</b> pergunta: “a máquina M para quando recebe a entrada w?”. Ela para se aceita ou rejeita; o importante é que a execução termina.<br><br><b>NE_MT</b> pergunta se a linguagem de uma máquina é não vazia: <span class="key">NE_MT = {⟨N⟩ | L(N) ≠ ∅}</span>. Em palavras: existe pelo menos uma entrada que N aceita?`,
 example:`Recebemos ⟨M,w⟩ e construímos uma máquina N. A máquina N ignora a entrada x que receber e simula M usando sempre w. Se M parar (aceitando ou rejeitando), N aceita x. Se M nunca parar, N também nunca aceita x. Assim, M para em w exatamente quando N aceita alguma entrada.`,
 question:"O que NE_MT pergunta sobre a máquina N?",
 choices:["Se N para em todas as entradas.","Se existe pelo menos uma entrada que N aceita.","Se N tem mais estados que M.","Se N rejeita todas as entradas."], answer:1,
 explain:"NE_MT verifica se L(N) não é vazia. Isso significa que existe ao menos uma palavra aceita por N.",
 reward:"Insígnia das Máquinas"
},
{
 title:"A Ponte da Equivalência", subtitle:"Verifique os dois lados da construção.", roman:"VII",
 lesson:`A construção precisa preservar SIM e NÃO. Vamos conferir os dois casos.<br><br><b>Caso 1:</b> M para em w. Então, para qualquer entrada x, N simula M(w), observa que a simulação terminou e aceita x. Logo, L(N) não é vazia.<br><br><b>Caso 2:</b> M não para em w. Então N fica simulando para sempre, sem aceitar entrada alguma. Logo, L(N) é vazia.`,
 example:`Juntando os casos: <span class="key">⟨M,w⟩ ∈ HALT_MT ⇔ ⟨N⟩ ∈ NE_MT</span>. Portanto, a construção prova <span class="key">HALT_MT ≤m NE_MT</span>.`,
 question:"Se M não para quando recebe w, o que acontece com N?",
 choices:["N aceita imediatamente a entrada x.","N rejeita x depois de um segundo.","N fica simulando para sempre e não aceita x.","N muda a entrada w."], answer:2,
 explain:"N ignora x e simula M em w. Se M nunca termina, N também nunca chega ao comando de aceitar. Portanto, não aceita nenhuma entrada.",
 reward:"Ponte da Equivalência"
},
{
 title:"O Julgamento Final", subtitle:"Conclua a prova por contradição.", roman:"VIII",
 lesson:`Já sabemos que HALT_MT é indecidível e construímos uma redução <span class="key">HALT_MT ≤m NE_MT</span>.<br><br>Suponha, para obter uma contradição, que NE_MT fosse decidível. Poderíamos transformar qualquer ⟨M,w⟩ em ⟨N⟩ e usar o decisor de NE_MT para descobrir se M para em w. Isso decidiria HALT_MT — impossível.`,
 example:`Logo, NE_MT é indecidível. A redução não diz que HALT_MT e NE_MT são o mesmo problema; ela mostra que resolver NE_MT permitiria resolver HALT_MT.`,
 question:"Qual conclusão segue de HALT_MT ≤m NE_MT e da indecidibilidade de HALT_MT?",
 choices:["NE_MT é decidível.","NE_MT também é indecidível.","HALT_MT passa a ser decidível.","Os dois problemas são idênticos."], answer:1,
 explain:"Se NE_MT fosse decidível, a redução permitiria decidir HALT_MT. Como HALT_MT é indecidível, NE_MT também precisa ser indecidível.",
 reward:"Coroa da Demonstração"
},
{
 title:"A Estrada da Transitividade", subtitle:"Uma redução pode ser encadeada com outra.", roman:"IX",
 lesson:`A redução tem uma propriedade importante chamada <b>transitividade</b>. Se <span class="key">A ≤m B</span> e <span class="key">B ≤m C</span>, então <span class="key">A ≤m C</span>.<br><br>Em termos simples: se conseguimos transformar A em B e B em C preservando as respostas, podemos combinar as transformações para levar A diretamente a C.`,
 example:`Primeiro aplicamos f para transformar x de A em f(x) de B. Depois aplicamos g para transformar f(x) em g(f(x)) de C. A transformação combinada é g∘f.`,
 question:"Se A ≤m B e B ≤m C, o que podemos concluir?",
 choices:["C ≤m A.","A ≤m C.","A = C.","B deixa de existir."], answer:1,
 explain:"Pela transitividade, as duas reduções podem ser compostas: A ≤m C.",
 reward:"Selo da Transitividade"
},
{
 title:"O Pântano dos Erros", subtitle:"Desvie das confusões mais comuns.", roman:"X",
 lesson:`Algumas afirmações parecem razoáveis, mas estão erradas:<br><br>• Redução não significa que A e B são iguais.<br>• A função de redução não resolve B; apenas transforma entradas.<br>• É necessário preservar SIM e NÃO, não apenas um dos casos.<br>• Para transferir indecidibilidade de A para B, use A ≤m B.`,
 example:`A equivalência <span class="key">x ∈ A ⇔ f(x) ∈ B</span> resume a preservação. Se ela falhar em um dos sentidos, a transformação pode produzir respostas erradas.`,
 question:"Qual afirmação sobre redução é FALSA?",
 choices:["A função de redução transforma entradas.","A redução preserva a resposta SIM e NÃO.","A redução significa que A e B são exatamente o mesmo problema.","A função precisa ser computável."], answer:2,
 explain:"A redução não torna os problemas idênticos. Ela estabelece uma transformação que preserva a resposta entre suas instâncias.",
 reward:"Amuleto contra Erros"
},
{
 title:"A Câmara do Mestre", subtitle:"Reúna o que aprendeu e prove que domina a ideia.", roman:"XI",
 lesson:`Você chegou ao último teste de compreensão. Antes de responder, lembre-se do caminho: uma redução transforma instâncias; f precisa ser computável; a equivalência preserva SIM e NÃO; e A ≤m B permite transferir a decidibilidade de B para A — ou a indecidibilidade de A para B.`,
 example:`Na prova estudada, construímos N a partir de ⟨M,w⟩. N ignora sua entrada e simula M em w. Se M parar, N aceita; se M não parar, N não aceita nenhuma entrada. Portanto, HALT_MT ≤m NE_MT.`,
 question:"Complete a ideia central: se A é indecidível e A ≤m B, então...",
 choices:["B é necessariamente decidível.","B também é indecidível.","A e B são o mesmo conjunto.","A redução não permite concluir nada."], answer:1,
 explain:"Se B fosse decidível, A também seria decidível por meio da redução. Isso contradiz a hipótese de que A é indecidível. Logo, B é indecidível.",
 reward:"Título: Guardião da Redutibilidade"
}
];

const state = load();
let current = Math.min(state.chapter || 0, chapters.length-1);
let answered = false;
let rollValue = null;

function fresh(){return {chapter:0,xp:0,hp:30,gold:0,done:[],items:[],level:1};}
function load(){try{return {...fresh(),...JSON.parse(localStorage.getItem("cronicasRedutibilidade")||"{}")}}catch(e){return fresh()}}
function save(){localStorage.setItem("cronicasRedutibilidade",JSON.stringify(state));renderStats()}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function renderStats(){
 const level=Math.floor(state.xp/100)+1, within=state.xp%100;
 state.level=level;
 document.getElementById("levelText").textContent="Nível "+level;
 document.getElementById("xpText").textContent=within+" / 100 XP";
 document.getElementById("xpBar").style.width=within+"%";
 document.getElementById("hpText").textContent=state.hp+" / 30";
 document.getElementById("goldText").textContent=state.gold;
 document.getElementById("rank").textContent=level>=8?"Mestre da Redutibilidade":level>=5?"Explorador do Conhecimento":level>=3?"Estudioso": "Iniciante";
 document.getElementById("inventory").textContent=state.items.length?state.items.join(" • "):"Bolsa vazia. Complete desafios para encontrar itens.";
}
function renderNav(){
 const nav=document.getElementById("chapterNav");nav.innerHTML="";
 chapters.forEach((c,i)=>{const a=document.createElement("div");a.className="chapter-link "+(i===current?"active ":"")+(state.done.includes(i)?"done":"");a.innerHTML=`<span class="dot">${state.done.includes(i)?"✓":i+1}</span><span>${c.title}</span>`;a.onclick=()=>{if(i<=Math.max(...state.done,-1)+1){current=i;state.chapter=i;save();render()}else toast("Conclua os capítulos anteriores primeiro.");};nav.appendChild(a)});
}
function render(){
 answered=false;rollValue=null;renderStats();renderNav();
 const c=chapters[current];
 document.getElementById("chapterTitle").textContent=c.title;
 document.getElementById("chapterSubtitle").textContent=c.subtitle;
 document.getElementById("chapterNumber").textContent=c.roman;
 const content=document.getElementById("gameContent");
 if(current>=chapters.length){content.innerHTML="";return}
 content.innerHTML=`
 <span class="section-label">📖 Aprenda antes de enfrentar o desafio</span>
 <h2>${c.title}</h2>
 <div class="lesson-box"><h3>O que você precisa saber</h3><p>${c.lesson}</p></div>
 <div class="example-box"><h3>Exemplo explicado</h3><p>${c.example}</p></div>
 <div class="dice-box"><div class="dice-layout"><div class="die" id="die">D20</div><div><b>Seu dado de vinte lados</b><div class="dice-copy">Role para descobrir sua sorte nesta etapa. O dado influencia a recompensa, mas não substitui a compreensão: a resposta precisa estar correta.</div><button class="btn secondary" id="rollBtn">🎲 Lançar D20</button></div></div>
 <div class="question-box"><span class="section-label">DESAFIO DE CONHECIMENTO</span><h3>${c.question}</h3><div id="choices">${c.choices.map((x,i)=>`<button class="choice" data-choice="${i}">${String.fromCharCode(65+i)}) ${x}</button>`).join("")}</div><div id="feedback"></div></div>
 <div class="actions"><button class="btn" id="nextBtn" disabled>${current===chapters.length-1?"Concluir jornada":"Próxima região →"}</button></div>`;
 document.getElementById("rollBtn").onclick=roll;
 document.querySelectorAll(".choice").forEach(b=>b.onclick=()=>answer(Number(b.dataset.choice)));
 document.getElementById("nextBtn").onclick=next;
}
function roll(){
 if(rollValue!==null)return;
 rollValue=Math.floor(Math.random()*20)+1;
 const die=document.getElementById("die");die.textContent=rollValue;die.style.transform=`rotate(${(Math.random()*14-7).toFixed(1)}deg)`;
 document.getElementById("rollBtn").disabled=true;
 toast("Você rolou "+rollValue+" no D20!");
}
function answer(choice){
 if(answered)return;answered=true;
 const c=chapters[current],correct=choice===c.answer;
 document.querySelectorAll(".choice").forEach((b,i)=>{b.disabled=true;if(i===c.answer)b.classList.add("correct");if(i===choice&&!correct)b.classList.add("wrong")});
 const fb=document.getElementById("feedback");
 if(correct){
   const bonus=rollValue===null?0:Math.floor(rollValue/5)*5;
   const gain=35+bonus;state.xp+=gain;state.gold+=10+(rollValue||0);
   if(!state.done.includes(current))state.items.push(c.reward);
   state.done=[...new Set([...state.done,current])];
   fb.className="feedback";fb.innerHTML=`<h3>✦ Resposta correta! +${gain} XP</h3><p>${c.explain}</p><p class="small">${rollValue===null?"Você não rolou o dado; recebeu a recompensa básica.":"Seu D20: "+rollValue+". A rolagem aumentou sua recompensa, mas foi seu conhecimento que venceu o desafio."}</p>`;
   toast("Desafio concluído: "+c.reward);
 }else{
   state.hp=Math.max(0,state.hp-5);
   fb.className="feedback bad";fb.innerHTML=`<h3>Você ainda não superou este desafio.</h3><p>${c.explain}</p><p class="small">Você perdeu 5 pontos de vida. Leia novamente a explicação e tente outra vez. A resposta correta foi destacada.</p>`;
   answered=false;
 }
 save();renderNav();
 document.getElementById("nextBtn").disabled=!correct;
 document.getElementById("nextBtn").textContent=current===chapters.length-1?"Concluir jornada":"Próxima região →";
}
function next(){
 if(!state.done.includes(current))return;
 if(current===chapters.length-1){showEnding();return}
 current++;state.chapter=current;save();render();
}
function showEnding(){
 const content=document.getElementById("gameContent");
 document.getElementById("chapterTitle").textContent="A Lenda Continua";
 document.getElementById("chapterSubtitle").textContent="Você completou a primeira jornada.";
 document.getElementById("chapterNumber").textContent="✦";
 content.innerHTML=`<div style="text-align:center;padding:25px 8px"><div style="font-size:65px">🏆</div><span class="section-label">JORNADA CONCLUÍDA</span><h2>Guardião da Redutibilidade</h2><p>Você percorreu as regiões, estudou os conceitos desde o início e enfrentou os desafios sobre redução de problemas.</p><div class="lesson-box" style="text-align:left"><h3>O que você aprendeu</h3><p>• Ideia de redução e notação A ≤m B.<br>• Função computável f e preservação x ∈ A ⇔ f(x) ∈ B.<br>• Decidibilidade e prova por contradição.<br>• Construção de HALT_MT ≤m NE_MT.<br>• Transitividade e erros comuns.</p></div><p><b>Seu resultado:</b> ${state.xp} XP · ${state.gold} moedas · ${state.done.length}/${chapters.length} desafios concluídos.</p><button class="btn" id="reviewBtn">Revisar o primeiro capítulo</button></div>`;
 document.getElementById("reviewBtn").onclick=()=>{current=0;state.chapter=0;save();render()};
 renderStats();renderNav();
}
document.getElementById("resetBtn").onclick=()=>{if(confirm("Tem certeza de que deseja apagar todo o progresso desta jornada?")){Object.assign(state,fresh());current=0;save();render();toast("Jornada reiniciada.")}};
render();
