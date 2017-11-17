/**
 * Created by jiangyukun on 2017/11/16.
 */
import $ from 'jquery'

import {THREE_PHASE} from '../middlewares/request_3_phase'
import {APP} from '../core/constants/types'
import {_get, _post} from '../core/http'
import getAes from './aes'
import {host} from '../core/env'

export function fetchDiseaseCategory() {
  return {
    [THREE_PHASE]: {
      type: APP.FETCH_DISEASE_CATEGORY,
      http: () => _get('/index.php/api/wechat/get_disease_class?token=' + getAes()),
      handleResponse: data => data
    }
  }
}

export function fetchProvinceCity() {
  return {
    [THREE_PHASE]: {
      type: APP.FETCH_PROVINCE_CITY,
      http: () => _get('/index.php/api/wechat/get_area_list?token=' + getAes()),
      handleResponse: data => data
    }
  }
}

export function fetchTrailList(options) {
  return {
    [THREE_PHASE]: {
      type: APP.FETCH_TRAIL_LIST,
      http: () => _post('/index.php/api/wechat/get_trials_detail?token=' + getAes(), {body: options, type: 'text'}),
      handleResponse: data => data
    }
  }
}

export function leaveMessage(content, contactInfo) {
  const options = {
    "msg_content": content,
    "user_contact": contactInfo
  }
  return {
    [THREE_PHASE]: {
      type: APP.LEAVE_MESSAGE,
      http: () => _post('/index.php/api/wechat/send_message?token=' + getAes(), {body: options, type: 'text'}),
      handleResponse: data => data
    }
  }
}
