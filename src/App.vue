<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

// Import Header component
import Header from './components/Header.vue';

// Import các component công cụ
import ErrorCodeLookup from './views/ErrorCodeLookup.vue'
import RefrigerantChart from './views/RefrigerantChart.vue'
import CoolingLoadCalculator from './views/CoolingLoadCalculator.vue'

const router = useRouter()

// Tạo các tham chiếu (ref) đến các phần tử DOM của từng công cụ
const tool1 = ref<HTMLElement | null>(null)
const tool2 = ref<HTMLElement | null>(null)
const tool3 = ref<HTMLElement | null>(null)

// Mảng chứa các công cụ và đường dẫn tương ứng
const tools = [
  { ref: tool1, path: '/' },
  { ref: tool2, path: '/refrigerant' },
  { ref: tool3, path: '/calculator' },
]

let observer: IntersectionObserver;

onMounted(() => {
  // Intersection Observer API
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6 // Khi 60% công cụ hiện ra thì kích hoạt
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const toolPath = tools.find(t => t.ref.value === entry.target)?.path;
        
        if (toolPath && router.currentRoute.value.path !== toolPath) {
          router.replace(toolPath);
        }
      }
    });
  }, options);

  // Bắt đầu theo dõi các phần tử công cụ
  tools.forEach(tool => {
    if (tool.ref.value) {
      observer.observe(tool.ref.value);
    }
  });
});

// Dọn dẹp khi component bị hủy
onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <Header />

  <!-- Thêm class `pt-16` để nội dung không bị header che mất -->
  <main class="pt-16">
    <!-- Gán ID cho từng công cụ để link trong header có thể trỏ tới -->
    <div id="tool-1" ref="tool1">
      <ErrorCodeLookup />
    </div>
    <div id="tool-2" ref="tool2">
      <RefrigerantChart />
    </div>
    <div id="tool-3" ref="tool3">
      <CoolingLoadCalculator />
    </div>
  </main>
</template>