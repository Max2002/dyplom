import PropTypes from 'prop-types';
import Schedule from '@/components/Schedule';
import Notification from '@/components/Notification';
import { Wrapper, DownloadFile } from '@/sections/ScheduleAdmin/styled';

export default function ScheduleAdmin({ file, headers, rowSpan, back, empty }) {
  return (
    <Wrapper back={back}>
      <DownloadFile
        href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${file.url}`}
      >
        Завантажити файл
      </DownloadFile>
      {Object.keys(file).length === 0 ? (
        <Notification fontSize={22} textAlign="center">
          Упс! Щось пішло не так, спробуйте пізніше або повідомте нам
        </Notification>
      ) : (
        <Schedule
          url={file?.url}
          headers={headers}
          empty={empty}
          rowSpan={rowSpan}
        />
      )}
    </Wrapper>
  );
}

ScheduleAdmin.defaultProps = {
  rowSpan: false,
  back: true,
  empty: [],
};

ScheduleAdmin.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.number,
    size: PropTypes.number,
    mime: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
    hash: PropTypes.string,
  }).isRequired,
  headers: PropTypes.number.isRequired,
  rowSpan: PropTypes.bool,
  back: PropTypes.bool,
  empty: PropTypes.arrayOf(PropTypes.number),
};
