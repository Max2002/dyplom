import PropTypes from 'prop-types';
import { useState } from 'react';
import apiRequest from '@/api/api';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { useForm } from 'react-hook-form';
import Select from '@/components/Select';
import TextField from '@/components/TextField';
import { ERROR } from '@/constants/messages';
import StatusRequest from '@/components/StatusRequest';
import MediaField from '@/components/MediaField';
import {
  Notification,
  FormAddSchedule,
  WrapperSchedules,
  Headers,
  Schedules,
  DownloadFile,
} from '@/sections/Cabinet/styled';

export default function WorkSchedule({
  activeOrgId,
  schedules: { schedules, status },
}) {
  const months = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' },
  ];
  const [isAdd, setIsAdd] = useState(false);
  const [chooseMonth, setChooseMonth] = useState('');
  const [message, setMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      year: 2023,
      organisation: activeOrgId,
    },
  });
  const fileName = watch('media', '')[0]?.name;

  const onSubmit = async (data) => {
    try {
      await apiRequest.post('/api/work-schedules', {
        data: { ...data, month: chooseMonth },
      });

      setIsAdd(false);
      setMessage('Графік успішно додано');
    } catch (e) {
      setMessage(ERROR);
    }
  };

  const getAddSchedule = () => {
    return (
      <Modal onClose={() => setIsAdd(false)} position="center">
        <FormAddSchedule onSubmit={handleSubmit(onSubmit)}>
          <Notification>Оберіть на якій місяць створити графік</Notification>
          <Select
            onChange={(id, name) => setChooseMonth(name)}
            defaultValue={months[0].name}
            options={months}
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
          <MediaField
            fileName={fileName}
            register={register('media')}
            accept=".xls, application/vnd.ms-excel"
          />
          <Button name="submitSchedule" type="submit">
            Додати графік
          </Button>
        </FormAddSchedule>
      </Modal>
    );
  };

  return (
    <WrapperSchedules>
      <Button
        name="addSchedule"
        onClick={() => {
          setIsAdd(true);
          setChooseMonth(months[0].name);
        }}
      >
        Додати робочий графік
      </Button>
      <DownloadFile
        href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/uploads/Example_ea0484a479.xls`}
      >
        Завантажити шаблоний файл
      </DownloadFile>
      {schedules.length === 0 ? (
        <Notification textAlign="center" width="100%">
          {status === 200
            ? 'Тут поки що не має записів, але ви можете їх додати'
            : 'На сервері сталася помилка і ми її виправляємо. Вибачте за незручності'}
        </Notification>
      ) : (
        <>
          <Headers>
            <div>Місяць</div>
            <div>Рік</div>
            <div>Посилання на завантаження графіка</div>
          </Headers>
          {schedules.map(({ month, year, schedule }) => (
            <Schedules href={`/schedule/${schedule[0].id}`}>
              <div>{month}</div>
              <div>{year}</div>
              <div>{`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${schedule[0].url}`}</div>
            </Schedules>
          ))}
        </>
      )}
      {isAdd && getAddSchedule()}
      {message && (
        <StatusRequest message={message} close={() => setMessage(null)} />
      )}
    </WrapperSchedules>
  );
}

WorkSchedule.propTypes = {
  activeOrgId: PropTypes.number.isRequired,
  schedules: PropTypes.shape({
    status: PropTypes.number,
    schedules: PropTypes.arrayOf(PropTypes.object),
    schema: PropTypes.object,
  }).isRequired,
};
