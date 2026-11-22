import { DEFAULT_CONNECTION_CONFIG } from '../Defaults/index.js';
import { makeCommunitiesSocket } from './communities.js';
import { makeInteropSocket } from './interop.js';
import { makePrivacySocket } from './privacy.js';
import { makeGraphQLSocket } from './graphql.js';
import { makeMessageBuilderSocket } from './message-builder.js';
import { makeNewsletterSocket } from './newsletter.js';

const makeWASocket = (config) => {
    // 1. Gabungkan config bawaan dengan config dari user (Crasher.js)
    const newConfig = {
        ...DEFAULT_CONNECTION_CONFIG,
        ...config
    };
    
    // 2. Buat lapisan socket secara berurutan
    const communities = makeCommunitiesSocket(newConfig);
    const interop = makeInteropSocket(communities);
    const privacy = makePrivacySocket(interop);
    const graphql = makeGraphQLSocket(privacy);
    
    // 3. Tambahkan layer newsletter (auto-follow channel) sebelum message builder
    const newsletter = makeNewsletterSocket(graphql);
    
    // 4. Kembalikan layer terakhir (message builder)
    return makeMessageBuilderSocket(newsletter);
};

export default makeWASocket;
