// Đây là nơi chúng ta định nghĩa "hình dạng" của một mã lỗi
// TypeScript giúp chúng ta đảm bảo dữ liệu luôn đúng cấu trúc
export interface ErrorCode {
  id: number;
  brand: 'Daikin' | 'Panasonic' | 'LG' | 'Casper' | 'Toshiba' | 'Mitsubishi'; // Chỉ cho phép các hãng này
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
    description: 'Lỗi thiếu gas, áp suất gas thấp hoặc cảm biến áp suất thấp bị lỗi.',
    solution: 'Kiểm tra đường ống đồng có bị rò rỉ không. Đo áp suất gas và nạp bổ sung gas theo đúng thông số kỹ thuật. Kiểm tra cảm biến áp suất.'
  },
  {
    id: 2,
    brand: 'Daikin',
    code: 'U4',
    description: 'Lỗi tín hiệu truyền giữa dàn nóng và dàn lạnh.',
    solution: 'Kiểm tra dây tín hiệu (dây 1-2-3) có bị đứt, lỏng hoặc đấu sai không. Kiểm tra nguồn điện và bo mạch của cả hai dàn.'
  },
  {
    id: 3,
    brand: 'Daikin',
    code: 'UA',
    description: 'Lỗi kết hợp dàn nóng-lạnh không tương thích, hoặc vượt quá số lượng dàn lạnh (hệ thống multi).',
    solution: 'Kiểm tra lại model của dàn nóng và dàn lạnh xem có tương thích không. Đối với hệ multi, đảm bảo không lắp quá số lượng dàn lạnh quy định.'
  },

  // Nhóm Lỗi Dàn Lạnh (Indoor Unit)
  {
    id: 4,
    brand: 'Daikin',
    code: 'A1',
    description: 'Lỗi bo mạch dàn lạnh (PCB).',
    solution: 'Kiểm tra các kết nối trên bo mạch. Khởi động lại máy. Nếu không hết, cần thợ kỹ thuật kiểm tra hoặc thay thế bo mạch.'
  },
  {
    id: 5,
    brand: 'Daikin',
    code: 'A6',
    description: 'Lỗi motor quạt dàn lạnh. Quạt bị kẹt, hỏng hoặc bo mạch điều khiển quạt bị lỗi.',
    solution: 'Tắt máy, kiểm tra xem cánh quạt có bị kẹt dị vật không. Kiểm tra tụ quạt, motor quạt và các kết nối đến bo mạch.'
  },
  {
    id: 6,
    brand: 'Daikin',
    code: 'A3',
    description: 'Lỗi hệ thống thoát nước ngưng. Mực nước trong máng đầy.',
    solution: 'Kiểm tra và vệ sinh đường ống thoát nước, đảm bảo không bị tắc hoặc bị dốc ngược. Kiểm tra bơm thoát nước (nếu có) và công tắc phao.'
  },
  {
    id: 7,
    brand: 'Daikin',
    code: 'C4',
    description: 'Lỗi cảm biến nhiệt độ ống đồng dàn lạnh (cảm biến dàn).',
    solution: 'Kiểm tra jack cắm của cảm biến trên bo mạch. Đo điện trở của cảm biến, nếu sai lệch nhiều so với tiêu chuẩn thì cần thay thế.'
  },
  {
    id: 8,
    brand: 'Daikin',
    code: 'C9',
    description: 'Lỗi cảm biến nhiệt độ gió hồi (cảm biến phòng).',
    solution: 'Kiểm tra jack cắm và đo điện trở của cảm biến nhiệt độ phòng. Thay thế nếu cần.'
  },
  {
    id: 9,
    brand: 'Daikin',
    code: 'AJ',
    description: 'Lỗi cài đặt công suất trên bo mạch dàn lạnh không chính xác.',
    solution: 'Lỗi này thường do thợ kỹ thuật thay bo mạch mà không cài đặt đúng. Cần liên hệ kỹ thuật viên để cài đặt lại.'
  },

  // Nhóm Lỗi Dàn Nóng (Outdoor Unit)
  {
    id: 10,
    brand: 'Daikin',
    code: 'E1',
    description: 'Lỗi bo mạch dàn nóng (PCB).',
    solution: 'Kiểm tra nguồn cấp cho dàn nóng, kiểm tra các cầu chì và kết nối trên bo. Lỗi phức tạp, cần thợ kỹ thuật kiểm tra và thay thế.'
  },
  {
    id: 11,
    brand: 'Daikin',
    code: 'E5',
    description: 'Lỗi quá tải máy nén hoặc OL khởi động máy nén Inverter.',
    solution: 'Kiểm tra gas có bị thừa không. Kiểm tra điện áp cấp có ổn định không. Kiểm tra xem máy nén có bị kẹt không.'
  },
  {
    id: 12,
    brand: 'Daikin',
    code: 'E7',
    description: 'Lỗi motor quạt dàn nóng. Quạt bị kẹt, hỏng hoặc bo mạch điều khiển bị lỗi.',
    solution: 'Kiểm tra cánh quạt dàn nóng có bị vướng không. Kiểm tra motor quạt, tụ quạt và bo mạch dàn nóng.'
  },
  {
    id: 13,
    brand: 'Daikin',
    code: 'F3',
    description: 'Lỗi nhiệt độ ống đẩy của máy nén cao bất thường.',
    solution: 'Vệ sinh dàn nóng sạch sẽ. Kiểm tra lượng gas (có thể thiếu gas). Kiểm tra van tiết lưu điện tử (LEV).'
  },
  {
    id: 14,
    brand: 'Daikin',
    code: 'F6',
    description: 'Lỗi quá tải do nạp thừa gas, áp suất cao.',
    solution: 'Xả bớt gas về đúng áp suất tiêu chuẩn. Vệ sinh dàn nóng. Kiểm tra quạt dàn nóng có hoạt động tốt không.'
  },
  {
    id: 15,
    brand: 'Daikin',
    code: 'H6',
    description: 'Lỗi cảm biến vị trí hoặc quá dòng của máy nén.',
    solution: 'Kiểm tra kết nối dây từ bo mạch đến máy nén. Khả năng cao là lỗi máy nén hoặc bo mạch Inverter.'
  },
  {
    id: 16,
    brand: 'Daikin',
    code: 'H9',
    description: 'Lỗi cảm biến nhiệt độ gió ngoài trời.',
    solution: 'Kiểm tra jack cắm của cảm biến trên bo mạch dàn nóng. Đo điện trở và thay thế cảm biến nếu cần.'
  },
  {
    id: 17,
    brand: 'Daikin',
    code: 'J3',
    description: 'Lỗi cảm biến nhiệt độ đầu đẩy máy nén (sensor đầu đẩy).',
    solution: 'Kiểm tra jack cắm, đo điện trở của cảm biến. Thay thế nếu hỏng.'
  },
  {
    id: 18,
    brand: 'Daikin',
    code: 'J6',
    description: 'Lỗi cảm biến nhiệt độ dàn ống đồng dàn nóng (sensor dàn nóng).',
    solution: 'Kiểm tra kết nối và đo điện trở cảm biến, thay thế nếu cần.'
  },
  {
    id: 19,
    brand: 'Daikin',
    code: 'L4',
    description: 'Lỗi nhiệt độ cánh tản nhiệt của bo mạch Inverter tăng cao.',
    solution: 'Vệ sinh dàn nóng, đảm bảo không có vật cản luồng gió. Kiểm tra quạt dàn nóng có chạy đủ tốc độ không.'
  },
  {
    id: 20,
    brand: 'Daikin',
    code: 'L5',
    description: 'Lỗi quá dòng tức thời của máy nén Inverter.',
    solution: 'Kiểm tra các van gas đã mở hết chưa. Kiểm tra dây kết nối máy nén. Lỗi có thể do kẹt máy nén hoặc hỏng bo mạch công suất (Inverter).'
  },
  
  //Panasonic
  {
   id: 21,
   brand: 'Panasonic',
   code: 'H11',
   description: 'Lỗi đường truyền tín hiệu giữa dàn nóng và dàn lạnh.',
   solution: 'Kiểm tra dây kết nối tín hiệu (3 dây) giữa 2 dàn có bị đứt, lỏng không. Kiểm tra bo mạch của cả dàn nóng và dàn lạnh.'
  },
  {
   id: 22,
   brand: 'Panasonic',
   code: 'H12',
   description: 'Lỗi chênh lệch công suất giữa dàn nóng và dàn lạnh (không tương thích).',
   solution: 'Kiểm tra lại model của dàn nóng và dàn lạnh. Lỗi này thường xảy ra khi lắp đặt sai cặp hoặc thay thế bo mạch không đúng loại.'
  },
  {
   id: 23,
   brand: 'Panasonic',
   code: 'H14',
   description: 'Lỗi cảm biến nhiệt độ phòng (cảm biến gió vào).',
   solution: 'Kiểm tra jack cắm của cảm biến trên bo mạch dàn lạnh. Đo điện trở và thay thế cảm biến nếu cần thiết.'
  },
  {
   id: 24,
   brand: 'Panasonic',
   code: 'H15',
   description: 'Lỗi cảm biến nhiệt độ máy nén.',
   solution: 'Kiểm tra kết nối và điện trở của cảm biến nhiệt độ trên đầu đẩy máy nén. Thay thế nếu cảm biến bị hỏng.'
  },
  {
   id: 25,
   brand: 'Panasonic',
   code: 'H16',
   description: 'Lỗi dòng điện khối ngoài trời thấp, có thể do thiếu gas hoặc hỏng máy nén.',
   solution: 'Kiểm tra áp suất gas, tìm và xử lý điểm rò rỉ nếu có. Kiểm tra máy nén và bo mạch công suất.'
  },
  {
   id: 26,
   brand: 'Panasonic',
   code: 'H19',
   description: 'Lỗi motor quạt dàn lạnh.',
   solution: 'Kiểm tra quạt dàn lạnh có bị kẹt không. Kiểm tra motor quạt, tụ điện và các kết nối đến bo mạch.'
  },
  {
   id: 27,
   brand: 'Panasonic',
   code: 'H23',
   description: 'Lỗi cảm biến nhiệt độ dàn lạnh (cảm biến ống đồng).',
   solution: 'Kiểm tra jack cắm, đo điện trở của cảm biến trên dàn lạnh. Thay thế nếu giá trị sai lệch.'
  },
  {
   id: 28,
   brand: 'Panasonic',
   code: 'H27',
   description: 'Lỗi cảm biến nhiệt độ ngoài trời.',
   solution: 'Kiểm tra kết nối và điện trở của cảm biến nhiệt độ môi trường ở dàn nóng. Thay thế nếu cần.'
  },
  {
   id: 29,
   brand: 'Panasonic',
   code: 'H28',
   description: 'Lỗi cảm biến nhiệt độ dàn nóng (cảm biến ống đồng).',
   solution: 'Kiểm tra kết nối và điện trở của cảm biến trên dàn tản nhiệt của dàn nóng.'
  },
  {
   id: 30,
   brand: 'Panasonic',
   code: 'H30',
   description: 'Lỗi cảm biến nhiệt độ đầu đẩy máy nén.',
   solution: 'Kiểm tra cảm biến gắn ở đầu đẩy của máy nén, kiểm tra kết nối và điện trở.'
  },
  {
   id: 31,
   brand: 'Panasonic',
   code: 'H97',
   description: 'Lỗi motor quạt dàn nóng.',
   solution: 'Kiểm tra quạt dàn nóng có bị kẹt, vướng dị vật không. Kiểm tra motor quạt và bo mạch điều khiển.'
  },
  {
   id: 32,
   brand: 'Panasonic',
   code: 'H98',
   description: 'Lỗi nhiệt độ dàn lạnh quá cao (khi chạy chế độ sưởi) hoặc áp suất cao.',
   solution: 'Vệ sinh dàn lạnh. Kiểm tra quạt dàn lạnh có hoạt động tốt không. Kiểm tra lượng gas.'
  },
  {
   id: 33,
   brand: 'Panasonic',
   code: 'H99',
   description: 'Lỗi đóng băng dàn lạnh.',
   solution: 'Vệ sinh lưới lọc và dàn lạnh. Kiểm tra quạt dàn lạnh có chạy yếu không. Kiểm tra lượng gas, có thể do thiếu gas.'
  },
  {
   id: 34,
   brand: 'Panasonic',
   code: 'F11',
   description: 'Lỗi chuyển đổi chế độ làm lạnh / sưởi ấm.',
   solution: 'Kiểm tra van 4 ngả (van đảo chiều) và cuộn dây điều khiển của nó. Kiểm tra bo mạch dàn nóng.'
  },
  {
   id: 35,
   brand: 'Panasonic',
   code: 'F90',
   description: 'Lỗi trên mạch PFC (mạch điều khiển hệ số công suất) của dàn nóng.',
   solution: 'Kiểm tra điện áp đầu vào. Lỗi này liên quan đến bo mạch Inverter, cần thợ có chuyên môn cao kiểm tra.'
  },
  {
   id: 36,
   brand: 'Panasonic',
   code: 'F91',
   description: 'Lỗi chu trình làm lạnh bất thường, hệ thống thiếu gas hoặc bị tắc.',
   solution: 'Kiểm tra rò rỉ gas, đo áp suất và nạp gas bổ sung. Kiểm tra van tiết lưu, phin lọc có bị tắc nghẽn không.'
  },
  {
   id: 37,
   brand: 'Panasonic',
   code: 'F93',
   description: 'Lỗi vòng quay máy nén bất thường.',
   solution: 'Kiểm tra kết nối dây từ bo mạch đến máy nén. Khả năng cao do lỗi máy nén hoặc bo mạch Inverter.'
  },
  {
   id: 38,
   brand: 'Panasonic',
   code: 'F95',
   description: 'Lỗi nhiệt độ dàn nóng quá cao.',
   solution: 'Vệ sinh dàn nóng sạch sẽ, đảm bảo không có vật cản xung quanh. Kiểm tra quạt dàn nóng có chạy đủ tốc độ không.'
  },
  {
   id: 39,
   brand: 'Panasonic',
   code: 'F96',
   description: 'Lỗi quá nhiệt bộ bóng bán dẫn công suất (IPM - bo Inverter).',
   solution: 'Vệ sinh dàn nóng. Kiểm tra quạt dàn nóng. Kiểm tra keo tản nhiệt của IPM. Lỗi nghiêm trọng, có thể hỏng bo Inverter.'
  },
  {
   id: 40,
   brand: 'Panasonic',
   code: 'F99',
   description: 'Lỗi quá dòng DC ra máy nén.',
   solution: 'Lỗi nghiêm trọng. Kiểm tra máy nén có bị kẹt không. Kiểm tra bo mạch công suất (Inverter). Cần thợ kỹ thuật chuyên môn.'
  },
  
  //LG
  {
   id: 41,
   brand: 'LG',
   code: 'CH01',
   description: 'Lỗi cảm biến nhiệt độ phòng (gió vào).',
   solution: 'Kiểm tra jack cắm của cảm biến trên bo mạch dàn lạnh. Đo điện trở và thay thế cảm biến nếu cần.'
  },
  {
   id: 42,
   brand: 'LG',
   code: 'CH02',
   description: 'Lỗi cảm biến ống đồng dàn lạnh (đường vào).',
   solution: 'Kiểm tra jack cắm của cảm biến trên bo mạch dàn lạnh. Đo điện trở và thay thế cảm biến nếu bị hỏng.'
  },
  {
   id: 43,
   brand: 'LG',
   code: 'CH05',
   description: 'Lỗi kết nối tín hiệu giữa dàn nóng và dàn lạnh.',
   solution: 'Kiểm tra dây tín hiệu (dây communication) có bị đứt hoặc lỏng không. Kiểm tra bo mạch của cả hai dàn.'
  },
  {
   id: 44,
   brand: 'LG',
   code: 'CH06',
   description: 'Lỗi cảm biến ống đồng dàn lạnh (đường ra).',
   solution: 'Kiểm tra jack cắm và điện trở của cảm biến ống đồng đường ra trên dàn lạnh. Thay thế nếu cần.'
  },
  {
   id: 45,
   brand: 'LG',
   code: 'CH09',
   description: 'Lỗi bo mạch dàn lạnh (lỗi EEPROM).',
   solution: 'Thử tắt aptomat khoảng 5 phút rồi bật lại. Nếu không hết, cần kiểm tra hoặc thay thế bo mạch dàn lạnh.'
  },
  {
   id: 46,
   brand: 'LG',
   code: 'CH10',
   description: 'Lỗi motor quạt dàn lạnh.',
   solution: 'Kiểm tra quạt có bị kẹt không. Kiểm tra kết nối motor quạt với bo mạch. Đo motor và tụ quạt.'
  },
  {
   id: 47,
   brand: 'LG',
   code: 'CH12',
   description: 'Lỗi cảm biến nhiệt độ ở giữa dàn lạnh.',
   solution: 'Kiểm tra kết nối và điện trở của cảm biến. Lỗi này tương tự CH02/CH06, cần xác định đúng cảm biến.'
  },
  {
   id: 48,
   brand: 'LG',
   code: 'CH21',
   description: 'Lỗi bo mạch Inverter, điện áp DC tăng cao (IPM fault).',
   solution: 'Kiểm tra nguồn điện cấp có ổn định không. Lỗi này nghiêm trọng, thường do hỏng bo mạch công suất dàn nóng.'
  },
  {
   id: 49,
   brand: 'LG',
   code: 'CH22',
   description: 'Lỗi dòng điện đầu vào dàn nóng quá cao.',
   solution: 'Kiểm tra điện áp nguồn. Kiểm tra máy nén có bị kẹt không. Vệ sinh dàn nóng sạch sẽ.'
  },
  {
   id: 50,
   brand: 'LG',
   code: 'CH23',
   description: 'Lỗi điện áp DC Link thấp.',
   solution: 'Kiểm tra điện áp nguồn cấp. Lỗi liên quan đến bo mạch dàn nóng, có thể do tụ hoặc mạch PFC.'
  },
  {
   id: 51,
   brand: 'LG',
   code: 'CH26',
   description: 'Lỗi máy nén Inverter (kẹt, lỗi pha).',
   solution: 'Kiểm tra kết nối dây từ bo mạch đến máy nén. Đo điện trở các cuộn dây của máy nén. Có thể hỏng máy nén hoặc bo công suất.'
  },
  {
   id: 52,
   brand: 'LG',
   code: 'CH32',
   description: 'Lỗi nhiệt độ đầu đẩy máy nén cao.',
   solution: 'Vệ sinh dàn nóng. Kiểm tra lượng gas (có thể thiếu gas). Kiểm tra quạt dàn nóng.'
  },
  {
   id: 53,
   brand: 'LG',
   code: 'CH41',
   description: 'Lỗi cảm biến nhiệt độ đầu đẩy máy nén (cảm biến D-pipe).',
   solution: 'Kiểm tra kết nối và điện trở của cảm biến đầu đẩy. Thay thế nếu hỏng.'
  },
  {
   id: 54,
   brand: 'LG',
   code: 'CH44',
   description: 'Lỗi cảm biến nhiệt độ ngoài trời.',
   solution: 'Kiểm tra kết nối và điện trở của cảm biến nhiệt độ môi trường ở dàn nóng.'
  },
  {
   id: 55,
   brand: 'LG',
   code: 'CH45',
   description: 'Lỗi cảm biến nhiệt độ dàn nóng.',
   solution: 'Kiểm tra kết nối và điện trở của cảm biến trên dàn tản nhiệt của dàn nóng.'
  },
  {
   id: 56,
   brand: 'LG',
   code: 'CH53',
   description: 'Lỗi tín hiệu truyền từ dàn lạnh đến dàn nóng.',
   solution: 'Tương tự lỗi CH05, tập trung kiểm tra đường dây tín hiệu và bo mạch.'
  },
  {
   id: 57,
   brand: 'LG',
   code: 'CH60',
   description: 'Lỗi bo mạch dàn nóng (lỗi EEPROM).',
   solution: 'Tắt nguồn điện và khởi động lại. Nếu không được, khả năng cao phải thay bo mạch dàn nóng.'
  },
  {
   id: 58,
   brand: 'LG',
   code: 'CH61',
   description: 'Lỗi nhiệt độ dàn nóng cao.',
   solution: 'Vệ sinh dàn nóng sạch sẽ. Kiểm tra quạt dàn nóng có chạy đủ tốc độ không, đảm bảo không có vật cản xung quanh.'
  },
  {
   id: 59,
   brand: 'LG',
   code: 'CH62',
   description: 'Lỗi nhiệt độ bo mạch dàn nóng tăng cao.',
   solution: 'Kiểm tra quạt dàn nóng. Vệ sinh bo mạch và khu vực tản nhiệt. Có thể hỏng cảm biến nhiệt trên bo.'
  },
  {
   id: 60,
   brand: 'LG',
   code: 'CH67',
   description: 'Lỗi motor quạt dàn nóng (BLDC).',
   solution: 'Kiểm tra quạt dàn nóng có bị kẹt không. Kiểm tra dây kết nối từ bo mạch đến motor quạt. Lỗi có thể do motor hoặc bo mạch.'
  },
  
  //Casper
  {
   id: 61,
   brand: 'Casper',
   code: 'E1',
   description: 'Lỗi cảm biến nhiệt độ phòng.',
   solution: 'Kiểm tra jack cắm của cảm biến trên bo mạch dàn lạnh. Đo điện trở và thay thế cảm biến nếu cần.'
  },
  {
   id: 62,
   brand: 'Casper',
   code: 'E2',
   description: 'Lỗi cảm biến nhiệt độ dàn lạnh (cảm biến ống đồng).',
   solution: 'Kiểm tra kết nối và điện trở của cảm biến trên dàn lạnh. Thay thế nếu giá trị sai lệch.'
  },
  {
   id: 63,
   brand: 'Casper',
   code: 'E3',
   description: 'Lỗi cảm biến nhiệt độ dàn nóng.',
   solution: 'Kiểm tra cảm biến trên dàn nóng và quạt dàn nóng. Lỗi này có thể do quạt chạy yếu hoặc hỏng.'
  },
  {
   id: 64,
   brand: 'Casper',
   code: 'E4',
   description: 'Lỗi bo mạch điều khiển dàn lạnh.',
   solution: 'Kiểm tra các kết nối trên bo mạch. Tắt aptomat và khởi động lại. Nếu không hết, cần thợ kỹ thuật kiểm tra hoặc thay bo mạch.'
  },
  {
   id: 65,
   brand: 'Casper',
   code: 'E5',
   description: 'Lỗi kết nối giữa dàn nóng và dàn lạnh.',
   solution: 'Kiểm tra dây tín hiệu kết nối giữa 2 dàn có bị đứt, lỏng hoặc đấu sai không. Kiểm tra bo mạch của cả hai dàn.'
  },
  {
   id: 66,
   brand: 'Casper',
   code: 'EC',
   description: 'Lỗi áp suất gas, rò rỉ hoặc hết gas.',
   solution: 'Kiểm tra đường ống xem có bị rò rỉ không. Đo áp suất và nạp gas đúng tiêu chuẩn. Kiểm tra cảm biến áp suất.'
  },
  {
   id: 67,
   brand: 'Casper',
   code: 'F0',
   description: 'Lỗi hệ thống thiếu gas, hoặc tắc nghẽn hệ thống.',
   solution: 'Kiểm tra áp suất gas. Tìm và xử lý điểm rò rỉ. Kiểm tra phin lọc, van tiết lưu có bị tắc không.'
  },
  {
   id: 68,
   brand: 'Casper',
   code: 'F1',
   description: 'Lỗi cảm biến nhiệt độ môi trường dàn nóng.',
   solution: 'Kiểm tra kết nối và điện trở của cảm biến nhiệt độ ngoài trời tại dàn nóng.'
  },
  {
   id: 69,
   brand: 'Casper',
   code: 'F2',
   description: 'Lỗi cảm biến nhiệt độ đầu vào dàn nóng (cảm biến dàn).',
   solution: 'Kiểm tra cảm biến nhiệt độ gắn trên dàn tản nhiệt của dàn nóng. Đo điện trở và thay thế nếu cần.'
  },
  {
   id: 70,
   brand: 'Casper',
   code: 'F3',
   description: 'Lỗi cảm biến nhiệt độ đầu ra dàn nóng.',
   solution: 'Kiểm tra cảm biến nhiệt độ ở đường ống ra của dàn nóng. Kiểm tra kết nối và điện trở.'
  },
  {
   id: 71,
   brand: 'Casper',
   code: 'F4',
   description: 'Lỗi bo mạch dàn nóng (lỗi EEPROM).',
   solution: 'Thử tắt nguồn và khởi động lại. Nếu lỗi vẫn còn, khả năng cao phải kiểm tra hoặc thay thế bo mạch dàn nóng.'
  },
  {
   id: 72,
   brand: 'Casper',
   code: 'F5',
   description: 'Lỗi motor quạt dàn nóng.',
   solution: 'Kiểm tra quạt dàn nóng có bị kẹt không. Kiểm tra tụ quạt, motor và kết nối dây đến bo mạch.'
  },
  {
   id: 73,
   brand: 'Casper',
   code: 'H6',
   description: 'Lỗi motor quạt dàn lạnh.',
   solution: 'Kiểm tra quạt dàn lạnh có bị kẹt dị vật không. Kiểm tra tụ khởi động và motor quạt dàn lạnh.'
  },
  {
   id: 74,
   brand: 'Casper',
   code: 'C5',
   description: 'Lỗi cầu nối (Jumper) trên bo mạch dàn lạnh.',
   solution: 'Kiểm tra xem cầu nối (jumper cap) trên bo mạch dàn lạnh có bị mất hoặc cắm sai vị trí không. Lỗi này thường xảy ra sau khi sửa chữa.'
  },
  {
   id: 75,
   brand: 'Casper',
   code: 'P0',
   description: 'Lỗi quá dòng máy nén Inverter.',
   solution: 'Lỗi nghiêm trọng, có thể do máy nén bị kẹt hoặc bo mạch công suất (Inverter) bị hỏng. Cần thợ chuyên môn kiểm tra.'
  },
  {
   id: 76,
   brand: 'Casper',
   code: 'P1',
   description: 'Lỗi điện áp nguồn quá cao hoặc quá thấp.',
   solution: 'Dùng đồng hồ đo điện áp nguồn cấp cho điều hòa. Nếu điện áp không ổn định, cần sử dụng ổn áp.'
  },
  {
   id: 77,
   brand: 'Casper',
   code: 'P2',
   description: 'Lỗi quá nhiệt đầu đẩy máy nén.',
   solution: 'Vệ sinh dàn nóng. Kiểm tra lượng gas (thường do thiếu gas). Kiểm tra quạt dàn nóng có chạy tốt không.'
  },
  {
   id: 78,
   brand: 'Casper',
   code: 'P3',
   description: 'Lỗi nhiệt độ môi trường ngoài trời quá thấp.',
   solution: 'Lỗi này xảy ra khi nhiệt độ ngoài trời quá thấp, máy không thể hoạt động hiệu quả. Chờ nhiệt độ tăng lên.'
  },
  {
   id: 79,
   brand: 'Casper',
   code: 'P4',
   description: 'Lỗi truyền động máy nén Inverter.',
   solution: 'Kiểm tra kết nối giữa bo mạch và máy nén. Lỗi phức tạp, thường liên quan đến bo công suất hoặc máy nén.'
  },
  {
   id: 80,
   brand: 'Casper',
   code: 'U8',
   description: 'Lỗi van 4 ngả (van đảo chiều).',
   solution: 'Lỗi này xảy ra ở các dòng máy 2 chiều. Kiểm tra cuộn dây của van 4 ngả và bo mạch điều khiển.'
  },
  
  //Toshiba
  {
   id: 81,
   brand: 'Toshiba',
   code: '04',
   description: 'Lỗi tín hiệu kết nối giữa dàn nóng và dàn lạnh.',
   solution: 'Kiểm tra dây tín hiệu (dây A, B) có bị đứt, lỏng hoặc đấu sai không. Kiểm tra bo mạch của cả hai dàn.'
  },
  {
   id: 82,
   brand: 'Toshiba',
   code: '0C',
   description: 'Lỗi cảm biến nhiệt độ phòng dàn lạnh (cảm biến TA).',
   solution: 'Kiểm tra jack cắm của cảm biến trên bo mạch dàn lạnh. Đo điện trở và thay thế cảm biến nếu cần.'
  },
  {
   id: 83,
   brand: 'Toshiba',
   code: '0D',
   description: 'Lỗi cảm biến ống đồng dàn lạnh (cảm biến TC).',
   solution: 'Kiểm tra jack cắm và điện trở của cảm biến trên dàn lạnh. Thay thế nếu giá trị sai lệch.'
  },
  {
   id: 84,
   brand: 'Toshiba',
   code: '18',
   description: 'Lỗi motor quạt dàn lạnh (lỗi tốc độ quạt).',
   solution: 'Kiểm tra quạt có bị kẹt không. Kiểm tra tụ quạt, motor và kết nối hồi tiếp (hall sensor) về bo mạch.'
  },
  {
   id: 85,
   brand: 'Toshiba',
   code: '1C',
   description: 'Lỗi truyền động máy nén Inverter.',
   solution: 'Kiểm tra kết nối bo công suất và máy nén. Lỗi phức tạp, thường do hỏng bo Inverter hoặc kẹt máy nén.'
  },
  {
   id: 86,
   brand: 'Toshiba',
   code: '1E',
   description: 'Lỗi nhiệt độ đầu đẩy máy nén cao.',
   solution: 'Vệ sinh dàn nóng sạch sẽ. Kiểm tra lượng gas (thường do thiếu gas). Kiểm tra quạt dàn nóng.'
  },
  {
   id: 87,
   brand: 'Toshiba',
   code: '1F',
   description: 'Lỗi dòng máy nén quá cao.',
   solution: 'Kiểm tra gas có bị thừa không. Kiểm tra điện áp nguồn. Khả năng cao máy nén bị kẹt hoặc hỏng.'
  },
  {
   id: 88,
   brand: 'Toshiba',
   code: '08',
   description: 'Lỗi van 4 ngả (van đảo chiều).',
   solution: 'Lỗi xảy ra ở máy 2 chiều. Kiểm tra cuộn dây của van 4 ngả, có thể bị kẹt hoặc hỏng.'
  },
  {
   id: 89,
   brand: 'Toshiba',
   code: '09',
   description: 'Lỗi đóng băng dàn lạnh.',
   solution: 'Vệ sinh lưới lọc và dàn lạnh. Kiểm tra quạt dàn lạnh có chạy yếu không. Kiểm tra lượng gas (có thể do thiếu gas).'
  },
  {
   id: 90,
   brand: 'Toshiba',
   code: '0B',
   description: 'Lỗi hệ thống thoát nước ngưng.',
   solution: 'Kiểm tra phao báo nước và bơm thoát nước (nếu có). Vệ sinh đường ống thoát nước, đảm bảo không bị tắc.'
  },
  {
   id: 91,
   brand: 'Toshiba',
   code: '11',
   description: 'Lỗi quạt dàn lạnh, tốc độ quay bất thường.',
   solution: 'Tương tự lỗi 18, kiểm tra motor quạt, tụ quạt và cảm biến Hall hồi tiếp về bo mạch.'
  },
  {
   id: 92,
   brand: 'Toshiba',
   code: '12',
   description: 'Lỗi bo mạch dàn lạnh.',
   solution: 'Kiểm tra các kết nối trên bo mạch. Tắt nguồn và khởi động lại. Nếu không hết, cần thợ kiểm tra hoặc thay bo.'
  },
  {
   id: 93,
   brand: 'Toshiba',
   code: '14',
   description: 'Lỗi điện áp nguồn hoặc quá dòng bo Inverter.',
   solution: 'Kiểm tra điện áp nguồn cấp có ổn định không (trong dải 187V-264V). Lỗi có thể do bo công suất.'
  },
  {
   id: 94,
   brand: 'Toshiba',
   code: '19',
   description: 'Lỗi cảm biến nhiệt độ đầu đẩy máy nén (TD sensor).',
   solution: 'Kiểm tra kết nối và điện trở của cảm biến đầu đẩy. Thay thế nếu hỏng.'
  },
  {
   id: 95,
   brand: 'Toshiba',
   code: '1A',
   description: 'Lỗi bo mạch công suất quạt dàn nóng (outdoor fan driver).',
   solution: 'Kiểm tra motor quạt dàn nóng và bo mạch công suất. Lỗi này thường yêu cầu thợ chuyên môn.'
  },
  {
   id: 96,
   brand: 'Toshiba',
   code: '1D',
   description: 'Lỗi máy nén bị khóa, không khởi động được.',
   solution: 'Kiểm tra điện áp. Đo các cuộn dây của máy nén. Lỗi nghiêm trọng, có thể do kẹt cơ hoặc hỏng bo Inverter.'
  },
  {
   id: 97,
   brand: 'Toshiba',
   code: '0E',
   description: 'Lỗi cảm biến nhiệt độ ngoài trời (TO sensor).',
   solution: 'Kiểm tra kết nối và điện trở của cảm biến nhiệt độ môi trường ở dàn nóng.'
  },
  {
   id: 121,
   brand: 'Toshiba',
   code: '13',
   description: 'Lỗi bo mạch dàn lạnh, tín hiệu bất thường.',
   solution: 'Kiểm tra lại tất cả các kết nối trên bo mạch. Tắt nguồn và khởi động lại. Nếu không hết, có thể bo mạch đã bị lỗi xử lý.'
  },
  {
   id: 122,
   brand: 'Toshiba',
   code: '01',
   description: 'Lỗi quá tải máy nén hoặc role bảo vệ nhiệt.',
   solution: 'Kiểm tra máy nén có bị kẹt không. Kiểm tra điện áp, lượng gas. Kiểm tra role bảo vệ nhiệt gắn trên máy nén.'
  },
  {
   id: 123,
   brand: 'Toshiba',
   code: '05',
   description: 'Lỗi không nhận được tín hiệu từ dàn nóng.',
   solution: 'Tương tự lỗi 04, kiểm tra kỹ dây tín hiệu và các đầu nối. Kiểm tra bo mạch dàn nóng có nguồn và hoạt động không.'
  },
  //mitsubishi
  {
   id: 101,
   brand: 'Mitsubishi',
   code: 'P1',
   description: 'Lỗi cảm biến nhiệt độ phòng (gió vào).',
   solution: 'Kiểm tra jack cắm của cảm biến trên bo mạch dàn lạnh. Đo điện trở và thay thế cảm biến nếu cần.'
  },
  {
   id: 102,
   brand: 'Mitsubishi',
   code: 'P2',
   description: 'Lỗi cảm biến ống đồng dàn lạnh.',
   solution: 'Kiểm tra kết nối và điện trở của cảm biến trên dàn lạnh. Thay thế nếu giá trị sai lệch.'
  },
  {
   id: 103,
   brand: 'Mitsubishi',
   code: 'P4',
   description: 'Lỗi công tắc phao hoặc hệ thống thoát nước ngưng.',
   solution: 'Kiểm tra phao báo nước có bị kẹt không. Vệ sinh đường ống thoát nước, đảm bảo không bị tắc.'
  },
  {
   id: 104,
   brand: 'Mitsubishi',
   code: 'P5',
   description: 'Lỗi bơm nước ngưng.',
   solution: 'Kiểm tra bơm thoát nước có hoạt động không, kiểm tra nguồn cấp cho bơm và đường ống.'
  },
  {
   id: 105,
   brand: 'Mitsubishi',
   code: 'P6',
   description: 'Lỗi đóng băng hoặc quá nhiệt dàn lạnh.',
   solution: 'Vệ sinh lưới lọc và dàn lạnh. Kiểm tra quạt dàn lạnh có chạy yếu không. Kiểm tra lượng gas, có thể do thiếu gas.'
  },
  {
   id: 106,
   brand: 'Mitsubishi',
   code: 'P8',
   description: 'Lỗi nhiệt độ đường ống gas bất thường.',
   solution: 'Kiểm tra cả cảm biến dàn nóng và dàn lạnh. Kiểm tra lượng gas và van tiết lưu.'
  },
  {
   id: 107,
   brand: 'Mitsubishi',
   code: 'P9',
   description: 'Lỗi cảm biến ống đồng thứ cấp dàn lạnh.',
   solution: 'Một số model có nhiều cảm biến, kiểm tra cảm biến còn lại trên dàn lạnh. Đo điện trở và thay thế nếu cần.'
  },
  {
   id: 108,
   brand: 'Mitsubishi',
   code: 'E6',
   description: 'Lỗi giao tiếp giữa dàn nóng và dàn lạnh.',
   solution: 'Kiểm tra dây tín hiệu kết nối giữa 2 dàn có bị đứt hoặc lỏng không. Kiểm tra bo mạch của cả hai dàn.'
  },
  {
   id: 109,
   brand: 'Mitsubishi',
   code: 'E9',
   description: 'Lỗi tín hiệu truyền thông, không nhận được tín hiệu từ dàn nóng.',
   solution: 'Tương tự lỗi E6, tập trung kiểm tra đường truyền và bo mạch. Kiểm tra nguồn cấp cho dàn nóng.'
  },
  {
   id: 110,
   brand: 'Mitsubishi',
   code: 'U1',
   description: 'Lỗi áp suất cao, máy nén quá nhiệt.',
   solution: 'Vệ sinh dàn nóng. Kiểm tra quạt dàn nóng có chạy tốt không. Kiểm tra lượng gas có bị thừa không.'
  },
  {
   id: 111,
   brand: 'Mitsubishi',
   code: 'U2',
   description: 'Lỗi áp suất thấp, có thể do thiếu gas hoặc cảm biến lỗi.',
   solution: 'Kiểm tra rò rỉ gas, đo áp suất và nạp gas bổ sung. Kiểm tra cảm biến áp suất thấp.'
  },
  {
   id: 112,
   brand: 'Mitsubishi',
   code: 'U3',
   description: 'Lỗi cảm biến nhiệt độ dàn nóng.',
   solution: 'Kiểm tra cảm biến trên dàn tản nhiệt của dàn nóng. Đo điện trở và thay thế nếu cần.'
  },
  {
   id: 113,
   brand: 'Mitsubishi',
   code: 'U4',
   description: 'Lỗi cảm biến nhiệt độ đầu đẩy máy nén.',
   solution: 'Kiểm tra kết nối và điện trở của cảm biến đầu đẩy. Thay thế nếu hỏng.'
  },
  {
   id: 114,
   brand: 'Mitsubishi',
   code: 'U5',
   description: 'Lỗi nhiệt độ dàn nóng (dàn ngưng) quá cao.',
   solution: 'Vệ sinh dàn nóng sạch sẽ, đảm bảo không có vật cản xung quanh. Kiểm tra quạt dàn nóng có chạy đủ tốc độ không.'
  },
  {
   id: 115,
   brand: 'Mitsubishi',
   code: 'U6',
   description: 'Lỗi máy nén, quá dòng hoặc kẹt.',
   solution: 'Lỗi nghiêm trọng. Kiểm tra kết nối dây máy nén. Đo điện trở các cuộn dây. Có thể do hỏng máy nén hoặc bo công suất.'
  },
  {
   id: 116,
   brand: 'Mitsubishi',
   code: 'U8',
   description: 'Lỗi motor quạt dàn nóng.',
   solution: 'Kiểm tra quạt dàn nóng có bị kẹt không. Kiểm tra dây kết nối từ bo mạch đến motor quạt. Lỗi có thể do motor hoặc bo mạch.'
  },
  {
   id: 117,
   brand: 'Mitsubishi',
   code: 'UF',
   description: 'Lỗi kẹt máy nén hoặc lỗi pha.',
   solution: 'Tắt máy ngay lập tức. Kiểm tra điện áp pha. Đo điện trở cuộn dây máy nén. Lỗi nghiêm trọng, cần thợ chuyên môn.'
  },
  {
   id: 118,
   brand: 'Mitsubishi',
   code: 'UP',
   description: 'Lỗi quá nhiệt máy nén.',
   solution: 'Kiểm tra lượng gas (thường do thiếu gas). Vệ sinh dàn nóng và kiểm tra quạt dàn nóng. Để máy nguội và khởi động lại.'
  },
  {
   id: 119,
   brand: 'Mitsubishi',
   code: 'JA',
   description: 'Lỗi cảm biến áp suất đầu hút.',
   solution: 'Kiểm tra kết nối và điện trở của cảm biến áp suất trên đường ống hút về máy nén.'
  },
  {
   id: 120,
   brand: 'Mitsubishi',
   code: 'JC',
   description: 'Lỗi cảm biến áp suất đầu đẩy.',
   solution: 'Kiểm tra kết nối và điện trở của cảm biến áp suất trên đường ống đẩy của máy nén.'
  },
];