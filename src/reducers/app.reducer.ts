/**
 * Created by jiangyukun on 2017/8/2.
 */
import {fromJS} from 'immutable'
import {APP} from '../core/constants/types'

const initValue = {
  diseaseSearchKey: ''
}

export default function app(iState = fromJS(initValue), action) {
  let nextIState = iState

  switch (action.type) {
    case APP.ADD_SEARCH_RECORD:
      let searchKey = action.searchKey
      nextIState = nextIState.set('diseaseSearchKey', searchKey)
      break
    case APP.SEARCH_FROM_HISTORY:
      let historyName = action.historyName
      nextIState = nextIState.set('diseaseSearchKey', historyName)
      break
  }

  return nextIState
}
