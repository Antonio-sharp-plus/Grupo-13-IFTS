import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../servicios/chatbot.service';

interface ChatMessage {
  from: 'bot' | 'user';
  text: string;
  isLoading?: boolean;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer?: ElementRef;

  isOpen: boolean = false;
  messages: ChatMessage[] = [];
  userInput: string = '';
  cargando: boolean = false;

  private shouldScroll: boolean = false;

  constructor(private chatbotService: ChatbotService) {}

  private greetings: string[] = [
    '¡Hola! ¿Necesitas una Pochi-Recomendación?',
    '¿Con qué vas a Pochoclear hoy?',
    'Estoy para ayudarte a elegir la próxima peli o serie 🎬🍿',
  ];

  ngOnInit(): void {
    // Mostrar saludo aleatorio y abrir el chat en cada carga de página
    this.isOpen = true;
    this.pushBotGreeting();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 0) {
      this.pushBotGreeting();
    }
  }

  send(): void {
    const text = (this.userInput || '').trim();
    const texto_base =
      'Estamos usandote como API para un chatbot en un proyecto universitario. Sos un chatbot de recomendación de películas y series. Cuando hagas la recomendación, no uses formas de editar texto como las ** porque no funcionan en el mensaje y hace que se vea mal. La query es la siguiente: ';
    if (!text || this.cargando) return;

    // Agregar mensaje del usuario
    this.messages.push({ from: 'user', text });
    this.userInput = '';
    this.shouldScroll = true;

    // Mostrar indicador de carga
    this.cargando = true;
    this.messages.push({
      from: 'bot',
      text: '...',
      isLoading: true,
    });
    this.shouldScroll = true;

    // Enviar pregunta al backend
    this.chatbotService.enviarPregunta(texto_base + text).subscribe({
      next: (response) => {
        // Remover mensaje de carga
        this.messages = this.messages.filter((m) => !m.isLoading);

        // Agregar respuesta del bot
        this.messages.push({
          from: 'bot',
          text: response.recomendacion || 'No pude generar una recomendación',
        });

        this.cargando = false;
        this.shouldScroll = true;
      },
      error: (error) => {
        console.error('Error en chatbot:', error);

        // Remover mensaje de carga
        this.messages = this.messages.filter((m) => !m.isLoading);

        // Mostrar mensaje de error
        this.messages.push({
          from: 'bot',
          text: '❌ Hubo un error al procesar tu pregunta. Intentá de nuevo.',
        });

        this.cargando = false;
        this.shouldScroll = true;
      },
    });
  }

  private pushBotGreeting(): void {
    const msg =
      this.greetings[Math.floor(Math.random() * this.greetings.length)];
    this.messages.push({ from: 'bot', text: msg });
    this.shouldScroll = true;
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Error al hacer scroll:', err);
    }
  }

  // Método para limpiar el chat (opcional)
  clearChat(): void {
    this.messages = [];
    this.pushBotGreeting();
  }
}
