const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const migrate = require('./database/migrate')

module.exports = (phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        migrate()
    }

    return {
        ...defaultConfig,
        reactStrictMode: true,
        env: {
            basePath: __dirname,
        },
    }
}
