import ShareButton from './';
import { screen, render, userEvent } from '../../tests'

describe('ShareButton', () => {
    it('Deve renderizar o texto passado como parâmetro', () => {
        const myText = "https://web.whatsapp.com/send?text=Acesse o site de nome: link"
        render(
            <ShareButton pagetype="site" name="nome" link="link"/>
        )
        expect(screen.getByRole('link').closest('a')).toHaveAttribute('href',myText);
    });

})
