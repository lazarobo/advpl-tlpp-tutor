import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-installation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './installation.component.html',
  styleUrl: './installation.component.css'
})
export class InstallationComponent {
  sections = [
    {
      id: 'prep',
      title: '1. Preparação do Ambiente',
      icon: '🔧',
      subsections: [
        {
          title: '1.1. Criação e Configuração do Banco de Dados',
          content: `O primeiro passo crucial para a instalação do Protheus é a criação de um banco de dados no SQL Server. Recomenda-se nomeá-lo como <code>protheus</code> (ou da maneira que preferir). Uma configuração vital é o <strong>Collation</strong>, que deve ser definido como <code>Latin1_General_BIN</code>. Esta especificação é uma recomendação da TOTVS e é fundamental para evitar inconsistências e erros operacionais no futuro.`
        },
        {
          title: '1.2. Configuração da Fonte de Dados ODBC',
          content: `Após a criação do banco de dados, é necessário configurar uma Fonte de Dados ODBC de 64 bits. Este componente permite que o Protheus se comunique com o SQL Server. Crie um DSN de Sistema, selecionando o <strong>ODBC Driver 17 for SQL Server</strong> (Ou o driver que preferir e seja compatível). O nome da fonte deve ser o mesmo do banco, apontando para o servidor SQL correto. A autenticação deve ser configurada com as credenciais de usuário e senha do SQL Server, e o banco de dados padrão deve ser o banco recém-criado.`
        }
      ]
    },
    {
      id: 'install',
      title: '2. Instalação dos Componentes do Protheus',
      icon: '💿',
      subsections: [
        {
          title: '2.1. Instalação do Protheus',
          content: `Execute o instalador do Protheus 12.1.2510 com privilégios de administrador. Durante o processo, defina o caminho de instalação, sugerindo-se <code>C:\\TOTVS\\Protheus_12.1.2510</code>. Na etapa de seleção de programas, escolha os componentes necessários, como Application Server, DBAcccess x64 e Protheus Data.`
        },
        {
          title: '2.2. Configuração de Portas e License Server',
          content: `Durante a instalação, serão solicitadas as configurações de portas para os serviços. As portas sugeridas são:<br>
          • <strong>1234</strong> para o AppServer<br>
          • <strong>4321</strong> para o serviço WebApp<br>
          Além disso, informe o endereço do License Server (geralmente <code>localhost</code> para instalações locais) e sua porta, por exemplo, <code>5555</code>.`
        },
        {
          title: '2.3. Instalação do TOTVS License Server',
          content: `O TOTVS License Server deve ser instalado separadamente, também executando seu instalador como administrador. Confirme o caminho de instalação e configure as portas para monitoramento, log e licenciamento, seguindo as sugestões padrão do instalador.`
        }
      ]
    },
    {
      id: 'config',
      title: '3. Configurações Pós-Instalação e Boas Práticas',
      icon: '⚙️',
      subsections: [
        {
          title: '3.1. Configuração e Validação do DBAccess',
          content: `Após a instalação, acesse o monitor do DBAcccess. Na aba de configurações, selecione o ambiente MSSQL e insira o usuário e a senha do banco de dados para salvar a conexão. É fundamental realizar a validação da conexão através do assistente do DBAcccess, selecionando o banco de dados Microsoft SQL e o ambiente protheus_new, para garantir que a comunicação com o banco de dados está funcionando corretamente.`
        },
        {
          title: '3.2. Execução dos Serviços em Modo Console',
          content: `Para facilitar a depuração e o monitoramento, é altamente recomendável executar os serviços (AppServer, DBaccess, License Server) em modo console. Para isso, crie atalhos para os executáveis de cada serviço e adicione o parâmetro <code>-CONSOLE</code> ao final do caminho do alvo nas propriedades do atalho.`,
          code: 'appserver.exe -CONSOLE'
        },
        {
          title: '3.3. Ordem de Inicialização dos Serviços',
          content: `A TOTVS recomenda uma ordem específica para a inicialização dos serviços, visando a estabilidade do sistema:<br>
          1. <strong>License Server</strong><br>
          2. <strong>DBAccess</strong><br>
          3. <strong>AppServer</strong>`
        },
        {
          title: '3.4. Tipo de Ambiente na Configuração Inicial',
          content: `Ao configurar o ambiente pela primeira vez, o sistema solicitará o tipo de ambiente. Para bases de dados locais destinadas a testes e estudos, é crucial selecionar a opção <strong>3 - Desenvolvimento</strong>. A escolha de Produção em um ambiente não licenciado pode gerar erros de reconhecimento do sistema operacional.`
        },
        {
          title: '3.5. Acesso Inicial e Senha Padrão',
          content: `O usuário padrão para o primeiro acesso é <code>admin</code>. A senha padrão não é vazia; é necessário inserir um <strong>caractere de espaço</strong> para que o sistema a reconheça como "em branco" e permita o acesso para a definição de uma nova senha.`
        },
        {
          title: '3.6. Testes Pós-Instalação (CRUD)',
          content: `Após a conclusão da instalação, é uma boa prática realizar um teste completo de CRUD (Criar, Ler, Atualizar, Deletar) em um cadastro básico, como o de clientes. Isso valida a comunicação com o banco de dados e assegura que as operações fundamentais do sistema estão funcionando corretamente. É importante notar que o Protheus realiza uma <strong>exclusão lógica</strong>, ou seja, o registro é marcado como excluído, mas não é fisicamente removido da tabela no banco de dados.`
        },
        {
          title: '3.7. Correção de Bug (Porta Multiprotocolo)',
          content: `Em alguns casos, durante a criação da empresa, pode ocorrer um erro relacionado à "Porta Multiprotocolo". Para corrigir este problema, é necessário parar o AppServer e editar o arquivo <code>appserver.ini</code>. Adicione a seguinte configuração:`,
          code: `[General]
App_Environment=environment

[Drivers]
MULTIPROTOCOLPORT=1`
        }
      ]
    }
  ];

  references = [
    {
      title: 'INSTALAÇÃO PROTHEUS NOVA RELEASE 12.1.2510 - AULA 1',
      author: 'Visão Tech Consultoria Totvs',
      url: 'https://www.youtube.com/watch?v=NStQ2ZvOzSg'
    },
    {
      title: 'INSTALAÇÃO PROTHEUS NOVA RELEASE 12.1.2510 - AULA 2',
      author: 'Visão Tech Consultoria Totvs',
      url: 'https://www.youtube.com/watch?v=jHt8KYHxE0s&t=740s'
    }
  ];

  copyCode(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      alert('Código copiado para a área de transferência!');
    });
  }
}
