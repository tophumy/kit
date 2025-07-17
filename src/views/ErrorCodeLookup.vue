<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { errorCodesDb, type ErrorCode } from '../data/errorCodes';

// --- BIẾN TRẠNG THÁI (STATE) ---
const brandInput = ref('');
const codeInput = ref('');
const selectedBrand = ref('');
const selectedCode = ref('');
const showBrandSuggestions = ref(false);
const showCodeSuggestions = ref(false);
const activeIndex = ref(-1);

// THAY ĐỔI MỚI: Tạo ref để tham chiếu đến các phần tử DOM
const brandWrapper = ref<HTMLElement | null>(null);
const codeWrapper = ref<HTMLElement | null>(null);


// --- LOGIC TÍNH TOÁN (COMPUTED) --- (Không thay đổi)
const brandSuggestions = computed(() => {
  if (!brandInput.value) return [...new Set(errorCodesDb.map(item => item.brand))];
  const uniqueBrands = [...new Set(errorCodesDb.map(item => item.brand))];
  return uniqueBrands.filter(brand => brand.toLowerCase().includes(brandInput.value.toLowerCase()));
});

const codeSuggestions = computed(() => {
  if (!selectedBrand.value) return [];
  const codesForBrand = errorCodesDb.filter(item => item.brand === selectedBrand.value).map(item => item.code);
  if (!codeInput.value) return codesForBrand;
  return codesForBrand.filter(code => code.toLowerCase().includes(codeInput.value.toLowerCase()));
});

const searchResult = computed<ErrorCode | undefined>(() => {
  if (!selectedBrand.value || !selectedCode.value) return undefined;
  return errorCodesDb.find(item => item.brand === selectedBrand.value && item.code === selectedCode.value);
});


// --- HÀM XỬ LÝ SỰ KIỆN --- (Không thay đổi)
const handleBrandInput = (event: Event) => {
  brandInput.value = (event.target as HTMLInputElement).value;
  selectedBrand.value = '';
  activeIndex.value = -1;
};
const handleCodeInput = (event: Event) => {
  codeInput.value = (event.target as HTMLInputElement).value;
  selectedCode.value = '';
  activeIndex.value = -1;
};
const selectBrand = (brand: string) => {
  brandInput.value = brand;
  selectedBrand.value = brand;
  showBrandSuggestions.value = false;
  codeInput.value = '';
  selectedCode.value = '';
  activeIndex.value = -1;
};
const selectCode = (code: string) => {
  codeInput.value = code;
  selectedCode.value = code;
  showCodeSuggestions.value = false;
  activeIndex.value = -1;
};
const handleBrandKeydown = (event: KeyboardEvent) => {
  const suggestions = brandSuggestions.value;
  if (event.key === 'ArrowDown') { event.preventDefault(); if (activeIndex.value < suggestions.length - 1) activeIndex.value++; } 
  else if (event.key === 'ArrowUp') { event.preventDefault(); if (activeIndex.value > 0) activeIndex.value--; } 
  else if (event.key === 'Enter') {
    event.preventDefault();
    if (activeIndex.value > -1 && suggestions[activeIndex.value]) selectBrand(suggestions[activeIndex.value]);
    else if (suggestions.length > 0) selectBrand(suggestions[0]);
  }
};
const handleCodeKeydown = (event: KeyboardEvent) => {
    const suggestions = codeSuggestions.value;
    if (event.key === 'ArrowDown') { event.preventDefault(); if (activeIndex.value < suggestions.length - 1) activeIndex.value++; } 
    else if (event.key === 'ArrowUp') { event.preventDefault(); if (activeIndex.value > 0) activeIndex.value--; } 
    else if (event.key === 'Enter') {
      event.preventDefault();
      if (activeIndex.value > -1 && suggestions[activeIndex.value]) selectCode(suggestions[activeIndex.value]);
      else if (suggestions.length > 0) selectCode(suggestions[0]);
    }
};

// THAY ĐỔI MỚI: Logic xử lý click ra ngoài
const handleClickOutside = (event: MouseEvent) => {
  // Nếu hộp gợi ý hãng đang mở và người dùng click ra ngoài khu vực của nó
  if (brandWrapper.value && !brandWrapper.value.contains(event.target as Node)) {
    showBrandSuggestions.value = false;
  }
  // Tương tự cho hộp gợi ý mã lỗi
  if (codeWrapper.value && !codeWrapper.value.contains(event.target as Node)) {
    showCodeSuggestions.value = false;
  }
};

// THAY ĐỔI MỚI: Thêm và gỡ bỏ event listener
onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
  <div class="tool-section bg-gray-50 text-gray-800 p-4">
    <div class="w-full max-w-md mx-auto">
      <h1 class="text-2xl font-bold text-center mb-6 text-blue-600">Tra Cứu Mã Lỗi</h1>
      <div class="space-y-4">
        
        <!-- THAY ĐỔI MỚI: Bọc ô nhập Hãng bằng 1 div và gán ref -->
        <div class="relative" ref="brandWrapper">
          <label for="brand" class="block text-lg font-medium text-green-700 mb-1">Hãng:</label>
          <input 
            type="text" id="brand"
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập tên hãng (vd: Daikin)"
            autocomplete="off"
            :value="brandInput"
            @input="handleBrandInput"
            @focus="showBrandSuggestions = true; activeIndex = -1"
            @keydown="handleBrandKeydown"
          />
          <ul v-if="showBrandSuggestions && brandSuggestions.length > 0" class="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
            <li v-for="(brand, index) in brandSuggestions" :key="brand" @mousedown.prevent="selectBrand(brand)"
                :class="['p-3 hover:bg-blue-100 cursor-pointer', { 'bg-gray-200': index === activeIndex }]">
              {{ brand }}
            </li>
          </ul>
        </div>

        <!-- THAY ĐỔI MỚI: Bọc ô nhập Mã lỗi bằng 1 div và gán ref -->
        <div class="relative" ref="codeWrapper">
          <label for="code" class="block text-lg font-medium text-green-700 mb-1">Mã lỗi:</label>
          <input 
            type="text" id="code"
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập mã lỗi (vd: U0)"
            autocomplete="off"
            :value="codeInput"
            @input="handleCodeInput"
            @focus="showCodeSuggestions = true; activeIndex = -1"
            @keydown="handleCodeKeydown"
            :disabled="!selectedBrand"
          />
          <ul v-if="showCodeSuggestions && codeSuggestions.length > 0" class="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
            <li v-for="(code, index) in codeSuggestions" :key="code" @mousedown.prevent="selectCode(code)"
                :class="['p-3 hover:bg-blue-100 cursor-pointer', { 'bg-gray-200': index === activeIndex }]">
              {{ code }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Vùng kết quả (không đổi) -->
      <div v-if="searchResult" class="mt-8 bg-white p-5 rounded-lg border border-gray-200 shadow">
        <h2 class="text-xl font-semibold text-red-600 mb-2">
          Kết quả cho: {{ searchResult.code }} - {{ searchResult.brand }}
        </h2>
        <div class="space-y-3">
          <div><h3 class="font-bold text-gray-700">Mô tả lỗi:</h3><p>{{ searchResult.description }}</p></div>
          <div><h3 class="font-bold text-gray-700">Gợi ý khắc phục:</h3><p>{{ searchResult.solution }}</p></div>
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
}
</style>