<script setup lang="ts">
// --- PHẦN 1: IMPORT & KHAI BÁO ---
import { ref, computed, watch } from 'vue';
import { refrigerantsDb, type Refrigerant } from '../data/refrigerants';

// --- PHẦN 2: BIẾN TRẠNG THÁI (STATE) ---
const selectedRefrigerantName = ref<string>(refrigerantsDb[0].name); // Mặc định chọn gas đầu tiên
const temperature = ref<number>(0);
const pressure = ref<number>(0); // **QUAN TRỌNG**: Biến này LUÔN lưu trữ giá trị ở đơn vị CƠ SỞ (bar)

// --- THAY ĐỔI MỚI: Thêm trạng thái cho đơn vị áp suất ---
type PressureUnit = 'bar' | 'MPa';
const selectedUnit = ref<PressureUnit>('bar');

// --- PHẦN 3: HÀM TIỆN ÍCH & CHUYỂN ĐỔI ĐƠN VỊ ---
const BAR_TO_MPA = 0.1;
const MPA_TO_BAR = 10;

function convertPressure(value: number, from: PressureUnit, to: PressureUnit): number {
  if (from === to) return value;
  if (from === 'bar' && to === 'MPa') return value * BAR_TO_MPA;
  if (from === 'MPa' && to === 'bar') return value * MPA_TO_BAR;
  return value; // Mặc định không đổi
}

function interpolate(x: number, x0: number, y0: number, x1: number, y1: number): number {
  if (x1 === x0) return y0;
  return y0 + (x - x0) * (y1 - y0) / (x1 - x0);
}

// --- PHẦN 4: LOGIC TÍNH TOÁN (COMPUTED PROPERTIES) ---

const allRefrigerantNames = computed(() => refrigerantsDb.map(r => r.name));

const selectedRefrigerantData = computed<Refrigerant | undefined>(() => {
  return refrigerantsDb.find(r => r.name === selectedRefrigerantName.value);
});

// THAY ĐỔI MỚI: Tạo một "biến ảo" cho giá trị áp suất hiển thị trên giao diện.
// Nó sẽ tự động tính toán giá trị dựa trên đơn vị người dùng chọn.
const displayPressure = computed({
  // Getter: Khi giao diện cần hiển thị giá trị, nó sẽ gọi hàm này.
  get() {
    // Chuyển giá trị áp suất cơ sở (bar) sang đơn vị người dùng đã chọn.
    const converted = convertPressure(pressure.value, 'bar', selectedUnit.value);
    // Làm tròn để hiển thị đẹp hơn. MPa cần nhiều số lẻ hơn.
    return selectedUnit.value === 'MPa' ? parseFloat(converted.toFixed(4)) : parseFloat(converted.toFixed(2));
  },
  // Setter: Khi người dùng thay đổi giá trị trên giao diện (qua input/slider), hàm này sẽ được gọi.
  set(newValue: number) {
    // Chuyển giá trị mới từ đơn vị người dùng chọn về đơn vị cơ sở (bar) để lưu trữ.
    pressure.value = convertPressure(newValue, selectedUnit.value, 'bar');
  }
});

// THAY ĐỔI MỚI: Tạo các biến computed cho min/max của thanh trượt áp suất
const pressureSliderMin = computed(() => {
  if (!selectedRefrigerantData.value) return 0;
  const minBar = selectedRefrigerantData.value.ptTable[0][1];
  return convertPressure(minBar, 'bar', selectedUnit.value);
});

const pressureSliderMax = computed(() => {
    if (!selectedRefrigerantData.value) return 100;
    const table = selectedRefrigerantData.value.ptTable;
    const maxBar = table[table.length - 1][1];
    return convertPressure(maxBar, 'bar', selectedUnit.value);
});

// --- PHẦN 5: LOGIC ĐỒNG BỘ HÓA (WATCHERS) ---
// Logic watch bên trong không cần thay đổi nhiều, vì chúng luôn tính toán với đơn vị cơ sở (bar).

watch(temperature, (newTemp) => {
  if (!selectedRefrigerantData.value) return;
  const table = selectedRefrigerantData.value.ptTable;
  for (let i = 0; i < table.length - 1; i++) {
    const [temp0, press0] = table[i];
    const [temp1, press1] = table[i + 1];
    if (newTemp >= temp0 && newTemp <= temp1) {
      const newPressureInBar = interpolate(newTemp, temp0, press0, temp1, press1);
      // Chỉ cập nhật biến cơ sở `pressure`
      if (pressure.value.toFixed(3) !== newPressureInBar.toFixed(3)) {
        pressure.value = newPressureInBar;
      }
      return;
    }
  }
});

