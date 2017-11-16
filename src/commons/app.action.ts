/**
 * Created by jiangyukun on 2017/11/16.
 */
import {THREE_PHASE} from '../middlewares/request_3_phase'
import {APP} from '../core/constants/types'
import {_get} from '../core/http'
import getAes from './aes'

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
