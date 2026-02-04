import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.css'
})
export class ChatComponent {
    messages: ChatMessage[] = [
        {
            text: 'Olá! Eu sou seu assistente de AdvPL e TLPP. Como posso ajudar com seu código hoje?',
            sender: 'bot',
            timestamp: new Date()
        }
    ];
    userInput: string = '';
    isTyping: boolean = false;

    sendMessage() {
        if (!this.userInput.trim()) return;

        // Add user message
        this.messages.push({
            text: this.userInput,
            sender: 'user',
            timestamp: new Date()
        });

        const query = this.userInput.toLowerCase();
        this.userInput = '';
        this.isTyping = true;

        // Simulate AI response delay
        setTimeout(() => {
            this.generateResponse(query);
            this.isTyping = false;
        }, 1500);
    }

    generateResponse(query: string) {
        let response = '';

        if (query.includes('ola') || query.includes('oi') || query.includes('bom dia')) {
            response = 'Olá! Tudo pronto para programar em Protheus? Qual sua dúvida?';
        } else if (query.includes('data') || query.includes('dtoc') || query.includes('ctod')) {
            response = 'Para manipulação de datas, usamos funções como `DtoC()` (Data para Caractere) e `CtoD()` (Caractere para Data). Em TLPP também temos suporte melhorado a tipos Date.';
        } else if (query.includes('banco') || query.includes('tabela') || query.includes('dbseek')) {
            response = 'Para banco de dados, `DBSelectArea("ALIAS")` seleciona a tabela. `DBSeek()` busca dados pelo índice e `DBSkip()` navega entre registros.';
        } else if (query.includes('array') || query.includes('vetor') || query.includes('aadd')) {
            response = 'Arrays em AdvPL são dinâmicos. Use `aAdd()` para incluir itens e `Len()` para ver o tamanho. Exemplo: `aAdd(aLista, "Novo Item")`.';
        } else if (query.includes('tlpp') || query.includes('classe') || query.includes('poo')) {
            response = 'TLPP traz orientação a objetos para o Protheus! Você pode criar classes com `class NomeDaClasse`, métodos e propriedades tipadas.';
        } else {
            response = 'Interessante! Ainda estou aprendendo sobre esse tópico específico. Tente perguntar sobre funções básicas, banco de dados ou arrays.';
        }

        this.messages.push({
            text: response,
            sender: 'bot',
            timestamp: new Date()
        });
    }
}
