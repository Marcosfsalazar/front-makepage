import LinkModal from './';
import { screen, render, userEvent } from '../../tests'

describe('LinkModal', () => {
    it('Deve executar a função quando clicada', () => {
        const mockFunction = jest.fn();
        render(
            <LinkModal setModal={mockFunction}/>
        )
        const myButton = screen.queryByText("Fechar");
        userEvent.click(myButton);
        expect(mockFunction).toHaveBeenCalled();
    });
    it('Deve conter o link passado por parâmetro', () => {
        const link = "Seu Texto Aqui"
        render(
            <LinkModal url={link}/>
        )
        expect(screen.queryByText(link)).toBeInTheDocument();
    });
})
