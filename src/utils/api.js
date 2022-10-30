const api = {
  hostname: 'https://newsapi.org/v2',
  async getNews(category, page) {
    console.log('page', page);
    const categoryParam = category ? `&category=${category}` : '';
    const pageParam = `&page=${page === undefined ? 1 : page}`;
    const response = await fetch(`${this.hostname}/top-headlines?country=tw${categoryParam}${pageParam}&apiKey=f8211c21c46640a8b51ccb7d9ff24c5c`)
    if (!response.ok) return response.status;
    console.log(`${this.hostname}/top-headlines?country=tw${categoryParam}${pageParam}&apiKey=f8211c21c46640a8b51ccb7d9ff24c5c`);
    return response.json();
  },
  async getEverything() {
    const response = await fetch(`${this.hostname}/everything?q=選舉&apiKey=f8211c21c46640a8b51ccb7d9ff24c5c`)
    if (!response.ok) return response.status;
    return response.json();
  },
}


export default api;