watch(pressure, (newPressInBar) => {
  if (!selectedRefrigerantData.value) return;
  const table = selectedRefrigerantData.value.ptTable;
  for (let i = 0; i < table.length - 1; i++) {
    const [temp0, press0] = table[i];
    const [temp1, press1] = table[i + 1];
    if (newPressInBar >= press0 && newPressInBar <= press1) {
      const newTemp = interpolate(newPressInBar, press0, temp0, press1, temp1);
      if (temperature.value.toFixed(2) !== newTemp.toFixed(2)) {
        temperature.value = newTemp;
      }
      return;
    }
  }
});

// Khởi tạo giá trị ban đầu khi component được tải hoặc khi đổi gas
function initializeValues() {
    if (selectedRefrigerantData.value) {
        const table = selectedRefrigerantData.value.ptTable;
        const midIndex = Math.floor(table.length / 2);
        const [midTemp, midPress] = table[midIndex];
        temperature.value = midTemp;
        pressure.value = midPress; // Luôn set giá trị cơ sở (bar)
    }
}
watch(selectedRefrigerantName, initializeValues);
initializeValues(); // Gọi lần đầu khi component được tạo

</script>

<template>
  <div class="tool-section bg-gray-50 text-gray-800 p-4">
    <div class="w-full max-w-md mx-auto">
      
      <h1 class="text-2xl font-bold text-center mb-6 text-purple-600">Tra Cứu Môi Chất Lạnh</h1>
      
      <div>
        <label for="refrigerant-select" class="block text-lg font-medium text-green-700 mb-1">Chọn môi chất:</label>
        <select 
          id="refrigerant-select"
          v-model="selectedRefrigerantName"
          class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
        >
          <option v-for="name in allRefrigerantNames" :key="name" :value="name">
            {{ name }}
          </option>
        </select>
      </div>

      <div v-if="selectedRefrigerantData" class="mt-6 space-y-6">
        
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow">
          <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ selectedRefrigerantData.name }}</h2>
          <p><strong>Loại:</strong> {{ selectedRefrigerantData.type }}</p>
          <p><strong>GWP:</strong> {{ selectedRefrigerantData.gwp }}</p>
        </div>

        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow space-y-4">
          <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold">Biểu đồ P-T</h3>
              <!-- THAY ĐỔI MỚI: Thêm lựa chọn đơn vị -->
              <div class="flex items-center space-x-2 border border-gray-300 rounded-full p-0.5">
                  <button 
                      @click="selectedUnit = 'bar'"
                      :class="['px-3 py-1 text-sm rounded-full', { 'bg-purple-600 text-white': selectedUnit === 'bar' }]"
                  >
                      bar
                  </button>
                  <button 
                      @click="selectedUnit = 'MPa'"
                      :class="['px-3 py-1 text-sm rounded-full', { 'bg-purple-600 text-white': selectedUnit === 'MPa' }]"
                  >
                      MPa
                  </button>
              </div>
          </div>
          
          <div class="space-y-2">
            <label for="temp-slider" class="flex justify-between items-center">
              <span class="font-medium">Nhiệt độ (°C)</span>
              <input 
                type="number"
                v-model.number="temperature"
                class="w-24 p-1 text-center border rounded"
              />
            </label>
            <input
              type="range"
              id="temp-slider"
              v-model.number="temperature"
              :min="selectedRefrigerantData.ptTable[0][0]"
              :max="selectedRefrigerantData.ptTable[selectedRefrigerantData.ptTable.length - 1][0]"
              step="0.1"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
          </div>

          <!-- THAY ĐỔI MỚI: Sử dụng displayPressure và các slider min/max động -->
           <div class="space-y-2">
            <label for="pressure-slider" class="flex justify-between items-center">
              <span class="font-medium">Áp suất ({{ selectedUnit }})</span>
              <input 
                type="number"
                v-model.number="displayPressure"
                class="w-24 p-1 text-center border rounded"
              />
            </label>
            <input
              type="range"
              id="pressure-slider"
              v-model.number="displayPressure"
              :min="pressureSliderMin"
              :max="pressureSliderMax"
              step="0.01"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Giữ nguyên style cũ */
.tool-section {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  padding-top: 4rem;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  width: 20px; height: 20px;
  background: #8b5cf6; cursor: pointer; border-radius: 50%;
}
input[type=range]::-moz-range-thumb {
  width: 20px; height: 20px;
  background: #8b5cf6; cursor: pointer; border-radius: 50%;
}
</style>