import {
	STORE_HOME_INFO,

} from './mutation-types.js'

import {
	setStore,
	getStore,
} from '../utils/mUtils'

export default {
	[STORE_HOME_INFO](state, home_page_info) {
		state.home_page = home_page_info;
	}

}
