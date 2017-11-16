/**
 * Created by jiangyukun on 2017/11/16.
 */
import React from 'react'
import classnames from 'classnames'
import HighLight from '../../components/HighLight'

interface DiseaseCategoryProps {
  current: string
  onSelectDiseaseChange: (diseaseId) => void
  category: any
  searchKey: string
}

class DiseaseCategory extends React.Component<DiseaseCategoryProps> {
  state = {
    open: false
  }

  render() {
    let {category, current} = this.props
    let diseaseList = category['indication'] || []
    if (this.props.searchKey) {
      diseaseList = diseaseList.filter(item => item['indication_name'].indexOf(this.props.searchKey) != -1)
    }
    if (diseaseList.length == 0) {
      return null
    }
    return (
      <div className="disease-category">
        <header className={classnames('disease-header', {'open': this.state.open})} onClick={() => this.setState({open: !this.state.open})}>
          {category['name']}
        </header>
        {
          this.state.open && (
            <div className="disease-body">
              {
                diseaseList.map(disease => {
                  const diseaseId = disease['indication_id']
                  return (
                    <div
                      key={diseaseId}
                      className={classnames('disease-item', {'selected': current == diseaseId})}
                      onClick={() => this.props.onSelectDiseaseChange(current == diseaseId ? '' : diseaseId)}
                    >
                      <HighLight txt={disease['indication_name']} match={this.props.searchKey}/>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </div>
    )
  }
}

export default DiseaseCategory
