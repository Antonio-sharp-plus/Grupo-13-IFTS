import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  from: 'bot' | 'user';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit {
  isOpen: boolean = false;
  messages: ChatMessage[] = [];
  userInput: string = '';

  private greetings: string[] = [
    '¡Hola! ¿Necesitas una Pochi-Recomendación?',
    '¿Con qué vas a Pochoclear hoy?',
    'Estoy para ayudarte a elegir la próxima peli o serie 🎬🍿'
  ];

  ngOnInit(): void {
    // Mostrar saludo aleatorio y abrir el chat en cada carga de página
    this.isOpen = true;
    this.pushBotGreeting();
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 0) {
      this.pushBotGreeting();
    }
  }

  send(): void {
    const text = (this.userInput || '').trim();
    if (!text) return;
    this.messages.push({ from: 'user', text });
    this.userInput = '';
    setTimeout(() => {
      this.messages.push({ from: 'bot', text: '¡Genial! Decime un título o género y te ayudo 😉' });
    }, 200);
  }

  private pushBotGreeting(): void {
    const msg = this.greetings[Math.floor(Math.random() * this.greetings.length)];
    this.messages.push({ from: 'bot', text: msg });
  }
}


