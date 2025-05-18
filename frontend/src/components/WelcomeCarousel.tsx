
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CarouselSlide {
  title: string;
  content: React.ReactNode;
  showButton?: boolean;
}

const WelcomeCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides: CarouselSlide[] = [
    {
      title: "Seja bem vindo(a) ao Baby's Leaps AI",
      content: (
        <div className="space-y-4 text-center">
          <p>Olá, eu sou uma Inteligência artificial focada em estudar o desenvolvimento.</p>
          <p>Estou aqui pra te ajudar a passar por essa fase tão importante na vida!</p>
        </div>
      )
    },
    {
      title: "Eu sei, é casa, trabalho, família...",
      content: (
        <div className="space-y-4">
          <p className="text-center">São muitas coisas pra lidar na vida, por isso, vou te auxiliar da forma prática.</p>
          <p className="font-medium mt-4">Essas formas incluem:</p>
          <ul className="space-y-2 text-left pl-5">
            <li className="flex gap-2">
              <span>•</span>
              <span>Explicações sobre cada salto de desenvolvimento.</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Apontar comportamentos esperados e mudanças cognitivas em curso.</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Sugerir formas de acolher e estimular seu bebê de forma positiva.</span>
            </li>
          </ul>
        </div>
      ),
      showButton: true
    }
  ];

  const goToNextSlide = () => {
    if (currentSlide === slides.length - 1) {
      navigate("/expected-date");
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="baby-container">
      <div className="flex-1 flex items-center">
        <div className="w-full space-y-8">
          <h1 className="baby-title">{currentSlideData.title}</h1>
          <div className="baby-card">{currentSlideData.content}</div>
          
          <div className="flex justify-between items-center">
            {currentSlide === 0 ? (
              <Button 
                onClick={goToNextSlide}
                className="rounded-full h-12 w-12 p-0 bg-baby-yellow hover:bg-baby-yellow/90 text-baby-dark"
              >
                <ArrowRight size={24} />
              </Button>
            ) : (
              <Button 
                onClick={goToNextSlide}
                className="w-full bg-baby-yellow hover:bg-baby-yellow/90 text-baby-dark text-base"
              >
                Registrar o bebê!
              </Button>
            )}
          </div>
          
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentSlide ? "bg-baby-yellow" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCarousel;
