import { render, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

describe('<App />', () => {
    it('Renders <App /> component correctly', () => {
        render(<App />);
    });
});
