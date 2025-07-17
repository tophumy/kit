<script setup lang="ts">
// --- PHẦN 1: IMPORT & KHAI BÁO ---
import { ref, computed } from 'vue';
import { USAGE_TYPES, BUILDING_MATERIALS, SUN_EXPOSURE } from '../data/coolingLoadData';

// --- PHẦN 2: BIẾN TRẠNG THÁI (STATE) - DỮ LIỆU ĐẦU VÀO TỪ NGƯỜI DÙNG ---
// Sử dụng ref để lưu trữ tất cả các lựa chọn của người dùng
const area = ref<number>(20); // Diện tích (m²)
const peopleCount = ref<number>(2); // Số người
const deviceCount = ref<number>(1); // Số thiết bị tỏa nhiệt
const selectedUsage = ref(Object.keys(USAGE_TYPES)[0]); // Mục đích sử dụng, mặc định là cái đầu tiên
const selectedMaterial = ref(Object.keys(BUILDING_MATERIALS)[0]); // Vật liệu xây dựng
const selectedExposure = ref(Object.keys(SUN_EXPOSURE)[0]); // Hướng nhà

// --- PHẦN 3: LOGIC TÍNH TOÁN (COMPUTED PROPERTIES) ---
// Đây là nơi phép màu xảy ra. 'totalCoolingLoad' sẽ tự động tính lại
// mỗi khi bất kỳ biến `ref` nào ở trên thay đổi.

const totalCoolingLoad = computed(() => {
  // --- A. LẤY CÁC HỆ SỐ ---
  const usageData = USAGE_TYPES[selectedUsage.value as keyof typeof USAGE_TYPES];
  const materialFactor = BUILDING_MATERIALS[selectedMaterial.value as keyof typeof BUILDING_MATERIALS];
  const exposureFactor = SUN_EXPOSURE[selectedExposure.value as keyof typeof SUN_EXPOSURE];
  
  // BTU cho mỗi thiết bị, bạn có thể điều chỉnh
  const HEAT_PER_DEVICE = 500;

  // --- B. TÍNH TOÁN CÁC THÀNH PHẦN CÔNG SUẤT ---

  // 1. Công suất cơ bản theo diện tích và mục đích sử dụng
  const baseLoad = area.value * usageData.base;

  // 2. Tải nhiệt từ người (phụ thuộc vào mục đích sử dụng)
  const peopleLoad = peopleCount.value * usageData.heatPerPerson;

  // 3. Tải nhiệt từ thiết bị
  const deviceLoad = deviceCount.value * HEAT_PER_DEVICE;
  
  // 4. Cộng các tải nhiệt cơ bản lại
  const initialLoad = baseLoad + peopleLoad + deviceLoad;

  // --- C. ÁP DỤNG CÁC HỆ SỐ ĐIỀU CHỈNH ---
  const adjustedLoad = initialLoad * materialFactor * exposureFactor;

  // Làm tròn kết quả cho dễ đọc
  return Math.round(adjustedLoad);
});

// Một computed property khác để gợi ý công suất máy lạnh thương mại
const suggestedCapacity = computed(() => {
  const btu = totalCoolingLoad.value;
  if (btu <= 9000) return "9,000 BTU (1.0 HP)";
  if (btu <= 12000) return "12,000 BTU (1.5 HP)";
  if (btu <= 18000) return "18,000 BTU (2.0 HP)";
  if (btu <= 24000) return "24,000 BTU (2.5 HP)";
  return "Trên 24,000 BTU (Cần máy lớn hơn hoặc nhiều máy)";
});

</script>

<template>
  <div class="tool-section bg-gray-50 text-gray-800 p-4">
    <div class="w-full max-w-md mx-auto">
      
      <h1 class="text-2xl font-bold text-center mb-6 text-cyan-600">Tính Công Suất Máy Lạnh</h1>

      <!-- Vùng nhập liệu -->
      <div class="bg-white p-5 rounded-lg border border-gray-200 shadow space-y-5">
        
        <!-- Input dạng số -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="area" class="block text-sm font-medium text-gray-700">Diện tích (m²)</label>
            <input type="number" id="area" v-model.number="area" min="1" class="mt-1 w-full p-2 border rounded-md">
          </div>
          <div>
            <label for="people" class="block text-sm font-medium text-gray-700">Số người</label>
            <input type="number" id="people" v-model.number="peopleCount" min="0" class="mt-1 w-full p-2 border rounded-md">
          </div>
        </div>
        <div>
          <label for="devices" class="block text-sm font-medium text-gray-700">Số thiết bị tỏa nhiệt (PC, TV...)</label>
          <input type="number" id="devices" v-model.number="deviceCount" min="0" class="mt-1 w-full p-2 border rounded-md">
        </div>

        <!-- Input dạng lựa chọn -->
        <div>
          <label for="usage" class="block text-sm font-medium text-gray-700">Mục đích sử dụng</label>
          <select id="usage" v-model="selectedUsage" class="mt-1 w-full p-2 border rounded-md bg-white">
            <option v-for="key in Object.keys(USAGE_TYPES)" :key="key" :value="key">{{ key }}</option>
          </select>
        </div>
        <div>
          <label for="material" class="block text-sm font-medium text-gray-700">Vật liệu & kết cấu</label>
          <select id="material" v-model="selectedMaterial" class="mt-1 w-full p-2 border rounded-md bg-white">
            <option v-for="key in Object.keys(BUILDING_MATERIALS)" :key="key" :value="key">{{ key }}</option>
          </select>
        </div>
        <div>
          <label for="exposure" class="block text-sm font-medium text-gray-700">Mức độ tiếp xúc nắng</label>
          <select id="exposure" v-model="selectedExposure" class="mt-1 w-full p-2 border rounded-md bg-white">
            <option v-for="key in Object.keys(SUN_EXPOSURE)" :key="key" :value="key">{{ key }}</option>
          </select>
        </div>
      </div>

      <!-- Vùng hiển thị KẾT QUẢ -->
      <div class="mt-8 text-center bg-cyan-50 p-6 rounded-lg border border-cyan-200 shadow-lg">
        <h2 class="text-lg font-medium text-gray-600">Công suất lạnh yêu cầu (ước tính)</h2>
        <p class="text-4xl font-bold text-cyan-700 my-2">
          {{ totalCoolingLoad.toLocaleString('vi-VN') }}
          <span class="text-2xl font-normal">BTU/h</span>
        </p>
        <div class="mt-4 pt-4 border-t border-cyan-200">
          <p class="text-md font-medium text-gray-600">Gợi ý chọn máy:</p>
          <p class="text-xl font-semibold text-cyan-800">
            {{ suggestedCapacity }}
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.tool-section {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  padding-top: 4rem;
  padding-bottom: 4rem; /* Thêm padding dưới để không bị dính */
}
</style>