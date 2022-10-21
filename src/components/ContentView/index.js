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
    display: inline-block;
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

function ContentView(item) {
  const [setModal, modal] = useContext(ModalControl);

  return (
    <Modal onClick={() => setModal(!modal)}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Close onClick={() => setModal(!modal)}></Close>
        <Title>
          {item.item[0].title}
          <a style={{ display: 'inline' }} target="_blank" href={item.item[0].url}><External /></a>
        </Title>
        <PublishtAt>{item.item[0].publishedAt.substring(0, 10)}</PublishtAt>
        <Image src={`${item.item[0].urlToImage}`} />
        <Description>{item.item[0].description}</Description>
      </Content>
    </Modal>
  )
}

export default ContentView;