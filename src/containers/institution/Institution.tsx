/**
 * Created by jiangyukun on 2017/11/16.
 */
import React from 'react'
import {connect} from 'react-redux'
import Spinner from 'app-core/common/Spinner'

import Data from '../../interfaces/Data'
import RouteComponent from '../../interfaces/RouteComponent'
import {fetchTrailList, fetchDiseaseCategory, fetchProvinceCity} from '../../commons/app.action'
import List from '../../interfaces/List'

interface InstitutionProps extends RouteComponent {
  fetchTrailList: (page, pageSize, options) => void
  trailList: List<any>
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
  page = 0
  isFetching = false

  state = {
    medicineName: '',
    sponsor: '',
    indication: ''
  }

  fetchTrail = () => {
    this.props.fetchTrailList(this.page, 10, {
      "page": this.page,
      "pagesize": 10,
      "disease_id": this.categoryId,
      "indication_id": this.diseaseId,
      /*"province_id": provinceId,
      "city_id": cityId*/
    })
  }

  leaveMessage = () => {
    this.props.history.push('/leave-message')
  }

  handleScroll = () => {
    let body = document.body
    let scrollHeight = body.scrollHeight
    let scrollTop = document.documentElement.scrollTop || body.scrollTop
    if (window.screen.availHeight + scrollTop >= scrollHeight) {
      if (this.isFetching) return
      if (this.props.trailList.hasMore) {
        this.isFetching = true
        this.page++
        this.fetchTrail()
      }
    }
  }

  componentWillMount() {
    const {match} = this.props
    let {categoryId, diseaseId, provinceId, cityId} = match.params
    if (provinceId == 'null') provinceId = ''
    if (cityId == 'null') cityId = ''

    this.categoryId = categoryId
    this.diseaseId = diseaseId
    this.provinceId = provinceId
    this.cityId = cityId
  }

  search = () => {
    this.page = 0
    this.fetchTrail()
  }

  componentDidMount() {
    this.fetchTrail()
    if (!this.props.diseaseCategory.loaded) {
      this.props.fetchDiseaseCategory()
    }
    if (!this.props.provinceCity.loaded) {
      this.props.fetchProvinceCity()
    }

    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillReceiveProps(nextProps: InstitutionProps) {
    if (!this.props.trailList.loaded && nextProps.trailList.loaded) {
      this.isFetching = false
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const diseaseCategory = this.props.diseaseCategory.data || []
    const provinceCity = this.props.provinceCity.data || []
    let categoryName = '', provinceName = '', cityName = ''
    let match = diseaseCategory.find(c => c['id'] == this.categoryId)
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

    let list = this.props.trailList.list

    return (
      <div className="institution-page">
        <div className="disease-and-area">
          <div>{categoryName}</div>
          <div className="area">{provinceName}{cityName}</div>
        </div>
        <div className="search-box">
          <div className="item medicine-name">
            <label>药物名称</label>
            <input value={this.state.medicineName} onChange={e => this.setState({medicineName: e.target.value})}/>
            <button onClick={this.search}>查询</button>
          </div>
          <div className="item sponsor">
            <label>申办者</label>
            <input value={this.state.sponsor} onChange={e => this.setState({sponsor: e.target.value})}/>
          </div>
          <div className="item indication">
            <label>适应症</label>
            <input value={this.state.indication} onChange={e => this.setState({indication: e.target.value})}/>
          </div>
        </div>

        {
          this.props.trailList.loading && (
            <div className="loading-ui">
              <Spinner/>
            </div>
          )
        }

        <div className="trail-list">
          {
            list.map((item, index) => {
              return (
                <div key={index} className="trail-item">
                  <header>{item['involved_name']}：</header>
                  <div className="trail-item-body">
                    <div className="body-item">
                      主要研究者：{item['researcher_name']}
                    </div>
                    <div className="body-item">
                      试验状态：{item['sinfo']}
                    </div>
                    <div className="body-item">
                      申办者：{item['sponsor_name']}
                    </div>
                    <div className="body-item">
                      联系电话：{item['contact_mobile']}
                    </div>
                  </div>
                </div>
              )
            })
          }

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
