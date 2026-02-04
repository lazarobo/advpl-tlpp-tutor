import { Injectable } from '@angular/core';

export interface AdvPLFunction {
    name: string;
    category: string;
    description: string;
    syntax: string;
    parameters: string[];
    returnType: string;
    example: string;
    tlppCompatible: boolean;
    related?: string[];
}

export interface AdvPLField {
    name: string;
    type: 'C' | 'N' | 'D' | 'L' | 'M';
    size: number;
    decimal?: number;
    description: string;
}

export interface AdvPLIndex {
    order: string;
    key: string;
    description: string;
}

export interface AdvPLTable {
    name: string;
    description: string;
    module: string;
    type: 'Dicionário' | 'Dados';
    key?: string;
    fields?: AdvPLField[];
    indices?: AdvPLIndex[];
}

@Injectable({
    providedIn: 'root'
})
export class AdvplDataService {

    // ... (tables array remains the same)

    getTableDetails(tableName: string): { fields: AdvPLField[], indices: AdvPLIndex[] } {
        const prefix = tableName.substring(1, 3); // Ex: SA1 -> A1
        const fields: AdvPLField[] = [];
        const indices: AdvPLIndex[] = [];

        // Estratégia: Se tivermos definição manual, usamos. Se não, geramos padrão Protheus.

        // Definições Manuais para as Principais Tabelas
        if (tableName === 'SA1') {
            fields.push(
                { name: 'A1_FILIAL', type: 'C', size: 2, description: 'Filial do Sistema' },
                { name: 'A1_COD', type: 'C', size: 6, description: 'Código do Cliente' },
                { name: 'A1_LOJA', type: 'C', size: 2, description: 'Loja do Cliente' },
                { name: 'A1_NOME', type: 'C', size: 40, description: 'Nome/Razão Social' },
                { name: 'A1_NREDUZ', type: 'C', size: 20, description: 'Nome Fantasia' },
                { name: 'A1_END', type: 'C', size: 40, description: 'Endereço' },
                { name: 'A1_TIPO', type: 'C', size: 1, description: 'Tipo (F-Físico/J-Jurídico)' },
                { name: 'A1_EST', type: 'C', size: 2, description: 'Estado (UF)' },
                { name: 'A1_MUN', type: 'C', size: 15, description: 'Município' },
                { name: 'A1_CGC', type: 'C', size: 14, description: 'CNPJ/CPF' }
            );
            indices.push(
                { order: '1', key: 'A1_FILIAL+A1_COD+A1_LOJA', description: 'Por Código' },
                { order: '2', key: 'A1_FILIAL+A1_NOME', description: 'Por Nome' },
                { order: '3', key: 'A1_FILIAL+A1_CGC', description: 'Por CNPJ/CPF' }
            );
        } else if (tableName === 'SB1') {
            fields.push(
                { name: 'B1_FILIAL', type: 'C', size: 2, description: 'Filial do Sistema' },
                { name: 'B1_COD', type: 'C', size: 15, description: 'Código do Produto' },
                { name: 'B1_DESC', type: 'C', size: 30, description: 'Descrição' },
                { name: 'B1_TIPO', type: 'C', size: 2, description: 'Tipo do Produto (PA/MP/BN)' },
                { name: 'B1_UM', type: 'C', size: 2, description: 'Unidade de Medida' },
                { name: 'B1_LOCPAD', type: 'C', size: 2, description: 'Armazém Padrão' },
                { name: 'B1_POSIPI', type: 'C', size: 10, description: 'NCM/Classificação Fiscal' }
            );
            indices.push(
                { order: '1', key: 'B1_FILIAL+B1_COD', description: 'Por Código' },
                { order: '2', key: 'B1_FILIAL+B1_DESC', description: 'Por Descrição' },
                { order: '3', key: 'B1_FILIAL+B1_TIPO+B1_COD', description: 'Por Tipo + Código' }
            );
        } else {
            // Gerador Genérico para outras tabelas
            fields.push(
                { name: prefix + '_FILIAL', type: 'C', size: 2, description: 'Filial do Sistema' },
                { name: prefix + '_COD', type: 'C', size: 6, description: 'Código Principal' },
                { name: prefix + '_DESC', type: 'C', size: 30, description: 'Descrição/Nome' },
                { name: prefix + '_DATA', type: 'D', size: 8, description: 'Data de Referência' },
                { name: prefix + '_VALOR', type: 'N', size: 12, decimal: 2, description: 'Valor Monetário' },
                { name: prefix + '_OBS', type: 'M', size: 80, description: 'Observações (Memo)' }
            );
            indices.push(
                { order: '1', key: prefix + '_FILIAL+' + prefix + '_COD', description: 'Chave Primária Padrão' },
                { order: '2', key: prefix + '_FILIAL+' + prefix + '_DESC', description: 'Ordem Alfabética' }
            );
        }

        return { fields, indices };
    }

    // ... existing table array and methods


