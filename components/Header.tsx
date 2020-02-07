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
        <Link href="/about">
            <a style={linkStyle}>About</a>
        </Link>
        <Link href="/blog">
            <a style={linkStyle}>Blog</a>
        </Link>
        <Link href="/shows">
            <a style={linkStyle}>Shows</a>
        </Link>
        <Link href="/inspiration">
            <a style={linkStyle}>Inspiration</a>
        </Link>
    </div>
);

export default Header;
