import React from 'react';
import 'icheck/skins/all.css';
import { Link } from 'react-router-dom';

const LoanRow = (props) => {
  const { single_case, anomaly_card } = props;

  return (
    <tr>
        <td>
            <Link onClick={anomaly_card.setState({selectedCd: single_case.ngr_code})} to={anomaly_card}>
                {single_case.ngr_code}</Link>
        </td>
        <td className="text-center">{single_case.num_events}</td>
    </tr>
  );
};

export default LoanRow;
