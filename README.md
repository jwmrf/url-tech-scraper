# URL Tech Scraper

O **URL Tech Scraper** é uma aplicação web que permite aos usuários descobrir as tecnologias utilizadas em um determinado site através da análise da URL fornecida. O projeto foi desenvolvido utilizando **Vue.js** para o front-end e **Express** no back-end, com o suporte das bibliotecas **Cheerio** e **Puppeteer** para realizar o web scraping.
#### Acesse: https://wilsonfilho.site

![image](https://github.com/user-attachments/assets/e9223421-1fdc-4f97-88a3-9a90b8591bf9)

## Visão Geral

Este projeto foi criado com o objetivo de oferecer uma ferramenta prática para desenvolvedores e curiosos que queiram descobrir quais tecnologias estão sendo usadas em um site específico. Ao inserir uma URL, a aplicação busca os dados da página e extrai as informações tecnológicas relevantes, como frameworks, bibliotecas e ferramentas de terceiros.

## Funcionalidades

- **Análise de Sites**: Digite a URL de qualquer site e veja quais tecnologias ele está utilizando.
- **Web Scraping**: Utilização de **Puppeteer** e **Cheerio** para a extração de dados diretamente da estrutura HTML do site.
- **Copiar Resultado**: Copie facilmente o resultado da análise com um único clique.
- **Interface Simples**: Uma interface amigável e fácil de usar, desenvolvida com **Vue.js**.

## Tecnologias Utilizadas

- **Vue.js**: Framework JavaScript para o desenvolvimento da interface do usuário.
- **Express.js**: Framework para o servidor back-end.
- **Puppeteer**: Biblioteca Node.js que fornece uma API de alto nível para controle do Chrome ou Chromium para realizar scraping.
- **Cheerio**: Biblioteca para a manipulação e análise de HTML, baseada no jQuery.
  
## Como Funciona

1. O usuário insere a URL do site que deseja analisar.
2. A aplicação faz uma requisição para o servidor **Express**, que utiliza o **Puppeteer** para abrir a página e capturar o conteúdo HTML.
3. O **Cheerio** é utilizado para filtrar e buscar as tecnologias presentes na página.
4. As informações são exibidas ao usuário de forma simples e organizada.
