import config from 'config';
// import { authHeader, allAPI, auth } from '../_helpers';
import axios from "axios";

export default {
    loadConfig,
    loadEnvConfig,
    loadAgentConfig
};

function loadConfig(orgCd) {
    console.log("into loadConfig");
    return axios.get(`static/params/${orgCd}/config-app.json`, { baseURL: config.apiInternalUrl});
}

function loadEnvConfig(envType) {
    return axios.get(`static/config/env/config-${envType}.json`, { baseURL: config.apiInternalUrl});
}

function  loadAgentConfig(orgCd) {
  return axios.get(`static/params/${orgCd}/config-agent.json`, { baseURL: config.apiInternalUrl});
}