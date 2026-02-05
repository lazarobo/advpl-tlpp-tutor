import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QuizQuestion {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

interface TopicQuiz {
    id: string;
    title: string;
    level: 'Iniciante' | 'Intermediário' | 'Avançado';
    questions: QuizQuestion[];
}

interface QuizTopic {
    id: string;
    title: string;
    description: string;
    icon: string;
    quizzes: TopicQuiz[];
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
    selectedQuiz: TopicQuiz | null = null;

    currentIndex = 0;
    score = 0;
    selectedOption: number | null = null;
    isAnswerChecked = false;
    showResults = false;

    // Lista de Tópicos
    topics: QuizTopic[] = [
        {
            id: 'basics',
            title: 'Fundamentos AdvPL',
            description: 'Tipos de dados, variáveis, operadores e lógica básica.',
            icon: '📚',
            quizzes: [
                {
                    id: 'basics-1',
                    title: 'Conceitos Iniciais',
                    level: 'Iniciante',
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
                    id: 'basics-2',
                    title: 'Estruturas de Controle',
                    level: 'Intermediário',
                    questions: [
                        { question: 'Qual comando encerra um loop For...Next?', options: ['Exit', 'Break', 'Stop', 'End'], correctIndex: 0, explanation: 'Exit sai imediatamente do laço.' },
                        { question: 'Estrutura switch/case em AdvPL chama-se:', options: ['Switch...Case', 'Do Case...EndCase', 'Select...Case', 'If...Else'], correctIndex: 1, explanation: 'Do Case ... Case ... EndCase' },
                        { question: 'Para pular para a próxima iteração do loop:', options: ['Continue', 'Loop', 'Next', 'Skip'], correctIndex: 1, explanation: 'Comando Loop volta para o início da repetição.' },
                        { question: 'Qual a negação lógica em AdvPL?', options: ['!', 'Not', '~', '-'], correctIndex: 0, explanation: '! ou .Not.' },
                        { question: 'While executa enquanto a condição for:', options: ['Falsa', 'Verdadeira', 'Nula', 'Zero'], correctIndex: 1, explanation: 'While (Enquanto) Verdadeiro.' },
                        { question: 'If inline (ternário) em AdvPL é:', options: ['IIf()', 'If()', '?', 'When()'], correctIndex: 0, explanation: 'IIf(condicao, verdadeiro, falso).' },
                        { question: 'Como incluir aspas em uma string delimitada por aspas?', options: ['Usar apóstrofo', 'Escapar com \\', 'Duplicar aspas', 'Não é possível'], correctIndex: 0, explanation: 'Pode-se alternar "texto" e \'texto\'.' },
                        { question: 'Bloco de código é definido por:', options: ['{|| }', '( )', '[ ]', 'Begin...End'], correctIndex: 0, explanation: '{|params| codigo}.' },
                        { question: 'Para forçar a tipagem de uma variável como Numérica:', options: ['Local nVar as Numeric', 'Numeric nVar', 'Var nVar type N', 'nVar := 0'], correctIndex: 0, explanation: 'Sintaxe Typed Variable.' },
                        { question: 'Escopo Static mantém valor:', options: ['Entre chamadas da função', 'Apenas na execução', 'No banco de dados', 'Na sessão'], correctIndex: 0, explanation: 'Static preserva valor entre chamadas no mesmo processo.' }
                    ]
                },
                {
                    id: 'basics-3',
                    title: 'Avançado e Boas Práticas',
                    level: 'Avançado',
                    questions: [
                        { question: 'Para limpar uma variável da memória:', options: ['Free()', 'Clean()', 'Nil', 'Atribuir Nil'], correctIndex: 3, explanation: 'Atribuir Nil libera a referência (exceto se tiver outras referências).' },
                        { question: 'Qual função retorna o nome da função corrente?', options: ['FunName()', 'ProcName()', 'GetName()', 'CurFunc()'], correctIndex: 1, explanation: 'ProcName() retorna o nome da rotina.' },
                        { question: 'Include TOTVS.CH já contém:', options: ['Protheus.ch', 'Dialog.ch', 'Font.ch', 'Todas anteriores'], correctIndex: 3, explanation: 'TOTVS.CH é um include guarda-chuva.' },
                        { question: 'Limite de tamanho de nome de variável (significativo):', options: ['10 chars', '8 chars', 'Unlimited', '255 chars'], correctIndex: 0, explanation: 'AdvPL considera os 10 primeiros caracteres.' },
                        { question: 'Como passar parâmetro por referência?', options: ['@Var', '&Var', 'Ref Var', '*Var'], correctIndex: 0, explanation: '@NomeDaVariavel passa o ponteiro.' },
                        { question: 'Qual diretiva define uma constante?', options: ['#Define', 'Const', 'Static', 'Final'], correctIndex: 0, explanation: '#Define NOME Valor' },
                        { question: 'Default em parâmetros de função:', options: ['DEFAULT xParam := Val', 'If Nil', 'Param = Val', 'Optional'], correctIndex: 0, explanation: 'Comando DEFAULT atribui valor se for Nil.' },
                        { question: 'Begin Sequence...End serve para:', options: ['Loops', 'Tratamento de Erro/Break', 'Sequencia SQL', 'Nada'], correctIndex: 1, explanation: 'Estrutura antiga de controle de fluxo e erro.' },
                        { question: 'Qual a precedência de operadores?', options: ['Numérica > Relacional > Lógica', 'Lógica > Numérica', 'Relacional > Numérica', 'Igual'], correctIndex: 0, explanation: 'Matemática primeiro, depois comparações, depois lógica.' },
                        { question: 'Alias para Self em blocos de código de classe:', options: ['oSelf', 'This', '::', 'Super'], correctIndex: 0, explanation: 'Geralmente oSelf é passado explicitamente ou acessado via objeto.' }
                    ]
                }
            ]
        },
        {
            id: 'strings',
            title: 'Strings e Datas',
            description: 'Manipulação de textos e datas.',
            icon: '🔡',
            quizzes: [
                {
                    id: 'strings-1',
                    title: 'Conversões Básicas',
                    level: 'Iniciante',
                    questions: [
                        { question: 'Qual função converte Data para Caractere?', options: ['CtoD', 'DtoC', 'Str', 'Val'], correctIndex: 1, explanation: 'DtoC (Date to Character) converte data para string "dd/mm/aa".' },
                        { question: 'Como pegar os 3 primeiros caracteres de "TOTVS"?', options: ['Left("TOTVS", 3)', 'Right("TOTVS", 3)', 'SubStr("TOTVS", 3)', 'Mid("TOTVS", 3)'], correctIndex: 0, explanation: 'Left retorna os N primeiros caracteres à esquerda.' },
                        { question: 'Qual função remove espaços das duas pontas da string?', options: ['LTrim', 'RTrim', 'AllTrim', 'Trim'], correctIndex: 2, explanation: 'AllTrim remove espaços do início e do fim.' },
                        { question: 'O que retorna At("A", "CASA")?', options: ['1', '2', '0', '4'], correctIndex: 1, explanation: 'Retorna a posição da primeira ocorrência de "A", que é 2.' },
                        { question: 'Qual função converte String para Número?', options: ['Str', 'Val', 'CtoD', 'Len'], correctIndex: 1, explanation: 'Val() converte string numérica para number.' },
                        { question: 'Como verificar se uma string está vazia?', options: ['IsEmpty()', 'Empty()', 'Null()', 'Blank()'], correctIndex: 1, explanation: 'Empty() retorna .T. se a string for vazia ou nula.' },
                        { question: 'Qual função substitui texto dentro de uma string?', options: ['Replace', 'StrTran', 'SubStr', 'Change'], correctIndex: 1, explanation: 'StrTran(cTexto, cDe, cPara) faz a substituição.' },
                        { question: 'Tamanho de uma string:', options: ['Size()', 'Len()', 'Count()', 'Length'], correctIndex: 1, explanation: 'Len(cStr).' },
                        { question: 'Transformar em Maiúsculas:', options: ['Upper()', 'UCase()', 'ToUpper()', 'Caps()'], correctIndex: 0, explanation: 'Upper(cStr).' },
                        { question: 'Transformar em Minúsculas:', options: ['Lower()', 'LCase()', 'ToLower()', 'Down()'], correctIndex: 0, explanation: 'Lower(cStr).' }
                    ]
                },
                {
                    id: 'strings-2',
                    title: 'Operações com Datas',
                    level: 'Intermediário',
                    questions: [
                        { question: 'Como somar 5 dias à data atual?', options: ['Date() + 5', 'DateAdd(5)', 'AddDays(5)', 'Plus(5)'], correctIndex: 0, explanation: 'Basta somar o número de dias diretamente à variável do tipo Data.' },
                        { question: 'Qual função retorna o ano de uma data?', options: ['Year()', 'WYear()', 'GetYear()', 'Ano()'], correctIndex: 0, explanation: 'Year(dData) retorna o ano numérico.' },
                        { question: 'Para converter Data em String AAAAMMDD (Indexável):', options: ['DtoC', 'DtoS', 'Str', 'Format'], correctIndex: 1, explanation: 'DtoS (Date to Sortable) retorna formato AAAAMMDD.' },
                        { question: 'Qual função retorna o Dia da Semana?', options: ['Day()', 'WeekDay()', 'Dow()', 'Dia()'], correctIndex: 2, explanation: 'Dow (Day of Week) retorna numero 1 (Dom) a 7 (Sab).' },
                        { question: 'Retornar o último dia do mês:', options: ['LastDay()', 'EndMonth()', 'Day(Date())', 'Não existe'], correctIndex: 0, explanation: 'LastDay(dData) retorna data do último dia.' },
                        { question: 'Adicionar meses a uma data:', options: ['AddMonth()', 'MonthSum()', 'Date() + 30', 'IncMonth()'], correctIndex: 0, explanation: 'AddMonth(dData, nMeses) ou MonthSum.' },
                        { question: 'Nome do Mês por extenso:', options: ['MonthName', 'MesExtenso', 'GetMonth', 'NameMonth'], correctIndex: 1, explanation: 'MesExtenso(dData).' },
                        { question: 'Data nula em AdvPL:', options: ['Null', 'CtoD("")', 'Empty', '0/0/0'], correctIndex: 1, explanation: 'CtoD("") ou CtoD("//").' },
                        { question: 'Retornar a hora atual:', options: ['Time()', 'Hour()', 'Now()', 'Clock()'], correctIndex: 0, explanation: 'Time() retorna string "HH:MM:SS".' },
                        { question: 'Diferença de dias entre datas:', options: ['DateDiff()', 'd1 - d2', 'Diff()', 'Minus()'], correctIndex: 1, explanation: 'Subtração simples retorna dias.' }
                    ]
                },
                {
                    id: 'strings-3',
                    title: 'Manipulação Avançada',
                    level: 'Avançado',
                    questions: [
                        { question: 'Função PadR faz o que?', options: ['Alinha à direita preenchendo', 'Corta a direita', 'Pula linha', 'Nenhuma'], correctIndex: 0, explanation: 'PadR(cStr, nLen) preenche com espaços à direita até o tamanho.' },
                        { question: 'Como criptografar base64?', options: ['EncodeBase64', 'ToB64', 'Crypt', 'Hash'], correctIndex: 0, explanation: 'EncodeBase64().' },
                        { question: 'Formatar string com parâmetros (printf):', options: ['StringFormat', 'Format', 'StrZero', 'FwPrintf (C# style não nativo)'], correctIndex: 1, explanation: 'Format não é nativo padrão clipper, usa-se concatenação ou StrTran. Em TLPP temos String.Format.' },
                        { question: 'StrZero(10, 4) retorna:', options: ['"1000"', '"0010"', '"10"', '" 10"'], correctIndex: 1, explanation: 'Preenche com zeros à esquerda: "0010".' },
                        { question: 'Verificar se contém substring:', options: ['Contains()', 'Has()', 'At() > 0', 'InStr()'], correctIndex: 2, explanation: 'Se At() retornar > 0, contém.' },
                        { question: 'Qual função retorna "Segunda-Feira"?', options: ['DiaExtenso', 'DowName', 'WeekName', 'DiaSemana'], correctIndex: 0, explanation: 'DiaExtenso(dData).' },
                        { question: 'Parsear JSON string para objeto:', options: ['JsonParse', 'FromJson', 'DecJson', 'Parse'], correctIndex: 1, explanation: 'oJson:FromJson(cStr).' },
                        { question: 'Descobrir encoding de arquivo texto:', options: ['Não nativo', 'FileEnc', 'GetEnc', 'IsUtf8'], correctIndex: 0, explanation: 'Geralmente assume-se ou usa libs auxiliares.' },
                        { question: 'Caracter de nova linha:', options: ['CRLF', '/n', '\\n', 'Enter'], correctIndex: 0, explanation: 'CRLF (Carriage Return Line Feed).' },
                        { question: 'Replicar caracter N vezes:', options: ['Replicate', 'Repeat', 'Dup', 'Copy'], correctIndex: 0, explanation: 'Replicate("X", 10).' }
                    ]
                }
            ]
        },
        // ... ADICIONANDO OUTROS TÓPICOS COM 3 QUIZZES CADA ...
        {
            id: 'database',
            title: 'Banco de Dados',
            description: 'Queries, navegação e manipulação de registros DBF/SQL.',
            icon: '💾',
            quizzes: [
                {
                    id: 'db-1',
                    title: 'Navegação Básica',
                    level: 'Iniciante',
                    questions: [
                        { question: 'Como posicionar no primeiro registro?', options: ['DBGoTop()', 'DBGoBottom()', 'DBSkip()', 'DBSeek()'], correctIndex: 0, explanation: 'DBGoTop().' },
                        { question: 'Como avançar um registro?', options: ['Next', 'DBSkip()', 'Forward', 'Go+1'], correctIndex: 1, explanation: 'DBSkip().' },
                        { question: 'Verificar fim de arquivo:', options: ['EOF()', 'BOF()', 'End()', 'Finish()'], correctIndex: 0, explanation: 'EOF (End of File).' },
                        { question: 'Verificar inicio de arquivo:', options: ['Start()', 'BOF()', 'Begin()', 'Top()'], correctIndex: 1, explanation: 'BOF (Beginning of File).' },
                        { question: 'Selecionar índice:', options: ['DBSetOrder()', 'Index()', 'Order()', 'SetIdx()'], correctIndex: 0, explanation: 'DBSetOrder(nOrden).' },
                        { question: 'Selecionar Alias (Tabela):', options: ['DBSelectArea()', 'Select()', 'Use()', 'Area()'], correctIndex: 0, explanation: 'DBSelectArea("ALIAS").' },
                        { question: 'Fechar tabela:', options: ['Close', 'DBCloseArea()', 'Shut', 'Exit'], correctIndex: 1, explanation: 'DBCloseArea().' },
                        { question: 'Retornar alias atual:', options: ['Alias()', 'GetAlias()', 'Name()', 'Table()'], correctIndex: 0, explanation: 'Alias().' },
                        { question: 'Deletar registro logicamente:', options: ['DBDelete()', 'Del', 'Delete', 'Erase'], correctIndex: 0, explanation: 'DBDelete() marca com asterisco.' },
                        { question: 'Buscar por chave exata:', options: ['DBSeek()', 'Find', 'Locate', 'Search'], correctIndex: 0, explanation: 'DBSeek(xChave).' }
                    ]
                },
                {
                    id: 'db-2',
                    title: 'Queries e SQL',
                    level: 'Intermediário',
                    questions: [
                        { question: 'Qual comando deve ser usado SEMPRE na query SQL?', options: ['ChangeQuery', 'FixSQL', 'ParseQuery', 'NoLock'], correctIndex: 0, explanation: 'ChangeQuery() adapta a sintaxe.' },
                        { question: 'Para usar query como tabela temporária:', options: ['TCSqlExec', 'TCQuery', 'Select', 'Create View'], correctIndex: 1, explanation: 'TCQuery cria um Alias temporário.' },
                        { question: 'Executar Update/Insert:', options: ['TCSqlExec', 'TCQuery', 'Run', 'Exec'], correctIndex: 0, explanation: 'TCSqlExec executa instruções DML.' },
                        { question: 'Evitar SQL Injection:', options: ['Concatenar String', 'FWPreparedStatement', 'NoInj', 'SafeSQL'], correctIndex: 1, explanation: 'Usar Bind Variables.' },
                        { question: 'Converter data para SQL:', options: ['DtoS', 'DateToSql', 'SqlDate', 'Format'], correctIndex: 0, explanation: 'Geralmente DtoS (AAAAMMDD) funciona na maioria, ou params.' },
                        { question: 'Verificar se tabela existe no banco:', options: ['TCCanOpen', 'ChkTable', 'ExistTable', 'FindTable'], correctIndex: 0, explanation: 'TCCanOpen(cTable).' },
                        { question: 'Apagar tabela física:', options: ['TCDelFile', 'Drop', 'Del', 'Erase'], correctIndex: 0, explanation: 'TCDelFile ou Drop Table via Exec.' },
                        { question: 'Commitar transação:', options: ['Commit', 'TCCommit', 'EndTran', 'Save'], correctIndex: 1, explanation: 'TCCommit() para banco direto, End Transaction para aplicação.' },
                        { question: 'Melhor maneira de ler retorno de query simples:', options: ['TCSqlToArr', 'Loop', 'While', 'Read'], correctIndex: 0, explanation: 'TCSqlToArr joga direto no array.' },
                        { question: 'Qual campo não deve ser usado no Where do Update?', options: ['R_E_C_N_O_', 'Chave Primaria', 'Data', 'Status'], correctIndex: 0, explanation: 'Em execuções diretas ok, mas via aplicação evitar depender de Recno em queries externas.' }
                    ]
                },
                {
                    id: 'db-3',
                    title: 'Transações e Bloqueios',
                    level: 'Avançado',
                    questions: [
                        { question: 'Comando de Bloqueio de Registro:', options: ['RecLock', 'Lock', 'Block', 'Hold'], correctIndex: 0, explanation: 'RecLock(cAlias, .F./.T.).' },
                        { question: 'Bloqueio de Arquivo Inteiro:', options: ['FLock', 'FileLock', 'AllLock', 'TableLock'], correctIndex: 0, explanation: 'FLock().' },
                        { question: 'Destravar registros:', options: ['Unlock', 'MsUnlock', 'Free', 'Release'], correctIndex: 1, explanation: 'MsUnlock() ou UnLock.' },
                        { question: 'Transação em AdvPL (Aplicação):', options: ['Begin Transaction...End Transaction', 'Start...Commit', 'Tran...End', 'Open...Close'], correctIndex: 0, explanation: 'Controle transacional do AppServer.' },
                        { question: 'Se ocorrer erro dentro da transação:', options: ['DisarmTransaction', 'Rollback', 'Error', 'Stop'], correctIndex: 0, explanation: 'DisarmTransaction() força o rollback ao fim.' },
                        { question: 'SoftLock serve para:', options: ['Travar sem erro se falhar', 'Trava leve', 'Trava parcial', 'Nada'], correctIndex: 0, explanation: 'Tenta travar, retorna .F. se não der, sem tela de erro.' },
                        { question: 'Índice exclusivo permite duplicidade?', options: ['Sim', 'Não', 'Depende', 'Configurável'], correctIndex: 1, explanation: 'Chave única (Unique) não permite.' },
                        { question: 'Função para criar tabela temporária:', options: ['FwTmpTable', 'CriaTrab', 'TempTable', 'Memo'], correctIndex: 0, explanation: 'FwTemporaryTable ou comandos SQL.' },
                        { question: 'Comportamento de leitura suja (Dirty Read):', options: ['TCSqlSetNoLock', 'ReadUncommitted', 'NoWait', 'Fast'], correctIndex: 0, explanation: 'Leitura sem respeitar locks.' },
                        { question: 'Campo Memo é gravado onde?', options: ['SYP', 'No DBF junto', 'Em arquivo separado (fpt/dbt)', 'Na memória'], correctIndex: 1, explanation: 'Em bancos relacionais no campo Blob/Text, em DBF no .FPT.' }
                    ]
                }
            ]
        },
        {
            id: 'tables',
            title: 'Tabelas do Protheus',
            description: 'Dicionários (SX) e Tabelas de Negócio.',
            icon: '📋',
            quizzes: [
                {
                    id: 'tables-1',
                    title: 'Dicionários Básicos',
                    level: 'Iniciante',
                    questions: [
                        { question: 'O que armazena a tabela SX3?', options: ['Índices', 'Tabelas', 'Campos', 'Parâmetros'], correctIndex: 2, explanation: 'SX3 é o Dicionário de Campos.' },
                        { question: 'Qual tabela contém as Perguntas (F12)?', options: ['SX1', 'SX2', 'SX3', 'SXG'], correctIndex: 0, explanation: 'SX1 armazena os grupos de perguntas.' },
                        { question: 'Onde ficam os parâmetros do sistema (MV_...)?', options: ['SX6', 'SX5', 'SX1', 'SX2'], correctIndex: 0, explanation: 'SX6 armazena os parâmetros customizáveis.' },
                        { question: 'Tabela de Índices do sistema:', options: ['SIX', 'SX2', 'SX3', 'SI1'], correctIndex: 0, explanation: 'SIX gerencia os índices.' },
                        { question: 'O que é a SX2?', options: ['Dicionário de Tabelas (Arquivos)', 'Campos', 'Consultas', 'Gatilhos'], correctIndex: 0, explanation: 'SX2 define os arquivos/tabelas.' },
                        { question: 'Onde ficam as Tabelas Genéricas?', options: ['SX5', 'SX6', 'SX7', 'SXG'], correctIndex: 0, explanation: 'SX5.' },
                        { question: 'Onde ficam os Gatilhos?', options: ['SX7', 'SX9', 'SIX', 'SXA'], correctIndex: 0, explanation: 'SX7.' },
                        { question: 'Onde ficam as Consultas Padrão (F3)?', options: ['SXB', 'SX5', 'SX3', 'SA1'], correctIndex: 0, explanation: 'SXB.' },
                        { question: 'Onde ficam os Relacionamentos?', options: ['SX9', 'SX8', 'SXR', 'SXY'], correctIndex: 0, explanation: 'SX9.' },
                        { question: 'Grupo de Campos fica na:', options: ['SXG', 'SXD', 'SXGroup', 'GRP'], correctIndex: 0, explanation: 'SXG.' }
                    ]
                },
                {
                    id: 'tables-2',
                    title: 'Cadastro e Movimento',
                    level: 'Intermediário',
                    questions: [
                        { question: 'Qual tabela guarda os Clientes?', options: ['SA1', 'SA2', 'SB1', 'SC5'], correctIndex: 0, explanation: 'SA1.' },
                        { question: 'Tabela de Fornecedores:', options: ['SA1', 'SA2', 'SA3', 'SA4'], correctIndex: 1, explanation: 'SA2.' },
                        { question: 'Tabela de Produtos:', options: ['SB1', 'SB2', 'SA1', 'SC6'], correctIndex: 0, explanation: 'SB1.' },
                        { question: 'Pedidos de Venda - Cabeçalho:', options: ['SC5', 'SC6', 'SC9', 'SD2'], correctIndex: 0, explanation: 'SC5.' },
                        { question: 'Pedidos de Venda - Itens:', options: ['SC6', 'SC5', 'SD2', 'SD1'], correctIndex: 0, explanation: 'SC6.' },
                        { question: 'Notas Fiscais de Entrada - Cabeçalho:', options: ['SF1', 'SF2', 'SD1', 'SD2'], correctIndex: 0, explanation: 'SF1.' },
                        { question: 'Notas Fiscais de Saída - Cabeçalho:', options: ['SF2', 'SF1', 'SD2', 'SD1'], correctIndex: 0, explanation: 'SF2.' },
                        { question: 'Itens da Nota de Saída:', options: ['SD2', 'SF2', 'SC6', 'SD1'], correctIndex: 0, explanation: 'SD2.' },
                        { question: 'Saldos Físico e Financeiro:', options: ['SB2', 'SB1', 'SB3', 'SB9'], correctIndex: 0, explanation: 'SB2.' },
                        { question: 'Movimentos Internos de Estoque:', options: ['SD3', 'SD1', 'SD2', 'SB2'], correctIndex: 0, explanation: 'SD3.' }
                    ]
                },
                {
                    id: 'tables-3',
                    title: 'Financeiro e Contábil',
                    level: 'Avançado',
                    questions: [
                        { question: 'Contas a Receber:', options: ['SE1', 'SE2', 'SE5', 'SC1'], correctIndex: 0, explanation: 'SE1.' },
                        { question: 'Contas a Pagar:', options: ['SE2', 'SE1', 'SE5', 'SF1'], correctIndex: 0, explanation: 'SE2.' },
                        { question: 'Movimentação Bancária:', options: ['SE5', 'SE1', 'SE2', 'SA6'], correctIndex: 0, explanation: 'SE5.' },
                        { question: 'Bancos:', options: ['SA6', 'SA1', 'SA2', 'SED'], correctIndex: 0, explanation: 'SA6.' },
                        { question: 'Plano de Contas:', options: ['CT1', 'CT2', 'CV0', 'CT5'], correctIndex: 0, explanation: 'CT1.' },
                        { question: 'Lançamentos Contábeis:', options: ['CT2', 'CT1', 'CV3', 'CTK'], correctIndex: 0, explanation: 'CT2.' },
                        { question: 'Saldos Contábeis:', options: ['CQM', 'CT2', 'CT3', 'CT4'], correctIndex: 0, explanation: 'CQM (ou tabelas de saldo agregadas).' },
                        { question: 'Solicitação de Compras:', options: ['SC1', 'SC7', 'SC3', 'SC5'], correctIndex: 0, explanation: 'SC1.' },
                        { question: 'Pedido de Compras:', options: ['SC7', 'SC1', 'SF1', 'SD1'], correctIndex: 0, explanation: 'SC7.' },
                        { question: 'Condição de Pagamento:', options: ['SE4', 'SE1', 'SAE', 'SX5'], correctIndex: 0, explanation: 'SE4.' }
                    ]
                }
            ]
        },
        {
            id: 'mvc',
            title: 'MVC (Model View Controller)',
            description: 'Arquitetura moderna do Protheus.',
            icon: '🏗️',
            quizzes: [
                {
                    id: 'mvc-1',
                    title: 'Conceitos MVC',
                    level: 'Iniciante',
                    questions: [
                        { question: 'Qual função define o Modelo de Dados?', options: ['ModelDef', 'ViewDef', 'MenuDef', 'DataDef'], correctIndex: 0, explanation: 'Static Function ModelDef.' },
                        { question: 'Qual função define a Interface Visual?', options: ['ViewDef', 'ModelDef', 'ScreenDef', 'ShowDef'], correctIndex: 0, explanation: 'Static Function ViewDef.' },
                        { question: 'Qual componente representa o modelo?', options: ['MPFormModel', 'MPFormView', 'FWFormStruct', 'Model'], correctIndex: 0, explanation: 'MPFormModel.' },
                        { question: 'Create estrutura de campos baseada no SX3:', options: ['FWFormStruct', 'MakeStruct', 'Build', 'Struct'], correctIndex: 0, explanation: 'FWFormStruct(1/2, Alias).' },
                        { question: 'Onde as regras de negócio automáticas residem?', options: ['Model', 'View', 'Controller', 'Menu'], correctIndex: 0, explanation: 'No Model.' },
                        { question: 'Para associar View ao Model:', options: ['SetModel', 'Bind', 'Link', 'Connect'], correctIndex: 0, explanation: 'oView:SetModel(oModel).' },
                        { question: 'MenuDef retorna:', options: ['Array', 'Object', 'String', 'Void'], correctIndex: 0, explanation: 'Array com opções.' },
                        { question: 'Código de operação para Visualizar:', options: ['2', '3', '4', '5'], correctIndex: 0, explanation: '2.' },
                        { question: 'Código de operação para Incluir:', options: ['3', '2', '4', '5'], correctIndex: 0, explanation: '3.' },
                        { question: 'Função FWLoadModel serve para:', options: ['Carregar Model de outro fonte', 'Carregar DBF', 'Carregar View', 'Nada'], correctIndex: 0, explanation: 'Reutilizar models.' }
                    ]
                },
                {
                    id: 'mvc-2',
                    title: 'Validações e Eventos',
                    level: 'Intermediário',
                    questions: [
                        { question: 'Validação "Tudo OK" do modelo:', options: ['bVldMdl', 'bPre', 'bPost', 'bCommit'], correctIndex: 0, explanation: 'oModel:SetVldMdl().' },
                        { question: 'Validação pós-edição de campo:', options: ['bValid', 'bWhen', 'bInit', 'bTrigger'], correctIndex: 0, explanation: 'Definida na Struct.' },
                        { question: 'Validação de pré-edição de linha (Grid):', options: ['SetLinePre', 'SetLinePost', 'SetVld', 'SetGrid'], correctIndex: 0, explanation: 'Bloqueia entrada na linha.' },
                        { question: 'Validar ativação do modelo:', options: ['bVldActivate', 'bActivate', 'bStart', 'bInit'], correctIndex: 0, explanation: 'Ao ativar o modelo.' },
                        { question: 'Commitar dados manualmente:', options: ['CommitData', 'Save', 'Write', 'Post'], correctIndex: 0, explanation: 'oModel:CommitData().' },
                        { question: 'Verificar se operacao é inclusão:', options: ['oModel:GetOperation() == 3', 'IsInc()', 'Includes()', 'Op == 3'], correctIndex: 0, explanation: 'GetOperation().' },
                        { question: 'Obter valor de um campo no Model:', options: ['GetValue', 'GetField', 'Value', 'Data'], correctIndex: 0, explanation: 'oModel:GetValue(ID, FIELD).' },
                        { question: 'Definir valor de campo no Model:', options: ['SetValue', 'LoadValue', 'SetField', 'Put'], correctIndex: 0, explanation: 'oModel:SetValue(ID, FIELD, VAL).' },
                        { question: 'Gatilho em MVC via Struct:', options: ['SetTrigger', 'AddTrigger', 'Trigger', 'Gatilho'], correctIndex: 1, explanation: 'oStruct:AddTrigger().' },
                        { question: 'Validar exclusão:', options: ['SetVldExc', 'SetDelete', 'CanDelete', 'BDelete'], correctIndex: 0, explanation: 'SetVldExc no Grid/Model.' }
                    ]
                },
                {
                    id: 'mvc-3',
                    title: 'Interface Avançada',
                    level: 'Avançado',
                    questions: [
                        { question: 'Dividir tela em abas:', options: ['CreateFolder', 'AddTab', 'Split', 'Folder'], correctIndex: 0, explanation: 'oView:CreateFolder().' },
                        { question: 'Dividir tela horizontalmente/verticalmente:', options: ['AddBox', 'SplitScreen', 'Div', 'Box'], correctIndex: 0, explanation: 'oView:AddBox().' },
                        { question: 'Adicionar botão na barra de ações:', options: ['AddUserButton', 'AddButton', 'NewButton', 'Action'], correctIndex: 0, explanation: 'oView:AddUserButton().' },
                        { question: 'Componente de View temporária (FWLayer):', options: ['Sim', 'Não', 'Talvez', 'Nunca'], correctIndex: 0, explanation: 'Permite camadas sobrepostas.' },
                        { question: 'Usar outra View dentro da View:', options: ['SetView', 'AddView', 'Embed', 'Include'], correctIndex: 0, explanation: 'Possível compor Views.' },
                        { question: 'Remover campo da visualização:', options: ['RemoveField', 'HideField', 'DeleteField', 'Clear'], correctIndex: 0, explanation: 'oStructView:RemoveField().' },
                        { question: 'Mudar título de campo na View:', options: ['SetProperty(..., MVC_VIEW_TITLE, ...)', 'SetTitle', 'ChangeTitle', 'Title'], correctIndex: 0, explanation: 'SetProperty.' },
                        { question: 'Desabilitar campo na View:', options: ['MVC_VIEW_CANCHANGE', 'MakeReadOnly', 'Disable', 'Lock'], correctIndex: 0, explanation: 'SetProperty CANCHANGE .F.' },
                        { question: 'Expandir grid automaticamente:', options: ['AddIncrementField', 'AutoExpand', 'Grow', 'Plus'], correctIndex: 0, explanation: 'Para numeração automática de item.' },
                        { question: 'Capturar duplo clique no grid:', options: ['SetDoubleClick', 'OnDblClick', 'Click', 'Double'], correctIndex: 0, explanation: 'oView:SetDoubleClick().' }
                    ]
                }
            ]
        },
        {
            id: 'rest',
            title: 'REST e APIs TLPP',
            description: 'APIs REST com TLPP.',
            icon: '🌐',
            quizzes: [
                {
                    id: 'rest-1',
                    title: 'Fundamentos REST',
                    level: 'Iniciante',
                    questions: [
                        { question: 'Qual annotation define endpoint GET?', options: ['@Get', '@HttpGet', '@Read', '@Select'], correctIndex: 0, explanation: '@Get.' },
                        { question: 'Qual annotation define endpoint POST?', options: ['@Post', '@Send', '@Create', '@Write'], correctIndex: 0, explanation: '@Post.' },
                        { question: 'Qual annotation define path base?', options: ['@Path', '@Url', '@Base', '@Route'], correctIndex: 0, explanation: '@Path.' },
                        { question: 'Método para obter body da requisição:', options: ['GetBodyText', 'ReadBody', 'Body', 'Content'], correctIndex: 0, explanation: 'Self:GetBodyText().' },
                        { question: 'Classe para JSON:', options: ['JsonObject', 'JSON', 'TJson', 'JsObj'], correctIndex: 0, explanation: 'JsonObject.' },
                        { question: 'Método para converter Object > JSON:', options: ['ToJson', 'Stringify', 'Serialize', 'Convert'], correctIndex: 0, explanation: 'ToJson().' },
                        { question: 'Definir Status Code:', options: ['SetStatusCode', 'Status', 'Code', 'SetRet'], correctIndex: 0, explanation: 'SetStatusCode().' },
                        { question: 'Definir Content-Type:', options: ['SetContentType', 'Type', 'Format', 'Mime'], correctIndex: 0, explanation: 'SetContentType().' },
                        { question: 'Obter Query Param (?id=1):', options: ['GetQueryParam', 'Query', 'Get', 'Param'], correctIndex: 0, explanation: 'GetQueryParam().' },
                        { question: 'Obter Path Param (/user/:id):', options: ['GetPathParam', 'Path', 'UrlParam', 'Id'], correctIndex: 0, explanation: 'GetPathParam().' }
                    ]
                },
                {
                    id: 'rest-2',
                    title: 'Consumo de APIs (Cliente)',
                    level: 'Intermediário',
                    questions: [
                        { question: 'Classe cliente REST:', options: ['FWRest', 'HttpClient', 'RestClient', 'WebClient'], correctIndex: 0, explanation: 'FWRest.' },
                        { question: 'Método para requisição GET:', options: ['Get', 'Read', 'Fetch', 'Load'], correctIndex: 0, explanation: 'oRest:Get().' },
                        { question: 'Definir URL Base:', options: ['New(url)', 'SetUrl', 'Base', 'Init'], correctIndex: 0, explanation: 'No construtor FWRest():New(url).' },
                        { question: 'Definir Endpoint (Path):', options: ['SetPath', 'Path', 'Endpoint', 'Route'], correctIndex: 0, explanation: 'SetPath().' },
                        { question: 'Obter resposta:', options: ['GetResult', 'Result', 'Response', 'Body'], correctIndex: 0, explanation: 'GetResult().' },
                        { question: 'Adicionar Header:', options: ['SetPostHeader', 'AddHeader', 'Header', 'SetHead'], correctIndex: 0, explanation: 'SetPostHeader (legacy) ou SetHeader.' },
                        { question: 'Enviar JSON no POST:', options: ['SetPostParams', 'Body', 'Send', 'Json'], correctIndex: 0, explanation: 'SetPostParams(cJson).' },
                        { question: 'Verificar erro de conexão:', options: ['GetLastError', 'Error', 'Check', 'Status'], correctIndex: 0, explanation: 'oRest:GetLastError().' },
                        { question: 'Autenticação Basic Auth:', options: ['Via Header', 'SetAuth', 'Login', 'User'], correctIndex: 0, explanation: 'Header Authorization: Basic ...' },
                        { question: 'Timeout padrão:', options: ['Configurável', 'Infinito', '10s', '30s'], correctIndex: 0, explanation: 'Pode configurar.' }
                    ]
                },
                {
                    id: 'rest-3',
                    title: 'Avançado e Segurança',
                    level: 'Avançado',
                    questions: [
                        { question: 'Autenticação OAuth2 requer:', options: ['Token Bearer', 'Basic', 'Senha', 'Nada'], correctIndex: 0, explanation: 'Token no Header Authorization.' },
                        { question: 'Verbo PATCH serve para:', options: ['Atual parcial', 'Atual total', 'Deletar', 'Criar'], correctIndex: 0, explanation: 'Atualização Parcial.' },
                        { question: 'Status 401 significa:', options: ['Unauthorized', 'Forbidden', 'Not Found', 'Error'], correctIndex: 0, explanation: 'Não autorizado (falta login).' },
                        { question: 'Status 403 significa:', options: ['Forbidden', 'Unauthorized', 'Error', 'Ok'], correctIndex: 0, explanation: 'Proibido (sem permissão).' },
                        { question: 'JWT significa:', options: ['JSON Web Token', 'Java Web Token', 'Joint Web', 'Just Web'], correctIndex: 0, explanation: 'JSON Web Token.' },
                        { question: 'CORS:', options: ['Cross-Origin Resource Sharing', 'Core', 'Course', 'Cross'], correctIndex: 0, explanation: 'Permissão entre domínios.' },
                        { question: 'HTTPS usa porta padrão:', options: ['443', '80', '8080', '21'], correctIndex: 0, explanation: '443.' },
                        { question: 'Swagger/OpenAPI:', options: ['Documentação', 'Código', 'Banco', 'Teste'], correctIndex: 0, explanation: 'Padronização de doc.' },
                        { question: 'Rate Limit:', options: ['Limite de reqs', 'Limite de dados', 'Velocidade', 'Erro'], correctIndex: 0, explanation: 'Limitar chamadas por tempo.' },
                        { question: 'Middleware:', options: ['Camada intermediária', 'Fim', 'Inicio', 'Banco'], correctIndex: 0, explanation: 'Intercepa requisições.' }
                    ]
                }
            ]
        },
        {
            id: 'tlpp',
            title: 'TLPP e POO',
            description: 'A evolução do AdvPL: Orientação a Objetos.',
            icon: '🚀',
            quizzes: [
                {
                    id: 'tlpp-1',
                    title: 'Fundamentos TLPP',
                    level: 'Iniciante',
                    questions: [
                        { question: 'Extensão de fonte TLPP:', options: ['.tlpp', '.prw', '.adv', '.cpp'], correctIndex: 0, explanation: '.tlpp.' },
                        { question: 'Definir variável tipada:', options: ['Local nVar as Numeric', 'Numeric nVar', 'Var nVar', 'Type nVar'], correctIndex: 0, explanation: 'Local <nome> as <Tipo>.' },
                        { question: 'Iniciar definição de classe:', options: ['Class', 'Object', 'Define', 'New'], correctIndex: 0, explanation: 'Class NomeClass ... EndClass.' },
                        { question: 'Método Construtor:', options: ['New', 'Init', 'Create', 'Start'], correctIndex: 0, explanation: 'New().' },
                        { question: 'Herança:', options: ['Class X From Y', 'Class X Extends Y', 'Class X : Y', 'Inherits'], correctIndex: 0, explanation: 'From.' },
                        { question: 'Namespace serve para:', options: ['Organizar escopo/pacote', 'Banco', 'Variavel', 'Tela'], correctIndex: 0, explanation: 'Evitar conflito de nomes.' },
                        { question: 'Tipo genérico (dinâmico):', options: ['Variant', 'Any', 'Object', 'Var'], correctIndex: 0, explanation: 'Variant.' },
                        { question: 'Método estático:', options: ['Static Method', 'Class Method', 'Shared', 'Global'], correctIndex: 0, explanation: 'Static Method.' },
                        { question: 'Visibilidade padrão de método:', options: ['Public', 'Private', 'Protected', 'Static'], correctIndex: 0, explanation: 'Public.' },
                        { question: 'Retornar a própria instância:', options: ['Return Self', 'Return This', 'Return', 'Me'], correctIndex: 0, explanation: 'Self.' }
                    ]
                },
                {
                    id: 'tlpp-2',
                    title: 'Recursos Modernos',
                    level: 'Intermediário',
                    questions: [
                        { question: 'Capturar erro:', options: ['Try...Catch', 'On Error', 'Check', 'Block'], correctIndex: 0, explanation: 'Try...Catch...Finally.' },
                        { question: 'Finally executa:', options: ['Sempre', 'Só no erro', 'Só no sucesso', 'Nunca'], correctIndex: 0, explanation: 'Sempre, após try ou catch.' },
                        { question: 'Throw serve para:', options: ['Lançar exceção', 'Pegar erro', 'Pular', 'Sair'], correctIndex: 0, explanation: 'Throw(Error).' },
                        { question: 'Reflection (Info da Classe):', options: ['ClassInfo', 'Reflect', 'GetClass', 'Type'], correctIndex: 0, explanation: 'ClassInfo().' },
                        { question: 'Tipo JsonObject é nativo?', options: ['Sim, em TLPP', 'Não', 'Só include', 'Lib'], correctIndex: 0, explanation: 'Sim.' },
                        { question: 'Parâmetro opcional tipado:', options: ['Param x as ...', 'Optional', 'Default', 'Maybe'], correctIndex: 0, explanation: 'Suportado na assinatura.' },
                        { question: 'Restrição de tamanho variável nome:', options: ['Sem limite (prático)', '10 chars', '8 chars', '255'], correctIndex: 0, explanation: 'TLPP remove limite de 10 chars.' },
                        { question: 'Comparação estrita:', options: ['===', '==', '=', 'Eq'], correctIndex: 1, explanation: 'Mantém ==, mas com tipagem é mais seguro.' },
                        { question: 'Include necessario:', options: ['tlpp-core.th', 'protheus.ch', 'advpl.ch', 'totvs.ch'], correctIndex: 0, explanation: 'tlpp-core.th para recursos base.' },
                        { question: 'Using namespace:', options: ['Using namespace', 'Import', 'Include', 'Use'], correctIndex: 0, explanation: 'Using namespace ...' }
                    ]
                },
                {
                    id: 'tlpp-3',
                    title: 'Coleções e Utils',
                    level: 'Avançado',
                    questions: [
                        { question: 'Lista Dinâmica:', options: ['ArrayList', 'List', 'Array', 'Vector'], correctIndex: 0, explanation: 'ArrayList.' },
                        { question: 'Mapa Chave-Valor perfomatico:', options: ['HashMap', 'Map', 'Dictionary', 'Hash'], correctIndex: 0, explanation: 'HashMap.' },
                        { question: 'Fila (Queue):', options: ['Queue', 'Fila', 'List', 'Stack'], correctIndex: 0, explanation: 'Queue.' },
                        { question: 'Pilha (Stack):', options: ['Stack', 'Pilha', 'Heap', 'Top'], correctIndex: 0, explanation: 'Stack.' },
                        { question: 'StringBuilder:', options: ['Otimizar concatenação', 'Criar string', 'Parser', 'Cortar'], correctIndex: 0, explanation: 'Evita recriação de string em loop.' },
                        { question: 'Regex em TLPP:', options: ['Regex class', 'Match', 'Find', 'Grep'], correctIndex: 0, explanation: 'Classes nativas de Regex.' },
                        { question: 'Log de performance (Profiler):', options: ['Profiler', 'Log', 'Time', 'Debug'], correctIndex: 0, explanation: 'TLPP tem tools de profiler.' },
                        { question: 'Executar lambda:', options: ['Execute', 'Run', 'Eval', 'Go'], correctIndex: 0, explanation: 'Suporte a Closures/Lambdas.' },
                        { question: 'Importar arquivo TLPP dinamicamente:', options: ['No momento compilação', 'Import', 'Load', 'Dyn'], correctIndex: 0, explanation: 'Compilado.' },
                        { question: 'Tipagem de retorno função:', options: ['Function X() as Type', 'Return Type', 'Type Function', 'As'], correctIndex: 0, explanation: 'Function X() as Character.' }
                    ]
                }
            ]
        },
        {
            id: 'points',
            title: 'Pontos de Entrada',
            description: 'Customizações e Hooks no padrão standard.',
            icon: '🔌',
            quizzes: [
                {
                    id: 'pe-1',
                    title: 'Conceitos P.E.',
                    level: 'Iniciante',
                    questions: [
                        { question: 'O que é um Ponto de Entrada?', options: ['Desvio no padrão', 'Erro', 'Tela', 'Banco'], correctIndex: 0, explanation: 'Permite customizar rotina padrão.' },
                        { question: 'Prefixo de User Function:', options: ['U_', 'A_', 'M_', 'P_'], correctIndex: 0, explanation: 'U_Funcao().' },
                        { question: 'Verificar existência:', options: ['ExistBlock', 'Has', 'Find', 'Check'], correctIndex: 0, explanation: 'ExistBlock("NOME").' },
                        { question: 'Executar PE:', options: ['ExecBlock', 'Run', 'Do', 'Call'], correctIndex: 0, explanation: 'ExecBlock("NOME", ...).' },
                        { question: 'Array de parametros automáticos (Legado):', options: ['ParamIXB', 'Params', 'Args', 'A'], correctIndex: 0, explanation: 'ParamIXB.' },
                        { question: 'Tipo de retorno comum para validar:', options: ['Lógico (.T./.F.)', 'Numérico', 'String', 'Nulo'], correctIndex: 0, explanation: 'Validar (TudoOK) retorna lógico.' },
                        { question: 'Escopo de variaveis private no PE:', options: ['Visivel', 'Invisivel', 'Erro', 'Nulo'], correctIndex: 0, explanation: 'PE herda visibilidade se chamado diretamente, ExecBlock isola um pouco.' },
                        { question: 'Compilar PE como:', options: ['User Function', 'Main', 'Static', 'Project'], correctIndex: 0, explanation: 'User Function.' },
                        { question: 'Ponto de entrada de menu:', options: ['PE_MENU', 'Menudef', 'AddMenu', 'NewMenu'], correctIndex: 0, explanation: 'Adiciona botões.' },
                        { question: 'Onde documentar PEs?', options: ['TDN/Doc', 'Codigo', 'Email', 'Postit'], correctIndex: 0, explanation: 'TDN possui a lista oficial.' }
                    ]
                },
                {
                    id: 'pe-2',
                    title: 'MVC e Gráficos',
                    level: 'Intermediário',
                    questions: [
                        { question: 'PE na validação do Modelo:', options: ['ModelPosVld', 'Vld', 'Check', 'Ok'], correctIndex: 0, explanation: 'ID de validação.' },
                        { question: 'PE na gravação (Commit):', options: ['ModelCommit', 'Save', 'Post', 'Grava'], correctIndex: 0, explanation: 'Após gravação.' },
                        { question: 'PE para adicionar botões na View:', options: ['ViewDef', 'Button', 'Action', 'Add'], correctIndex: 0, explanation: 'No ViewDef ou OtherActions.' },
                        { question: 'Validação de Linha (Grid):', options: ['LinePre/Post', 'VldLine', 'CheckLine', 'Row'], correctIndex: 0, explanation: 'Callbacks de linha.' },
                        { question: 'PE genérico de cadastro MATA030 (Cliente):', options: ['M030INC/ALT/EXC', 'A030TOK', 'MA030ROT', 'Todos'], correctIndex: 3, explanation: 'Possui vários pontos.' },
                        { question: 'Ponto Antes de Deletar:', options: ['ModelPreDel', 'DelOk', 'VldExc', 'BeforeDel'], correctIndex: 0, explanation: 'Validação de exclusão.' },
                        { question: 'Alterar propriedades da View via PE:', options: ['SetProperty', 'Chg', 'Muda', 'Set'], correctIndex: 0, explanation: 'Acesso ao objeto View.' },
                        { question: 'PE retornando Array de botões:', options: ['MA020ROT', 'MBrwBtn', 'CustomBtn', 'Btn'], correctIndex: 0, explanation: 'Adiciona rotinas ao menu.' },
                        { question: 'PE de carga inicial:', options: ['ModelInic', 'Init', 'Load', 'Start'], correctIndex: 0, explanation: 'Inicializar valores.' },
                        { question: 'ID do Ponto em MVC:', options: ['Pode ser qualquer string', 'Numérico', 'Fixo', 'Aleatório'], correctIndex: 0, explanation: 'Definido no ModelDef/ViewDef.' }
                    ]
                },
                {
                    id: 'pe-3',
                    title: 'Boas Práticas',
                    level: 'Avançado',
                    questions: [
                        { question: 'Usar tela (Interface) em PE de Job:', options: ['Proibido/Trava Thread', 'Permitido', 'Recomendado', 'Ok'], correctIndex: 0, explanation: 'Job não tem interface, trava o serviço.' },
                        { question: 'Variável Public em PE:', options: ['Evitar', 'Usar sempre', 'Obrigatório', 'Padrão'], correctIndex: 0, explanation: 'Evitar acoplamento e memória residual.' },
                        { question: 'Tratar desvio condicional de versão:', options: ['Select Cas', 'If', 'IfDef', 'Versao'], correctIndex: 0, explanation: 'Garantir compatibilidade.' },
                        { question: 'Gravação direta em tabela padrão no PE:', options: ['Evitar/Usar ExecAuto', 'Pode', 'Sempre', 'Melhor'], correctIndex: 0, explanation: 'Risco de integridade, usar MsExecAuto.' },
                        { question: 'Query direta em PE:', options: ['Cuidado com SQL Injection', 'Nunca', 'Sempre', 'Ok'], correctIndex: 0, explanation: 'Usar FWPreparedStatement.' },
                        { question: 'Performance em PE de loop (Linha):', options: ['Crítico', 'Irrelevante', 'Rápido', 'Lento'], correctIndex: 0, explanation: 'Executa N vezes, deve ser otimizado.' },
                        { question: 'Documentar PE customizado:', options: ['Essencial', 'Opcional', 'Desnecessario', 'Nunca'], correctIndex: 0, explanation: 'Dia a dia de sustentação exige.' },
                        { question: 'Restaurar ambiente (SetRest) após PE:', options: ['Necessário se mudar índice/alias', 'Nunca', 'Automatico', 'Não'], correctIndex: 0, explanation: 'Se mudar alias/ordem, voltar como estava.' },
                        { question: 'PE Recursivo:', options: ['Cuidado Loop Infinito', 'Bom', 'Padrão', 'Seguro'], correctIndex: 0, explanation: 'Perigo de StackOverflow.' },
                        { question: 'Debug de PE:', options: ['VSCode Debugger', 'MsgAlert', 'Conout', 'Todos'], correctIndex: 0, explanation: 'Debugger é o ideal.' }
                    ]
                }
            ]
        },
        {
            id: 'genericquery',
            title: 'GenericQuery',
            description: 'Queries seguras e manipulação SQL.',
            icon: '🔍',
            quizzes: [
                {
                    id: 'gq-1',
                    title: 'Básico',
                    level: 'Iniciante',
                    questions: [
                        { question: 'Classe de Query Segura:', options: ['FWPreparedStatement', 'TCQuery', 'Query', 'SQL'], correctIndex: 0, explanation: 'FWPreparedStatement.' },
                        { question: 'Placeholder de parâmetro:', options: ['?', ':', '@', '$'], correctIndex: 0, explanation: '?.' },
                        { question: 'Definir SQL:', options: ['SetQuery', 'SetSQL', 'Sql', 'Text'], correctIndex: 0, explanation: 'SetQuery().' },
                        { question: 'Vincular String:', options: ['SetString', 'BindString', 'Str', 'Add'], correctIndex: 0, explanation: 'SetString(n, val).' },
                        { question: 'Vincular Número:', options: ['SetNumeric', 'SetNumber', 'Num', 'Int'], correctIndex: 0, explanation: 'SetNumeric(n, val).' },
                        { question: 'Executar Query:', options: ['xQuery', 'Exec', 'Run', 'Go'], correctIndex: 0, explanation: 'xQuery().' },
                        { question: 'Retorno do xQuery:', options: ['Alias temporário', 'Array', 'Objeto', 'Nada'], correctIndex: 0, explanation: 'String com Alias.' },
                        { question: 'Fechar Alias criado:', options: ['DBCloseArea', 'Close', 'Kill', 'End'], correctIndex: 0, explanation: 'DBCloseArea().' },
                        { question: 'Converter Data p/ parâmetro:', options: ['SetDate', 'DtoS', 'Format', 'Time'], correctIndex: 0, explanation: 'SetDate().' },
                        { question: 'Prevenção de:', options: ['SQL Injection', 'Erro', 'Travamento', 'Delay'], correctIndex: 0, explanation: 'SQL Injection.' }
                    ]
                },
                {
                    id: 'gq-2',
                    title: 'Intermediário',
                    level: 'Intermediário',
                    questions: [
                        { question: 'Ver SQL Gerado:', options: ['GetFixQuery', 'ShowSQL', 'Debug', 'Print'], correctIndex: 0, explanation: 'GetFixQuery().' },
                        { question: 'TCSqlToArr:', options: ['SQL -> Array', 'SQL -> Alias', 'SQL -> File', 'SQL -> Obj'], correctIndex: 0, explanation: 'Retorna array.' },
                        { question: 'Inserir dados (Insert):', options: ['TCSqlExec', 'xQuery', 'Insert', 'Add'], correctIndex: 0, explanation: 'TCSqlExec.' },
                        { question: 'ChangeQuery serve para:', options: ['Portabilidade de Banco', 'Mudar SQL', 'Erro', 'Nada'], correctIndex: 0, explanation: 'Compatibilizar T-SQL e PL/SQL.' },
                        { question: 'Qual banco não é suportado oficialmente no Protheus hoje?', options: ['MySQL (Legacy)', 'SQL Server', 'Oracle', 'PostgreSQL'], correctIndex: 0, explanation: 'MySQL via ODBC legado, homologado PostgreSQL, Oracle, SQLServer.' },
                        { question: 'ISNULL no Oracle via ChangeQuery vira:', options: ['NVL', 'IFNULL', 'COALESCE', 'ISNULL'], correctIndex: 0, explanation: 'NVL.' },
                        { question: 'Substituir Top N:', options: ['ChangeQuery', 'Limit', 'RowBase', 'Top'], correctIndex: 0, explanation: 'ChangeQuery trata Top/Rownum.' },
                        { question: 'Usar IN com array:', options: ['FormatIn', 'In', 'List', 'Array'], correctIndex: 0, explanation: 'FormatIn(val, ",").' },
                        { question: 'Query com Join:', options: ['Suportado', 'Não suportado', 'Lento', 'Proibido'], correctIndex: 0, explanation: 'Totalmente suportado.' },
                        { question: 'Alias temporário é fisico?', options: ['Não, em memória/temp', 'Sim', 'DBF', 'TXT'], correctIndex: 0, explanation: 'Temporário no banco.' }
                    ]
                },
                {
                    id: 'gq-3',
                    title: 'Advanced SQL',
                    level: 'Avançado',
                    questions: [
                        { question: 'Union All vs Union:', options: ['All mantém duplicados', 'All remove', 'Igual', 'All é lento'], correctIndex: 0, explanation: 'Union All não faz distinct.' },
                        { question: 'Índice Hint no Protheus:', options: ['%Index%', '(Index)', '[Index]', '#Index'], correctIndex: 0, explanation: '%Index%.' },
                        { question: 'Tabela temporária real:', options: ['FwTemporaryTable', 'Create Temp', 'Tmp', 'Memory'], correctIndex: 0, explanation: 'Classe FwTemporaryTable.' },
                        { question: 'Stored Procedure:', options: ['Call', 'Exec', 'SP', 'Proc'], correctIndex: 1, explanation: 'TCSqlExec("Exec SP...").' },
                        { question: 'Query com CTE (With):', options: ['Suportado', 'Não', 'Erro', 'Lento'], correctIndex: 0, explanation: 'Suportado dependendo do banco.' },
                        { question: 'Case Sensitive no Like:', options: ['Depende do Banco/Collation', 'Sempre Sim', 'Sempre Não', 'Config'], correctIndex: 0, explanation: 'Collation do banco define.' },
                        { question: 'Truncate Table:', options: ['TCSqlExec', 'Delete', 'Erase', 'Drop'], correctIndex: 0, explanation: 'Via TCSqlExec.' },
                        { question: 'Pegar último ID inserido:', options: ['ScopeIdentity/Serial', 'Last', 'Max', 'End'], correctIndex: 0, explanation: 'Depende do banco (sequence/identity).' },
                        { question: 'Begin Transaction Manual:', options: ['TCSqlExec("BEGIN...")', 'Start', 'Open', 'Init'], correctIndex: 0, explanation: 'Mas cuidado com controle do AppServer.' },
                        { question: 'Connection Handle:', options: ['TCLink', 'Connect', 'Handle', 'Id'], correctIndex: 0, explanation: 'TCLink().' }
                    ]
                }
            ]
        },
        {
            id: 'functions',
            title: 'Funções Essenciais',
            description: 'Funções utilitárias.',
            icon: '⚡',
            quizzes: [
                {
                    id: 'func-1',
                    title: 'Essenciais I',
                    level: 'Iniciante',
                    questions: [
                        { question: 'MsgAlert:', options: ['Exibe alerta', 'Erro', 'Info', 'Sim/Nao'], correctIndex: 0, explanation: 'Alerta com ok.' },
                        { question: 'MsgInfo:', options: ['Exibe Informação', 'Erro', 'Alerta', 'Help'], correctIndex: 0, explanation: 'Info.' },
                        { question: 'MsgYesNo:', options: ['Pergunta Sim/Não', 'Ok', 'Cancel', 'Input'], correctIndex: 0, explanation: 'Retorna .T. ou .F.' },
                        { question: 'Conout:', options: ['Console Log', 'Tela', 'Arquivo', 'Impressora'], correctIndex: 0, explanation: 'Console.' },
                        { question: 'Include:', options: ['#include', 'Import', 'Use', 'Get'], correctIndex: 0, explanation: '#include.' },
                        { question: 'Alert():', options: ['Alerta simples', 'Complexo', 'Tela cheia', 'Janela'], correctIndex: 0, explanation: 'Função base do clipper.' },
                        { question: 'Vazio:', options: ['Empty', 'Null', 'Blank', 'Void'], correctIndex: 0, explanation: 'Empty().' },
                        { question: 'Data atual:', options: ['Date()', 'Now', 'Today', 'D()'], correctIndex: 0, explanation: 'Date().' },
                        { question: 'Hora atual:', options: ['Time()', 'Hour', 'Clock', 'Now'], correctIndex: 0, explanation: 'Time().' },
                        { question: 'Nome do Usuário:', options: ['RetCodUsr/cUserName', 'User', 'Name', 'Login'], correctIndex: 0, explanation: 'Variáveis de sistema ou funções de login.' }
                    ]
                },
                {
                    id: 'func-2',
                    title: 'Sistema e Arquivos',
                    level: 'Intermediário',
                    questions: [
                        { question: 'Verificar arquivo:', options: ['File()', 'Exist()', 'Has()', 'Check()'], correctIndex: 0, explanation: 'File("path").' },
                        { question: 'Copiar arquivo:', options: ['CpyS2T/__CopyFile', 'Copy', 'Move', 'Clone'], correctIndex: 0, explanation: '__CopyFile ou CpyS2T (Server to Terminal).' },
                        { question: 'Ler arquivo texto:', options: ['FOpen/FRead', 'Read', 'Open', 'Get'], correctIndex: 0, explanation: 'Funções de baixo nível F*.' },
                        { question: 'Classe para ler TXT linha a linha:', options: ['FT_FReadLn', 'ReadLine', 'Line', 'Next'], correctIndex: 0, explanation: 'FT_FReadLn ou TFile.' },
                        { question: 'Diretório temporário:', options: ['GetTempPath', 'Temp', 'Tmp', 'Dir'], correctIndex: 0, explanation: 'GetTempPath().' },
                        { question: 'Executar programa externo:', options: ['WaitRun/ShellExecute', 'Run', 'Exec', 'Cmd'], correctIndex: 0, explanation: 'WaitRun.' },
                        { question: 'Nome do Servidor:', options: ['GetComputerName', 'Host', 'Server', 'Machine'], correctIndex: 0, explanation: 'GetComputerName().' },
                        { question: 'IP do cliente:', options: ['GetClientIP', 'IP', 'Client', 'Remote'], correctIndex: 0, explanation: 'GetClientIP().' },
                        { question: 'Enviar Email:', options: ['U_SendMail/TMailManager', 'Email', 'Send', 'Mail'], correctIndex: 0, explanation: 'TMailManager.' },
                        { question: 'Criar diretório:', options: ['MakeDir', 'Dir', 'Create', 'Mkdir'], correctIndex: 0, explanation: 'MakeDir().' }
                    ]
                },
                {
                    id: 'func-3',
                    title: 'Avançado',
                    level: 'Avançado',
                    questions: [
                        { question: 'Executar bloco de código:', options: ['Eval', 'Run', 'Do', 'Exec'], correctIndex: 0, explanation: 'Eval(bBloco).' },
                        { question: 'Compilar string em run-time:', options: ['Precompile/MicroCompiler (b := &("{||...}"))', 'Compile', 'Make', 'Build'], correctIndex: 0, explanation: 'Macro substituição &.' },
                        { question: 'Job sem interface:', options: ['StartJob', 'Background', 'Service', 'Hidden'], correctIndex: 0, explanation: 'StartJob.' },
                        { question: 'RPC Call:', options: ['RpcSetEnv', 'Call', 'Remote', 'Connect'], correctIndex: 0, explanation: 'RpcSetEnv prepara ambiente.' },
                        { question: 'Sessão atual:', options: ['ThreadID', 'Session', 'Id', 'Nro'], correctIndex: 0, explanation: 'ThreadID().' },
                        { question: 'Ler XML:', options: ['XmlParser', 'ReadXml', 'Parse', 'Load'], correctIndex: 0, explanation: 'XmlParser.' },
                        { question: 'Parar execução N segundos:', options: ['Sleep', 'Wait', 'Pause', 'Stop'], correctIndex: 0, explanation: 'Sleep(ms).' },
                        { question: 'Criptografia:', options: ['Encrypt', 'Encode', 'Cipher', 'Secret'], correctIndex: 0, explanation: 'Funções Encrypt/Decrypt.' },
                        { question: 'Hash Map:', options: ['HashMap (TLPP)', 'Map', 'Dict', 'Array'], correctIndex: 0, explanation: 'HashMap.' },
                        { question: 'Tratamento de erro personalizado:', options: ['ErrorBlock', 'SetError', 'Catch', 'Trap'], correctIndex: 0, explanation: 'ErrorBlock(|e| ...).' }
                    ]
                }
            ]
        }
    ];

    selectTopic(topic: QuizTopic) {
        this.selectedTopic = topic;
        this.selectedQuiz = null;
    }

    selectQuiz(quiz: TopicQuiz) {
        this.selectedQuiz = quiz;
        this.restartQuiz();
    }

    goBackToTopics() {
        this.selectedTopic = null;
        this.selectedQuiz = null;
    }

    goBackToQuizzes() {
        this.selectedQuiz = null;
    }

    get currentQuestion(): QuizQuestion {
        if (!this.selectedQuiz) return { question: '', options: [], correctIndex: 0, explanation: '' };
        return this.selectedQuiz.questions[this.currentIndex];
    }

    get totalQuestions(): number {
        return this.selectedQuiz ? this.selectedQuiz.questions.length : 0;
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
        if (!this.selectedQuiz) return;

        if (this.currentIndex < this.selectedQuiz.questions.length - 1) {
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
