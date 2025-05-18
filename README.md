Uma aplicação inteligente que ajuda pais a entenderem os saltos de desenvolvimento de seus bebês, utilizando a Gemini API para fornecer orientações personalizadas.

<p align="center">
  <a href="https://javascript.tv.br/">
    <img alt="tests" title="Acessar site" src="https://github.com/vitorroliveiraa/baby-leaps-ai/blob/main/baby-leaps.png" style="width: 100%">
  </a>
</p>

## ✨ Tecnologias

**Frontend**  
[![Vite](https://img.shields.io/badge/Vite-4.4-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)

**Backend**  
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB.svg?logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.95-009688.svg?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Gemini API](https://img.shields.io/badge/Gemini_API-1.0-4285F4.svg?logo=google)](https://ai.google.dev/)

## 💡 Motivação

Este projeto nasceu da minha experiência pessoal como pai. Quando minha filha era bebê, seria bacana ter algo bem prático que me ajudasse a:

- Compreender os períodos de desenvolvimento intenso (saltos)
- Antecipar mudanças no comportamento
- Oferecer o apoio adequado em cada fase
- Fortalecer nosso vínculo durante esses períodos desafiadores

Muitos pais não conhecem a importância dos saltos de desenvolvimento. Ao entender esses períodos de grande mudança, podemos:

✔ Responder com mais empatia ao choro e irritabilidade  
✔ Oferecer o apoio adequado para cada fase  
✔ Criar um ambiente que estimule o aprendizado  
✔ Reduzir a ansiedade sobre o desenvolvimento infantil  

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js - 18+ (para o frontend)
- Python3 - 3.10+ (para o backend)
- Conta no Google AI Studio (para a Gemini API)
- Poetry (gerenciador de dependências Python)


1. **Clone o repositório**
   ```bash
   git clone https://github.com/vitorroliveiraa/baby-leaps-ai.git

### 🔧 Configuração do Backend
1. **Acessar a pasta:**
    ```bash
    cd baby-leaps-ai/backend
    ```

2. **Configure o ambiente Python**
   ```bash
   # Instale as dependências
   poetry install
   

   # Ative o ambiente virtual
   poetry shell
   ```

3. **Configure a Gemini API**
   Crie um arquivo .env na pasta backend com:
   ```
    GEMINI_API_KEY=sua_chave_aqui
    USE_MOCK=False  # Defina como True para usar dados simulados
    ```

5. **Inicie o servidor**
   Entrar na pasta do projeto Python:
   ```bash
   poetry run uvicorn src.main:app --reload
   ```

### 💅 Configuração do Frontend (React)
1. **Acessar a pasta:**
   ```bash
   cd baby-leaps-ai/frontend
   ```

2. **Configure o ambiente Reactjs**
   ```bash
   # Instale as dependências
   npm i
   ```

3. **Rodar o projeto**
   ```bash
   npm run dev
   ```
