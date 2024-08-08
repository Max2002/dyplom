import apiRequest from '@/api/api';
import * as XLSX from 'xlsx';

const convertXLS = async (url, callback) => {
  try {
    const { data } = await apiRequest.get(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`,
      {
        responseType: 'arraybuffer',
      },
    );
    const fileData = new Uint8Array(data);
    const workbook = XLSX.read(fileData, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];

    callback(
      XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], {
        header: 1,
      }),
    );
  } catch (e) {
    callback([]);
  }
};

export default convertXLS;
