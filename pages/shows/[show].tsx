import { NextPage } from 'next';
import fetch from 'isomorphic-unfetch';

import Layout from '../../components/Layout';

interface Props {
    name: string;
    summary: string;
    image: {
        medium: string;
    };
}

const Show: NextPage<Props> = (props: Props) => {
    return (
        <Layout>
            <h1>{props.name}</h1>
            <p>{props.summary.replace(/<[/]?[pb]>/g, '')}</p>
            {props.image ? <img src={props.image.medium} /> : null}
        </Layout>
    );
};

Show.getInitialProps = async function(context): Promise<Props> {
    const { show } = context.query;
    const res = await fetch(`https://api.tvmaze.com/shows/${show}`);
    const details = await res.json();

    console.log('details', details.name);

    return {
        name: details.name,
        summary: details.summary,
        image: details.image,
    };
};

export default Show;
