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

        // Definições Manuais para as Principais Tabelas
        switch (tableName) {
            case 'SA1': // Clientes
                fields.push(
                    { name: 'A1_FILIAL', type: 'C', size: 2, description: 'Filial do Sistema' },
                    { name: 'A1_COD', type: 'C', size: 6, description: 'Código do Cliente' },
                    { name: 'A1_LOJA', type: 'C', size: 2, description: 'Loja do Cliente' },
                    { name: 'A1_NOME', type: 'C', size: 40, description: 'Nome/Razão Social' },
                    { name: 'A1_NREDUZ', type: 'C', size: 20, description: 'Nome Fantasia' },
                    { name: 'A1_END', type: 'C', size: 40, description: 'Endereço' },
                    { name: 'A1_TIPO', type: 'C', size: 1, description: 'Tipo (F-Físico/J-Jurídico/X-Export)' },
                    { name: 'A1_EST', type: 'C', size: 2, description: 'Estado (UF)' },
                    { name: 'A1_MUN', type: 'C', size: 15, description: 'Município' },
                    { name: 'A1_BAIRRO', type: 'C', size: 20, description: 'Bairro' },
                    { name: 'A1_CEP', type: 'C', size: 8, description: 'CEP' },
                    { name: 'A1_CGC', type: 'C', size: 14, description: 'CNPJ/CPF' },
                    { name: 'A1_INSCR', type: 'C', size: 20, description: 'Inscrição Estadual' },
                    { name: 'A1_EMAIL', type: 'C', size: 60, description: 'Email' },
                    { name: 'A1_TEL', type: 'C', size: 15, description: 'Telefone' },
                    { name: 'A1_VEND', type: 'C', size: 6, description: 'Código do Vendedor' },
                    { name: 'A1_ULTCOM', type: 'D', size: 8, description: 'Data da Última Compra' },
                    { name: 'A1_MSALDO', type: 'N', size: 14, decimal: 2, description: 'Saldo Financeiro' },
                    { name: 'A1_NATUREZ', type: 'C', size: 10, description: 'Natureza Financeira' },
                    { name: 'A1_CONTA', type: 'C', size: 20, description: 'Conta Contábil' },
                    { name: 'A1_RISCO', type: 'C', size: 1, description: 'Grau de Risco' },
                    { name: 'A1_LC', type: 'N', size: 14, decimal: 2, description: 'Limite de Crédito' },
                    { name: 'A1_COMPLEM', type: 'C', size: 50, description: 'Complemento do Endereço' }
                );
                indices.push(
                    { order: '1', key: 'A1_FILIAL+A1_COD+A1_LOJA', description: 'Por Código' },
                    { order: '2', key: 'A1_FILIAL+A1_NOME', description: 'Por Nome' },
                    { order: '3', key: 'A1_FILIAL+A1_CGC', description: 'Por CNPJ/CPF' },
                    { order: '4', key: 'A1_FILIAL+A1_NREDUZ', description: 'Por Nome Fantasia' },
                    { order: '5', key: 'A1_FILIAL+A1_END', description: 'Por Endereço' },
                    { order: '6', key: 'A1_FILIAL+A1_VEND', description: 'Por Vendedor' }
                );
                break;

            case 'SA2': // Fornecedores
                fields.push(
                    { name: 'A2_FILIAL', type: 'C', size: 2, description: 'Filial do Sistema' },
                    { name: 'A2_COD', type: 'C', size: 6, description: 'Código do Fornecedor' },
                    { name: 'A2_LOJA', type: 'C', size: 2, description: 'Loja' },
                    { name: 'A2_NOME', type: 'C', size: 40, description: 'Razão Social' },
                    { name: 'A2_NREDUZ', type: 'C', size: 20, description: 'Nome Fantasia' },
                    { name: 'A2_END', type: 'C', size: 40, description: 'Endereço' },
                    { name: 'A2_EST', type: 'C', size: 2, description: 'Estado (UF)' },
                    { name: 'A2_MUN', type: 'C', size: 15, description: 'Município' },
                    { name: 'A2_BAIRRO', type: 'C', size: 20, description: 'Bairro' },
                    { name: 'A2_CEP', type: 'C', size: 8, description: 'CEP' },
                    { name: 'A2_TIPO', type: 'C', size: 1, description: 'Tipo (F/J)' },
                    { name: 'A2_CGC', type: 'C', size: 14, description: 'CNPJ/CPF' },
                    { name: 'A2_INSCR', type: 'C', size: 20, description: 'Inscrição Estadual' },
                    { name: 'A2_TEL', type: 'C', size: 15, description: 'Telefone' },
                    { name: 'A2_EMAIL', type: 'C', size: 60, description: 'Email' },
                    { name: 'A2_NATUREZ', type: 'C', size: 10, description: 'Natureza Financeira' },
                    { name: 'A2_CONTA', type: 'C', size: 20, description: 'Conta Contábil' },
                    { name: 'A2_BANCO', type: 'C', size: 3, description: 'Banco' },
                    { name: 'A2_AGENCIA', type: 'C', size: 5, description: 'Agência' },
                    { name: 'A2_NUMCON', type: 'C', size: 10, description: 'Conta Bancária' }
                );
                indices.push(
                    { order: '1', key: 'A2_FILIAL+A2_COD+A2_LOJA', description: 'Por Código' },
                    { order: '2', key: 'A2_FILIAL+A2_NOME', description: 'Por Nome' },
                    { order: '3', key: 'A2_FILIAL+A2_CGC', description: 'Por CNPJ/CPF' },
                    { order: '4', key: 'A2_FILIAL+A2_NREDUZ', description: 'Por Nome Fantasia' }
                );
                break;

            case 'SB1': // Produtos
                fields.push(
                    { name: 'B1_FILIAL', type: 'C', size: 2, description: 'Filial do Sistema' },
                    { name: 'B1_COD', type: 'C', size: 15, description: 'Código do Produto' },
                    { name: 'B1_DESC', type: 'C', size: 30, description: 'Descrição' },
                    { name: 'B1_TIPO', type: 'C', size: 2, description: 'Tipo (PA/MP/BN/MO)' },
                    { name: 'B1_UM', type: 'C', size: 2, description: 'Unidade de Medida' },
                    { name: 'B1_LOCPAD', type: 'C', size: 2, description: 'Armazém Padrão' },
                    { name: 'B1_GRUPO', type: 'C', size: 4, description: 'Grupo de Produto' },
                    { name: 'B1_POSIPI', type: 'C', size: 10, description: 'NCM/Classificação Fiscal' },
                    { name: 'B1_CONTA', type: 'C', size: 20, description: 'Conta Contábil' },
                    { name: 'B1_CC', type: 'C', size: 9, description: 'Centro de Custo' },
                    { name: 'B1_PESO', type: 'N', size: 11, decimal: 4, description: 'Peso Líquido' },
                    { name: 'B1_PESBRU', type: 'N', size: 11, decimal: 4, description: 'Peso Bruto' },
                    { name: 'B1_TE', type: 'C', size: 3, description: 'TES de Entrada Padrão' },
                    { name: 'B1_TS', type: 'C', size: 3, description: 'TES de Saída Padrão' },
                    { name: 'B1_ORIGEM', type: 'C', size: 1, description: 'Origem do Produto' },
                    { name: 'B1_RASTRO', type: 'C', size: 1, description: 'Rastreabilidade (L/S/N)' },
                    { name: 'B1_REVISAO', type: 'C', size: 3, description: 'Revisão Atual' },
                    { name: 'B1_UCOM', type: 'C', size: 2, description: 'Unidade Comercial' },
                    { name: 'B1_CONV', type: 'N', size: 5, decimal: 2, description: 'Fator de Conversão' }
                );
                indices.push(
                    { order: '1', key: 'B1_FILIAL+B1_COD', description: 'Por Código' },
                    { order: '2', key: 'B1_FILIAL+B1_DESC', description: 'Por Descrição' },
                    { order: '3', key: 'B1_FILIAL+B1_TIPO+B1_GRUPO+B1_COD', description: 'Por Tipo e Grupo' },
                    { order: '4', key: 'B1_FILIAL+B1_GRUPO', description: 'Por Grupo' }
                );
                break;

            case 'SC5': // Pedidos de Venda (Cabeçalho)
                fields.push(
                    { name: 'C5_FILIAL', type: 'C', size: 2, description: 'Filial do Sistema' },
                    { name: 'C5_NUM', type: 'C', size: 6, description: 'Número do Pedido' },
                    { name: 'C5_TIPO', type: 'C', size: 1, description: 'Tipo do Pedido (N/C/D/B)' },
                    { name: 'C5_CLIENTE', type: 'C', size: 6, description: 'Código do Cliente' },
                    { name: 'C5_LOJACLI', type: 'C', size: 2, description: 'Loja do Cliente' },
                    { name: 'C5_CLIENT', type: 'C', size: 6, description: 'Cliente de Entrega' },
                    { name: 'C5_LOJAENT', type: 'C', size: 2, description: 'Loja de Entrega' },
                    { name: 'C5_EMISSAO', type: 'D', size: 8, description: 'Data de Emissão' },
                    { name: 'C5_VEND1', type: 'C', size: 6, description: 'Vendedor 1' },
                    { name: 'C5_CONDPAG', type: 'C', size: 3, description: 'Condição de Pagamento' },
                    { name: 'C5_TABELA', type: 'C', size: 3, description: 'Tabela de Preços' },
                    { name: 'C5_TRANSP', type: 'C', size: 6, description: 'Transportadora' },
                    { name: 'C5_FRETE', type: 'C', size: 1, description: 'Tipo de Frete (C/F)' },
                    { name: 'C5_NOTA', type: 'C', size: 9, description: 'Número da NF Gerada' },
                    { name: 'C5_SERIE', type: 'C', size: 3, description: 'Série da NF' },
                    { name: 'C5_MENNOTA', type: 'M', size: 80, description: 'Mensagem para Nota' }
                );
                indices.push(
                    { order: '1', key: 'C5_FILIAL+C5_NUM', description: 'Por Número' },
                    { order: '2', key: 'C5_FILIAL+C5_CLIENTE+C5_LOJACLI', description: 'Por Cliente' },
                    { order: '3', key: 'C5_FILIAL+C5_EMISSAO', description: 'Por Emissão' },
                    { order: '4', key: 'C5_FILIAL+C5_VEND1', description: 'Por Vendedor' }
                );
                break;

            case 'SC6': // Itens do Pedido de Venda
                fields.push(
                    { name: 'C6_FILIAL', type: 'C', size: 2, description: 'Filial do Sistema' },
                    { name: 'C6_NUM', type: 'C', size: 6, description: 'Número do Pedido' },
                    { name: 'C6_ITEM', type: 'C', size: 2, description: 'Item do Pedido' },
                    { name: 'C6_PRODUTO', type: 'C', size: 15, description: 'Produto' },
                    { name: 'C6_DESCRI', type: 'C', size: 30, description: 'Descrição do Produto' },
                    { name: 'C6_QTDVEN', type: 'N', size: 14, decimal: 2, description: 'Quantidade Vendida' },
                    { name: 'C6_QTDENT', type: 'N', size: 14, decimal: 2, description: 'Quantidade Entregue' },
                    { name: 'C6_PRCVEN', type: 'N', size: 14, decimal: 2, description: 'Preço Unitário' },
                    { name: 'C6_VALOR', type: 'N', size: 14, decimal: 2, description: 'Valor Total do Item' },
                    { name: 'C6_TES', type: 'C', size: 3, description: 'Tipo de Entrada/Saída' },
                    { name: 'C6_CF', type: 'C', size: 5, description: 'CFOP' },
                    { name: 'C6_LOCAL', type: 'C', size: 2, description: 'Armazém' },
                    { name: 'C6_ENTREG', type: 'D', size: 8, description: 'Data de Entrega' },
                    { name: 'C6_PEDCLI', type: 'C', size: 20, description: 'Pedido do Cliente' }
                );
                indices.push(
                    { order: '1', key: 'C6_FILIAL+C6_NUM+C6_ITEM', description: 'Por Número + Item' },
                    { order: '2', key: 'C6_FILIAL+C6_PRODUTO', description: 'Por Produto' }
                );
                break;

            case 'SF2': // Cabeçalho NF Saída
                fields.push(
                    { name: 'F2_FILIAL', type: 'C', size: 2, description: 'Filial do Sistema' },
                    { name: 'F2_DOC', type: 'C', size: 9, description: 'Número da Nota' },
                    { name: 'F2_SERIE', type: 'C', size: 3, description: 'Série da Nota' },
                    { name: 'F2_EMISSAO', type: 'D', size: 8, description: 'Data de Emissão' },
                    { name: 'F2_CLIENTE', type: 'C', size: 6, description: 'Cliente' },
                    { name: 'F2_LOJA', type: 'C', size: 2, description: 'Loja' },
                    { name: 'F2_EST', type: 'C', size: 2, description: 'Estado Destino' },
                    { name: 'F2_TIPO', type: 'C', size: 1, description: 'Tipo da Nota (N/C/D/B)' },
                    { name: 'F2_VALBRUT', type: 'N', size: 14, decimal: 2, description: 'Valor Bruto' },
                    { name: 'F2_VALICM', type: 'N', size: 14, decimal: 2, description: 'Valor do ICMS' },
                    { name: 'F2_VALIPI', type: 'N', size: 14, decimal: 2, description: 'Valor do IPI' },
                    { name: 'F2_VALMERC', type: 'N', size: 14, decimal: 2, description: 'Valor das Mercadorias' },
                    { name: 'F2_DUPL', type: 'C', size: 9, description: 'Número da Duplicata' },
                    { name: 'F2_COND', type: 'C', size: 3, description: 'Condição de Pagamento' },
                    { name: 'F2_VEND1', type: 'C', size: 6, description: 'Vendedor 1' }
                );
                indices.push(
                    { order: '1', key: 'F2_FILIAL+F2_DOC+F2_SERIE', description: 'Por Documento' },
                    { order: '2', key: 'F2_FILIAL+F2_CLIENTE+F2_LOJA+F2_DOC', description: 'Por Cliente e Documento' },
                    { order: '3', key: 'F2_FILIAL+F2_EMISSAO', description: 'Por Data de Emissão' }
                );
                break;

            case 'SD2': // Itens NF Saída
                fields.push(
                    { name: 'D2_FILIAL', type: 'C', size: 2, description: 'Filial do Sistema' },
                    { name: 'D2_DOC', type: 'C', size: 9, description: 'Número da Nota' },
                    { name: 'D2_SERIE', type: 'C', size: 3, description: 'Série' },
                    { name: 'D2_ITEM', type: 'C', size: 2, description: 'Item' },
                    { name: 'D2_COD', type: 'C', size: 15, description: 'Produto' },
                    { name: 'D2_DESC', type: 'C', size: 30, description: 'Descrição' },
                    { name: 'D2_QUANT', type: 'N', size: 14, decimal: 2, description: 'Quantidade' },
                    { name: 'D2_PRCVEN', type: 'N', size: 14, decimal: 2, description: 'Preço Unitário' },
                    { name: 'D2_TOTAL', type: 'N', size: 14, decimal: 2, description: 'Valor Total' },
                    { name: 'D2_TES', type: 'C', size: 3, description: 'TES' },
                    { name: 'D2_CF', type: 'C', size: 5, description: 'CFOP' },
                    { name: 'D2_LOCAL', type: 'C', size: 2, description: 'Armazém' },
                    { name: 'D2_PEDIDO', type: 'C', size: 6, description: 'Pedido de Venda' }
                );
                indices.push(
                    { order: '1', key: 'D2_FILIAL+D2_DOC+D2_SERIE+D2_ITEM', description: 'Por Documento+Item' },
                    { order: '2', key: 'D2_FILIAL+D2_COD', description: 'Por Produto' }
                );
                break;

            case 'SF1': // Cabeçalho NF Entrada
                fields.push(
                    { name: 'F1_FILIAL', type: 'C', size: 2, description: 'Filial' },
                    { name: 'F1_DOC', type: 'C', size: 9, description: 'Número da Nota' },
                    { name: 'F1_SERIE', type: 'C', size: 3, description: 'Série' },
                    { name: 'F1_FORNECE', type: 'C', size: 6, description: 'Fornecedor' },
                    { name: 'F1_LOJA', type: 'C', size: 2, description: 'Loja' },
                    { name: 'F1_EMISSAO', type: 'D', size: 8, description: 'Data de Emissão' },
                    { name: 'F1_DTDIGIT', type: 'D', size: 8, description: 'Data de Digitação' },
                    { name: 'F1_VALBRUT', type: 'N', size: 14, decimal: 2, description: 'Valor Bruto' },
                    { name: 'F1_VALMERC', type: 'N', size: 14, decimal: 2, description: 'Valor das Mercadorias' },
                    { name: 'F1_TIPO', type: 'C', size: 1, description: 'Tipo da Nota' },
                    { name: 'F1_EST', type: 'C', size: 2, description: 'Estado Origem' },
                    { name: 'F1_COND', type: 'C', size: 3, description: 'Condição de Pagamento' },
                    { name: 'F1_DUPL', type: 'C', size: 9, description: 'Número da Duplicata' }
                );
                indices.push(
                    { order: '1', key: 'F1_FILIAL+F1_DOC+F1_SERIE+F1_FORNECE+F1_LOJA', description: 'Por Chave da Nota' },
                    { order: '2', key: 'F1_FILIAL+F1_EMISSAO', description: 'Por Emissão' },
                    { order: '3', key: 'F1_FILIAL+F1_FORNECE+F1_LOJA', description: 'Por Fornecedor' }
                );
                break;

            case 'SD1': // Itens NF Entrada
                fields.push(
                    { name: 'D1_FILIAL', type: 'C', size: 2, description: 'Filial' },
                    { name: 'D1_DOC', type: 'C', size: 9, description: 'Número da Nota' },
                    { name: 'D1_SERIE', type: 'C', size: 3, description: 'Série' },
                    { name: 'D1_FORNECE', type: 'C', size: 6, description: 'Fornecedor' },
                    { name: 'D1_LOJA', type: 'C', size: 2, description: 'Loja' },
                    { name: 'D1_ITEM', type: 'C', size: 2, description: 'Item' },
                    { name: 'D1_COD', type: 'C', size: 15, description: 'Produto' },
                    { name: 'D1_DESC', type: 'C', size: 30, description: 'Descrição' },
                    { name: 'D1_QUANT', type: 'N', size: 14, decimal: 2, description: 'Quantidade' },
                    { name: 'D1_VUNIT', type: 'N', size: 14, decimal: 2, description: 'Valor Unitário' },
                    { name: 'D1_TOTAL', type: 'N', size: 14, decimal: 2, description: 'Valor Total' },
                    { name: 'D1_TES', type: 'C', size: 3, description: 'TES' },
                    { name: 'D1_CF', type: 'C', size: 5, description: 'CFOP' },
                    { name: 'D1_LOCAL', type: 'C', size: 2, description: 'Armazém' },
                    { name: 'D1_PEDIDO', type: 'C', size: 6, description: 'Pedido de Compra' }
                );
                indices.push(
                    { order: '1', key: 'D1_FILIAL+D1_DOC+D1_SERIE+D1_FORNECE+D1_LOJA+D1_ITEM', description: 'Por Nota+Item' },
                    { order: '2', key: 'D1_FILIAL+D1_COD', description: 'Por Produto' }
                );
                break;

            case 'SE1': // Contas a Receber
                fields.push(
                    { name: 'E1_FILIAL', type: 'C', size: 2, description: 'Filial' },
                    { name: 'E1_PREFIXO', type: 'C', size: 3, description: 'Prefixo' },
                    { name: 'E1_NUM', type: 'C', size: 9, description: 'Número do Título' },
                    { name: 'E1_PARCELA', type: 'C', size: 2, description: 'Parcela' },
                    { name: 'E1_TIPO', type: 'C', size: 3, description: 'Tipo do Título' },
                    { name: 'E1_NATUREZ', type: 'C', size: 10, description: 'Natureza' },
                    { name: 'E1_CLIENTE', type: 'C', size: 6, description: 'Cliente' },
                    { name: 'E1_LOJA', type: 'C', size: 2, description: 'Loja' },
                    { name: 'E1_EMISSAO', type: 'D', size: 8, description: 'Emissão' },
                    { name: 'E1_VENCTO', type: 'D', size: 8, description: 'Vencimento' },
                    { name: 'E1_VENCREA', type: 'D', size: 8, description: 'Vencimento Real' },
                    { name: 'E1_VALOR', type: 'N', size: 14, decimal: 2, description: 'Valor Original' },
                    { name: 'E1_SALDO', type: 'N', size: 14, decimal: 2, description: 'Saldo Atual' },
                    { name: 'E1_BAIXA', type: 'D', size: 8, description: 'Data da Baixa' },
                    { name: 'E1_HIST', type: 'C', size: 40, description: 'Histórico' }
                );
                indices.push(
                    { order: '1', key: 'E1_FILIAL+E1_PREFIXO+E1_NUM+E1_PARCELA+E1_TIPO', description: 'Chave Principal' },
                    { order: '2', key: 'E1_FILIAL+E1_CLIENTE+E1_LOJA+E1_PREFIXO+E1_NUM', description: 'Por Cliente' },
                    { order: '3', key: 'E1_FILIAL+E1_VENCTO', description: 'Por Vencimento' }
                );
                break;

            case 'SE2': // Contas a Pagar
                fields.push(
                    { name: 'E2_FILIAL', type: 'C', size: 2, description: 'Filial' },
                    { name: 'E2_PREFIXO', type: 'C', size: 3, description: 'Prefixo' },
                    { name: 'E2_NUM', type: 'C', size: 9, description: 'Número do Título' },
                    { name: 'E2_PARCELA', type: 'C', size: 2, description: 'Parcela' },
                    { name: 'E2_TIPO', type: 'C', size: 3, description: 'Tipo do Título' },
                    { name: 'E2_NATUREZ', type: 'C', size: 10, description: 'Natureza' },
                    { name: 'E2_FORNECE', type: 'C', size: 6, description: 'Fornecedor' },
                    { name: 'E2_LOJA', type: 'C', size: 2, description: 'Loja' },
                    { name: 'E2_EMISSAO', type: 'D', size: 8, description: 'Emissão' },
                    { name: 'E2_VENCTO', type: 'D', size: 8, description: 'Vencimento' },
                    { name: 'E2_VENCREA', type: 'D', size: 8, description: 'Vencimento Real' },
                    { name: 'E2_VALOR', type: 'N', size: 14, decimal: 2, description: 'Valor Original' },
                    { name: 'E2_SALDO', type: 'N', size: 14, decimal: 2, description: 'Saldo Atual' },
                    { name: 'E2_BAIXA', type: 'D', size: 8, description: 'Data da Baixa' },
                    { name: 'E2_HIST', type: 'C', size: 40, description: 'Histórico' }
                );
                indices.push(
                    { order: '1', key: 'E2_FILIAL+E2_PREFIXO+E2_NUM+E2_PARCELA+E2_TIPO', description: 'Chave Principal' },
                    { order: '2', key: 'E2_FILIAL+E2_FORNECE+E2_LOJA+E2_PREFIXO+E2_NUM', description: 'Por Fornecedor' },
                    { order: '3', key: 'E2_FILIAL+E2_VENCTO', description: 'Por Vencimento' }
                );
                break;

            case 'CT1': // Plano de Contas
                fields.push(
                    { name: 'CT1_FILIAL', type: 'C', size: 2, description: 'Filial' },
                    { name: 'CT1_CONTA', type: 'C', size: 20, description: 'Conta Contábil' },
                    { name: 'CT1_DESC01', type: 'C', size: 40, description: 'Descrição' },
                    { name: 'CT1_CLASSE', type: 'C', size: 1, description: 'Classe (1-Sintética/2-Analítica)' },
                    { name: 'CT1_NORMAL', type: 'C', size: 1, description: 'Condição Normal (1-Devedora/2-Credora)' },
                    { name: 'CT1_RES', type: 'C', size: 10, description: 'Conta Superior' }
                );
                indices.push(
                    { order: '1', key: 'CT1_FILIAL+CT1_CONTA', description: 'Por Conta' },
                    { order: '2', key: 'CT1_FILIAL+CT1_DESC01', description: 'Por Descrição' },
                    { order: '3', key: 'CT1_FILIAL+CT1_RES', description: 'Por Conta Superior' }
                );
                break;

            case 'CTT': // Centro de Custo
                fields.push(
                    { name: 'CTT_FILIAL', type: 'C', size: 2, description: 'Filial' },
                    { name: 'CTT_CUSTO', type: 'C', size: 9, description: 'Centro de Custo' },
                    { name: 'CTT_DESC01', type: 'C', size: 40, description: 'Descrição' },
                    { name: 'CTT_BLOQ', type: 'C', size: 1, description: 'Bloqueado? (1-Sim/2-Não)' },
                    { name: 'CTT_CLASSE', type: 'C', size: 1, description: 'Classe (1-Sintético/2-Analítico)' }
                );
                indices.push(
                    { order: '1', key: 'CTT_FILIAL+CTT_CUSTO', description: 'Por C. Custo' },
                    { order: '2', key: 'CTT_FILIAL+CTT_DESC01', description: 'Por Descrição' }
                );
                break;

            case 'SA3': // Vendedores
                fields.push(
                    { name: 'A3_FILIAL', type: 'C', size: 2, description: 'Filial' },
                    { name: 'A3_COD', type: 'C', size: 6, description: 'Código' },
                    { name: 'A3_NOME', type: 'C', size: 40, description: 'Nome' },
                    { name: 'A3_NREDUZ', type: 'C', size: 20, description: 'Nome Reduzido' },
                    { name: 'A3_TIPO', type: 'C', size: 1, description: 'Tipo (I-Interno/E-Externo)' },
                    { name: 'A3_COMIS', type: 'N', size: 6, decimal: 2, description: 'Percentual Comissão' },
                    { name: 'A3_EMAIL', type: 'C', size: 60, description: 'Email' }
                );
                indices.push(
                    { order: '1', key: 'A3_FILIAL+A3_COD', description: 'Por Código' },
                    { order: '2', key: 'A3_FILIAL+A3_NOME', description: 'Por Nome' }
                );
                break;

            case 'SC7': // Pedidos de Compra
                fields.push(
                    { name: 'C7_FILIAL', type: 'C', size: 2, description: 'Filial' },
                    { name: 'C7_NUM', type: 'C', size: 6, description: 'Número do Pedido' },
                    { name: 'C7_FORNECE', type: 'C', size: 6, description: 'Fornecedor' },
                    { name: 'C7_LOJA', type: 'C', size: 2, description: 'Loja' },
                    { name: 'C7_PRODUTO', type: 'C', size: 15, description: 'Produto' },
                    { name: 'C7_QUANT', type: 'N', size: 14, decimal: 2, description: 'Quantidade' },
                    { name: 'C7_PRECO', type: 'N', size: 14, decimal: 2, description: 'Preço' },
                    { name: 'C7_TOTAL', type: 'N', size: 14, decimal: 2, description: 'Total do Item' },
                    { name: 'C7_EMISSAO', type: 'D', size: 8, description: 'Emissão' },
                    { name: 'C7_DATPRF', type: 'D', size: 8, description: 'Data Entrega Prevista' },
                    { name: 'C7_ENCER', type: 'C', size: 1, description: 'Encerrado (S/N)' }
                );
                indices.push(
                    { order: '1', key: 'C7_FILIAL+C7_NUM+C7_ITEM', description: 'Por Número' },
                    { order: '2', key: 'C7_FILIAL+C7_FORNECE', description: 'Por Fornecedor' },
                    { order: '3', key: 'C7_FILIAL+C7_PRODUTO', description: 'Por Produto' }
                );
                break;

            case 'SE4': // Condições de Pagamento
                fields.push(
                    { name: 'E4_FILIAL', type: 'C', size: 2, description: 'Filial' },
                    { name: 'E4_CODIGO', type: 'C', size: 3, description: 'Código' },
                    { name: 'E4_TIPO', type: 'C', size: 1, description: 'Tipo (1-9)' },
                    { name: 'E4_COND', type: 'C', size: 40, description: 'Condição' },
                    { name: 'E4_DESCRI', type: 'C', size: 15, description: 'Descrição' }
                );
                indices.push(
                    { order: '1', key: 'E4_FILIAL+E4_CODIGO', description: 'Por Código' }
                );
                break;

            case 'SY1': // Cadastro de Compradores
                fields.push(
                    { name: 'Y1_FILIAL', type: 'C', size: 2, description: 'Filial' },
                    { name: 'Y1_COD', type: 'C', size: 3, description: 'Código' },
                    { name: 'Y1_NOME', type: 'C', size: 40, description: 'Nome' },
                    { name: 'Y1_EMAIL', type: 'C', size: 60, description: 'Email' },
                    { name: 'Y1_TEL', type: 'C', size: 15, description: 'Telefone' }
                );
                indices.push(
                    { order: '1', key: 'Y1_FILIAL+Y1_COD', description: 'Por Código' },
                    { order: '2', key: 'Y1_FILIAL+Y1_NOME', description: 'Por Nome' }
                );
                break;

            case 'SN1': // Ativo Imobilizado
                fields.push(
                    { name: 'N1_FILIAL', type: 'C', size: 2, description: 'Filial' },
                    { name: 'N1_CBASE', type: 'C', size: 10, description: 'Código Base' },
                    { name: 'N1_ITEM', type: 'C', size: 4, description: 'Item' },
                    { name: 'N1_DESCRIC', type: 'C', size: 40, description: 'Descrição' },
                    { name: 'N1_AQUISIC', type: 'D', size: 8, description: 'Data Aquisição' },
                    { name: 'N1_VALOR', type: 'N', size: 14, decimal: 2, description: 'Valor Original' },
                    { name: 'N1_CHAPA', type: 'C', size: 10, description: 'Chapa/Plaqueta' },
                    { name: 'N1_GRUPO', type: 'C', size: 4, description: 'Grupo do Bem' }
                );
                indices.push(
                    { order: '1', key: 'N1_FILIAL+N1_CBASE+N1_ITEM', description: 'Por Código' },
                    { order: '2', key: 'N1_FILIAL+N1_DESCRIC', description: 'Por Descrição' },
                    { order: '3', key: 'N1_FILIAL+N1_GRUPO', description: 'Por Grupo' }
                );
                break;

            case 'SN3': // Saldos do Ativo
                fields.push(
                    { name: 'N3_FILIAL', type: 'C', size: 2, description: 'Filial' },
                    { name: 'N3_CBASE', type: 'C', size: 10, description: 'Código Base' },
                    { name: 'N3_ITEM', type: 'C', size: 4, description: 'Item' },
                    { name: 'N3_TIPO', type: 'C', size: 2, description: 'Tipo de Saldo' },
                    { name: 'N3_DINDEPR', type: 'D', size: 8, description: 'Data Início Depreciação' },
                    { name: 'N3_VORIG1', type: 'N', size: 14, decimal: 2, description: 'Valor Original Moeda 1' },
                    { name: 'N3_VRACUM1', type: 'N', size: 14, decimal: 2, description: 'Depreciação Acumulada' }
                );
                indices.push(
                    { order: '1', key: 'N3_FILIAL+N3_CBASE+N3_ITEM+N3_TIPO', description: 'Chave Principal' }
                );
                break;

            default:
                // Gerador Genérico para outras tabelas não mapeadas detalhadamente
                fields.push(
                    { name: prefix + '_FILIAL', type: 'C', size: 2, description: 'Filial do Sistema' },
                    { name: prefix + '_COD', type: 'C', size: 6, description: 'Código Principal' },
                    { name: prefix + '_DESC', type: 'C', size: 30, description: 'Descrição/Nome' },
                    { name: prefix + '_TIPO', type: 'C', size: 1, description: 'Tipo' },
                    { name: prefix + '_DATA', type: 'D', size: 8, description: 'Data de Referência' },
                    { name: prefix + '_VALOR', type: 'N', size: 12, decimal: 2, description: 'Valor Monetário' },
                    { name: prefix + '_QUANT', type: 'N', size: 12, decimal: 2, description: 'Quantidade' },
                    { name: prefix + '_STATUS', type: 'C', size: 1, description: 'Status' },
                    { name: prefix + '_OBS', type: 'M', size: 80, description: 'Observações (Memo)' }
                );
                indices.push(
                    { order: '1', key: prefix + '_FILIAL+' + prefix + '_COD', description: 'Chave Primária Padrão' },
                    { order: '2', key: prefix + '_FILIAL+' + prefix + '_DESC', description: 'Ordem Alfabética' }
                );
                break;
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
        { name: 'SE4', description: 'Condições de Pagamento', module: 'Financeiro', type: 'Dados', key: 'E4_FILIAL+E4_CODIGO' },
        { name: 'SY1', description: 'Cadastro de Compradores', module: 'Compras', type: 'Dados', key: 'Y1_FILIAL+Y1_COD' },
        { name: 'SN1', description: 'Ativo Imobilizado', module: 'Ativo Fixo', type: 'Dados', key: 'N1_FILIAL+N1_CBASE+N1_ITEM' },
        { name: 'SN3', description: 'Saldos do Ativo', module: 'Ativo Fixo', type: 'Dados', key: 'N3_FILIAL+N3_CBASE+N3_ITEM' },

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
