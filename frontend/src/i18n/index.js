import { createI18n } from 'vue-i18n'

const messages = {
  pt: {
    author: 'Autor: Wilson Filho',
    title: 'URL Tech Scraper',
    inputPlaceholder: 'Digite a URL do site',
    analyzeButton: 'Analisar',
    copy: 'Copiar',
    loading: 'Carregando, por favor aguarde',
    'Try With': 'Tente Com',
    detectedTechnologies: 'Tecnologias detectadas:',
    siteType: 'Tipo de Site:',
    screenshot: 'Screenshot do Site:',
    error: 'Erro ao analisar a URL',
    analyzing: 'Analisando o site, por favor aguarde...'
  },
  en: {
    "author": "Author: Wilson Filho",
    "title": "URL Tech Scraper",
    "inputPlaceholder": "Enter the website URL",
    "analyzeButton": "Analyze",
    "copy": "Copy",
    "detectedTechnologies": "Detected Technologies:",
    "siteType": "Website Type:",
    "screenshot": "Website Screenshot:",
    "error": "Error analyzing the URL",
    "analyzing": "Analyzing the website, please wait..."
  },
  ja: {
    author: '作者: Wilson Filho',
    title: 'URL技術スクレイパー',
    inputPlaceholder: 'サイトのURLを入力してください',
    analyzeButton: '分析',
    detectedTechnologies: '検出された技術:',
    siteType: 'サイトタイプ:',
    screenshot: 'サイトのスクリーンショット:',
    error: 'URLの分析中にエラーが発生しました',
    analyzing: 'サイトを分析中です。お待ちください...'
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'en',
  messages,
})

export default i18n
