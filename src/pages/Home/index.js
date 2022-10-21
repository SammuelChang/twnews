import Header from "../../components/Header";
import ContentView from '../../components/ContentView'
import styled from 'styled-components/macro'
import { useParams } from "react-router-dom";
import api from '../../utils/api'
import { useEffect, useState } from "react";
import BricksView from '../../components/BricksView'
import ModalControl from '../../components/Context';

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
  const [modal, setModal] = useState(false);
  const [modalNews, setModalNews] = useState([]);
  let { category } = useParams();

  async function getNews(category) {
    try {
      const data = await api.getNews(category)
      if (data === 429) {
        throw new Error("免費API已達使用上限，請隔日再試！");
      } else {
        return data.articles
          .filter(item => item.urlToImage !== "https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo-1200x1200.png" &&
            item.urlToImage !== null)
          .sort((a, b) => a.PublishtAt - b.publishedAt)
      }
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    if (category) {
      getNews(category)
        .then(res => setNews(res))
    } else {
      getNews()
        .then(res => setNews(res))
    }
  }, [category])

  return (
    <>
      <ModalControl.Provider value={[setModal, modal, setModalNews, modalNews]}>
        {modal && <ContentView item={modalNews} />}
        <Wrapper>
          <Header />
          <NewsContainer>
            {news?.map((item, index) =>
              <BricksView key={index} news={item} />
            )}
          </NewsContainer>
        </Wrapper>
      </ModalControl.Provider>
    </>
  );
}

export default Home;
