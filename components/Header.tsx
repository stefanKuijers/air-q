import Link from 'next/link';
import React from 'react';

const linkStyle = {
    marginRight: 15,
};

const Header: React.FunctionComponent = () => (
    <div>
        <Link href="/">
            <a style={linkStyle}>Home</a>
        </Link>
    </div>
);

export default Header;
