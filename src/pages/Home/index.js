import Header from "../../components/Header";
import styled from 'styled-components/macro'
import { useParams } from "react-router-dom";
import api from '../../utils/api'
import { useEffect, useState } from "react";
import BricksView from '../../components/BricksView'

const Wrapper = styled.div`
padding: 0 30px;
`

const NewsContainer = styled.ul`
height: 1000px;
width: 100%;
display: flex;
flex-wrap: wrap;
justify-content: center;
padding: 0;
`

function Home() {
  const [news, setNews] = useState([]);
  let { category } = useParams();
  
  async function getNews(category){
    try {
    const data = await api.getNews(category)
    const arrangeData = data.articles
                        .filter(item => item.urlToImage !== "https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo-1200x1200.png" && 
                                        item.urlToImage !== null)
                        .sort((a, b) => a.PublishtAt - b.publishedAt)
    setNews(arrangeData);
  } catch (error){
    alert('新聞資料取得異常，請重新嘗試！');
    console.log(error);
  }
  }

  useEffect(()=>{
    if (category){
      getNews(category);
    } else {
      getNews();
    }
  },[category])

  return (
    <Wrapper>
      <Header/>
      <NewsContainer>
        {news?.map((item,index) => 
          <BricksView key={index} news={item} />
        )}
      </NewsContainer>
    </Wrapper>
  );
}

export default Home;
