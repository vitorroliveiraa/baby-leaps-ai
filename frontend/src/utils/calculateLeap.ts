// Number of weeks for each leap
const LEAPS = {
  1: { weeks: 5, name: "1º salto" },
  2: { weeks: 8, name: "2º salto" },
  3: { weeks: 12, name: "3º salto" },
  4: { weeks: 19, name: "4º salto" },
  5: { weeks: 26, name: "5º salto" },
  6: { weeks: 37, name: "6º salto" },
  7: { weeks: 46, name: "7º salto" },
  8: { weeks: 55, name: "8º salto" },
  9: { weeks: 64, name: "9º salto" },
  10: { weeks: 75, name: "10º salto" },
};

export type LeapType = {
  leapNumber: number;
  leapName: string;
  weeksOld: number;
  currentLeap: boolean;
  suggestions: string[];
};

export const calculateLeap = (): LeapType => {
  // Get saved dates from localStorage
  const expectedBirthDateStr = localStorage.getItem("expectedBirthDate");
  const actualBirthDateStr = localStorage.getItem("actualBirthDate");

  if (!expectedBirthDateStr || !actualBirthDateStr) {
    // Default to first leap if no dates are available
    return {
      leapNumber: 1,
      leapName: LEAPS[1].name,
      weeksOld: 5,
      currentLeap: true,
      suggestions: getDefaultSuggestions(1),
    };
  }

  const expectedBirthDate = new Date(expectedBirthDateStr);
  const actualBirthDate = new Date(actualBirthDateStr);
  const today = new Date();

  // Cálculo da idade corrigida (mesma lógica do Python)
  // 1. Calcula semanas de prematuridade
  const prematurityWeeks = Math.floor(
    (expectedBirthDate.getTime() - actualBirthDate.getTime()) /
      (1000 * 60 * 60 * 24 * 7)
  );

  // 2. Calcula idade cronológica em semanas
  const chronologicalWeeks = Math.floor(
    (today.getTime() - actualBirthDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
  );

  // 3. Aplica correção para prematuridade
  const correctedWeeks = Math.max(0, chronologicalWeeks - prematurityWeeks);

  // Find current leap based on corrected age
  let currentLeap = 0;
  for (const [leapNum, leapData] of Object.entries(LEAPS)) {
    if (correctedWeeks >= leapData.weeks) {
      currentLeap = parseInt(leapNum);
    } else {
      break;
    }
  }

  // If baby is before first leap or after last leap
  if (currentLeap === 0) currentLeap = 1;
  if (currentLeap > 10) currentLeap = 10;

  return {
    leapNumber: currentLeap,
    leapName: LEAPS[currentLeap].name,
    weeksOld: correctedWeeks, // Usando a idade corrigida aqui
    currentLeap: true,
    suggestions: getDefaultSuggestions(currentLeap),
  };
};

const getDefaultSuggestions = (leapNumber: number): string[] => {
  const commonSuggestions = [
    "O que esperar do salto?",
    "Como o bebê fica?",
    "Quais mudanças o bebê terá?",
    "Quanto tempo dura esse salto?",
  ];

  // Specific suggestions based on leap
  const specificSuggestions: Record<number, string[]> = {
    1: ["Mudanças sensoriais no 1º salto", "Como acalmar o bebê no 1º salto"],
    2: ["Desenvolvimento motor no 2º salto", "Padrões de sono no 2º salto"],
    3: ["Interações sociais no 3º salto", "Habilidades de comunicação"],
    4: ["Desenvolvimento cognitivo no 4º salto", "Brincadeiras recomendadas"],
    5: ["Desenvolvimento da fala", "Curiosidade e exploração"],
    6: ["Desenvolvimento motor avançado", "Rotinas e limites"],
    7: ["Independência e autonomia", "Desenvolvimento emocional"],
    8: ["Habilidades sociais avançadas", "Comunicação verbal"],
    9: ["Resolução de problemas", "Desenvolvimento da personalidade"],
    10: ["Preparação para fase seguinte", "Marcos de desenvolvimento"],
  };

  // Return both common and specific suggestions
  return [...commonSuggestions, ...(specificSuggestions[leapNumber] || [])];
};
