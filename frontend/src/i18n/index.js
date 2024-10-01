import { createI18n } from 'vue-i18n'

const messages = {
  pt: {
    author: 'Autor: Wilson Filho',
    title: 'URL Tech Scraper',
    inputPlaceholder: 'Digite a URL do site',
    analyzeButton: 'Analisar',
    detectedTechnologies: 'Tecnologias detectadas:',
    siteType: 'Tipo de Site:',
    screenshot: 'Screenshot do Site:',
    error: 'Erro ao analisar a URL',
    loading: 'Analisando o site, por favor aguarde...'
  },
  en: {
    author: 'Author: Wilson Filho',
    title: 'URL Tech Scraper',
    inputPlaceholder: 'Enter the website URL',
    analyzeButton: 'Analyze',
    detectedTechnologies: 'Detected technologies:',
    siteType: 'Site Type:',
    screenshot: 'Site Screenshot:',
    error: 'Error analyzing URL',
    loading: 'Analyzing site, please wait...'
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'en',
  messages,
})

export default i18n
