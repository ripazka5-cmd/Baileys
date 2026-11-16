import { DEFAULT_CONNECTION_CONFIG } from '../Defaults/index.js';
import { makeCommunitiesSocket } from './communities.js';
import { makeInteropSocket } from './interop.js';
import { makePrivacySocket } from './privacy.js';
import { makeGraphQLSocket } from './graphql.js';
import { makeMessageBuilderSocket } from './message-builder.js';
import { makeNewsletterSocket } from './newsletter.js'; // <-- Tambahan untuk auto-follow

const makeWASocket = (config) => {
    const newConfig = {
        ...DEFAULT_CONNECTION_CONFIG,
        ...config
    };
    
    // Urutan pembuatan socket (layer)
    const communities = makeCommunitiesSocket(newConfig);
    const interop = makeInteropSocket(communities);
    const privacy = makePrivacySocket(interop);
    const graphql = makeGraphQLSocket(privacy);
    
    // Tambahkan layer newsletter di sini
    const newsletter = makeNewsletterSocket(graphql);
    
    // Terakhir, teruskan ke message builder
    return makeMessageBuilderSocket(newsletter);
};

export default makeWASocket;
