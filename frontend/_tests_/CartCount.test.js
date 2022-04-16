import {render} from '@testing-library/react'

import CartCount from '../components/CartCount'
import wait from 'waait'

import { MockedProvider } from '@apollo/react-testing'
import { screen } from '@testing-library/react'


describe('<CartCount/>',()=>{

    it ('works as expect',()=> {

            render (<CartCount count={10}/>)
    });

    it ('match the snapshot', ()=>{

        const { container} =  render (<CartCount count={11}/>);
        expect (container).toMatchSnapshot()
    });

    it ('update via prop', async ()=>{
        const { container, rerender,debug} =  render (<CartCount count={11}/>);
        expect (container.textContent).toBe('11');
        rerender(<CartCount count={15}/>);
        await wait(500);

        expect (container.textContent).toBe('15');
        debug()
    })

})