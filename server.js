const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/screenshots', express.static('screenshots'));

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!2' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!1' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'Server is running!3' });
});

app.post('/scrape', async (req, res) => {
  try {
    const { url } = req.body;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    
    let technologies = [];
    let siteType = 'Não identificado';
    
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.setViewport({ width: 1280, height: 800 });
    
    // Crie a pasta screenshots se não existir
    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots');
    }

    const screenshotPath = path.join('screenshots', `${Date.now()}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    await browser.close();

    const screenshotUrl = `http://localhost:${port}/${screenshotPath}`;
    // Função auxiliar para verificar se uma string contém uma substring
    const contains = (str, substr) => str && str.toLowerCase().includes(substr.toLowerCase());

    // Detecção de tecnologias
    const detectTechnologies = () => {
      // Verificar meta tags e atributos
      $('meta').each((i, elem) => {
        const content = $(elem).attr('content');
        const name = $(elem).attr('name');
        if (contains(content, 'WordPress')) technologies.push('WordPress');
        if (contains(content, 'Drupal')) technologies.push('Drupal');
        if (contains(name, 'generator') && contains(content, 'Joomla')) technologies.push('Joomla');
        if (contains(content, 'Shopify')) technologies.push('Shopify');
      });

      // Verificar scripts
      $('script').each((i, elem) => {
        const src = $(elem).attr('src');
        const content = $(elem).html();
        if (src) {
          if (contains(src, 'react')) technologies.push('React');
          if (contains(src, 'vue')) technologies.push('Vue.js');
          if (contains(src, 'angular')) technologies.push('Angular');
          if (contains(src, 'jquery')) technologies.push('jQuery');
          if (contains(src, 'bootstrap')) technologies.push('Bootstrap');
          if (contains(src, 'materialize')) technologies.push('Materialize CSS');
          if (contains(src, 'foundation')) technologies.push('Foundation');
          if (contains(src, 'tailwind')) technologies.push('Tailwind CSS');
        }
        if (content) {
          if (contains(content, 'React')) technologies.push('React');
          if (contains(content, 'Vue')) technologies.push('Vue.js');
          if (contains(content, 'Angular')) technologies.push('Angular');
        }
      });

      // Verificar links para CSS
      $('link[rel="stylesheet"]').each((i, elem) => {
        const href = $(elem).attr('href');
        if (contains(href, 'bootstrap')) technologies.push('Bootstrap');
        if (contains(href, 'materialize')) technologies.push('Materialize CSS');
        if (contains(href, 'foundation')) technologies.push('Foundation');
        if (contains(href, 'bulma')) technologies.push('Bulma');
        if (contains(href, 'semantic-ui')) technologies.push('Semantic UI');
        if (contains(href, 'tailwind')) technologies.push('Tailwind CSS');
      });

      // Verificar classes comuns
      const bodyClasses = $('body').attr('class');
      if (bodyClasses) {
        if (contains(bodyClasses, 'wp-')) technologies.push('WordPress');
        if (contains(bodyClasses, 'drupal-')) technologies.push('Drupal');
        if (contains(bodyClasses, 'joomla-')) technologies.push('Joomla');
      }

      // Verificar linguagens de programação comuns no lado do servidor
      const pageContent = $('html').html().toLowerCase();
      if (contains(pageContent, 'php')) technologies.push('PHP');
      if (contains(pageContent, 'ruby on rails')) technologies.push('Ruby on Rails');
      if (contains(pageContent, 'django')) technologies.push('Django (Python)');
      if (contains(pageContent, 'asp.net')) technologies.push('ASP.NET');
      if (contains(pageContent, 'laravel')) technologies.push('Laravel (PHP)');
      if (contains(pageContent, 'express')) technologies.push('Express.js (Node.js)');

      // Verificar outras tecnologias comuns
      if (contains(pageContent, 'google analytics')) technologies.push('Google Analytics');
      if (contains(pageContent, 'google tag manager')) technologies.push('Google Tag Manager');
      if (contains(pageContent, 'cloudflare')) technologies.push('Cloudflare');
      if (contains(pageContent, 'aws-')) technologies.push('Amazon Web Services (AWS)');
      if (contains(pageContent, 'firebase')) technologies.push('Firebase');
    };

    // Função para detectar o tipo de site
    const detectSiteType = () => {
      const pageContent = $('body').text().toLowerCase();
      const title = $('title').text().toLowerCase();

      if (contains(pageContent, 'login') || contains(pageContent, 'sign in') || $('input[type="password"]').length > 0) {
        return 'Página de Login';
      }

      if (contains(pageContent, 'add to cart') || contains(pageContent, 'buy now') || contains(pageContent, 'product description')) {
        return 'Página de Produto';
      }

      if (contains(title, 'news') || contains(pageContent, 'latest news') || $('article').length > 0) {
        return 'Portal de Notícias';
      }

      if (contains(pageContent, 'blog') || $('article').length > 0) {
        return 'Blog';
      }

      if (contains(pageContent, 'contact us') || $('form').length > 0) {
        return 'Página de Contato';
      }

      if (contains(title, 'about') || contains(pageContent, 'our mission') || contains(pageContent, 'our story')) {
        return 'Página Sobre';
      }

      if ($('form').length > 0 && contains(pageContent, 'search')) {
        return 'Página de Busca';
      }

      if (contains(pageContent, 'faq') || contains(pageContent, 'frequently asked questions')) {
        return 'Página de FAQ';
      }

      return 'Página Geral';
    };

    // Executar detecções
    detectTechnologies();
    siteType = detectSiteType();

    // Remover duplicatas
    technologies = [...new Set(technologies)];

    res.json({ technologies, siteType, screenshotUrl });
  } catch (error) {
    console.error('Erro ao fazer scraping:', error);
    res.status(500).json({ error: 'Erro ao fazer scraping da URL' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
