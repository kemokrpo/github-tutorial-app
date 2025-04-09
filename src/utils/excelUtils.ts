import ExcelJS from 'exceljs';

export interface ExcelMediaType {
  type: string;
  name: string;
  extension: string;
  buffer: Buffer;
  index: string;
}

export interface DataItem {
  name: string;
  image: string;
  mediaType: string;
  title: string;
}

export const loadExcelData = async (filePath: string): Promise<DataItem[]> => {
  const data: DataItem[] = [];

  try {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);

    const worksheet = workbook.worksheets[0];
    const media = workbook.model.media as unknown as ExcelMediaType[];

    media.forEach((img, index) => {
      if (img.type.includes('image')) {
        const rowNumber = index + 2;
        const row = worksheet.getRow(rowNumber);

        data.push({
          name: row.getCell(1).text || '',
          image: `data:image/${img.extension};base64,${img.buffer.toString('base64')}`,
          mediaType: row.getCell(3).text || '',
          title: row.getCell(4).text || ''
        });
      }
    });

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && !data.some(d => d.name === row.getCell(1).text)) {
        data.push({
          name: row.getCell(1).text || '',
          image: '',
          mediaType: row.getCell(3).text || '',
          title: row.getCell(4).text || ''
        });
      }
    });

  } catch (error) {
    console.error("Error loading Excel:", error);
  }

  return data;
};
