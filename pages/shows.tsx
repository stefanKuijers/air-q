import { NextPage } from 'next';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout';

interface ShowLinkProps {
    show: Show;
}

interface Show {
    id: string;
    name: string;
}

interface Props {
    shows: Show[];
}

const ShowLink: React.FC<ShowLinkProps> = ({ show }: ShowLinkProps) => (
    <li key={show.id}>
        <Link href="/shows/[show]" as={`/shows/${show.id}`}>
            <a>{show.name}</a>
        </Link>
        <style jsx>{`
            li {
                list-style: none;
                margin: 5px 0;
            }

            a {
                text-decoration: none;
                color: blue;
                font-family: 'Arial';
            }

            a:hover {
                opacity: 0.6;
            }
        `}</style>
    </li>
);

const Shows: NextPage<Props> = (props: Props) => (
    <Layout>
        <h1>Shows</h1>
        <ul>
            {props.shows.map(show => (
                <ShowLink key={show.id} show={show} />
            ))}
        </ul>
        <style jsx>{`
            h1 {
                font-family: 'Arial';
            }

            ul {
                padding: 0;
            }
        `}</style>
    </Layout>
);

Shows.getInitialProps = async function(): Promise<Props> {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=chef');
    const data = await res.json();

    console.log(`Show data fetched. Count: ${data.length}`);

    return {
        shows: data.map((entry: any) => entry.show),
    };
};

export default Shows;
