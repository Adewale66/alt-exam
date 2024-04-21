import app from './app.js';
import { config, logger } from './utils/config.js';

config.connectDB();

app.listen(config.PORT || 3000, () => {
    logger.info(`NODE_ENV=${config.env}`);
    logger.info(`server lsitening on http://localhost:${config.PORT}`);
});
