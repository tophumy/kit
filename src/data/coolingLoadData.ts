// Định nghĩa các lựa chọn và hệ số tương ứng
// Chúng ta sẽ dùng các đối tượng để dễ quản lý hơn

// Mục đích sử dụng phòng và hệ số tỏa nhiệt cơ bản (BTU/h/m²)
export const USAGE_TYPES = {
  'Phòng ngủ, Phòng khách': { base: 600, heatPerPerson: 300 },
  'Văn phòng làm việc': { base: 700, heatPerPerson: 400 },
  'Quán cafe, Quán ăn': { base: 800, heatPerPerson: 600 },
  'Nhà bếp': { base: 900, heatPerPerson: 400 },
};

// Vật liệu xây dựng và hệ số nhân (1.0 là không ảnh hưởng)
export const BUILDING_MATERIALS = {
  'Tường gạch, Mái bê tông': 1.0,
  'Tường gạch, Mái tôn (có lớp cách nhiệt)': 1.1,
  'Tường gạch, Mái tôn (không cách nhiệt)': 1.2,
  'Phòng có vách kính lớn': 1.15,
};

// Hướng nhà/phòng và hệ số nhân
export const SUN_EXPOSURE = {
  'Ít nắng (hướng Bắc, Đông)': 1.0,
  'Nhiều nắng (hướng Tây, Nam)': 1.1,
};