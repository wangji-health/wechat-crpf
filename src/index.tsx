/**
 * Created by jiangyukun on 2017/11/16.
 */
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {HashRouter, Route, Redirect} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'

import 'app-core/style/index.scss'
import './commons/common.scss'
import './containers/index/disease-index.scss'
import './containers/index/disease-index1.scss'
import './containers/search/search-page.scss'
import './containers/institution/institution.scss'

import DiseaseIndex from './containers/index/DiseaseIndex'

import request_3_phase from './middlewares/request_3_phase'
import search_to_storage from './middlewares/search_to_storage'

import allReducers from './reducers/index.reducer'
import Search from './containers/search/Search'
import Institution from './containers/institution/Institution'

const searchRecordList = JSON.parse(localStorage.getItem('search-list'))

const store = createStore(allReducers, {searchRecordList}, applyMiddleware(request_3_phase, search_to_storage))

class Root extends React.Component<any> {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
            <Route exact path="/" component={DiseaseIndex}/>
            <Route exact path="/index" component={DiseaseIndex}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/institution/:categoryId/:diseaseId/:provinceId/:cityId" component={Institution}/>
          </div>
        </HashRouter>
      </Provider>
    )
  }
}

render(<Root/>, document.querySelector('#root'))
