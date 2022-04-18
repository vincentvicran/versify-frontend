import { render, cleanup } from '@testing-library/react';
import Login from './login';
afterEach(cleanup);

describe('<Login />', () => {
    it('Renders <Login /> component correctly', async () => {
        await render(<Login />);
    });
});

test('submits username', async () => {
    // ARRANGE
    const username = 'myusername';
    const mockLogin = jest.fn();

    render(<Login onSubmit={mockLogin(username)} />);
});
