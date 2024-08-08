import apiRequest from '@/api/api';

const update = async (dataUpdate, schema, endPoint, data, idChange) => {
  try {
    const mediaField = Object.keys(schema).find(
      (key) => schema[key].type === 'media',
    );

    if (mediaField) {
      const formData = new FormData();

      await apiRequest.delete(
        `/api/upload/files/${
          data.find((item) => item.id === idChange)[mediaField][0].id
        }`,
      );

      formData.append('files', dataUpdate[mediaField][0]);
      const uploadedFile = await apiRequest.post(`/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await apiRequest.put(`${endPoint}/${idChange}`, {
        data: { ...dataUpdate, [mediaField]: uploadedFile.data[0].id },
      });
    } else {
      await apiRequest.put(`${endPoint}/${idChange}`, { data: dataUpdate });
    }

    return true;
  } catch (e) {
    return false;
  }
};

export default update;
