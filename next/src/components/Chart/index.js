import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import PropTypes from 'prop-types';

export default function Chart({ data }) {
  const [dataKey, lineFirst, lineSecond] = Object.keys(data[0]).map(
    (key) => key,
  );

  return (
    <LineChart
      height={500}
      width={900}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={dataKey} stroke="#fff" />
      <YAxis stroke="#fff" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={lineFirst} stroke="#fff" strokeWidth={3} />
      <Line
        type="monotone"
        dataKey={lineSecond}
        stroke="#dd7e42"
        strokeWidth={3}
      />
    </LineChart>
  );
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
