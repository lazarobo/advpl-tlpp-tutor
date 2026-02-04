import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QuizQuestion {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

interface QuizTopic {
    id: string;
    title: string;
    description: string;
    icon: string;
    questions: QuizQuestion[];
}

@Component({
    selector: 'app-quiz',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.css'
})
export class QuizComponent {
    selectedTopic: QuizTopic | null = null;

    // Lista de Quizzes com 7 Tópicos, 10 Perguntas cada
    topics: QuizTopic[] = [
        {
            id: 'basics',
            title: 'Fundamentos AdvPL',
            description: 'Teste seus conhecimentos sobre variáveis, tipos e operadores básicos.',
            icon: '📚',
            questions: [
                { question: 'Qual variável é utilizada para escopo local de função?', options: ['Private', 'Public', 'Local', 'Static'], correctIndex: 2, explanation: 'Local é a variável que só existe dentro da função onde foi criada.' },
                { question: 'Qual o operador de concatenação de strings em AdvPL?', options: ['&', '+', '.', '||'], correctIndex: 1, explanation: 'Em AdvPL usamos o sinal de "+" para concatenar strings.' },
                { question: 'O que a função ValType() retorna?', options: ['O valor da variável', 'O tipo da variável', 'O tamanho da variável', 'Se é válida'], correctIndex: 1, explanation: 'ValType retorna uma letra indicando o tipo (C, N, D, L, M, O, U).' },
                { question: 'Qual o valor padrão de uma variável Boolean (Logical)?', options: ['True', 'False', '.F.', 'Null'], correctIndex: 2, explanation: 'Em AdvPL, o literal falso é representado por .F.' },
                { question: 'Como se comenta uma linha inteira em AdvPL?', options: ['// ou *', '#', '--', '<!--'], correctIndex: 0, explanation: '// ou * no início da linha são usados par comentários.' },
                { question: 'Qual tipo de dado é usado para Data?', options: ['Date', 'Time', 'DateTime', 'Timestamp'], correctIndex: 0, explanation: 'AdvPL usa o tipo Date (D) para datas.' },
                { question: 'Qual a função para incluir um arquivo de cabeçalho?', options: ['import', '#include', 'using', 'require'], correctIndex: 1, explanation: '#include "arquivo.ch" é a diretiva de pré-processador correta.' },
                { question: 'O que significa o escopo Private?', options: ['Visível em todo sistema', 'Visível na função e chamadas', 'Apenas na função', 'Apenas na classe'], correctIndex: 1, explanation: 'Private é visível na função criadora e em todas as funções chamadas por ela.' },
                { question: 'Qual operador é usado para verificar igualdade?', options: ['=', '==', '===', 'eq'], correctIndex: 0, explanation: 'Em comparações simples usa-se "=" ou "==" (exatidão cheia).' },
                { question: 'Qual a extensão padrão de um arquivo de código fonte AdvPL antigo?', options: ['.prw', '.adv', '.src', '.code'], correctIndex: 0, explanation: '.prw (Program Win) é a extensão clássica.' }
            ]
        },
        {
            id: 'strings',
            title: 'Strings e Datas',
            description: 'Manipulação de textos, conversões e operações com datas.',
            icon: '🔡',
            questions: [
                { question: 'Qual função converte Data para Caractere?', options: ['CtoD', 'DtoC', 'Str', 'Val'], correctIndex: 1, explanation: 'DtoC (Date to Character) converte data para string "dd/mm/aa".' },
                { question: 'Como pegar os 3 primeiros caracteres de "TOTVS"?', options: ['Left("TOTVS", 3)', 'Right("TOTVS", 3)', 'SubStr("TOTVS", 3)', 'Mid("TOTVS", 3)'], correctIndex: 0, explanation: 'Left retorna os N primeiros caracteres à esquerda.' },
                { question: 'Qual função remove espaços das duas pontas da string?', options: ['LTrim', 'RTrim', 'AllTrim', 'Trim'], correctIndex: 2, explanation: 'AllTrim remove espaços do início e do fim.' },
                { question: 'O que retorna At("A", "CASA")?', options: ['1', '2', '0', '4'], correctIndex: 1, explanation: 'Retorna a posição da primeira ocorrência de "A", que é 2.' },
                { question: 'Qual função converte String para Número?', options: ['Str', 'Val', 'CtoD', 'Len'], correctIndex: 1, explanation: 'Val() converte string numérica para number.' },
                { question: 'Como somar 5 dias à data atual?', options: ['Date() + 5', 'DateAdd(5)', 'AddDays(5)', 'Plus(5)'], correctIndex: 0, explanation: 'Basta somar o número de dias diretamente à variável do tipo Data.' },
                { question: 'Qual função retorna o ano de uma data?', options: ['Year()', 'WYear()', 'GetYear()', 'Ano()'], correctIndex: 0, explanation: 'Year(dData) retorna o ano numérico.' },
                { question: 'Para converter Data em String AAAAMMDD (Indexável):', options: ['DtoC', 'DtoS', 'Str', 'Format'], correctIndex: 1, explanation: 'DtoS (Date to Sortable) retorna formato AAAAMMDD.' },
                { question: 'Qual função substitui texto dentro de uma string?', options: ['Replace', 'StrTran', 'SubStr', 'Change'], correctIndex: 1, explanation: 'StrTran(cTexto, cDe, cPara) faz a substituição.' },
                { question: 'Como verificar se uma string está vazia?', options: ['IsEmpty()', 'Empty()', 'Null()', 'Blank()'], correctIndex: 1, explanation: 'Empty() retorna .T. se a string for vazia ou nula.' }
            ]
        },
        {
            id: 'database',
            title: 'Banco de Dados',
            description: 'Queries, navegação e manipulação de registros DBF/SQL.',
            icon: '💾',
            questions: [
                { question: 'Qual comando deve ser usado SEMPRE na query SQL para evitar erro de banco?', options: ['ChangeQuery', 'FixSQL', 'ParseQuery', 'NoLock'], correctIndex: 0, explanation: 'ChangeQuery() adapta a sintaxe SQL padrão para o banco específico do ambiente.' },
                { question: 'Como posicionar no primeiro registro da tabela?', options: ['DBGoTop()', 'DBGoBottom()', 'DBSkip()', 'DBSeek()'], correctIndex: 0, explanation: 'DBGoTop() move o cursor para o início.' },
                { question: 'Para buscar um registro por índice usamos:', options: ['DBLocate', 'DBSeek', 'DBFind', 'DBSearch'], correctIndex: 1, explanation: 'DBSeek() busca pela chave do índice ativo.' },
                { question: 'Como selecionar a ordem (índice) da tabela?', options: ['DBSetOrder()', 'DBOrder()', 'DBIndex()', 'SetIndex()'], correctIndex: 0, explanation: 'DBSetOrder(n) define o índice ativo.' },
                { question: 'O que a função Alias() retorna?', options: ['O nome da tabela ativa', 'O apelido do campo', 'O nome do usuário', 'O banco de dados'], correctIndex: 0, explanation: 'Retorna o Alias (nome) da área de trabalho atual.' },
                { question: 'Como verificar se chegou ao fim do arquivo?', options: ['BOF()', 'EOF()', 'End()', 'Last()'], correctIndex: 1, explanation: 'EOF() (End Of File) retorna verdadeiro se o ponteiro passou do último registro.' },
                { question: 'Qual classe é usada para queries em AdvPL?', options: ['TQuery', 'DBQuery', 'MPSQL', 'Statement'], correctIndex: 1, explanation: 'Comumente usa-se a função DBUseArea com query ou a classe FWPreparedStatement hoje em dia, mas o conceito é "Query".' },
                { question: 'TCQuery serve para:', options: ['Executar query e abrir alias', 'Apenas executar update', 'Criar tabela', 'Apagar banco'], correctIndex: 0, explanation: 'TCQuery executa o select e abre um cursor (alias) com os dados.' },
                { question: 'Para apagar logicamente um registro (mark for delete):', options: ['DBDelete()', 'DBDrop()', 'Delete', 'Erase'], correctIndex: 0, explanation: 'DBDelete() marca o registro para deleção (D_E_L_E_T_).' },
                { question: 'Qual função fecha a área de trabalho (tabela)?', options: ['Close', 'DBCloseArea', 'Exit', 'ShutDown'], correctIndex: 1, explanation: 'DBCloseArea() encerra o uso da tabela atual.' }
            ]
        },
        {
            id: 'tables',
            title: 'Tabelas do Protheus',
            description: 'Conheça as tabelas SX (Dicionários) e de Negócio (SA1, SB1...).',
            icon: '📋',
            questions: [
                { question: 'O que armazena a tabela SX3?', options: ['Índices', 'Tabelas', 'Campos', 'Parâmetros'], correctIndex: 2, explanation: 'SX3 é o Dicionário de Campos.' },
                { question: 'Qual tabela guarda os Clientes?', options: ['SA1', 'SA2', 'SB1', 'SC5'], correctIndex: 0, explanation: 'SA1 é o cadastro de Clientes.' },
                { question: 'Qual tabela guarda os Produtos?', options: ['SB1', 'SB2', 'SA1', 'SC6'], correctIndex: 0, explanation: 'SB1 é o cadastro de Produtos.' },
                { question: 'Onde ficam os parâmetros do sistema (MV_...)?', options: ['SX6', 'SX5', 'SX1', 'SX2'], correctIndex: 0, explanation: 'SX6 armazena os parâmetros customizáveis.' },
                { question: 'Quem armazena os Pedidos de Venda (Cabeçalho)?', options: ['SC5', 'SC6', 'SC9', 'SD2'], correctIndex: 0, explanation: 'SC5 é o cabeçalho do pedido de venda.' },
                { question: 'Tabela de Fornecedores é a:', options: ['SA1', 'SA2', 'SA3', 'SA4'], correctIndex: 1, explanation: 'SA2 é Fornecedores.' },
                { question: 'Qual tabela contém as Perguntas (F12) dos relatórios?', options: ['SX1', 'SX2', 'SX3', 'SXG'], correctIndex: 0, explanation: 'SX1 armazena os grupos de perguntas.' },
                { question: 'Tabela de Movimentos de Estoque Internos?', options: ['SD3', 'SD1', 'SD2', 'SB2'], correctIndex: 0, explanation: 'SD3 registra as movimentações internas.' },
                { question: 'Onde ficam os gatilhos de campos?', options: ['SX7', 'SX9', 'SIX', 'SXA'], correctIndex: 0, explanation: 'SX7 é a tabela de Gatilhos.' },
                { question: 'Tabela de Índices do sistema:', options: ['SIX', 'SX2', 'SX3', 'SI1'], correctIndex: 0, explanation: 'SIX gerencia os índices criados pelo configurador.' }
            ]
        },
        {
            id: 'mvc',
            title: 'MVC (Model View Controller)',
            description: 'Arquitetura moderna do Protheus, Models e Views.',
            icon: '🏗️',
            questions: [
                { question: 'Qual função define o Modelo de Dados no MVC?', options: ['ModelDef', 'ViewDef', 'MenuDef', 'DataDef'], correctIndex: 0, explanation: 'Static Function ModelDef define as regras e estruturas de dados.' },
                { question: 'Qual função cria a estrutura de campos baseada no dicionário?', options: ['FWFormStruct', 'FWCreateStruct', 'MakeStruct', 'BuildStruct'], correctIndex: 0, explanation: 'FWFormStruct(1, "ALIAS") cria a estrutura do Model ou View.' },
                { question: 'O que é uma ViewDef?', options: ['Definição Visual', 'Definição de Dados', 'Definição de Menu', 'Definição de Banco'], correctIndex: 0, explanation: 'Define como os dados serão apresentados na tela.' },
                { question: 'Como se chama o componente principal de formulário no Model?', options: ['MPFormModel', 'MPFormView', 'FWModel', 'MainModel'], correctIndex: 0, explanation: 'MPFormModel é a classe base do modelo.' },
                { question: 'Para adicionar validação de linha no Grid usa-se:', options: ['SetLinePreFunc', 'SetUpdateFunc', 'bLinePost', 'bCommit'], correctIndex: 0, explanation: 'Métodos como SetLinePost, SetLinePre controlam validação.' },
                { question: 'O ID de um campo ou grid no MVC deve ser:', options: ['Único no fonte', 'Igual ao Alias', 'Numérico', 'Aleatório'], correctIndex: 0, explanation: 'Deve ser um identificador único (String) dentro da estrutura.' },
                { question: 'Qual método associa a View ao Model?', options: ['SetModel', 'Bind', 'Link', 'Connect'], correctIndex: 0, explanation: 'oView:SetModel(oModel) faz a ligação.' },
                { question: 'MenuDef deve retornar:', options: ['Um Array de opções', 'Um Objeto', 'Uma String', 'Void'], correctIndex: 0, explanation: 'Retorna um array com a estrutura do menu de operações.' },
                { question: 'Operação padrão de "Visualizar" tem código:', options: ['2', '3', '4', '5'], correctIndex: 0, explanation: '2=Visualizar, 3=Incluir, 4=Alterar, 5=Excluir.' },
                { question: 'Onde se aplicam as regras de negócio automáticas?', options: ['Model', 'View', 'Controller', 'Menu'], correctIndex: 0, explanation: 'As regras residem no Model para garantir integridade.' }
            ]
        },
        {
            id: 'tlpp',
            title: 'TLPP e POO',
            description: 'Novos recursos da linguagem, Classes e Tipagem.',
            icon: '🚀',
            questions: [
                { question: 'Qual a extensão para fontes TLPP?', options: ['.prw', '.tlpp', '.cpp', '.adv'], correctIndex: 1, explanation: 'Extensão .tlpp habilita o parser novo.' },
                { question: 'Como definir uma variável Integer tipada?', options: ['Local nVar as Integer', 'Local nVar', 'Integer nVar', 'Var nVar : Int'], correctIndex: 0, explanation: 'Sintaxe: Local <nome> as <Tipo>.' },
                { question: 'Palavra-chave para iniciar definição de classe:', options: ['Class', 'Object', 'Define Class', 'New Class'], correctIndex: 0, explanation: 'Class NomeDaClasse ... EndClass.' },
                { question: 'Método construtor padrão de uma classe:', options: ['New', 'Init', 'Constructor', 'Create'], correctIndex: 0, explanation: 'Por convenção é o método New().' },
                { question: 'Como herdar de outra classe?', options: ['Class X inherits Y', 'Class X extends Y', 'Class X : Y', 'Class X from Y'], correctIndex: 3, explanation: 'Class MinhaClasse From ClassePai.' },
                { question: 'O que é um Namespace?', options: ['Organizador lógico de código', 'Um banco de dados', 'Uma tabela', 'Uma variável'], correctIndex: 0, explanation: 'Evita conflito de nomes e organiza bibliotecas.' },
                { question: 'Como capturar erro em TLPP?', options: ['Try...Catch', 'On Error', 'Check Error', 'Begin Error'], correctIndex: 0, explanation: 'Bloco Try...Catch funciona como em C#/Java.' },
                { question: 'O que o tipo "Variant" aceita?', options: ['Qualquer tipo de dado', 'Apenas Números', 'Apenas Objetos', 'Apenas Arrays'], correctIndex: 0, explanation: 'Variant pode conter qualquer tipo (dinâmico).' },
                { question: 'Como criar um método estático?', options: ['Static Method', 'Method Static', 'Class Method', 'Shared Method'], correctIndex: 0, explanation: 'Static Method Nome().' },
                { question: 'Função para reflexão (pegar infos da classe):', options: ['ClassInfo', 'GetClass', 'Reflect', 'TypeInfo'], correctIndex: 0, explanation: 'ClassInfo() retorna estrutura da classe.' }
            ]
        },
        {
            id: 'points',
            title: 'Pontos de Entrada',
            description: 'Customizações e interceptação de rotinas padrões.',
            icon: '🔌',
            questions: [
                { question: 'Qual a nomenclatura padrão de Ponto de Entrada?', options: ['M->', 'U_', 'PE_', 'A_'], correctIndex: 1, explanation: 'User Functions (U_) ou funções específicas documentadas.' },
                { question: 'Qual função verifica se um PE existe?', options: ['ExistBlock', 'HasBlock', 'FindPE', 'CheckPE'], correctIndex: 0, explanation: 'ExistBlock("NOME") retorna se está compilado.' },
                { question: 'Como executar um Ponto de Entrada?', options: ['ExecBlock', 'RunBlock', 'Do BLOCK', 'Call'], correctIndex: 0, explanation: 'ExecBlock("NOME", .F., .F., Parametros).' },
                { question: 'Pontos de Entrada MVC geralmente usam ID:', options: ['MODELPOS', 'FORM_POS', 'VIEW_POS', 'MVC_POS'], correctIndex: 0, explanation: 'ModelPosVld, ModelCommit, etc são ids comuns de validação.' },
                { question: 'Para passar parâmetros para uma U_Funcao:', options: ['U_Funcao(Param)', 'Do U_Funcao with Param', 'Exec(U_Funcao)', 'Call U_Funcao'], correctIndex: 0, explanation: 'Chamada direta como função normal.' },
                { question: 'O que é o "ParamIXB"?', options: ['Array de parâmetros recebidos no PE', 'Variável de sistema', 'Tabela', 'Erro'], correctIndex: 0, explanation: 'Em POs antigos, ParamIXB continha os argumentos passados automaticamente.' },
                { question: 'Ponto de entrada antes da gravação geralmente é:', options: ['TudoOK', 'AntesGrava', 'Validacao', 'Commit'], correctIndex: 0, explanation: 'Nos modelos clássicos (Enchoice), TudoOK valida antes de gravar.' },
                { question: 'Em MVC, onde customizar validações de campo?', options: ['ModelDef', 'ViewDef', 'Valid Function', 'FieldDef'], correctIndex: 0, explanation: 'No ModelDef, usando bValid ou bPre/Post.' },
                { question: 'Cuidado principal ao usar PEs:', options: ['Não travar o sistema', 'Não usar variáveis', 'Não usar banco', 'Não usar telas'], correctIndex: 0, explanation: 'Performance e integridade, evitar loops infinitos ou telas desnecessárias.' },
                { question: 'Ponto de entrada é compilado como:', options: ['User Function', 'Static Function', 'Main Function', 'Project Function'], correctIndex: 0, explanation: 'Deve ser uma User Function para ser visível externamente.' }
            ]
        }
    ];

    currentIndex = 0;
    score = 0;
    selectedOption: number | null = null;
    isAnswerChecked = false;
    showResults = false;

    // Métodos de Controle
    selectTopic(topic: QuizTopic) {
        this.selectedTopic = topic;
        this.restartQuiz();
    }

    goBackToTopics() {
        this.selectedTopic = null;
        this.restartQuiz();
    }

    get currentQuestion(): QuizQuestion {
        if (!this.selectedTopic) return this.topics[0].questions[0]; // Fallback
        return this.selectedTopic.questions[this.currentIndex];
    }

    get totalQuestions(): number {
        return this.selectedTopic ? this.selectedTopic.questions.length : 0;
    }

    selectOption(index: number) {
        if (this.isAnswerChecked) return;
        this.selectedOption = index;
    }

    checkAnswer() {
        if (this.selectedOption === null) return;

        this.isAnswerChecked = true;
        if (this.selectedOption === this.currentQuestion.correctIndex) {
            this.score++;
        }
    }

    nextQuestion() {
        if (!this.selectedTopic) return;

        if (this.currentIndex < this.selectedTopic.questions.length - 1) {
            this.currentIndex++;
            this.selectedOption = null;
            this.isAnswerChecked = false;
        } else {
            this.showResults = true;
        }
    }

    restartQuiz() {
        this.currentIndex = 0;
        this.score = 0;
        this.selectedOption = null;
        this.isAnswerChecked = false;
        this.showResults = false;
    }
}
