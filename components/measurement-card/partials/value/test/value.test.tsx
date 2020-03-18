import { render, RenderResult } from '@testing-library/react';
import React from 'react';

import Value from '../Value';

const DOM = {
    root: 'tclass-value',
    value: 'tclass-value-value',
    label: 'tclass-value-label',
};

const defaultProps = {
    label: 'Test Label',
    value: 123,
};

const setup = (component: React.ReactElement): RenderResult => {
    const tree = render(component);
    return {
        ...tree,
    };
};

describe('<Value />', () => {
    it('gets rendered to the DOM', async () => {
        const { container } = setup(<Value {...defaultProps} />);
        expect(container.getElementsByClassName(DOM.root).length).toBe(1);
    });

    it('prints the label', async () => {
        const { container } = setup(<Value {...defaultProps} />);
        expect(container.getElementsByClassName(DOM.label)[0].innerHTML).toBe(defaultProps.label);
    });

    it('prints the value', async () => {
        const { container } = setup(<Value {...defaultProps} />);
        expect(container.getElementsByClassName(DOM.value)[0].innerHTML).toBe(defaultProps.value.toString());
    });
});
