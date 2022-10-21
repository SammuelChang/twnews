import { useContext } from 'react';
import styled from 'styled-components/macro'
import ModalControl from '../../components/Context';

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
  if (typeof str !== 'string') return '';
  const maxCount = max;
  const len = str.length;
  if (len < maxCount) return str;
  return str.substring(0, maxCount) + '...';
};

function timeAdjust(str) {
  return str.substring(0, 10)
}

function BricksView(item) {
  const { news } = item;
  const [setModal, modal, setModalNews, modalNews] = useContext(ModalControl);

  return (
    <Item>
      <Photo background={news.urlToImage} onClick={() => { setModal(!modal); setModalNews([news]); }}></Photo>
      <Title>{ellipsis(50, news.title)}</Title>
      <Description>{ellipsis(80, news.description)}</Description>
      <PublishtAt>{timeAdjust(news.publishedAt)}</PublishtAt>
    </Item >
  )
}

export default BricksView;