const api = {
    hostname: 'https://newsapi.org/v2',
    getNews(category) {
      const categoryParam = category ? `&category=${category}` : '';
      console.log(`${this.hostname}/top-headlines?country=tw${categoryParam}&apiKey=f8211c21c46640a8b51ccb7d9ff24c5c`);
      return fetch(`${this.hostname}/top-headlines?country=tw${categoryParam}&apiKey=f8211c21c46640a8b51ccb7d9ff24c5c`)
      .then((response) => response.json()
      );
    },
    getEverything() {
      return fetch(`${this.hostname}/everything?q=選舉&apiKey=f8211c21c46640a8b51ccb7d9ff24c5c`)
      .then((response) => response.json()
      );
    },
}


export default api;