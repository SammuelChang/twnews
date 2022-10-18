import styled from 'styled-components/macro'
import logo from '../../images/logo.png'
import list from '../../images/list.png'
import bricks from '../../images/bricks.png'

const Wrapper = styled.div`
width: 100%;
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
width: 300px;
height: 100%;
text-align: center;
`
const Personal = styled.div`
width: 10%;
display: flex;
align-items: center;
justify-content: flex-end;
margin-right: 15px;
position: absolute;
right: 0;
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
`

const Item = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
width: ${props => props.width};
font-weight: bold;
transition: all 0.2s ease-in-out;

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
  const newsCategories = ['商 業','娛 樂','生 活','健 康','科 學','科 技','運 動']

    return (
     <Wrapper>
        <LogoBar>
          <Logo />
          <Personal>
              <Item>🔍</Item>
              <Item>🔖</Item>
              <Item>👤</Item>
            </Personal>
        </LogoBar>
        <NavBar>
          <Category>
          {newsCategories.map((item, index) => 
            <Item key={index} style={{ fontSize: "1rem" }}>{item}</Item>)
          }
          <Item width="100px"/>
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