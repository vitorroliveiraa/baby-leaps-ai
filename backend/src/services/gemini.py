import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

USE_MOCK = os.getenv("USE_MOCK", "False").lower() == "true"

MOCK_RESPONSE = """Olá! Entendo sua preocupação com o desenvolvimento do(a) {nome_bebe}. É normal sentir-se ansioso(a) com as mudanças que os bebês passam, especialmente em relação aos saltos de desenvolvimento. Vamos analisar com calma o que está acontecendo.

## Analisando o Desenvolvimento de {nome_bebe} com {idade_semanas} Semanas

Você não descreveu os comportamentos do(a) seu/sua bebê, então preciso de mais informações para entender o que está acontecendo. Porém, vamos considerar o desenvolvimento típico de um(a) bebê de {idade_semanas} semanas de idade e os saltos de desenvolvimento esperados nessa fase.

Com {idade_semanas} semanas, {nome_bebe} está numa fase em que muitos bebês estão passando por um período de **crescimento e mudanças significativas**. Embora não haja um "salto" específico tão definido nessa idade quanto em outras mais adiante, é comum observar:

* Mudanças no **padrão de sono**: {nome_bebe} pode estar dormindo mais ou menos, apresentando maior ou menor dificuldade para dormir.
* Aumento na **irritabilidade ou choro**: Pode ser mais difícil acalmá-lo(a).
* Maior **interesse pelo ambiente**: Pode fixar mais o olhar em objetos e rostos.
* **Mudanças no apetite**: Pode apresentar períodos em que mama mais ou menos.

## O que fazer?

* **Manter a rotina**: Seguir uma rotina consistente ajuda na segurança.
* **Oferecer muito colo e carinho**: O contato físico é fundamental.
* **Observação atenta**: Preste atenção nos sinais que ele(a) emite.
* **Buscar ajuda profissional**: Se notar algo fora do comum, consulte o pediatra."""

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

geminiModel = "gemini-1.5-flash"


async def ask_gemini(prompt: str, nomeBebe: str, sexo: str, correctedAge: int) -> str:
    if USE_MOCK:
        response = MOCK_RESPONSE.format(
            nome_bebe=nomeBebe,
            idade_semanas=correctedAge,
        )
        return response.strip()

    chat_config = types.GenerateContentConfig(
        system_instruction=f"""
            Você é um especialista em desenvolvimento infantil com foco em saltos de desenvolvimento.
            Ao receber uma mensagem de um pai ou mãe, analise a informação tecnicamente e determine se os comportamentos são compatíveis com algum salto.
            Caso o pai ou mãe faça alguma pergunta que releve sua imaturidade sobre o assunto, faça uma busca e analise técnica da mensagem enviada.
            Em ambos os casos, você deve usar {correctedAge} semanas como a idade do bebê para buscar informações.
            Depois, se achar necessário pode usar o nome {nomeBebe} para se referir ao bebê, explicando de forma clara, empática e acolhedora, como se estivesse falando com um cuidador preocupado (Se necessário utilize emojis).
            Dê conselhos práticos, mostre que é normal, e sempre estimule com positividade.
            Considere em suas explicações que este bebê é do sexo: {sexo}.
            
            **Formate suas respostas usando Markdown para melhorar a clareza e a organização:**
            - Use títulos de nível 2 (##) para os principais tópicos ou explicações.
            - Use listas não ordenadas (*) para apresentar conselhos práticos ou pontos importantes.
            - Use negrito (**) para destacar palavras-chave ou conceitos importantes.
            - Use itálico (*) para enfatizar ou adicionar nuances.
        """,
        temperature=0.1,
        max_output_tokens=500,
        top_p=0.8
    )

    chat = client.chats.create(model=geminiModel, config=chat_config)

    try:
        response = chat.send_message(prompt)
        return response.text
    except Exception as e:
        raise Exception(f"Erro na Gemini API: \n{e}")
