/**
 * Created by jiangyukun on 2017/10/26.
 */
function getActionTypeFn(prefix) {
  return function (type) {
    return prefix + '__' + type
  }
}

function generatorValueFromKey(prefix: string, obj: object): void {
  let typeFn = getActionTypeFn(prefix)
  Object.keys(obj).forEach(key => obj[key] = typeFn(key))
}

export const APP = {
  FETCH_DISEASE_CATEGORY: null,
  ADD_SEARCH_RECORD: null,
  SEARCH_FROM_HISTORY: null,
  FETCH_PROVINCE_CITY: null,
}


generatorValueFromKey('APP', APP)
