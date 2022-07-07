import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Note from './Note';


describe('find rendered elements', () => {

    test('by using toBeDefined method', () => {
        const note = {
            content: 'Component testing is done with react-testing-library',
            important: true
        };

        render(<Note note={note} />);

        screen.debug();

        const element = screen.getByText('Component testing is done with react-testing-library');
        expect(element).toBeDefined();
    });


    test('by using querySelector method', () => {
        const note = {
            content: 'Component testing is simplifies our workflow',
            important: false
        };

        const { container } = render(<Note note={note} />);

        const div = container.querySelector('.note');
        screen.debug(div);
        expect(div).toHaveTextContent('Component testing is simplifies our workflow');
    });

    test('does not render this', () => {
        const note = {
            content: 'This is a reminder',
            important: true
        };

        render(<Note note={note}/>);

        const element = screen.queryByText('do not want this thing to be rendered');
        expect(element).toBeNull();

    });
});


describe('clicking the button', () => {

    test('clicking the button calls event handler once', async () => {
        const note = {
            content: 'Component testing is done with react-testing-library',
            important: true
        };

        const mockHandler = jest.fn();

        render(
            <Note note={note} toggleImportance={mockHandler} />
        );

        const button = screen.getByText('make not important');
        userEvent.click(button);
        expect(mockHandler.mock.calls).toHaveLength(1);
    });

});
