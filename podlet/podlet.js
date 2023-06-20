const {startPodService, Options} = require("@fintlabs/fint-podium-react-podlet");
const packageJson = require("./package.json");
const PODLET_NAME = process.env.PODLET_NAME || packageJson.name;
const PODLET_PORT = process.env.PODLET_PORT || '7100'
const IS_DEVELOPMENT = process.env.IS_DEVELOPMENT || false;
const ENVIRONMENT = process.env.ENVIRONMENT || 'missing-environment';

startPodService(new Options(PODLET_NAME, ENVIRONMENT, PODLET_PORT, IS_DEVELOPMENT), `${__dirname}/asset-manifest.json`);