    private tables: AdvPLTable[] = [
        // Dicionários e Infraestrutura (SX)
        { name: 'SX1', description: 'Perguntas do Usuário (Parametrização)', module: 'Configurador', type: 'Dicionário', key: 'Grupo' },
        { name: 'SX2', description: 'Cadastro de Tabelas (Dicionário de Arquivos)', module: 'Configurador', type: 'Dicionário', key: 'X2_CHAVE' },
        { name: 'SX3', description: 'Dicionário de Campos', module: 'Configurador', type: 'Dicionário', key: 'X3_CAMPO' },
        { name: 'SX5', description: 'Tabelas Genéricas', module: 'Configurador', type: 'Dicionário', key: 'X5_TABELA+X5_CHAVE' },
        { name: 'SX6', description: 'Parâmetros do Sistema (MV_)', module: 'Configurador', type: 'Dicionário', key: 'X6_VAR' },
        { name: 'SX7', description: 'Gatilhos de Campos', module: 'Configurador', type: 'Dicionário', key: 'X7_CAMPO' },
        { name: 'SX9', description: 'Relacionamentos entre Tabelas', module: 'Configurador', type: 'Dicionário', key: 'X9_DOM' },
        { name: 'SIX', description: 'Índices das Tabelas', module: 'Configurador', type: 'Dicionário', key: 'INDICE' },
        { name: 'SXG', description: 'Grupos de Usuários', module: 'Configurador', type: 'Dicionário', key: 'XG_GRUPO' },

        // Cadastros Básicos (SA)
        { name: 'SA1', description: 'Cadastro de Clientes', module: 'Faturamento', type: 'Dados', key: 'A1_FILIAL+A1_COD+A1_LOJA' },
        { name: 'SA2', description: 'Cadastro de Fornecedores', module: 'Compras', type: 'Dados', key: 'A2_FILIAL+A2_COD+A2_LOJA' },
        { name: 'SA3', description: 'Cadastro de Vendedores', module: 'Comercial', type: 'Dados', key: 'A3_FILIAL+A3_COD' },
        { name: 'SA4', description: 'Cadastro de Transportadoras', module: 'Transporte', type: 'Dados', key: 'A4_FILIAL+A4_COD' },
        { name: 'SA5', description: 'Amarração Produto x Fornecedor', module: 'Compras', type: 'Dados', key: 'A5_FILIAL+A5_PRODUTO+A5_FORNECE' },
        { name: 'SA6', description: 'Cadastro de Bancos', module: 'Financeiro', type: 'Dados', key: 'A6_FILIAL+A6_COD+A6_AGENCIA+A6_NUMCON' },
        { name: 'SA7', description: 'Amarração Produto x Cliente', module: 'Faturamento', type: 'Dados', key: 'A7_FILIAL+A7_CLIENTE+A7_PRODUTO' },
        { name: 'SAH', description: 'Unidades de Medida', module: 'Estoque', type: 'Dados', key: 'AH_FILIAL+AH_UNIMED' },
        { name: 'SAJ', description: 'Tabela de Preços (Grupos)', module: 'Faturamento', type: 'Dados', key: 'AJ_FILIAL+AJ_TABELA' },

        // Produtos e Estoque (SB)
        { name: 'SB1', description: 'Cadastro de Produtos', module: 'Estoque', type: 'Dados', key: 'B1_FILIAL+B1_COD' },
        { name: 'SB2', description: 'Saldos Físico e Financeiro', module: 'Estoque', type: 'Dados', key: 'B2_FILIAL+B2_COD+B2_LOCAL' },
        { name: 'SB3', description: 'Demandas (Empenhos)', module: 'Estoque', type: 'Dados', key: 'B3_FILIAL+B3_COD+B3_LOCAL' },
        { name: 'SB5', description: 'Dados Adicionais do Produto', module: 'Estoque', type: 'Dados', key: 'B5_FILIAL+B5_COD' },
        { name: 'SB6', description: 'Saldos de Terceiros', module: 'Estoque', type: 'Dados', key: 'B6_FILIAL+B6_PRODUTO+B6_CLIFOR+B6_LOJA' },
        { name: 'SB7', description: 'Lançamentos do Inventário', module: 'Estoque', type: 'Dados', key: 'B7_FILIAL+B7_DATA+B7_COD' },
        { name: 'SB8', description: 'Saldos por Lote', module: 'Estoque', type: 'Dados', key: 'B8_FILIAL+B8_PRODUTO+B8_LOCAL+B8_LOTECTL' },
        { name: 'SB9', description: 'Saldos Iniciais (Fechamento)', module: 'Estoque', type: 'Dados', key: 'B9_FILIAL+B9_COD+B9_LOCAL+B9_DATA' },
        { name: 'SBM', description: 'Grupos de Produtos', module: 'Estoque', type: 'Dados', key: 'BM_FILIAL+BM_GRUPO' },
        { name: 'SBP', description: 'Códigos de Barras', module: 'Estoque', type: 'Dados', key: 'BP_FILIAL+BP_PRODUTO' },

        // Movimentos de Faturamento e Vendas (SC/SD/SF)
        { name: 'SC5', description: 'Pedidos de Venda (Cabeçalho)', module: 'Faturamento', type: 'Dados', key: 'C5_FILIAL+C5_NUM' },
        { name: 'SC6', description: 'Itens do Pedido de Venda', module: 'Faturamento', type: 'Dados', key: 'C6_FILIAL+C6_NUM+C6_ITEM' },
        { name: 'SC9', description: 'Pedidos Liberados (Cargas)', module: 'Faturamento', type: 'Dados', key: 'C9_FILIAL+C9_PEDIDO' },
        { name: 'SF2', description: 'Notas Fiscais de Saída (Cabeçalho)', module: 'Faturamento', type: 'Dados', key: 'F2_FILIAL+F2_DOC+F2_SERIE' },
        { name: 'SD2', description: 'Itens da Nota Fiscal de Saída', module: 'Faturamento', type: 'Dados', key: 'D2_FILIAL+D2_DOC+D2_SERIE+D2_ITEM' },

        // Movimentos de Compras (SC/SD/SF)
        { name: 'SC1', description: 'Solicitações de Compra', module: 'Compras', type: 'Dados', key: 'C1_FILIAL+C1_NUM' },
        { name: 'SC3', description: 'Contratos de Parceria', module: 'Compras', type: 'Dados', key: 'C3_FILIAL+C3_NUM+C3_FORNECE' },
        { name: 'SC7', description: 'Pedidos de Compra', module: 'Compras', type: 'Dados', key: 'C7_FILIAL+C7_NUM' },
        { name: 'SF1', description: 'Notas Fiscais de Entrada (Cabeçalho)', module: 'Compras', type: 'Dados', key: 'F1_FILIAL+F1_DOC+F1_SERIE+F1_FORNECE' },
        { name: 'SD1', description: 'Itens da Nota Fiscal de Entrada', module: 'Compras', type: 'Dados', key: 'D1_FILIAL+D1_DOC+D1_SERIE+D1_FORNECE+D1_ITEM' },

        // Financeiro (SE)
        { name: 'SE1', description: 'Contas a Receber', module: 'Financeiro', type: 'Dados', key: 'E1_FILIAL+E1_PREFIXO+E1_NUM+E1_PARCELA' },
        { name: 'SE2', description: 'Contas a Pagar', module: 'Financeiro', type: 'Dados', key: 'E2_FILIAL+E2_PREFIXO+E2_NUM+E2_PARCELA' },
        { name: 'SE3', description: 'Movimento de Comissões', module: 'Financeiro', type: 'Dados', key: 'E3_FILIAL+E3_VEND+E3_NUM' },
        { name: 'SE5', description: 'Movimentação Bancária (Baixas)', module: 'Financeiro', type: 'Dados', key: 'E5_FILIAL+E5_DATA+E5_BANCO' },
        { name: 'SF6', description: 'Guias de Recolhimento', module: 'Financeiro', type: 'Dados', key: 'F6_FILIAL+F6_NUMERO' },

        // Fiscal (SF)
        { name: 'SF3', description: 'Livros Fiscais', module: 'Fiscal', type: 'Dados', key: 'F3_FILIAL+F3_ENTR_SA+F3_DOC+F3_SERIE' },
        { name: 'SF4', description: 'Tipos de Entrada e Saída (TES)', module: 'Fiscal', type: 'Dados', key: 'F4_FILIAL+F4_CODIGO' },
        { name: 'CC2', description: 'Municípios (IBGE)', module: 'Fiscal', type: 'Dados', key: 'CC2_EST+CC2_CODMUN' },

        // Contabilidade (CT/CV)
        { name: 'CT1', description: 'Plano de Contas', module: 'Contabilidade', type: 'Dados', key: 'CT1_FILIAL+CT1_CONTA' },
        { name: 'CTT', description: 'Centro de Custo', module: 'Contabilidade', type: 'Dados', key: 'CTT_FILIAL+CTT_CUSTO' },
        { name: 'CTD', description: 'Item Contábil', module: 'Contabilidade', type: 'Dados', key: 'CTD_FILIAL+CTD_ITEM' },
        { name: 'CTK', description: 'Saldos Contábeis', module: 'Contabilidade', type: 'Dados', key: 'CTK_FILIAL+CTK_CONTA' },
        { name: 'CT2', description: 'Lançamentos Contábeis', module: 'Contabilidade', type: 'Dados', key: 'CT2_FILIAL+CT2_DATA+CT2_LOTE' },
        { name: 'CV0', description: 'Tabela de Roteiro Contábil', module: 'Contabilidade', type: 'Dados', key: 'CV0_FILIAL+CV0_CODIGO' },

        // Recursos Humanos (SR/SP)
        { name: 'SRA', description: 'Cadastro de Funcionários', module: 'RH', type: 'Dados', key: 'RA_FILIAL+RA_MAT' },
        { name: 'SRB', description: 'Dependentes', module: 'RH', type: 'Dados', key: 'RB_FILIAL+RB_MAT+RB_COD' },
        { name: 'SRC', description: 'Movimento Mensal (Folha)', module: 'RH', type: 'Dados', key: 'RC_FILIAL+RC_MAT' },
        { name: 'SRV', description: 'Verbas de Folha', module: 'RH', type: 'Dados', key: 'RV_FILIAL+RV_COD' },
        { name: 'SP8', description: 'Cadastro de Marcações (Ponto)', module: 'Ponto Eletrônico', type: 'Dados', key: 'P8_FILIAL+P8_MAT+P8_DATA' },
        { name: 'SPC', description: 'Apontamentos', module: 'Ponto Eletrônico', type: 'Dados', key: 'PC_FILIAL+PC_MAT' },

        // Gestão de Projetos (AF)
        { name: 'AF1', description: 'Orçamentos/Projetos', module: 'PCO', type: 'Dados', key: 'AF1_FILIAL+AF1_ORCAME' },
        { name: 'AF8', description: 'Definição de Tarefas (WBS)', module: 'Projetos', type: 'Dados', key: 'AF8_FILIAL+AF8_PROJET+AF8_TAREFA' },
        { name: 'AFU', description: 'Apontamento de Horas', module: 'Projetos', type: 'Dados', key: 'AFU_FILIAL+AFU_PROJET+AFU_RECURS' },

        // PCP (Planejamento e Controle de Produção)
        { name: 'SC2', description: 'Ordens de Produção', module: 'PCP', type: 'Dados', key: 'C2_FILIAL+C2_NUM' },
        { name: 'SG1', description: 'Estrutura de Produtos (BOM)', module: 'PCP', type: 'Dados', key: 'G1_FILIAL+G1_COD' },
        { name: 'SH1', description: 'Roteiros de Operações', module: 'PCP', type: 'Dados', key: 'H1_FILIAL+H1_COD' },
    ];

