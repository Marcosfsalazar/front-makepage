import Outdoor from './';
import { screen, render, userEvent } from '../../tests'

describe('Outdoor', () => {
    it('Deve renderizar o texto passado como parâmetro', () => {
        const myText = "Hello World!"
        render(
            <Outdoor text={myText}/>
        )
        expect(screen.getByText(myText)).toBeInTheDocument();
    });

})
