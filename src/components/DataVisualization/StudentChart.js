import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  LineChart,
  Line,
  Label,
  YAxis,
  Tooltip,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from 'recharts';

const StudentChart = ({ feedback }) => {
  const feedbackData = feedback.feedback.map(el => ({
    rating: el.rating,
    time: el.appointment_datetime,
  }));
  const formatXAxis = tick =>
    moment(new Date(tick)).format('MMMM Do YYYY');
  const CustomTooltip = props => {
    if (props.active) {
      return (
        <div>
          <p style={{ width: '100px' }}>
            {`You received a rating of ${
              props.payload[0].payload.rating
            } for your coaching session on ${moment(
              new Date(props.label),
            ).format('MMMM Do YYYY')}.`}
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <ResponsiveContainer height='100%'>
      <LineChart width={800} height={400} data={feedbackData}>
        <Line
          type='monotone'
          dataKey='rating'
          stroke='#4fad65'
          strokeWidth={2}
          fill='#4fad65'
        />
        <CartesianGrid stroke='ccc' />
        <XAxis tickFormatter={formatXAxis} dataKey='time'></XAxis>
        <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]}>
          {
            <Label
              value='Rating'
              position='insideLeft'
              offset={-6}
              style={{ fill: 'grey' }}
            />
          }
        </YAxis>
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};
const mapStateToProps = state => ({
  feedback: state.feedbackReducer,
});
export default connect(mapStateToProps)(StudentChart);
