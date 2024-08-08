import apiRequest from '@/api/api';

const create = async (dataCreate, schema, endPoint, activeOrgId, userId) => {
  try {
    const mediaField = Object.keys(schema).find(
      (key) => schema[key].type === 'media',
    );

    if (endPoint.includes('news')) {
      dataCreate.organisation = activeOrgId;
    }

    if (mediaField) {
      const formData = new FormData();

      formData.append('files', dataCreate[mediaField][0]);
      const uploadedFile = await apiRequest.post(`/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const {
        data: { data },
      } = await apiRequest.post(`${endPoint}`, {
        data: { ...dataCreate, [mediaField]: uploadedFile.data[0].id },
      });

      if (endPoint.includes('organisations')) {
        await apiRequest.post('/api/payrolls', {
          data: {
            position: 'Власник',
            salary: 1000,
            organisation: data.id,
            isOpen: false,
            users_permissions_users: userId,
          },
        });
      }
    } else if (endPoint.includes('payrolls')) {
      await apiRequest.post(`${endPoint}`, {
        data: { ...dataCreate, organisation: activeOrgId },
      });
    } else {
      await apiRequest.post(`${endPoint}`, {
        data: dataCreate,
      });
    }

    return true;
  } catch (e) {
    return false;
  }
};

export default create;
