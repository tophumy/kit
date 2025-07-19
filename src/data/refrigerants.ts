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
    // --- THÔNG TIN KỸ THUẬT & AN TOÀN QUAN TRỌNG ---
    ashrae: 'A2L', // A: Độc tính thấp, 2L: Khả năng cháy thấp
    ppe: 'Kính bảo hộ, găng tay chống bỏng lạnh. Làm việc ở khu vực thông thoáng.',
    dau: 'POE (Polyolester) - Lưu ý: Dầu POE rất dễ hút ẩm, phải đậy kín.',
    phuongPhapNap: 'Nạp ở thể lỏng để đảm bảo chính xác và nhanh chóng. Có thể nạp hơi.',
    doTruotNhiet: 0, // Là gas đơn thành phần, không có độ trượt nhiệt độ (glide)
    pVanHanhTieuChuan: 'Hút: ~10.3 bar (~150 PSI) | Đẩy: ~27.6-31 bar (~400-450 PSI) (tham khảo)',
    diemToiHan: { temp: 78.1, apSuat: 57.8 }, // Nhiệt độ (°C), Áp suất (bar)
    odp: 0, // Không phá hủy tầng Ozone
    soCuu: 'Tiếp xúc da: Rửa bằng nước ấm, không chà xát. Hít phải: Di chuyển tới nơi thoáng khí, tìm kiếm sự trợ giúp y tế nếu cần.',

    // --- BẢNG P-T (ÁP SUẤT-NHIỆT ĐỘ) CHUYÊN NGHIỆP ---
    // Định dạng: [Nhiệt độ (°C), Áp suất bão hòa (bar)]
    // Dải nhiệt độ rộng hơn và chi tiết hơn để tính toán siêu nhiệt (superheat) và quá lạnh (subcooling) chính xác
    ptTable: [
      [-40, 1.54],
      [-35, 1.98],
      [-30, 2.51],
      [-25, 3.14],
      [-20, 3.89],
      [-15, 4.77],
      [-10, 5.81],
      [-5, 7.02],
      [0, 8.44],   // Điểm đóng băng của nước
      [5, 10.05],
      [7, 10.74],  // Điểm chuẩn dàn lạnh điều hòa thường gặp
      [10, 11.89],
      [15, 13.98],
      [20, 16.34],
      [25, 18.99],
      [30, 21.96],
      [35, 25.28],
      [40, 28.98],
      [45, 33.08],
      [50, 37.64],
      [55, 42.67],
      [60, 48.23],
      [65, 54.34],
      [70, 61.07]
    ],
  },
  {
    name: 'R-410A',
    type: 'HFC Blend',
    gwp: 2088,
    // --- THÔNG TIN KỸ THUẬT & AN TOÀN QUAN TRỌNG ---
    ashrae: 'A1', // A: Độc tính thấp, 1: Không cháy
    ppe: 'Kính bảo hộ, găng tay chống bỏng lạnh. Làm việc ở khu vực thông thoáng.',
    dau: 'POE (Polyolester) - Lưu ý: Dầu POE rất dễ hút ẩm, phải đậy kín.',
    phuongPhapNap: 'BẮT BUỘC nạp ở thể lỏng để đảm bảo đúng tỷ lệ thành phần.',
    doTruotNhiet: 0.1, // Là gas hỗn hợp cận sôi (near-azeotropic), độ trượt rất thấp, gần như bằng 0
    pVanHanhTieuChuan: 'Hút: ~7.6-8.9 bar (~110-130 PSI) | Đẩy: ~24.1-29.3 bar (~350-425 PSI) (tham khảo)',
    diemToiHan: { temp: 71.4, apSuat: 49.0 }, // Nhiệt độ (°C), Áp suất (bar)
    odp: 0, // Không phá hủy tầng Ozone
    soCuu: 'Tiếp xúc da: Rửa bằng nước ấm, không chà xát. Hít phải: Di chuyển tới nơi thoáng khí, tìm kiếm sự trợ giúp y tế nếu cần.',

    // --- BẢNG P-T (ÁP SUẤT-NHIỆT ĐỘ) CHUYÊN NGHIỆP ---
    // Định dạng: [Nhiệt độ (°C), Áp suất bão hòa (bar)]
    // Dữ liệu áp suất tương ứng với trạng thái lỏng bão hòa (bubble point)
    ptTable: [
      [-40, 1.18],
      [-35, 1.55],
      [-30, 2.00],
      [-25, 2.55],
      [-20, 3.21],
      [-15, 4.00],
      [-10, 4.93],
      [-5, 6.02],
      [0, 7.29],   // Điểm đóng băng của nước
      [5, 8.75],
      [7, 9.38],   // Điểm chuẩn dàn lạnh điều hòa thường gặp
      [10, 10.42],
      [15, 12.33],
      [20, 14.50],
      [25, 16.96],
      [30, 19.73],
      [35, 22.85],
      [40, 26.34],
      [45, 30.25],
      [50, 34.60],
      [55, 39.44],
      [60, 44.81],
      [65, 50.75],
      [70, 57.32]
    ],
  },
  {
    name: 'R-134a',
    type: 'HFC',
    gwp: 1430,
        // --- THÔNG TIN KỸ THUẬT & AN TOÀN QUAN TRỌNG ---
    ashrae: 'A1', // A: Độc tính thấp, 1: Không cháy
    ppe: 'Kính bảo hộ, găng tay chống bỏng lạnh. Làm việc ở khu vực thông thoáng.',
    dau: 'POE (Tủ lạnh, lạnh thương nghiệp) hoặc PAG (Điều hòa Ô tô). KHÔNG được lẫn lộn.',
    phuongPhapNap: 'Nạp ở thể lỏng hoặc thể hơi. Nạp lỏng thường nhanh hơn.',
    doTruotNhiet: 0, // Là gas đơn thành phần, không có độ trượt nhiệt độ (glide)
    pVanHanhTieuChuan: 'Hút: ~1.4-2.4 bar (~20-35 PSI) | Đẩy: ~10.3-13.8 bar (~150-200 PSI) (tham khảo)',
    diemToiHan: { temp: 101.1, apSuat: 40.6 }, // Nhiệt độ (°C), Áp suất (bar)
    odp: 0, // Không phá hủy tầng Ozone
    soCuu: 'Tiếp xúc da: Rửa bằng nước ấm, không chà xát. Hít phải: Di chuyển tới nơi thoáng khí, tìm kiếm sự trợ giúp y tế nếu cần.',

    // --- BẢNG P-T (ÁP SUẤT-NHIỆT ĐỘ) CHUYÊN NGHIỆP ---
    // Định dạng: [Nhiệt độ (°C), Áp suất bão hòa (bar)]
    // Dữ liệu cho môi chất áp suất trung bình, phổ biến trong tủ lạnh và điều hòa ô tô
    ptTable: [
      [-40, 0.51],
      [-35, 0.70],
      [-30, 0.93],
      [-25, 1.23],
      [-20, 1.57],
      [-15, 1.99],
      [-10, 2.47],
      [-5, 3.03],
      [0, 3.69],   // Điểm đóng băng của nước
      [5, 4.44],
      [10, 5.31],
      [15, 6.29],
      [20, 7.41],
      [25, 8.67],
      [30, 10.09],
      [35, 11.66],
      [40, 13.42],
      [45, 15.37],
      [50, 17.53],
      [55, 19.90],
      [60, 22.52],
      [65, 25.38],
      [70, 28.52]
    ],
  },
  {
    name: 'R-22',
    type: 'HCFC', // Hydrochlorofluorocarbon - Chứa Clo, gây hại tầng Ozone
    gwp: 1810,    // Tiềm năng làm nóng toàn cầu rất cao

    // --- THÔNG TIN KỸ THUẬT & AN TOÀN QUAN TRỌNG ---
    ashrae: 'A1', // A: Độc tính thấp, 1: Không cháy
    ppe: 'Kính bảo hộ, găng tay chống bỏng lạnh. Làm việc ở khu vực thông thoáng.',
    dau: 'Dầu khoáng (Mineral Oil - MO). KHÔNG tương thích với dầu POE của gas thế hệ mới.',
    phuongPhapNap: 'Nạp ở thể lỏng hoặc thể hơi. Nạp lỏng thường nhanh hơn.',
    doTruotNhiet: 0, // Là gas đơn thành phần, không có độ trượt nhiệt độ (glide)
    pVanHanhTieuChuan: 'Hút: ~4.1-4.8 bar (~60-70 PSI) | Đẩy: ~15.5-19.0 bar (~225-275 PSI) (tham khảo)',
    diemToiHan: { temp: 96.2, apSuat: 49.9 }, // Nhiệt độ (°C), Áp suất (bar)
    odp: 0.055, // CÓ khả năng phá hủy tầng Ozone, đang bị cấm và loại bỏ dần
    soCuu: 'Tiếp xúc da: Rửa bằng nước ấm, không chà xát. Hít phải: Di chuyển tới nơi thoáng khí, tìm kiếm sự trợ giúp y tế nếu cần.',

    // --- BẢNG P-T (ÁP SUẤT-NHIỆT ĐỘ) CHUYÊN NGHIỆP ---
    // Định dạng: [Nhiệt độ (°C), Áp suất bão hòa (bar)]
    // Dữ liệu cho môi chất kinh điển, áp suất trung bình-thấp
    ptTable: [
      [-40, 0.99],
      [-35, 1.28],
      [-30, 1.63],
      [-25, 2.05],
      [-20, 2.55],
      [-15, 3.14],
      [-10, 3.84],
      [-5, 4.65],
      [0, 5.60],   // Điểm đóng băng của nước
      [5, 6.69],
      [7, 7.15],   // Điểm chuẩn dàn lạnh điều hòa thường gặp
      [10, 7.94],
      [15, 9.37],
      [20, 11.00],
      [25, 12.83],
      [30, 14.89],
      [35, 17.20],
      [40, 19.77],
      [45, 22.62],
      [50, 25.79],
      [55, 29.28],
      [60, 33.13],
      [65, 37.37],
      [70, 42.02]
    ],
  },
];