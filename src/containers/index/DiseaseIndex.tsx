/**
 * Created by jiangyukun on 2017/11/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import DiseaseCategory from './DiseaseCategory'
import SelectProvinceCity from './SelectProvinceCity'

import Data from '../../interfaces/Data'
import {fetchDiseaseCategory} from '../../commons/app.action'

interface DiseaseIndexProps {
  fetchDiseaseCategory: () => void
  diseaseCategory: Data<any>
  diseaseSearchKey: string
}

class DiseaseIndex extends React.Component<DiseaseIndexProps> {
  static contextTypes = {
    router: PropTypes.any
  }

  state = {
    categoryId: '',
    diseaseId: '',
    showSelectCity: false
  }

  handleSearch = () => {
    this.context.router.history.push('/search')
  }
  handleDiseaseChange = (categoryId, diseaseId) => {
    this.setState({categoryId, diseaseId})
  }

  componentDidMount() {
    this.props.fetchDiseaseCategory()
  }

  render() {
    let diseaseCategory = this.props.diseaseCategory.data || []
    return (
      <div className="index">
        {
          this.state.showSelectCity && (
            <SelectProvinceCity
              categoryId={this.state.categoryId}
              diseaseId={this.state.diseaseId}
              onExited={() => this.setState({showSelectCity: false})}
            />
          )
        }
        <div className="answerBox">
          <div className="answer">
            <div className="icon">
              <img className="mg" src={require('../../imgs/magnifier.png')} alt=""/>
            </div>
            <input className="ipt"
                   placeholder="输入关键词"
                   type="search"
                   onFocus={this.handleSearch}
                   defaultValue={this.props.diseaseSearchKey}
            />
          </div>
        </div>
        <div className="bannerBox">
          <img className="banner" src={require('../../imgs/banner.png')}/>
        </div>
        <div className="disease-category-container">
          {
            diseaseCategory.map(category => {
              return (
                <DiseaseCategory key={category['id']}
                                 category={category}
                                 current={this.state.diseaseId}
                                 onSelectDiseaseChange={(diseaseId) => this.handleDiseaseChange(category['id'], diseaseId)}
                                 searchKey={this.props.diseaseSearchKey}
                />
              )
            })
          }
        </div>
        {
          this.state.diseaseId && (
            <button className="next-step" onClick={() => this.setState({showSelectCity: true})}>下一步</button>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    diseaseCategory: state.diseaseCategory,
    diseaseSearchKey: state.app.diseaseSearchKey
  }
}

export default connect(mapStateToProps, {fetchDiseaseCategory})(DiseaseIndex)
