/**
 * Created by jiangyukun on 2017/11/16.
 */
import React from 'react'
import {connect} from 'react-redux'

import Data from '../../interfaces/Data'
import RouteComponent from '../../interfaces/RouteComponent'
import {fetchTrailList, fetchDiseaseCategory, fetchProvinceCity} from '../../commons/app.action'

interface InstitutionProps extends RouteComponent {
  fetchTrailList: (options) => void
  trailList: Data<any>
  fetchDiseaseCategory: () => void
  diseaseCategory: Data<any>
  fetchProvinceCity: () => void
  provinceCity: Data<any>
}

class Institution extends React.Component<InstitutionProps> {
  categoryId: string
  diseaseId: string
  provinceId: string
  cityId: string

  fetchTrail = () => {
    const {match} = this.props
    let {categoryId, diseaseId, provinceId, cityId} = match.params
    if (provinceId == 'null') provinceId = ''
    if (cityId == 'null') cityId = ''

    this.categoryId = categoryId
    this.diseaseId = diseaseId
    this.provinceId = provinceId
    this.cityId = cityId

    this.props.fetchTrailList({
      "page": 0,
      "pagesize": 10,
      "disease_id": categoryId,
      "indication_id": diseaseId,
      /*"province_id": provinceId,
      "city_id": cityId*/
    })
  }

  leaveMessage = () => {
    this.props.history.push('/leave-message')
  }

  componentDidMount() {
    this.fetchTrail()
    if (!this.props.diseaseCategory.loaded) {
      this.props.fetchDiseaseCategory()
    }
    if (!this.props.provinceCity.loaded) {
      this.props.fetchProvinceCity()
    }
  }

  render() {
    const diseaseCategory = this.props.diseaseCategory.data || []
    const provinceCity = this.props.provinceCity.data || []
    let categoryName = '', provinceName = '', cityName = ''
    let match = diseaseCategory.find(c => c['id'] = this.categoryId)
    if (match) {
      categoryName = match['name']
    }
    if (this.provinceId) {
      let matchProvince = provinceCity.find(p => p['province_id'] == this.provinceId)
      if (matchProvince) {
        provinceName = matchProvince['alias_name']
        if (this.cityId) {
          cityName = matchProvince.city.find(c => c['city_id'] == this.cityId)['city_name']
        }
      }

    }

    return (
      <div className="institution-page">
        <div className="disease-and-area">
          <div>{categoryName}</div>
          <div className="area">{provinceName}{cityName}</div>
        </div>
        <div className="search-box">
          <div className="item medicine-name">
            <label>药物名称</label>
            <input/>
            <button>查询</button>
          </div>
          <div className="item sponsor">
            <label>申办者</label>
            <input/>
          </div>
          <div className="item indication">
            <label>适应症</label>
            <input/>
          </div>
        </div>

        <div className="trail-list">
          <div className="trail-item">
            <header>机构名称：</header>
            <div className="trail-item-body">
              <div className="body-item">
                主要研究者：Ant Design
              </div>
              <div className="body-item">
                实验状态：临床三期
              </div>
              <div className="body-item">
                申办者：上海谷物生物科技有限责任公司
              </div>
              <div className="body-item">
                联系电话：0241-8897346
              </div>
            </div>
          </div>
        </div>
        <div className="leave-message">
          <button onClick={this.leaveMessage}>留言</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    trailList: state.trailList,
    diseaseCategory: state.diseaseCategory,
    provinceCity: state.provinceCity
  }
}

export default connect(mapStateToProps, {fetchTrailList, fetchDiseaseCategory, fetchProvinceCity})(Institution)
