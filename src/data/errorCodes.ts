// Đây là nơi chúng ta định nghĩa "hình dạng" của một mã lỗi
// TypeScript giúp chúng ta đảm bảo dữ liệu luôn đúng cấu trúc
export interface ErrorCode {
  id: number;
  brand: 'Daikin' | 'Panasonic' | 'LG' | 'Casper'; // Chỉ cho phép các hãng này
  code: string;
  description: string;
  solution: string;
}

// Đây là mảng dữ liệu giả (mock data) của chúng ta.
// Sau này bạn có thể mở rộng danh sách này hoặc lấy từ một file khác.
export const errorCodesDb: ErrorCode[] = [
  {
    id: 1,
    brand: 'Daikin',
    code: 'U0',
    description: 'Lỗi thiếu gas, gas không đủ.',
    solution: 'Kiểm tra đường ống, đo áp suất gas, nạp thêm gas nếu cần.'
  },
  {
    id: 2,
    brand: 'Daikin',
    code: 'U4',
    description: 'Lỗi đường truyền tín hiệu giữa dàn nóng và dàn lạnh.',
    solution: 'Kiểm tra dây kết nối, bo mạch dàn nóng và dàn lạnh.'
  },
  {
    id: 3,
    brand: 'Panasonic',
    code: 'H11',
    description: 'Lỗi kết nối hoặc lỗi bo mạch dàn lạnh.',
    solution: 'Kiểm tra dây tín hiệu giữa 2 dàn. Kiểm tra bo mạch dàn lạnh.'
  },
  {
    id: 4,
    brand: 'LG',
    code: 'CH05',
    description: 'Lỗi kết nối giữa dàn nóng và dàn lạnh.',
    solution: 'Kiểm tra dây điện kết nối theo sơ đồ. Kiểm tra nguồn cấp cho dàn nóng.'
  },
  {
    id: 5,
    brand: 'Casper',
    code: 'E5',
    description: 'Lỗi mất kết nối giữa dàn nóng và dàn lạnh (máy inverter).',
    solution: 'Kiểm tra dây tín hiệu. Kiểm tra van điện từ và bo mạch.'
  },
    {
    id: 6,
    brand: 'Daikin',
    code: 'A6',
    description: 'Lỗi quạt dàn lạnh.',
    solution: 'Kiểm tra motor quạt, tụ quạt và kết nối dây.'
  },
];