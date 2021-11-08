import Button from './index';
import { screen, render, userEvent } from '../../tests'

//UTILS

describe('Button', () => {
    it('deve conter o texto passado como filho ao componente', () => {
        render(
            <Button>Clique aqui</Button>
        )
        expect(screen.queryByText('Clique aqui')).toBeInTheDocument();
    });
    it('deve executar a função passada', () => {
        const mockFunc = jest.fn();
        render(
            <Button onClick={mockFunc}>Clique aqui</Button>
        )
        const myButton = screen.getByText('Clique aqui')
        userEvent.click(myButton)
        expect(mockFunc).toHaveBeenCalled();
    });
})
