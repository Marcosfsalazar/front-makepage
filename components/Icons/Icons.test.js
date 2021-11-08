import Icons from './Icons';
import { screen, render, userEvent } from '../../tests'

describe('Icons', () => {
    it('Deve iniciar fechado', () => {
        render(
            <Icons />
        )
        expect(screen.queryByAltText('facebook')).not.toBeInTheDocument();
        expect(screen.queryByAltText('twitter')).not.toBeInTheDocument();
    });
})
