import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Trash2, LoaderCircle, CircleFadingPlus } from "lucide-react";
import { calculateLeap, LeapType } from "@/utils/calculateLeap";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface BabyData {
  dataPrevista: string;
  dataReal: string;
  nomeBebe: string;
  sexo: string;
  context: string;
}

const Chat = () => {
  const [leap, setLeap] = useState<LeapType | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const babyName = localStorage.getItem("babyName") || "Seu bebê";

  useEffect(() => {
    const calculatedLeap = calculateLeap();
    setLeap(calculatedLeap);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchAIResponse = async (message: string): Promise<string> => {
    try {
      // Obter os dados do bebê do localStorage
      const expectedBirthDate =
        localStorage.getItem("expectedBirthDate")?.split("T")[0] || "";
      const actualBirthDate =
        localStorage.getItem("actualBirthDate")?.split("T")[0] || "";
      const babyName = localStorage.getItem("babyName") || "Bebê";
      const babyGender = localStorage.getItem("babyGender") || "não informado";

      const babyData: BabyData = {
        dataPrevista: expectedBirthDate,
        dataReal: actualBirthDate,
        nomeBebe: babyName,
        sexo: babyGender,
        context: message,
      };

      const response = await fetch("http://localhost:8000/ask-gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(babyData),
      });

      if (!response.ok) {
        throw new Error("Erro ao obter resposta da API");
      }

      const data = await response.json();
      return data.geminiResponse || "Não recebi uma resposta válida da API.";
    } catch (error) {
      console.error("Erro na chamada da API:", error);
      return "Desculpe, estou tendo problemas para me conectar com o servidor. Tente novamente mais tarde.";
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Adiciona mensagem do usuário
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setShowSuggestions(false);

      // Ativa o indicador de carregamento
      setIsLoading(true);

      // Obtém resposta da API
      try {
        const aiResponseText = await fetchAIResponse(inputValue);

        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponseText,
          sender: "ai",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiResponse]);
        // Desativa o indicador de carregamento
        setIsLoading(false);
      } catch (error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.",
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        // Desativa o indicador de carregamento
        setIsLoading(false);
      }
    }
  };

  const handleSelectSuggestion = async (suggestion: string) => {
    // Adiciona a sugestão como mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      text: suggestion,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([userMessage]);
    setShowSuggestions(false);

    // Ativa o indicador de carregamento
    setIsLoading(true);

    // Obtém resposta da API
    try {
      const aiResponseText = await fetchAIResponse(suggestion);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      // Desativa o indicador de carregamento
      setIsLoading(false);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      // Desativa o indicador de carregamento
      setIsLoading(false);
    }
  };

  const handleClearConversation = () => {
    setMessages([]);
    setShowSuggestions(true);
  };

  // const generateAIResponse = (
  //   message: string,
  //   leap: LeapType | null
  // ): string => {
  //   if (!leap)
  //     return "Estou tendo dificuldade em calcular o salto de desenvolvimento atual. Podemos verificar as informações?";

  //   // Gerador de resposta baseado no conteúdo da mensagem
  //   if (
  //     message.toLowerCase().includes("o que é") ||
  //     message.toLowerCase().includes("o que esperar")
  //   ) {
  //     return `O ${leap.leapName} é um período importante no desenvolvimento cerebral do bebê. Durante este salto, novas conexões neurais são formadas, permitindo que ${babyName} compreenda o mundo de maneira diferente.\n\nA teoria dos saltos de desenvolvimento, baseada em décadas de pesquisa, explica por que bebês passam por períodos previsíveis de maior irritabilidade e aprendizado.`;
  //   } else if (message.toLowerCase().includes("como")) {
  //     return `Durante o ${leap.leapName}, ${babyName} pode ficar mais irritado, chorar mais, dormir menos, e buscar mais contato físico. Isso acontece porque seu cérebro está processando novas informações e desenvolvendo novas habilidades.\n\nÉ completamente normal e passageiro. Ofereça mais aconchego e seja paciente neste período.`;
  //   } else if (
  //     message.toLowerCase().includes("quanto tempo") ||
  //     message.toLowerCase().includes("duração")
  //   ) {
  //     return `O ${leap.leapName} geralmente dura entre 1 e 2 semanas, embora alguns bebês possam experimentar sintomas por até 3-4 semanas.\n\nOs primeiros dias costumam ser os mais intensos, com uma melhora gradual ao longo do tempo à medida que ${babyName} se ajusta às novas habilidades adquiridas.`;
  //   } else if (
  //     message.toLowerCase().includes("mudança") ||
  //     message.toLowerCase().includes("desenvolvimento")
  //   ) {
  //     return `No ${leap.leapName}, você pode notar:\n\n• Novas habilidades motoras\n• Maior consciência do ambiente\n• Mudanças nos padrões de sono\n• Possível aumento de apego\n• Desenvolvimento de novas formas de comunicação\n\nCada salto prepara ${babyName} para o próximo estágio de desenvolvimento.`;
  //   } else {
  //     return `Durante o ${leap.leapName}, o cérebro do bebê está desenvolvendo novas conexões. Os bebês frequentemente ficam mais irritáveis durante os saltos, mas isso é um sinal positivo de desenvolvimento.\n\nPosso ajudar com mais informações específicas sobre comportamentos, habilidades ou como apoiar ${babyName} neste período?`;
  //   }
  // };

  const formatMessage = (message: Message) => {
    if (message.sender === "ai") {
      return (
        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => <p className="mb-2" {...props} />,
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-5 mb-2" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal pl-5 mb-2" {...props} />
            ),
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            strong: ({ node, ...props }) => (
              <strong className="font-semibold" {...props} />
            ),
            em: ({ node, ...props }) => <em className="italic" {...props} />,
          }}
        >
          {message.text}
        </ReactMarkdown>
      );
    }

    // Mensagens do usuário mantêm a formatação original
    return message.text.split("\n").map((line, i) => (
      <p key={i} className={i > 0 ? "mt-2" : ""}>
        {line}
      </p>
    ));
  };

  if (!leap) return <div className="p-4">Carregando...</div>;

  return (
    <div className="baby-container h-screen flex flex-col">
      {/* Header com botão de limpar conversa e info do salto */}
      <div className="flex justify-between items-center mb-4 p-3 border-b fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-10">
        <Button
          variant="ghost"
          onClick={handleClearConversation}
          className="p-3"
        >
          <CircleFadingPlus size={40} className="h-10 w-10" />
        </Button>
        <span className="font-medium">
          {/* {babyName} está no {leap.leapName} */}
        </span>
        <div className="w-10"></div> {/* Espaçador para equilibrar o layout */}
      </div>

      {/* Área de mensagens ou sugestões */}
      <div className="flex-1 overflow-y-auto pt-16 pb-20 px-2">
        <div className="p-0">
          {showSuggestions ? (
            <div className="mb-4">
              <div className="text-center text-lg font-medium mb-2">
                Sugestões de pesquisa
              </div>
              <div className="grid grid-cols-2 gap-2">
                {leap.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="baby-suggestion text-left"
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
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

              {/* Indicador de carregamento */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-baby-gray text-baby-dark max-w-[80%] rounded-2xl p-3 flex items-center">
                    <LoaderCircle className="h-5 w-5 mr-2 animate-spin" />
                    <span>Processando...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input de conversação - fixo na parte inferior */}
      <div className="border-t p-3 fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Pergunte algo..."
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim() || isLoading}
            className="bg-baby-yellow hover:bg-baby-yellow/90 text-baby-dark"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
