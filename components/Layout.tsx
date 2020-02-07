import { ReactNode } from 'react';

import Header from './Header';

interface Props {
    children: ReactNode;
}

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD',
};

const Layout: React.FunctionComponent<Props> = (props: Props) => (
    <div style={layoutStyle}>
        <Header />

        {props.children}
    </div>
);

export default Layout;
