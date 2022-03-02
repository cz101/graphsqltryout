import Link from 'next/link'
import styled from 'styled-components'
import Nav from './Nav'


const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: red;
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var (--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-self: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var (--black, black);
  }
`


export default function Header(){
    return (
        <HeaderStyles>
            <div className = "bar">
             <Logo>
               <Link href="/">sick fits</Link> 
             </Logo> 
            </div>
            
            <div className = "sub-bar">            
                <p>Search</p>
            </div>
           <Nav/>
        </HeaderStyles>
    )

}