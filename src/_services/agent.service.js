import axios from "axios";
import apiService from './api.service'
import qs from 'querystring'

class AgentService {
    agentInfo = {};
    callObj = {};
    gService;

    init(gService) {
        this.gService = gService;
        apiService.loadAgentConfig(this.gService.orgCd).then(res => this.gService.agentConfig = res.data);
    }

    makeAgentSession(inDto) {
      console.log(this.gService)
      console.log(inDto)
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'allowedOrigins' : ["*"]
        }
      };
      
      return axios.post(`${this.gService.envConfig.cafexDomain}/assistserver/agent`, qs.stringify(inDto), config).then(res => {
        this.agentInfo = res.data;
        return res.data;
      });
    }
    startWithExistingShortCode(shortCode){
      return axios.get(`${this.gService.envConfig.cafexDomain}/assistserver/shortcode/agent?appkey=${shortCode}`).then(res => {
        return res.data;
      });
    };
    startWithExistingShortCode2(shortCode) {
      return axios.get(`${this.gService.envConfig.ownAppDomain}/cafe-meet/v1/agent/json/ShortCode-occupy?shortCode=${shortCode}`).then(res => {
        return res.data;
      });
    };
}

export default new AgentService();