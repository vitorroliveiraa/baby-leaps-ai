from datetime import datetime


def calculate_corrected_age(data_prevista: str, data_real: str) -> int:
    """
    Calcula a idade corrigida em semanas.
    Exemplo:
        - Data prevista: "2024-01-01"
        - Data real: "2023-12-01" → 4 semanas antes
        - Data atual: datetime.now() → idade corrigida = (idade cronológica) - (semanas prematuras)

        A idade corrigida que é usada como referência para saber qual salto o bebê está.
    """
    prevista = datetime.strptime(data_prevista, "%Y-%m-%d")
    real = datetime.strptime(data_real, "%Y-%m-%d")
    semanas_prematuras = (prevista - real).days // 7

    idade_cronologica_semanas = (datetime.now() - real).days // 7

    idade_corrigida = idade_cronologica_semanas - semanas_prematuras

    return max(0, idade_corrigida)
