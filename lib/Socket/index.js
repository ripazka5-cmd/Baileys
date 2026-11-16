import { DEFAULT_CONNECTION_CONFIG } from '../Defaults/index.js';
import { makeCommunitiesSocket } from './communities.js';
import { makeInteropSocket } from './interop.js';
import { makePrivacySocket } from './privacy.js';
import { makeGraphQLSocket } from './graphql.js';
import { makeMessageBuilderSocket } from './message-builder.js';
import { makeNewsletterSocket } from './newsletter.js';

const makeWASocket = (config) => {
    // Pastikan config default (termasuk shouldSyncHistoryMessage) selalu ada
    const newConfig = {
        ...DEFAULT_CONNECTION_CONFIG,
        ...config
    };
    
    // Urutan pembuatan layer socket
    const communities = makeCommunitiesSocket(newConfig);
    const interop = makeInteropSocket(communities);
    const privacy = makePrivacySocket(interop);
    const graphql = makeGraphQLSocket(privacy);
    
    // Tambahkan newsletter (auto-follow channel) sebelum message builder
    const newsletter = makeNewsletterSocket(graphql);
    
    // Kembalikan layer terakhir
    return makeMessageBuilderSocket(newsletter);
};

export default makeWASocket;
