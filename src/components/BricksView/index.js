import { useContext } from 'react';
import styled from 'styled-components/macro'
import ModalControl from '../../components/Context';
import { LazyLoadImage } from "react-lazy-load-image-component";
import PlaceholderImage from "../../images/placeholder.png";
import 'react-lazy-load-image-component/src/effects/blur.css';


const Item = styled.li`
width: 400px;
height: 450px;
list-style: none;
margin: 10px 15px;
overflow: hidden;
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
  const [setModal, modal, setModalNews] = useContext(ModalControl);

  return (
    <Item>
      <LazyLoadImage
        src={news.urlToImage} onClick={() => { setModal(!modal); setModalNews([news]); }}
        width={"100%"}
        height={200}
        style={{ objectFit: 'cover', objectPosition: 'top' }}
        alt="Image Alt"
        threshold={500}
        placeholderSrc={PlaceholderImage}
        effect="blur"
      />
      <Title>{ellipsis(50, news.title)}</Title>
      <Description>{ellipsis(80, news.description)}</Description>
      <PublishtAt>{timeAdjust(news.publishedAt)}</PublishtAt>
    </Item >
  )
}

export default BricksView;