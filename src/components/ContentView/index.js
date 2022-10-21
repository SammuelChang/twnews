import styled from 'styled-components/macro'
import closeButton from '../../images/close-button.png'
import externalLink from '../../images/external-link.png'
import { useContext, useEffect } from 'react';
import ModalControl from '../../components/Context';

const Modal = styled.div`
// display: none; /* Hidden by default */
position: fixed; /* Stay in place */
z-index: 1; /* Sit on top */
left: 0;
top: 0;
width: 100%; /* Full width */
height: 100%; /* Full height */
overflow: auto; /* Enable scroll if needed */
background-color: rgb(0,0,0); /* Fallback color */
background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
display: flex;
justify-content: center;
animation: pop-swirl 0.3s ease;

@keyframes pop-swirl {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
`

const Close = styled.div`
    background: url(${closeButton})  no-repeat center center;
    background-size: contain;
    font-size: 2rem;
    position: absolute;
    right: 0;
    width: 30px;
    height: 30px;
    margin: 20px;
    display: flex;
    justify-content: center;
    cursor: pointer;
`

const Content = styled.div`
    width: 600px;
    background: white;
    margin: 5px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 100px;
    overflow: scroll;
    position: relative;
`
const Title = styled.div`
    font-size: 1.5rem;
    color: black;
    font-weight: bold;
    padding: 50px 0 10px 0;
`

const External = styled.div`
    width: 1.3rem;
    height: 1.3rem;
    background: url(${externalLink});
    background-size: contain;
    margin-left: 10px;
    cursor: pointer;
`

const PublishtAt = styled.div`
    color: gray;
`

const Image = styled.img`
    width: 500px;
    margin: 50px 0 10px 0;
`

const Description = styled.div`
 letter-spacing: 1px;   
 line-height: 1.5   ;
 padding: 50px 0 10px 0;
`

const NewsOriginalPage = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  margin: 50px 0 10px 0;
  background: #83c5be;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  padding: 10px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`

function ContentView(item) {
  const [setModal, modal] = useContext(ModalControl);


  function ModalClickHandler(e) {
    e.stopPropagation();
    const target = e.target.className;
    if (target.includes('Modal') || target.includes('Close')) {
      setModal(!modal)
    }
  }

  return (
    <Modal onClick={ModalClickHandler}>
      <Content onClick={ModalClickHandler}>
        <Close onClick={ModalClickHandler}></Close>
        <Title>
          {item.item[0].title}
        </Title>
        <PublishtAt>{item.item[0].publishedAt.substring(0, 10)}</PublishtAt>
        <Image src={`${item.item[0].urlToImage}`} />
        <Description>{item.item[0].description}</Description>
        <a target="_blank" rel="noreferrer" href={item.item[0].url}>
          <NewsOriginalPage>
            開啟新聞頁面
            <External />
          </NewsOriginalPage>
        </a>
      </Content>
    </Modal>
  )
}

export default ContentView;