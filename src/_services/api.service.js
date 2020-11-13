import config from 'config';
// import { authHeader, allAPI, auth } from '../_helpers';
import axios from "axios";

export default {
    loadConfig,
    loadEnvConfig,
    loadAgentConfig
};

function loadConfig(orgCd) {
    console.log("into loadConfig", window.location.origin);
    return axios.get(`static/params/${orgCd}/config-app.json`, { baseURL: window.location.origin});
}

function loadEnvConfig(envType) {
    return axios.get(`static/config/env/config-${envType}.json`, { baseURL: window.location.origin});
}

function  loadAgentConfig(orgCd) {
  return axios.get(`static/params/${orgCd}/config-agent.json`, { baseURL: window.location.origin});
}