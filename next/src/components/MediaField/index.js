import PropTypes from 'prop-types';
import { RiImageAddFill } from 'react-icons/ri';
import { BsFiletypeXls } from 'react-icons/bs';
import Button from '@/components/Button';
import {
  DropImage,
  FileName,
  Notification,
} from '@/components/MediaField/styled';

export default function MediaField({ fileName, register, accept, isXL }) {
  return (
    <DropImage>
      {isXL ? (
        <BsFiletypeXls size={30} color="#40282C" />
      ) : (
        <RiImageAddFill size={30} color="#40282C" />
      )}
      <Notification>Перетяніть сюди файл або оберіть його з носія</Notification>
      <FileName>{fileName || 'Файл не обрано'}</FileName>
      <Button name="openFileManager">Обрати файл</Button>
      <input type="file" {...register} accept={accept} tabIndex={-1} />
    </DropImage>
  );
}

MediaField.defaultProps = {
  isXL: false,
};

MediaField.propTypes = {
  fileName: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,
  accept: PropTypes.string.isRequired,
  isXL: PropTypes.bool,
};
