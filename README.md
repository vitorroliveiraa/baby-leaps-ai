<p align="center">
    <h1 align="center">Beby Leaps AI</h3>
</p>

<p align="center">
  Uma aplicação inteligente que ajuda pais a desvendarem os mistérios do crescimento do seu bebê! Os saltos de desenvolvimento são janelas mágicas onde seu pequeno conquista novas habilidades mentais e físicas. Embora venham com choro e irritabilidade, compreender e apoiar esses momentos é essencial para fortalecer o vínculo entre vocês e impulsionar o desenvolvimento saudável do seu filho. Prepare-se para celebrar cada 'leap' como um passo gigante na jornada do seu bebê!
</p>

<p align="center">
  <a href="https://javascript.tv.br/">
    <img alt="tests" title="Acessar site" src="https://github.com/vitorroliveiraa/baby-leaps-ai/blob/main/baby-leaps.png" style="width: 100%">
  </a>
</p>

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

## 📝 Guia Rápido de Uso
### Cadastro Inicial
- Preencha os dados do bebê:
  - 📅 Data prevista de nascimento
  - 🎂 Data real de nascimento
  - 👶 Nome e sexo

### Cálculos Automáticos
O sistema irá:
- Calcular idade cronológica e corrigida
- Ajustar para bebês prematuros e não prematuros
- Identificar o salto de desenvolvimento atual

### Interação com a AI
Pergunte sobre:
- 📊 Marcos do desenvolvimento atual
- 😴 Padrões de sono e alimentação
- 🧸 Atividades de estimulação


## Contexto do Projeto
O projeto foi criado como entrega de um desafio da Imersão de IA com o Google Gemini promovida pela Alura e Google.
<img src="https://www.alura.com.br/assets/img/imersoes/imersao-ia-google-gemini/logo.1715192575.png" width="200px"><figcaption></figcaption>


## ✨ Tecnologias

**Frontend**  
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)

**Backend**  
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB.svg?logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688.svg?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Gemini API](https://img.shields.io/badge/Gemini_API-1.15-4285F4.svg?logo=google)](https://ai.google.dev/)



## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js - 18+ (para o frontend)
- Python3 - 3.10+ (para o backend)
- Conta no Google AI Studio (para a Gemini API)
- Poetry (gerenciador de dependências Python)
- Clonar o repositório
  ```bash
  git clone https://github.com/vitorroliveiraa/baby-leaps-ai.git
  ```
  
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
    USE_MOCK=False  # Defina como True para usar dados simulados e não gastar seus créditos 😅 (Apenas testes)
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

----


<p align="center">
    <h3 align="center">Desenvolvido por Vitor Oliveira.</h3>
</p>
