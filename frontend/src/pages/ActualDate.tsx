import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const ActualDate = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();

  const expectedDate = localStorage.getItem("expectedBirthDate");
  const maxDate = new Date();

  const handleContinue = () => {
    if (date) {
      localStorage.setItem("actualBirthDate", date.toISOString());
      navigate("/baby-info");
    }
  };

  return (
    <div className="baby-container">
      <h1 className="baby-title">Data de nascimento real</h1>

      <div className="baby-card">
        <div className="flex flex-col gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal border border-gray-300 h-12",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP", { locale: ptBR })
                ) : (
                  <span>Selecione uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                locale={ptBR}
                className="p-3"
              />
            </PopoverContent>
          </Popover>

          <p className="text-sm text-gray-600">
            A data real de nascimento do seu bebê nos ajuda a calcular com
            precisão em qual salto de desenvolvimento ele se encontra
            atualmente. Todos os bebês passam pelos mesmos saltos de
            desenvolvimento, mas em momentos ligeiramente diferentes.
          </p>
        </div>
      </div>

      <div className="flex-1"></div>

      <Button
        onClick={handleContinue}
        disabled={!date}
        className="w-full bg-baby-yellow hover:bg-baby-yellow/90 text-baby-dark font-medium mt-4"
      >
        Avançar
      </Button>
    </div>
  );
};

export default ActualDate;
