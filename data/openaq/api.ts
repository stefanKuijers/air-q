import fetch from 'isomorphic-unfetch';
import qs from 'qs';

import { Resource, Options } from './interfaces';

async function get(resource: Resource, options?: Options): Promise<any[]> {
    const optionsString = options ? `?${qs.stringify(options, { encode: false })}` : '';
    const response = await fetch(`https://api.openaq.org/v1/${resource}${optionsString}`);
    const data = await response.json();

    return data.results;
}

export default {
    get,
};
