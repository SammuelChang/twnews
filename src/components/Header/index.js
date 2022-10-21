import styled, { css } from 'styled-components/macro'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import logo from '../../images/logo.png'
import list from '../../images/list.png'
import bricks from '../../images/bricks.png'

const Wrapper = styled.div`
width: 100%;
padding-bottom: 10px;
`

const LogoBar = styled.div`
width: 100%;
height: 100px;
display: flex;
justify-content: center;
align-items: center;
`

const Logo = styled.div`
background: url(${logo})  no-repeat center center;
background-size: contain;
width: 500px;
height: 100px;
text-align: center;
`
const Personal = styled.div`
width: 10%;
display: flex;
align-items: center;
justify-content: space-evenly;
margin-right: 15px;
position: absolute;
right: 0;
`

const CheckButton = styled.button`
width: 100px;

&:last-child {
  margin-right: 30px;
}
`

const NavBar = styled.div`
width: 100%;
height: 40px;
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 20px;
`

const Category = styled.div`
width: 90%;
display: flex;
justify-content: space-evenly;
padding: 20px 0;
border-bottom: 1px solid #bfbcb4;
margin-right: 100px;
`

const Item = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 100px;
width: ${props => props.width};
transition: all 0.2s ease-in-out;
border-radius: 10px;
padding: 2.5px 5px;

${props => props.active && css`
color: white;
font-weight: 900;
background: #417449;
`}

&:hover{
  box-shadow: 0 0 11px rgba(33,33,33,.2); 
}
`

const SwitchContainer = styled.div`
width: 10%;
display: flex;
align-items: center;
justify-content: flex-end;
position: absolute;
right: 45px;
`

const SwitchMode = styled.button`
padding-right: 20px;
margin-top: 5px;
background: url(${props => props.img})  no-repeat center center;
background-size: contain;
height: 15px;
opacity: ${props => props.activate ? 1 : 0.5};

&:hover{
  opacity: 1;
}
`

function Header() {
  const newsCategories = [{ text: '商 業', param: 'business' },
  { text: '娛 樂', param: 'entertainment' },
  { text: '生 活', param: 'general' },
  { text: '健 康', param: 'health' },
  { text: '科 學', param: 'science' },
  { text: '科 技', param: 'technology' },
  { text: '運 動', param: 'sport' }]
  let { category } = useParams();

  return (
    <Wrapper>
      <LogoBar>
        <Link to='/'>
          <Logo />
        </Link>
        <Personal>
          <CheckButton>🔍</CheckButton>
          <CheckButton>🔖</CheckButton>
          <CheckButton>👤</CheckButton>
        </Personal>
      </LogoBar>
      <NavBar>
        <Category>
          {newsCategories.map((item, index) =>
            <Link to={`/${item.param}`} key={index} >
              <Item key={index} style={{ fontSize: "1.2rem" }} active={category === item.param}>
                {item.text}
              </Item>
            </Link>
          )}
          {/* <Item width="100px"/> */}
          <SwitchContainer>
            <SwitchMode title="列表模式" img={list}></SwitchMode>
            <SwitchMode title="圖磚模式" img={bricks} activate></SwitchMode>
          </SwitchContainer>
        </Category>
      </NavBar>
    </Wrapper>
  );
}

export default Header;