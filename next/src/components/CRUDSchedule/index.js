import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import Link from 'next/link';
import apiRequest from '@/api/api';
import { getCollection } from '@/redux/actionCreator/getCollection';
import { ERROR, SERVER_ERROR } from '@/constants/messages';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import MediaField from '@/components/MediaField';
import Select from '@/components/Select';
import MONTHS from '@/constants/months';
import TextField from '@/components/TextField';
import { TiPencil } from 'react-icons/ti';
import { RiDeleteBin5Line } from 'react-icons/ri';
import StatusRequest from '@/components/StatusRequest';
import Notification from '@/components/Notification';
import {
  Answers,
  Buttons,
  DownloadFile,
  FormAdd,
  Headers,
  Question,
  Table,
  WrapperData,
} from '@/components/CRUDSchedule/styled';

export default function CRUDSchedule({
  data,
  status,
  activeOrgId,
  endpoint,
  getEndpoint,
  dispatch,
  exampleFile,
  nameCollection,
  isOrganisation,
}) {
  const [isAdd, setIsAdd] = useState(false);
  const [chooseMonth, setChooseMonth] = useState('');
  const [message, setMessage] = useState(null);
  const [idDelete, setIdDelete] = useState(null);
  const [idChange, setIdChange] = useState(null);
  const [fileId, setFileId] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      year: 2023,
      organisation: activeOrgId,
    },
  });
  const fileName = watch('media', '')[0]?.name;

  const onCreate = async (dataCreate) => {
    try {
      const formData = new FormData();
      const findByDate = data.find(
        ({ year, month }) => month === chooseMonth && year === dataCreate.year,
      );

      formData.append('files', dataCreate.media[0]);
      const uploadedFile = await apiRequest.post(`/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (findByDate) {
        await apiRequest.delete(`/api/upload/files/${findByDate.file.id}`);
        await apiRequest.put(`${endpoint}/${findByDate.id}`, {
          data: {
            ...dataCreate,
            month: chooseMonth,
            file: uploadedFile.data[0].id,
          },
        });
      } else {
        await apiRequest.post(`${endpoint}`, {
          data: {
            ...dataCreate,
            month: chooseMonth,
            file: uploadedFile.data[0].id,
          },
        });
      }

      setIsAdd(false);
      setMessage(
        `${
          nameCollection === 'accounting' ? 'Облік бухгалтерії' : 'Графік'
        } успішно додано`,
      );
      reset();
      dispatch(getCollection(getEndpoint));
    } catch (e) {
      setMessage(ERROR);
    }
  };

  const onDelete = async () => {
    try {
      await apiRequest.delete(`/api/upload/files/${fileId}`);
      await apiRequest.delete(`${endpoint}/${idDelete}`);

      setMessage(
        `${
          nameCollection === 'accounting' ? 'Облік бухгалтерії' : 'Графік'
        } успішно видалено)`,
      );
      dispatch(getCollection(getEndpoint));
    } catch (e) {
      setMessage(ERROR);
    }

    setIdDelete(null);
  };

  const onChange = async (dataChange) => {
    try {
      const formData = new FormData();

      await apiRequest.delete(`/api/upload/files/${fileId}`);

      formData.append('files', dataChange.media[0]);
      const uploadedFile = await apiRequest.post(`/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await apiRequest.put(`${endpoint}/${idChange}`, {
        data: { file: uploadedFile.data[0].id },
      });
      dispatch(getCollection(getEndpoint));
      setMessage(
        `${
          nameCollection === 'accounting' ? 'Облік бухгалтерії' : 'Графік'
        } успішно змінено)`,
      );
    } catch (e) {
      setMessage(ERROR);
    }

    setIdChange(null);
  };

  const getDelete = () => {
    return (
      <Modal onClose={() => setIdDelete(null)} position="center">
        <Question>
          Ви впевнені, що хочете видалити
          {nameCollection === 'accounting' ? ' облік бухгалтерії' : ' графік'}?
        </Question>
        <Answers>
          <Button name="confirm" onClick={onDelete}>
            Так
          </Button>
          <Button name="deny" onClick={() => setIdDelete(null)}>
            Ні
          </Button>
        </Answers>
      </Modal>
    );
  };

  const getChange = () => {
    return (
      <Modal onClose={() => setIdChange(null)} position="center">
        <form onSubmit={handleSubmit(onChange)}>
          <MediaField
            fileName={fileName}
            register={register('media')}
            accept=".xls, application/vnd.ms-excel"
          />
          <Button name="change" type="submit">
            Змінити{' '}
            {nameCollection === 'accounting' ? 'облік бухгалтерії' : 'графік'}
          </Button>
        </form>
      </Modal>
    );
  };

  const getAdd = () => {
    return (
      <Modal
        onClose={() => {
          setIsAdd(false);
          reset();
        }}
        position="center"
      >
        <FormAdd onSubmit={handleSubmit(onCreate)}>
          <Notification fontSize={18}>
            Оберіть на якій місяць створити{' '}
            {nameCollection === 'accounting' ? 'облік бухгалтерії' : 'графік'}
          </Notification>
          <Select
            onChange={(id, name) => setChooseMonth(name)}
            defaultValue={MONTHS[0].name}
            options={MONTHS}
            back="#bf8c6f"
            maxWidth
          />
          <TextField
            type="number"
            label="Рік"
            register={register('year', {
              required: 'Обов`язкове поле!',
            })}
            name="year"
            error={errors.year && errors.year.message}
            maxLength={4}
          />
          {nameCollection === 'accounting' && (
            <TextField
              type="number"
              label="Податок (вказуйте числом)"
              register={register('tax', {
                required: 'Обов`язкове поле!',
              })}
              placeholder="15%"
              name="tax"
              error={errors.tax && errors.tax.message}
              maxLength={3}
            />
          )}
          <MediaField
            fileName={fileName}
            register={register('media')}
            accept=".xls, application/vnd.ms-excel"
            isXL
          />
          <Button name="submit" type="submit">
            Додати
          </Button>
        </FormAdd>
      </Modal>
    );
  };

  const getLink = (id, text, scheduleId) => {
    return (
      <td>
        <Link
          href={
            nameCollection === 'accounting'
              ? `/accounting/${id}`
              : `/${nameCollection}/schedule/${scheduleId}`
          }
        >
          {text}
        </Link>
      </td>
    );
  };

  return (
    <WrapperData>
      {isOrganisation && (
        <Button
          name="add"
          onClick={() => {
            setIsAdd(true);
            setChooseMonth(MONTHS[0].name);
          }}
        >
          Додати{' '}
          {nameCollection === 'accounting' ? 'облік бухгалтерії' : 'графік'}
        </Button>
      )}
      <DownloadFile
        href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${exampleFile}`}
      >
        Завантажити шаблоний файл
      </DownloadFile>
      {data.length === 0 ? (
        <Notification textAlign="center" width="100%">
          {status === 200
            ? `Тут поки що не має записів, але ви можете їх додати ${
                !isOrganisation ? 'після того як створите організацію' : ''
              }`
            : SERVER_ERROR}
        </Notification>
      ) : (
        <Table>
          <Headers>
            <td>Місяць</td>
            <td>Рік</td>
            <td>Посилання на завантаження графіка</td>
            {nameCollection === 'accounting' && <td>Податок</td>}
          </Headers>
          {data.map(({ id, month, year, file, tax }) => (
            <tr>
              {getLink(id, month, file.id)}
              {getLink(id, year, file.id)}
              {getLink(
                id,
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${file.url}`,
                file.id,
              )}
              {tax && getLink(id, tax, file.id)}
              <td>
                <Buttons>
                  <TiPencil
                    size={20}
                    onClick={() => {
                      setIdChange(id);
                      setFileId(file.id);
                    }}
                  />
                  <RiDeleteBin5Line
                    size={20}
                    onClick={() => {
                      setIdDelete(id);
                      setFileId(file.id);
                    }}
                  />
                </Buttons>
              </td>
            </tr>
          ))}
        </Table>
      )}
      {isAdd && getAdd()}
      {idDelete && getDelete()}
      {idChange && getChange()}
      {message && (
        <StatusRequest message={message} close={() => setMessage(null)} />
      )}
    </WrapperData>
  );
}

CRUDSchedule.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.number.isRequired,
  activeOrgId: PropTypes.number.isRequired,
  endpoint: PropTypes.string.isRequired,
  getEndpoint: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  exampleFile: PropTypes.string.isRequired,
  nameCollection: PropTypes.string.isRequired,
  isOrganisation: PropTypes.bool.isRequired,
};
