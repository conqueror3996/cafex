import { Subject } from 'rxjs';

class GService {
    urlParamMap = {};
    isMock = false;
    connectCount = 0;
    loadingCount = 0;
    loadingCountSubject = new Subject();

    envType = '';
    orgCd = '';
    sessionInfo;
    topic;

    appConfig;
    envConfig;
    agentConfig;
    consumerConfig;

    receiver = new Subject();
    connectionType = 'dial' | 'code' | 'code2';

    constructor() {
        window['receiver'] = this.receiver;
        this.receiver.subscribe(res => {
            console.log('SUBSCRIBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
            console.log(res);
        })
    }
}

export default new GService();