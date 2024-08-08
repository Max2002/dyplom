import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import convertXLS from '@/utils/convertXLS';
import { Table, Cell, Row } from '@/components/Schedule/styled';

export default function Schedule({ url, headers, rowSpan, empty }) {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    if (url) {
      const callback = (convertFile) => {
        setSchedule(convertFile.filter((el) => el.length > 0));
      };

      convertXLS(url, callback);
    }
  }, [url]);

  return (
    <Table>
      {schedule.map((row, indexRow) => (
        <Row index={indexRow < headers}>
          {row.map((cell, indexCell) => (
            <Cell
              rowSpan={rowSpan && indexCell === 0 ? 2 : undefined}
              back={indexRow % 2 !== 0 && indexCell !== 0}
              textShadow={indexRow < headers}
              fontWeight={cell.length === 1}
            >
              {cell !== '`' && !empty.includes(indexRow) && cell}
            </Cell>
          ))}
        </Row>
      ))}
    </Table>
  );
}

Schedule.defaultProps = {
  empty: [],
};

Schedule.propTypes = {
  url: PropTypes.string.isRequired,
  headers: PropTypes.number.isRequired,
  rowSpan: PropTypes.bool.isRequired,
  empty: PropTypes.arrayOf(PropTypes.number),
};
