import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { employees } from './employee.module';
import { consumers } from './consumer.module';
import { files } from './files.module';
import { service } from './service.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        employees,
        consumers,
        files,
        service
        // changePasswordState: false,
    }
});
