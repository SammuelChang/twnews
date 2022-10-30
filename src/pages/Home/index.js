import Header from "../../components/Header";
import ContentView from '../../components/ContentView'
import styled from 'styled-components/macro'
import { useParams } from "react-router-dom";
import api from '../../utils/api'
import { useEffect, useRef, useState } from "react";
import BricksView from '../../components/BricksView'
import ModalControl from '../../components/Context';
import Loading from "../../components/Loading";

const Wrapper = styled.div`
padding: 0 30px;
height: 100%;
`

const NewsContainer = styled.ul`
height: 1000px;
width: 100%;
display: flex;
flex-wrap: wrap;
justify-content: center;
padding: 0;
`

const LoadMore = styled.div`
position: fixed;
bottom: 0;
left: 50%;
transform: translateX(-50%);
visibility: ${props => (props.loading ? 'visible' : 'hidden')};
`

function Home() {
  const [mount, setMount] = useState(false);
  const [news, setNews] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalNews, setModalNews] = useState([]);
  let { category } = useParams();
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();
  const [page, setPage] = useState(1);

  function filterNewsWithImage(arr) {
    if (arr.length === 0) { throw new Error("沒有更多新聞了！"); };
    return arr
      .filter(item => item.urlToImage !== "https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo-1200x1200.png" &&
        item.urlToImage !== null)
      .sort((a, b) => a.PublishtAt - b.publishedAt)
  }

  async function getNews(category, page) {
    try {
      const data = await api.getNews(category, page);
      if (data === 429) {
        throw new Error("免費API已達使用上限，請隔日再試！");
      } else {
        return filterNewsWithImage(data.articles)
      }
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    setNews([]);
    setLoading(true);
    setMount(false);
    if (category) {
      getNews(category)
        .then(res => { setNews(res); })
    } else {
      getNews('')
        .then(res => { setNews(res); })
    }
    setTimeout(() => {
      setLoading(false);
      setMount(true);
    }, 1000);
  }, [category])

  useEffect(() => {
    const ref_value = observerRef.current;
    const updateNews = async (p) => {
      setLoading(true);
      const followingNews = await getNews(category, p);

      if (followingNews) {
        setNews((news) => [...news, ...followingNews]);
        setTimeout(() => {
          setLoading(false);
          setPage((prePage) => prePage + 1);
        }, 1000);
      } else {
        setLoading(false);
        return;
      }

    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            updateNews(page);
          }
        }
      },
      {
        threshold: 1
      }
    );

    observer.observe(ref_value)

    return () => {
      observer.unobserve(ref_value);
    };
  }, [page]);

  return (
    <>
      <ModalControl.Provider value={[setModal, modal, setModalNews, modalNews]}>
        {modal && <ContentView item={modalNews} />}
        <Wrapper>
          <Header />
          <div>{page}</div>
          <NewsContainer>
            {loading && <Loading />}
            {!loading && news?.map((item, index) =>
              <BricksView key={index} news={item} />
            )}
            <div ref={observerRef}></div>
          </NewsContainer>
          <LoadMore loading={mount && loading ? 1 : 0}>
            <Loading />
          </LoadMore>
        </Wrapper>
      </ModalControl.Provider>
    </>
  );
}

export default Home;
