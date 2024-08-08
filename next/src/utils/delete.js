import apiRequest from '@/api/api';

const deleteEntity = async (schema, data, endPoint, idDelete) => {
  try {
    const mediaField = Object.keys(schema).find(
      (key) => schema[key].type === 'media',
    );

    if (mediaField) {
      await apiRequest.delete(
        `/api/upload/files/${
          data.find((item) => item.id === idDelete)[mediaField][0].id
        }`,
      );
    }

    if (endPoint.includes('organisation')) {
      const deleteRelationEntity = [
        '/api/delete-accounting',
        '/api/delete-workSchedules',
        '/api/delete-applications',
        '/api/delete-news',
        '/api/delete-payrolls',
        '/api/delete-vacations',
      ];
      const PromisesDelete = deleteRelationEntity.map((entity) =>
        apiRequest.delete(`${entity}/${idDelete}`),
      );

      await Promise.all(PromisesDelete);
    }
    await apiRequest.delete(`${endPoint}/${idDelete}`);

    return true;
  } catch (e) {
    return false;
  }
};

export default deleteEntity;
