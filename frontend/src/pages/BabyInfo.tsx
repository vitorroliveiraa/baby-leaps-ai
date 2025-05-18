
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Baby } from "lucide-react";

const BabyInfo = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (name) localStorage.setItem("babyName", name);
    if (gender) localStorage.setItem("babyGender", gender);
    navigate("/chat");
  };

  return (
    <div className="baby-container">
      <h1 className="baby-title">Nome do baby</h1>

      <div className="baby-card">
        <div className="flex flex-col gap-4">
          <Input 
            type="text" 
            placeholder="Digite o nome do bebê"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="baby-input"
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Selecione o sexo:</label>
            <ToggleGroup type="single" value={gender} onValueChange={setGender} className="flex justify-center gap-4">
              <ToggleGroupItem value="male" aria-label="Masculino" className="w-24 data-[state=on]:bg-baby-yellow data-[state=on]:text-baby-dark">
                <Baby className="mr-2 h-4 w-4" />
                Masculino
              </ToggleGroupItem>
              <ToggleGroupItem value="female" aria-label="Feminino" className="w-24 data-[state=on]:bg-baby-yellow data-[state=on]:text-baby-dark">
                <Baby className="mr-2 h-4 w-4" />
                Feminino
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Preencher essas informações vai nos ajudar a personalizar as 
            orientações e dicas sobre o desenvolvimento do seu bebê. 
            Cada criança é única, mas conhecer o nome e o sexo nos 
            ajuda a fornecer uma experiência mais acolhedora.
          </p>
        </div>
      </div>

      <div className="flex-1"></div>

      <Button
        onClick={handleContinue}
        className="w-full bg-baby-yellow hover:bg-baby-yellow/90 text-baby-dark font-medium mt-4"
      >
        Vamos começar
      </Button>
    </div>
  );
};

export default BabyInfo;
