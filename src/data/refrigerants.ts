// Định nghĩa "hình dạng" của một điểm trên biểu đồ P-T
// Cấu trúc: [nhiệt độ (°C), áp suất (bar)]
type PTPoint = [number, number];

// Định nghĩa "hình dạng" của một đối tượng môi chất
export interface Refrigerant {
  name: string;
  type: string; // Loại gas, ví dụ HFC
  gwp: number; // Global Warming Potential
  ptTable: PTPoint[]; // Bảng tra cứu Áp suất - Nhiệt độ
}

// "Cơ sở dữ liệu" môi chất của chúng ta
export const refrigerantsDb: Refrigerant[] = [
  {
    name: 'R-32',
    type: 'HFC',
    gwp: 675,
    // Bảng P-T đơn giản hóa cho R-32
    // [Nhiệt độ, Áp suất]
    ptTable: [
      [-20, 4.34],
      [-10, 6.13],
      [0, 8.44],
      [7, 10.4], // Điểm chuẩn thường gặp trong điều hòa
      [10, 11.41],
      [20, 15.33],
      [30, 20.15],
      [40, 26.05],
      [50, 33.22],
    ],
  },
  {
    name: 'R-410A',
    type: 'HFC Blend',
    gwp: 2088,
    // Bảng P-T đơn giản hóa cho R-410A
    ptTable: [
      [-20, 4.88],
      [-10, 6.85],
      [0, 9.43],
      [7, 11.8], // Điểm chuẩn
      [10, 12.55],
      [20, 16.89],
      [30, 22.22],
      [40, 28.74],
      [50, 36.65],
    ],
  },
  {
    name: 'R-134a',
    type: 'HFC',
    gwp: 1430,
    ptTable: [
      [-20, 1.33],
      [-10, 2.01],
      [0, 2.93],
      [7, 3.8],
      [10, 4.15],
      [20, 5.72],
      [30, 7.71],
      [40, 10.17],
      [50, 13.18],
    ],
  },
];