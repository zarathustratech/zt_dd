import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageTitle from './PageTitle';
import {
  AnomaliaCard, LoansTableCard,
} from './_cards';


class PortfolioDashboard extends Component {
  constructor(props) {
    super(props);
    this.onLoanClicked = this.onLoanClicked.bind(this);
    this.onBoundsChange = this.onBoundsChange.bind(this);
  }

  state = {
    filterBounds: {},
      selectedCode: 0,
  }

  onLoanClicked(e){
    const loanCode = Number.parseInt(e.target.innerText);
    console.log("This is the selected code: " + loanCode);
    this.setState({ selectedCode: loanCode });
  }

  onBoundsChange(bounds) {
    this.setState({ filterBounds: bounds });
  }

  render() {
    const { portfolio } = this.props;

    if (portfolio === undefined || portfolio === null || portfolio === {}) {
      return (
        <div className="my-3 my-md-5">
          <div className="container">
            <h1>
              Loading data ...
            </h1>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <PageTitle title={portfolio.name} subtitle={portfolio.code} />
        <div className="row row-cards">
          <div className="col-3">
            <LoansTableCard updateLoanCode={this.onLoanClicked}/>
          </div>
          <div className="col-9">
            <AnomaliaCard selectedCd={this.state.selectedCode} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { detailPortfolio, detailLoading } = state.portfolio;
  return {
    portfolio: detailPortfolio,
    loading: detailLoading,
  };
}

export default connect(mapStateToProps)(PortfolioDashboard);
