from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

from src.services.gemini import ask_gemini
from src.services.age_calculator import calculate_corrected_age

app = FastAPI(title="Baby Leaps AI", description="API especialista em saltos de desenvolvimento de bebês")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class BabyRequest(BaseModel):
    dataPrevista: str  # Formato: "YYYY-MM-DD"
    dataReal: str
    nomeBebe: str
    sexo: str  # "masculino" ou "feminino"
    context: str


@app.post("/ask-gemini")
async def ask_gemini_endpoint(request: BabyRequest):
    try:
        # Calcula idade corrigida
        correctedAge = calculate_corrected_age(request.dataPrevista, request.dataReal)

        # Chama a Gemini API
        response = await ask_gemini(request.context, request.nomeBebe, request.sexo, correctedAge)

        return {
            "correctedAgeWeeks": correctedAge,
            "geminiResponse": response
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