    private functions: AdvPLFunction[] = [
        // Conversão
        { name: 'Val', category: 'Conversão', description: 'Converte uma string para um valor numérico', syntax: 'Val(cString)', parameters: ['cString: String a ser convertida'], returnType: 'Numeric', example: 'nValor := Val("100") // Retorna 100', tlppCompatible: true, related: ['Str', 'Transform'] },
        { name: 'Str', category: 'Conversão', description: 'Converte um valor numérico para string', syntax: 'Str(nValue, nLength, nDecimals)', parameters: ['nValue: Número a converter', 'nLength: Tamanho total', 'nDecimals: Casas decimais'], returnType: 'Character', example: 'cTexto := Str(100, 5) // Retorna "  100"', tlppCompatible: true, related: ['Val', 'Transform', 'cValToChar'] },
        { name: 'cValToChar', category: 'Conversão', description: 'Converte numérico para caracter sem espaços', syntax: 'cValToChar(nInd)', parameters: ['nInd: Valor numérico'], returnType: 'Character', example: 'cTxt := cValToChar(123) // Retorna "123"', tlppCompatible: true, related: ['Str', 'Val'] },
        { name: 'StrTran', category: 'String', description: 'Substitui ocorrências de uma substring por outra', syntax: 'StrTran(cString, cSearch, cReplace)', parameters: ['cString: String original', 'cSearch: Texto a buscar', 'cReplace: Texto substituto'], returnType: 'Character', example: 'cResult := StrTran("TOTVS Protheus", "Protheus", "ERP") // "TOTVS ERP"', tlppCompatible: true, related: ['Substr', 'At'] },
        { name: 'Transform', category: 'Conversão', description: 'Formata um valor usando máscara picture', syntax: 'Transform(xValue, cPicture)', parameters: ['xValue: Valor a formatar', 'cPicture: Máscara de formatação'], returnType: 'Character', example: 'cCNPJ := Transform("12345678000199", "@R 99.999.999/9999-99")', tlppCompatible: true, related: ['Val', 'Str'] },
        { name: 'AllTrim', category: 'String', description: 'Remove espaços em branco do início e do fim da string', syntax: 'AllTrim(cString)', parameters: ['cString: Texto a limpar'], returnType: 'Character', example: 'cNome := AllTrim("  João Silva  ") // "João Silva"', tlppCompatible: true, related: ['LTrim', 'RTrim'] },
        { name: 'SubStr', category: 'String', description: 'Retorna uma parte da string', syntax: 'SubStr(cString, nStart, nLen)', parameters: ['cString: Texto original', 'nStart: Posição inicial', 'nLen: Tamanho (opcional)'], returnType: 'Character', example: 'cParte := SubStr("AdvPL", 1, 3) // "Adv"', tlppCompatible: true, related: ['Left', 'Right'] },
        { name: 'Len', category: 'Genérica', description: 'Retorna o tamanho de uma string ou array', syntax: 'Len(xValue)', parameters: ['xValue: String ou Array'], returnType: 'Numeric', example: 'nTamanho := Len("Teste") // 5', tlppCompatible: true, related: ['Empty'] },
        { name: 'Rat', category: 'String', description: 'Retorna a posição da última ocorrência de uma substring', syntax: 'Rat(cSearch, cTarget)', parameters: ['cSearch: O que buscar', 'cTarget: Onde buscar'], returnType: 'Numeric', example: 'nPos := Rat("\\", "C:\\Temp\\Arq.txt") // Posição da última barra', tlppCompatible: true, related: ['At'] },
        { name: 'PadR', category: 'String', description: 'Preenche com espaços ou caracteres à direita', syntax: 'PadR(cString, nLen, cFill)', parameters: ['cString: Texto', 'nLen: Tamanho final', 'cFill: Caractere de preenchimento'], returnType: 'Character', example: 'cCodigo := PadR("1", 6, "0") // "100000"', tlppCompatible: true, related: ['PadL', 'PadC'] },

        // Banco de Dados
        { name: 'DBSeek', category: 'Banco de Dados', description: 'Busca um registro na tabela ativa usando índice', syntax: 'DBSeek(xKey, lSoftSeek)', parameters: ['xKey: Chave de busca', 'lSoftSeek: Busca aproximada (opcional)'], returnType: 'Logical', example: 'DBSelectArea("SA1")\nDBSetOrder(1)\nIf DBSeek(xFilial("SA1") + "000001")\n  Alert("Cliente encontrado!")\nEndIf', tlppCompatible: true, related: ['DBSetOrder', 'Found'] },
        { name: 'DBSkip', category: 'Banco de Dados', description: 'Move o ponteiro de registro', syntax: 'DBSkip(nRecords)', parameters: ['nRecords: Número de registros a avançar/retroceder'], returnType: 'Nil', example: 'DBSkip(1)  // Avança um registro\nDBSkip(-1) // Retrocede um registro', tlppCompatible: true, related: ['DBGoTop', 'DBGoBottom'] },
        { name: 'RecNo', category: 'Banco de Dados', description: 'Retorna o número do registro atual', syntax: 'RecNo()', parameters: [], returnType: 'Numeric', example: 'nRecno := RecNo()\nAlert("Registro atual: " + cValToChar(nRecno))', tlppCompatible: true, related: ['DBGoTo', 'LastRec'] },
        { name: 'Alias', category: 'Banco de Dados', description: 'Retorna o nome da área de trabalho ativa', syntax: 'Alias(nWorkArea)', parameters: ['nWorkArea: Número da área (opcional)'], returnType: 'Character', example: 'cAlias := Alias()\nAlert("Tabela ativa: " + cAlias)', tlppCompatible: true, related: ['DBSelectArea', 'Select'] },
        { name: 'DBSelectArea', category: 'Banco de Dados', description: 'Seleciona uma área de trabalho', syntax: 'DBSelectArea(cArea)', parameters: ['cArea: Alias da tabela'], returnType: 'Nil', example: 'DBSelectArea("SA1")', tlppCompatible: true, related: ['Alias'] },
        { name: 'DBSetOrder', category: 'Banco de Dados', description: 'Define o índice ativo', syntax: 'DBSetOrder(nOrder)', parameters: ['nOrder: Número do índice'], returnType: 'Nil', example: 'DBSetOrder(1) // Ordem por Código', tlppCompatible: true, related: ['IndexOrd'] },
        { name: 'DBCloseArea', category: 'Banco de Dados', description: 'Fecha a tabela atual', syntax: 'DBCloseArea()', parameters: [], returnType: 'Nil', example: 'DBCloseArea()', tlppCompatible: true, related: ['DBUseArea'] },
        { name: 'EOF', category: 'Banco de Dados', description: 'Verifica fim do arquivo (End Of File)', syntax: 'EOF()', parameters: [], returnType: 'Logical', example: 'While !EOF()\n  // Processa\n  DBSkip()\nEndDo', tlppCompatible: true, related: ['BOF'] },

        // Interface do Usuário
        { name: 'Alert', category: 'Interface', description: 'Exibe uma mensagem de alerta na tela', syntax: 'Alert(cMessage)', parameters: ['cMessage: Mensagem a exibir'], returnType: 'Nil', example: 'Alert("Operação concluída com sucesso!")', tlppCompatible: true, related: ['MsgInfo', 'MsgStop'] },
        { name: 'MsgInfo', category: 'Interface', description: 'Exibe uma mensagem informativa', syntax: 'MsgInfo(cMessage, cTitle)', parameters: ['cMessage: Mensagem', 'cTitle: Título da janela'], returnType: 'Nil', example: 'MsgInfo("Dados salvos", "Confirmação")', tlppCompatible: true, related: ['Alert', 'MsgYesNo'] },
        { name: 'MsgStop', category: 'Interface', description: 'Exibe mensagem de erro/parada', syntax: 'MsgStop(cMessage, cTitle)', parameters: ['cMessage: Mensagem', 'cTitle: Título'], returnType: 'Nil', example: 'MsgStop("Erro crítico detectado!", "Erro")', tlppCompatible: true, related: ['MsgAlert'] },
        { name: 'MsgYesNo', category: 'Interface', description: 'Exibe mensagem com opções Sim/Não', syntax: 'MsgYesNo(cMessage, cTitle)', parameters: ['cMessage: Mensagem', 'cTitle: Título'], returnType: 'Logical', example: 'If MsgYesNo("Confirma exclusão?", "Atenção")\n  // Executa exclusão\nEndIf', tlppCompatible: true, related: ['MsgInfo', 'Aviso'] },
        { name: 'FWInputBox', category: 'Interface', description: 'Solicita entrada de dados do usuário', syntax: 'FWInputBox(cPrompt, cDefault)', parameters: ['cPrompt: Texto do prompt', 'cDefault: Valor padrão'], returnType: 'Character', example: 'cNome := FWInputBox("Digite seu nome:", "")', tlppCompatible: true, related: ['MsgGet'] },

        // Arrays
        { name: 'aAdd', category: 'Array', description: 'Adiciona elemento ao final do array', syntax: 'aAdd(aArray, xValue)', parameters: ['aArray: Array destino', 'xValue: Valor a adicionar'], returnType: 'Array', example: 'aLista := {}\naAdd(aLista, "Item 1")\naAdd(aLista, "Item 2")', tlppCompatible: true, related: ['aIns', 'aDel'] },
        { name: 'aScan', category: 'Array', description: 'Procura elemento no array', syntax: 'aScan(aArray, bCondition)', parameters: ['aArray: Array a pesquisar', 'bCondition: Bloco de código com condição'], returnType: 'Numeric', example: 'nPos := aScan(aClientes, {|x| x[1] == "000001"})', tlppCompatible: true, related: ['aAdd', 'aSort'] },
        { name: 'aSort', category: 'Array', description: 'Ordena elementos do array', syntax: 'aSort(aArray, nStart, nCount, bOrder)', parameters: ['aArray: Array a ordenar', 'nStart: Posição inicial', 'nCount: Quantidade', 'bOrder: Critério de ordenação'], returnType: 'Array', example: 'aSort(aLista,,, {|x,y| x[1] < y[1]})', tlppCompatible: true, related: ['aScan', 'aClone'] },
        { name: 'aClone', category: 'Array', description: 'Cria cópia do array', syntax: 'aClone(aSource)', parameters: ['aSource: Array origem'], returnType: 'Array', example: 'aCopia := aClone(aOriginal)', tlppCompatible: true, related: ['aCopy', 'aFill'] },
        { name: 'aDel', category: 'Array', description: 'Remove elemento do array (deixa nil no final)', syntax: 'aDel(aArray, nPos)', parameters: ['aArray: Array', 'nPos: Posição a deletar'], returnType: 'Array', example: 'aDel(aLista, 1)\naSize(aLista, Len(aLista) - 1)', tlppCompatible: true, related: ['aSize'] },
        { name: 'aSize', category: 'Array', description: 'Redimensiona um array', syntax: 'aSize(aArray, nLen)', parameters: ['aArray: Array', 'nLen: Novo tamanho'], returnType: 'Array', example: 'aSize(aLista, 0) // Limpa array', tlppCompatible: true, related: ['Len'] },

        // Data e Hora
        { name: 'Date', category: 'Data/Hora', description: 'Retorna a data atual do sistema', syntax: 'Date()', parameters: [], returnType: 'Date', example: 'dHoje := Date()\nAlert("Data: " + DtoC(dHoje))', tlppCompatible: true, related: ['Time', 'DtoS'] },
        { name: 'DtoC', category: 'Data/Hora', description: 'Converte data para string no formato DD/MM/AA', syntax: 'DtoC(dDate)', parameters: ['dDate: Data a converter'], returnType: 'Character', example: 'cData := DtoC(Date()) // "04/02/26"', tlppCompatible: true, related: ['CtoD', 'DtoS'] },
        { name: 'CtoD', category: 'Data/Hora', description: 'Converte string para data', syntax: 'CtoD(cDate)', parameters: ['cDate: String no formato DD/MM/AA'], returnType: 'Date', example: 'dData := CtoD("01/01/26")', tlppCompatible: true, related: ['DtoC', 'StoD'] },
        { name: 'DtoS', category: 'Data/Hora', description: 'Converte data para string AAAAMMDD (útil para índices)', syntax: 'DtoS(dDate)', parameters: ['dDate: Data'], returnType: 'Character', example: 'cIndice := DtoS(Date()) // "20260204"', tlppCompatible: true, related: ['StoD'] },
        { name: 'YearSub', category: 'Data/Hora', description: 'Subtrai anos de uma data', syntax: 'YearSub(dDate, nYears)', parameters: ['dDate: Data base', 'nYears: Anos a subtrair'], returnType: 'Date', example: 'dPassado := YearSub(Date(), 5) // 5 anos atrás', tlppCompatible: true, related: ['MonthSub', 'DaySub'] },
        { name: 'Month', category: 'Data/Hora', description: 'Retorna o mês da data', syntax: 'Month(dDate)', parameters: ['dDate: Data'], returnType: 'Numeric', example: 'nMes := Month(Date())', tlppCompatible: true, related: ['Day', 'Year'] },
        { name: 'Year', category: 'Data/Hora', description: 'Retorna o ano da data', syntax: 'Year(dDate)', parameters: ['dDate: Data'], returnType: 'Numeric', example: 'nAno := Year(Date())', tlppCompatible: true, related: ['Month'] },

        // Matemática
        { name: 'Round', category: 'Matemática', description: 'Arredonda número para casas decimais', syntax: 'Round(nValue, nDecimals)', parameters: ['nValue: Valor numérico', 'nDecimals: Casas decimais'], returnType: 'Numeric', example: 'nValor := Round(10.567, 2) // 10.57', tlppCompatible: true, related: ['Int', 'NoRound'] },
        { name: 'Int', category: 'Matemática', description: 'Retorna a parte inteira do número', syntax: 'Int(nValue)', parameters: ['nValue: Valor numérico'], returnType: 'Numeric', example: 'nInteiro := Int(10.99) // 10', tlppCompatible: true, related: ['Round', 'Abs'] },
        { name: 'Abs', category: 'Matemática', description: 'Retorna o valor absoluto', syntax: 'Abs(nValue)', parameters: ['nValue: Valor numérico'], returnType: 'Numeric', example: 'nAbs := Abs(-50) // 50', tlppCompatible: true, related: ['Int', 'Max'] },
        { name: 'Replicate', category: 'Matemática', description: 'Repete um caractere N vezes', syntax: 'Replicate(cString, nCount)', parameters: ['cString: Texto', 'nCount: Repetições'], returnType: 'Character', example: 'cLinha := Replicate("-", 50)', tlppCompatible: true, related: ['Space'] },

        // Arquivos
        { name: 'File', category: 'Arquivos', description: 'Verifica se um arquivo existe', syntax: 'File(cPath)', parameters: ['cPath: Caminho do arquivo'], returnType: 'Logical', example: 'If File("C:\\temp\\log.txt")\n  Alert("Existe")\nEndIf', tlppCompatible: true, related: ['FOpen'] },
        { name: 'CpyS2T', category: 'Arquivos', description: 'Copia arquivo do Server para o Local (Client)', syntax: 'CpyS2T(cSource, cDest, lCompress)', parameters: ['cSource: Origem (Server)', 'cDest: Destino (Local)'], returnType: 'Logical', example: 'CpyS2T("\\system\\relatorio.pdf", "C:\\temp\\rel.pdf")', tlppCompatible: true, related: ['CpyT2S'] },
        { name: 'CpyT2S', category: 'Arquivos', description: 'Copia arquivo do Local (Client) para o Server', syntax: 'CpyT2S(cSource, cDest)', parameters: ['cSource: Origem (Local)', 'cDest: Destino (Server)'], returnType: 'Logical', example: 'CpyT2S("C:\\upload\\dados.txt", "\\uploads\\dados.txt")', tlppCompatible: true, related: ['CpyS2T'] },

        // Específicas TLPP e Diversos
        { name: 'Namespace', category: 'TLPP', description: 'Define namespace para organização de código', syntax: 'namespace br.com.totvs', parameters: [], returnType: 'Void', example: 'namespace br.com.totvs.erp\n\nfunction MinhaFuncao()\n  // código\nreturn', tlppCompatible: true, related: ['using'] },
        { name: 'Class', category: 'TLPP', description: 'Define uma classe (POO)', syntax: 'class ClassName', parameters: [], returnType: 'Void', example: 'class Produto\n  data cCodigo\n  data cDescricao\n  method new() constructor\nendclass', tlppCompatible: true, related: ['method', 'data'] },
        { name: 'Include', category: 'Preprocessador', description: 'Inclui arquivo de cabeçalho', syntax: '#include "totvs.ch"', parameters: [], returnType: 'N/A', example: '#include "protheus.ch"\n#include "topconn.ch"', tlppCompatible: true, related: ['Define'] },

        // Controle de Exceção e Fluxo
        { name: 'Try...Catch', category: 'Controle de Fluxo', description: 'Estrutura de tratamento de exceções (erro)', syntax: 'Try...Catch e...EndTry', parameters: [], returnType: 'N/A', example: 'Try\n  // Código de risco\nCatch e\n  Alert("Erro: " + e:Description)\nEndTry', tlppCompatible: true, related: ['Throw', 'ErrorBlock'] },
        { name: 'Throw', category: 'Controle de Fluxo', description: 'Lança uma exceção manualmente', syntax: 'Throw(xError)', parameters: ['xError: Objeto de erro ou mensagem'], returnType: 'Void', example: 'If nValor < 0\n  Throw(Exception(0, "Valor negativo inválido"))\nEndIf', tlppCompatible: true, related: ['Try...Catch'] },

        // JSON e Web
        { name: 'FwJsonSerialize', category: 'JSON', description: 'Converte qualquer dado (Array, Objeto) para JSON String', syntax: 'FwJsonSerialize(xData, lHtml)', parameters: ['xData: Dado a converter', 'lHtml: Formata HTML (opcional)'], returnType: 'Character', example: 'cJson := FwJsonSerialize(aLista)', tlppCompatible: true, related: ['FwJsonDeserialize'] },
        { name: 'FwJsonDeserialize', category: 'JSON', description: 'Converte String JSON para Objeto AdvPL', syntax: 'FwJsonDeserialize(cJson)', parameters: ['cJson: String JSON'], returnType: 'Object', example: 'oDados := FwJsonDeserialize(cJsonInput)', tlppCompatible: true, related: ['FwJsonSerialize'] },
        { name: 'Http Get', category: 'Web', description: 'Realiza uma requisição HTTP GET via classe FWRest', syntax: 'oRest:Get(cEndPoint)', parameters: ['cEndPoint: URL do recurso'], returnType: 'Logical', example: 'oRest := FWRest():New("http://api.com")\noRest:Get("/users")', tlppCompatible: true, related: ['Http Post'] },

        // TLPP Avançado (Tipagem)
        { name: 'Tipagem Forte', category: 'TLPP', description: 'Definição explícita de tipos em parâmetros e retorno', syntax: 'User Function Nome(param as Type) as ReturnType', parameters: [], returnType: 'N/A', example: 'User Function Calculo(nVal as Numeric) as Numeric\n  Return nVal * 2', tlppCompatible: true, related: ['Class'] },
        { name: 'ParamType', category: 'TLPP', description: 'Verifica o tipo do parâmetro passado', syntax: 'ParamType(xParam)', parameters: ['xParam: Variável'], returnType: 'Character', example: 'If ValType(xVar) == "C"\n  Alert("É caracter")\nEndIf', tlppCompatible: true, related: ['ValType'] },
        // MVC e Padrões Modernos
        { name: 'ModelDef', category: 'MVC', description: 'Define o modelo de dados (regras e estruturas) em um fonte MVC', syntax: 'Static Function ModelDef()', parameters: [], returnType: 'MPFormModel', example: 'Static Function ModelDef()\n  Local oStruct := FWFormStruct(1, "SA1")\n  Local oModel := MPFormModel():New("MODEL_SA1",, oStruct)\nReturn oModel', tlppCompatible: true, related: ['ViewDef', 'MenuDef'] },
        { name: 'ViewDef', category: 'MVC', description: 'Define a interface visual em um fonte MVC', syntax: 'Static Function ViewDef()', parameters: [], returnType: 'FWFormView', example: 'Static Function ViewDef()\n  Local oModel := FWLoadModel("COMP01")\n  Local oStruct := FWFormStruct(2, "SA1")\n  Local oView := FWFormView():New()\n  oView:SetModel(oModel)\n  oView:AddField("VIEW_SA1", oStruct, "MODEL_SA1")\nReturn oView', tlppCompatible: true, related: ['ModelDef', 'FWFormStruct'] },
        { name: 'FWFormStruct', category: 'MVC', description: 'Cria estrutura de campos baseada no dicionário (SX3)', syntax: 'FWFormStruct(nType, cAlias)', parameters: ['nType: 1=Model, 2=View', 'cAlias: Tabela (ex: "SA1")'], returnType: 'Object', example: 'Local oStruModel := FWFormStruct(1, "SA1")\nLocal oStruView := FWFormStruct(2, "SA1")', tlppCompatible: true, related: ['ModelDef'] },
        { name: 'MenuDef', category: 'MVC', description: 'Define as operações de menu disponíveis na rotina', syntax: 'Static Function MenuDef()', parameters: [], returnType: 'Array', example: 'Static Function MenuDef()\n  Return {{ "Visualizar", "VIEWDEF.COMP01", 0, 2, 0, .F. }}', tlppCompatible: true, related: ['ModelDef'] },
    ];

    getCategories(): string[] {
        const categories = [...new Set(this.functions.map(f => f.category))];
        return categories.sort();
    }

    getFunctionsByCategory(category: string): AdvPLFunction[] {
        return this.functions.filter(f => f.category === category);
    }

    getAllFunctions(): AdvPLFunction[] {
        return this.functions;
    }

    getFunctionByName(name: string): AdvPLFunction | undefined {
        return this.functions.find(f => f.name.toLowerCase() === name.toLowerCase());
    }

    searchFunctions(query: string): AdvPLFunction[] {
        const lowerQuery = query.toLowerCase();
        return this.functions.filter(f =>
            f.name.toLowerCase().includes(lowerQuery) ||
            f.description.toLowerCase().includes(lowerQuery) ||
            f.category.toLowerCase().includes(lowerQuery)
        );
    }

    getAllTables(): AdvPLTable[] {
        return this.tables;
    }
}
