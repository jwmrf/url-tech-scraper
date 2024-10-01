<template>
  <div id="app">
    <header class="author-info">
      <p>{{ $t('author') }}</p>
      <div class="social-links">
        <a href="https://github.com/jwmrf" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/github-icon.svg" alt="GitHub" class="social-icon">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/jose-wilson-madruga-rezende-filho/" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/linkedin-icon.svg" alt="LinkedIn" class="social-icon">
          LinkedIn
        </a>
        <select v-model="$i18n.locale">
          <option value="pt">PT</option>
          <option value="en">EN</option>
        </select>
      </div>
    </header>
    <h1>{{ $t('title') }}</h1>
    <div class="gear-container">
      <svg class="gear" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10L54 14L60 11L62 17L68 16L68 22L74 23L72 29L77 32L73 37L77 41L71 45L74 50L67 52L68 58L61 58L60 64L53 62L50 67L44 64L40 67L36 62L29 64L28 58L21 58L22 52L15 50L18 45L12 41L16 37L12 32L17 29L15 23L21 22L21 16L27 17L29 11L35 14L39 10L44 14Z" fill="url(#gearGradient)" />
        <circle cx="50" cy="50" r="10" fill="#555" />
        <defs>
          <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#888;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#444;stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div class="input-container">
      <input v-model="url" :placeholder="$t('inputPlaceholder')">
      <button :disabled="isLoading || !url" @click="scrapeUrl">{{ $t('analyzeButton') }}</button>
      <div v-if="isLoading" class="loading">{{ $t('loading') }}</div>
    </div>
    <div class="results-container">
      <div v-if="technologies.length > 0" class="results">
        <h2>{{ $t('detectedTechnologies') }}</h2>
        <ul>
          <li v-for="tech in technologies" :key="tech">{{ tech }}</li>
        </ul>
        <h2>{{ $t('siteType') }}</h2>
        <p>{{ siteType }}</p>
      </div>
      <div v-if="screenshotUrl" class="screenshot">
        <h2>{{ $t('screenshot') }}</h2>
        <img :src="screenshotUrl" alt="Screenshot do site" />
      </div>
    </div>
    <p v-if="error" class="error">{{ $t('error') }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import './styles.css';

export default {
  name: 'App',

  data() {
    return {
      url: '',
      technologies: [],
      siteType: '',
      screenshotUrl: '',
      error: '',
      isLoading: false,
    }
  },
  methods: {
    async scrapeUrl() {
      try {
        this.technologies = [];
        this.siteType = '';
        this.screenshotUrl = '';
        this.error = '';
        this.isLoading = true;
        const response = await axios.post('http://localhost:3000/api/scrape', { url: this.url });
        this.technologies = response.data.technologies;
        this.siteType = response.data.siteType;
        this.screenshotUrl = response.data.screenshotUrl;
        if (this.technologies.length === 0) {
          this.error = 'Nenhuma tecnologia detectada';
        }
      } catch (error) {
        this.error = 'Erro ao analisar a URL';
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>


<style src="./styles.css"></style>
<style scoped>
/* Adicione estilos para o seletor de idioma */
select {
  margin-left: 10px;
  padding: 5px;
  background-color: #333;
  color: #fff;
  border: 1px solid #61dafb;
  border-radius: 4px;
}
.loading {
  margin-top: 10px;
  color: #646cff;
  font-weight: bold;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>