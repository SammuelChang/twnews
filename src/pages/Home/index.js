import Header from "../../components/Header";
import styled from 'styled-components/macro'
import api from '../../utils/api'
import { useEffect, useState } from "react";

const Wrapper = styled.div`
padding: 0 30px;
`

const List = styled.ul`
height: 1000px;
width: 100%;
display: flex;
flex-wrap: wrap;
justify-content: center;
padding: 0;
`

const Item = styled.li`
width: 400px;
height: 450px;
list-style: none;
margin: 10px 15px;
overflow: hidden;
`

const Photo = styled.div`
height: 200px;
width: 100%;
background: ${props => `url(${props.background}) no-repeat top center`};
background-size: cover;
opacity: 0.7;
transition: .3s ease-in-out;
cursor: pointer;

&:hover{
  opacity: 1;
}
`

const Title = styled.div`
font-weight: bold;
letter-spacing: 2px;
height: 50px;
overflow: hidden;
text-overflow:ellipsis;
margin: 10px 0;
`

const Description = styled.div`
letter-spacing: 2px;
display: inline-block;
overflow: hidden;
text-overflow:ellipsis;
margin-bottom: 20px;
`

const PublishtAt = styled.div`
text-align: right;
font-size: 0.8rem;
`

function ellipsis(max, str) {
  const maxCount = max;
  const len = str.length;
  if (len < maxCount) return str;
  return str.substring(0, maxCount) + '...';
};

function timeAdjust(str){
  return str.substring(0, 10)
}

function Home() {
  const [news, setNews] = useState([]);

  useEffect(()=>{
    async function getNews(){
      try {
      const data = await api.getEverything()
      const arrangeData = data.articles
                          .filter(item => item.urlToImage !== "https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo-1200x1200.png")
                          .sort((a, b) => a.PublishtAt - b.publishedAt)
      setNews(arrangeData);
      console.log(arrangeData);
    } catch (error){
      alert('新聞資料取得異常，請重新嘗試！');
      console.log(error);
    }
    }
    getNews();
  },[])

  return (
    <Wrapper>
      <Header/>
      <List>
        {news?.map((item,index) => (
          <Item key={index}>
            <Photo background={item.urlToImage}></Photo>
            <Title>{ellipsis(50, item.title)}</Title>
            <Description>{ellipsis(80, item.description)}</Description>
            <PublishtAt>{timeAdjust(item.publishedAt)}</PublishtAt>
          </Item>
        ))}
      </List>
    </Wrapper>
  );
}

export default Home;
