<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import logoUrl from '../assets/logo1.png'; // Import logo sử dụng đường dẫn @

// --- STATE CHO MENU DROPDOWN ---
const isMenuOpen = ref(false);
const menuWrapper = ref<HTMLElement | null>(null);

// --- STATE CHO HEADER THÔNG MINH ---
const lastScrollY = ref(0);
const isHeaderVisible = ref(true);

// --- CÁC HÀM XỬ LÝ ---

// Hàm đóng menu
const closeMenu = () => {
  isMenuOpen.value = false;
};

// Hàm xử lý click ra ngoài menu để đóng nó lại
const handleClickOutside = (event: MouseEvent) => {
  if (menuWrapper.value && !menuWrapper.value.contains(event.target as Node)) {
    closeMenu();
  }
};

// Hàm xử lý cuộn trang để ẩn/hiện header
const handleScroll = () => {
  const currentScrollY = window.scrollY;
  // Không ẩn header nếu đang ở trên cùng
  if (currentScrollY <= 0) {
    isHeaderVisible.value = true;
    return;
  }
  // Nếu cuộn xuống và không phải đang ở quá gần đỉnh, ẩn header
  if (currentScrollY > lastScrollY.value && currentScrollY > 50) {
    isHeaderVisible.value = false;
    closeMenu(); // Tiện thể đóng luôn menu nếu đang mở
  } else {
    // Nếu cuộn lên, hiện header
    isHeaderVisible.value = true;
  }
  // Cập nhật vị trí cuộn cuối cùng
  lastScrollY.value = currentScrollY;
};

// --- LIFECYCLE HOOKS ---
onMounted(() => {
  // Lắng nghe sự kiện click toàn cục
  document.addEventListener('mousedown', handleClickOutside);
  // Lắng nghe sự kiện cuộn trang
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  // Dọn dẹp listener khi component bị hủy để tránh memory leak
  document.removeEventListener('mousedown', handleClickOutside);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header 
    class="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-md z-50 h-16 transition-transform duration-300 ease-in-out"
    :class="{ '-translate-y-full': !isHeaderVisible }"
  >
    <div class="container mx-auto px-4 h-full flex justify-between items-center">
      <!-- Logo bên trái (đã đổi thành ảnh) -->
      <a href="/" class="flex items-center">
        <img :src="logoUrl" alt="Logo" class="h-10 w-10 object-cover rounded-md">
        <!-- Có thể thêm tên bên cạnh nếu muốn -->
        <!-- <span class="text-xl font-bold text-blue-600 ml-2">Điện Lạnh Pro</span> -->
      </a>

      <!-- Menu 3 chấm bên phải (đã bọc bởi div có ref) -->
      <div class="relative" ref="menuWrapper">
        <button @click="isMenuOpen = !isMenuOpen" class="p-2 rounded-full hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div 
            v-if="isMenuOpen"
            class="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="py-1" role="menu" aria-orientation="vertical">
              <a href="#tool-1" @click="closeMenu" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                1. Tra cứu mã lỗi
              </a>
              <a href="#tool-2" @click="closeMenu" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                2. Tra cứu môi chất
              </a>
              <a href="#tool-3" @click="closeMenu" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                3. Tính công suất lạnh
              </a>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>