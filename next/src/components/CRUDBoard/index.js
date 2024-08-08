import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RiDeleteBin5Line, RiCloseFill } from 'react-icons/ri';
import { TiPencil } from 'react-icons/ti';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { getCollection } from '@/redux/actionCreator/getCollection';
import create from '@/utils/create';
import update from '@/utils/update';
import deleteEntity from '@/utils/delete';
import Modal from '@/components/Modal';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import BoolField from '@/components/BoolField';
import MediaField from '@/components/MediaField';
import StatusRequest from '@/components/StatusRequest';
import { ERROR, SERVER_ERROR } from '@/constants/messages';
import {
  Buttons,
  Table,
  Row,
  Media,
  Functions,
  Question,
  Answers,
  EmptyData,
} from './styled';

export default function CRUDBoard({
  status,
  data,
  schema,
  endPoint,
  getEndpoint,
  activeOrgId,
  userId,
  isOrganisation,
}) {
  const dispatch = useDispatch();
  const [idChange, setIdChange] = useState(null);
  const [idDelete, setIdDelete] = useState(null);
  const [handleCreate, setHandleCreate] = useState(false);
  const [message, setMessage] = useState(null);
  const defaultValues = data.find(({ id }) => id === idChange);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm();

  const excludeField = (key) => {
    return (
      key !== 'id' &&
      key !== 'updatedAt' &&
      key !== 'publishedAt' &&
      key !== 'createdAt' &&
      key !== 'users_permissions_users' &&
      key !== 'payrolls' &&
      key !== 'organisation'
    );
  };

  const setDefaultValues = () => {
    Object.keys(defaultValues || {}).map((key) =>
      setValue(key, defaultValues[key]),
    );
  };

  useEffect(() => setDefaultValues(), [idChange]);

  const onUpdate = async (dataUpdate) => {
    const isSuccess = await update(
      dataUpdate,
      schema,
      endPoint,
      data,
      idChange,
    );

    if (isSuccess) {
      dispatch(getCollection(getEndpoint));
      setMessage('Дані успішно оновлено)');
    } else {
      setMessage(ERROR);
    }

    setIdChange(null);
  };

  const onDelete = async () => {
    const isSuccess = await deleteEntity(schema, data, endPoint, idDelete);

    if (isSuccess) {
      dispatch(getCollection(getEndpoint));
      setMessage('Запис успішно видалено)');
    } else {
      setMessage(ERROR);
    }

    setIdDelete(null);
  };

  const onCreate = async (dataCreate) => {
    const isSuccess = await create(
      dataCreate,
      schema,
      endPoint,
      activeOrgId,
      userId,
    );

    if (isSuccess) {
      dispatch(getCollection(getEndpoint));
      setMessage('Запис успішно створено)');
    } else {
      setMessage(ERROR);
    }

    setHandleCreate(false);
  };

  const getField = (key) => {
    const { type } = schema[key];
    const fileName = type === 'media' && watch(key, '')[0]?.name;

    const typeField =
      type === 'text' || type === 'string' || type === 'richtext'
        ? 'text'
        : type;
    const standardType =
      typeField === 'boolean' ? (
        <BoolField
          label={key}
          name={key}
          register={register(key)}
          error={errors[key] && errors[key].message}
          setValue={setValue}
        />
      ) : (
        <TextField
          key={key}
          type={typeField === 'relation' ? 'number' : typeField}
          label={key}
          register={register(key, {
            required: 'Обов`язкове поле!',
          })}
          name={key}
          error={errors[key] && errors[key].message}
        />
      );

    return typeField === 'media' ? (
      <MediaField
        fileName={fileName}
        register={register(key)}
        accept="image/png, image/jpg, image/jpeg"
      />
    ) : (
      standardType
    );
  };

  const getUpdate = () => {
    return (
      <Modal
        onClose={() => {
          setIdChange(null);
          reset();
        }}
      >
        <form onSubmit={handleSubmit(onUpdate)}>
          {Object.keys(defaultValues).map(
            (key) => excludeField(key) && getField(key),
          )}
          <Functions>
            <Button name="removeChange" onClick={setDefaultValues}>
              Відмінити зміни
            </Button>
            <Button name="submitData" type="submit">
              Зберегти зміни
            </Button>
          </Functions>
        </form>
      </Modal>
    );
  };

  const getDelete = () => {
    return (
      <Modal onClose={() => setIdDelete(null)} position="center">
        <Question>Ви впевнені, що хочете видалити цей запис?</Question>
        <Answers>
          <Button name="confirm" onClick={onDelete}>
            Так
          </Button>
          <Button name="doNotAgree" onClick={() => setIdDelete(null)}>
            Ні
          </Button>
        </Answers>
      </Modal>
    );
  };

  const getCreate = () => {
    return (
      <Modal
        onClose={() => {
          setHandleCreate(false);
          reset();
        }}
      >
        <form onSubmit={handleSubmit(onCreate)}>
          {Object.keys(schema).map(
            (key) => schema[key].type !== 'relation' && getField(key),
          )}
          <Functions>
            <Button name="create" type="submit">
              Створити
            </Button>
          </Functions>
        </form>
      </Modal>
    );
  };

  const getValue = (item, key) => {
    if (schema[key].type === 'boolean') {
      return item[key] ? (
        <BsCheck size={30} color="#fff" />
      ) : (
        <RiCloseFill size={30} color="#fff" />
      );
    }

    return item[key];
  };

  return data.length === 0 ? (
    <EmptyData>
      {status === 200
        ? `Тут поки що не має записів, але ви можете їх додати ${
            !isOrganisation ? 'після того як створите організацію' : ''
          }`
        : SERVER_ERROR}
      {isOrganisation && (
        <AiOutlinePlusCircle
          size="1.75em"
          color="#fff"
          onClick={() => setHandleCreate(true)}
        />
      )}
      {handleCreate && getCreate()}
      {message && (
        <StatusRequest close={() => setMessage(null)} message={message} />
      )}
    </EmptyData>
  ) : (
    <Table>
      {data.map((item, index) => (
        <>
          {index === 0 && (
            <Row index={index}>
              {Object.keys(item).map(
                (key) => excludeField(key) && <td key={key}>{key}</td>,
              )}
              <td>
                <AiOutlinePlusCircle
                  size="1.75em"
                  color="#fff"
                  onClick={() => setHandleCreate(true)}
                />
              </td>
            </Row>
          )}
          <Row key={item.id}>
            {Object.keys(item).map((key) => {
              if (excludeField(key)) {
                return excludeField(key) && schema[key].type === 'media' ? (
                  <td>
                    {item[key] && (
                      <Media
                        key={key}
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item[key][0]?.url}`}
                        alt={item[key]}
                      />
                    )}
                  </td>
                ) : (
                  <td key={key}>{getValue(item, key)}</td>
                );
              }
            })}
            <td>
              <Buttons>
                <TiPencil size={20} onClick={() => setIdChange(item.id)} />
                <RiDeleteBin5Line
                  size={20}
                  onClick={() => setIdDelete(item.id)}
                />
              </Buttons>
            </td>
          </Row>
        </>
      ))}
      {idChange && getUpdate()}
      {idDelete && getDelete()}
      {handleCreate && getCreate()}
      {message && (
        <StatusRequest close={() => setMessage(null)} message={message} />
      )}
    </Table>
  );
}

CRUDBoard.defaultProps = {
  activeOrgId: 0,
  userId: 0,
};

CRUDBoard.propTypes = {
  status: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  schema: PropTypes.object.isRequired,
  endPoint: PropTypes.string.isRequired,
  getEndpoint: PropTypes.string.isRequired,
  activeOrgId: PropTypes.number,
  userId: PropTypes.number,
  isOrganisation: PropTypes.bool.isRequired,
};
