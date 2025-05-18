import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Menu, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { calculateLeap, LeapType } from "@/utils/calculateLeap";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const ChatConversation = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [leap, setLeap] = useState<LeapType | null>(null);
  const [showConversations, setShowConversations] = useState(false);
  const [conversations, setConversations] = useState<
    { id: string; preview: string }[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const babyName = localStorage.getItem("babyName") || "seu bebê";

  // Inicializar com a pergunta do usuário que veio da tela anterior
  useEffect(() => {
    const calculatedLeap = calculateLeap();
    setLeap(calculatedLeap);

    // Get saved conversations if any
    const savedConversations = localStorage.getItem("conversations");
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    }

    const userQuestion = localStorage.getItem("userQuestion");
    if (userQuestion) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: userQuestion,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages([userMessage]);

      // Gerar resposta da IA automaticamente
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: generateAIResponse(userQuestion, calculatedLeap),
          sender: "ai",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiResponse]);

        // Salvar nova conversa
        const newConversation = {
          id: Date.now().toString(),
          preview:
            userQuestion.length > 30
              ? userQuestion.substring(0, 30) + "..."
              : userQuestion,
        };
        const updatedConversations = [
          newConversation,
          ...(savedConversations ? JSON.parse(savedConversations) : []),
        ];
        setConversations(updatedConversations);
        localStorage.setItem(
          "conversations",
          JSON.stringify(updatedConversations)
        );
      }, 1000);
    }

    // Limpar a pergunta armazenada
    localStorage.removeItem("userQuestion");
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      // Adicionar mensagem do usuário
      const userMessage: Message = {
        id: Date.now().toString(),
        text: input,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      // Simular resposta da IA
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: generateAIResponse(input, leap),
          sender: "ai",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleOpenConversations = () => {
    setShowConversations(true);
  };

  const handleNewConversation = () => {
    navigate("/chat");
  };

  const handleCloseConversations = () => {
    setShowConversations(false);
  };

  const handleSelectConversation = (id: string) => {
    setShowConversations(false);
    // Em uma aplicação real, carregaríamos esta conversa
  };

  const formatMessage = (message: Message) => {
    return message.text.split("\n").map((line, i) => (
      <p key={i} className={i > 0 ? "mt-2" : ""}>
        {line}
      </p>
    ));
  };

  const generateAIResponse = (
    message: string,
    leap: LeapType | null
  ): string => {
    if (!leap)
      return "Estou tendo dificuldade em calcular o salto de desenvolvimento atual. Podemos verificar as informações?";

    // Gerador de resposta baseado no conteúdo da mensagem
    if (
      message.toLowerCase().includes("o que é") ||
      message.toLowerCase().includes("o que esperar")
    ) {
      return `O ${leap.leapName} é um período importante no desenvolvimento cerebral do bebê. Durante este salto, novas conexões neurais são formadas, permitindo que ${babyName} compreenda o mundo de maneira diferente.\n\nA teoria dos saltos de desenvolvimento, baseada em décadas de pesquisa, explica por que bebês passam por períodos previsíveis de maior irritabilidade e aprendizado.`;
    } else if (message.toLowerCase().includes("como")) {
      return `Durante o ${leap.leapName}, ${babyName} pode ficar mais irritado, chorar mais, dormir menos, e buscar mais contato físico. Isso acontece porque seu cérebro está processando novas informações e desenvolvendo novas habilidades.\n\nÉ completamente normal e passageiro. Ofereça mais aconchego e seja paciente neste período.`;
    } else if (
      message.toLowerCase().includes("quanto tempo") ||
      message.toLowerCase().includes("duração")
    ) {
      return `O ${leap.leapName} geralmente dura entre 1 e 2 semanas, embora alguns bebês possam experimentar sintomas por até 3-4 semanas.\n\nOs primeiros dias costumam ser os mais intensos, com uma melhora gradual ao longo do tempo à medida que ${babyName} se ajusta às novas habilidades adquiridas.`;
    } else if (
      message.toLowerCase().includes("mudança") ||
      message.toLowerCase().includes("desenvolvimento")
    ) {
      return `No ${leap.leapName}, você pode notar:\n\n• Novas habilidades motoras\n• Maior consciência do ambiente\n• Mudanças nos padrões de sono\n• Possível aumento de apego\n• Desenvolvimento de novas formas de comunicação\n\nCada salto prepara ${babyName} para o próximo estágio de desenvolvimento.`;
    } else {
      return `Durante o ${leap.leapName}, o cérebro do bebê está desenvolvendo novas conexões. Os bebês frequentemente ficam mais irritáveis durante os saltos, mas isso é um sinal positivo de desenvolvimento.\n\nPosso ajudar com mais informações específicas sobre comportamentos, habilidades ou como apoiar ${babyName} neste período?`;
    }
  };

  if (showConversations) {
    return (
      <div className="baby-container">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b fixed top-0 left-0 right-0 bg-white z-10">
            <div className="font-medium">Conversas</div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCloseConversations}
            >
              <Menu size={20} />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto pt-16">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="p-3 border-b hover:bg-baby-gray/20 cursor-pointer"
                onClick={() => handleSelectConversation(conversation.id)}
              >
                <div className="text-sm font-medium truncate">
                  {conversation.preview}
                </div>
              </div>
            ))}
            {conversations.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                Nenhuma conversa ainda
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="baby-container h-screen flex flex-col">
      {/* Cabeçalho da conversa - fixo no topo */}
      <div className="flex justify-between items-center p-3 border-b fixed top-0 left-0 right-0 bg-white z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleOpenConversations}
          className="p-2"
        >
          <Menu size={20} />
        </Button>
        <div className="text-sm font-medium">Conversa</div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNewConversation}
          className="p-2"
        >
          <Plus size={20} />
        </Button>
      </div>

      {/* Mensagens com scroll */}
      <ScrollArea className="flex-1 pt-16 pb-20">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  message.sender === "user"
                    ? "bg-baby-yellow text-baby-dark"
                    : "bg-baby-gray text-baby-dark"
                }`}
              >
                {formatMessage(message)}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input - fixo na parte inferior */}
      <div className="border-t p-3 fixed bottom-0 left-0 right-0 bg-white">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte algo..."
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim()}
            className="bg-baby-yellow hover:bg-baby-yellow/90 text-baby-dark"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatConversation;
