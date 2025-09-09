<template>
  <div
    class="w-full max-w-xl md:max-w-3xl mx-auto justify-center items-center bg-white shadow-2xl pl-6 pr-6 pb-6 overflow-hidden"
  >
    <ProgressBar :current="2" :total="7" />
    <img
      src="/2150427867.jpg"
      alt=""
      class="w-[120px] h-[120px] md:w-[180px] md:h-[180px] mx-auto rounded-full object-cover border-4 border-gray-300 shadow-md"
    />

    <div class="text-center mb-8 z-10">
      <p class="text-xl md:text-3xl font-extrabold text-slate-700 mt-6">
        {{ $t("question2") }}
      </p>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
      <div
        v-for="(option, index) in eyeColorOptions"
        :key="index"
        @click="selectOption(option)"
        class="relative rounded-lg overflow-hidden border-2 p-1 sm:p-4 cursor-pointer transition-all duration-300 bg-gray-100 hover:bg-gray-200 hover:scale-[1.03] animate-fade-slide-in"
        :class="
          selected === option.value
            ? 'border-slate-700  shadow-lg'
            : 'border-gray-300 shadow-lg'
        "
      >
        <div
          v-if="selected === option.value"
          :class="[
            'absolute top-0 w-0 h-0 border-t-[40px] z-10',
            isArabic
              ? 'left-0 border-t-slate-700 border-r-[40px] border-r-transparent'
              : 'right-0 border-t-slate-700 border-l-[40px] border-l-transparent',
          ]"
        >
          <div
            :class="[
              'absolute -top-[40px]',
              isArabic ? 'left-[4px]' : 'right-[4px]',
            ]"
          >
            <i class="fa-solid fa-check text-white text-sm"></i>
          </div>
        </div>

        <img
          :src="option.img"
          alt=""
          class="w-50 h-40 text-center rounded-md"
        />

        <div class="mt-2 text-sm font-medium text-slate-700">
          <span
            :class="[
              'text-xs font-bold px-2 py-1 rounded',
              selected === option.value
                ? 'bg-slate-700 text-white'
                : 'border-1 bg-white text-slate-700',
            ]"
          >
            {{ $t(`${option.label}`) }}
          </span>
          <span class="text-sm mx-1">{{ $t(`${option.value}`) }}</span>
        </div>
      </div>
    </div>
    <span
      v-if="errorMessage"
      class="text-slate-700 text-l font-bold mt-4 block text-center"
    >
      {{ errorMessage }}
    </span>
    <button
      class="mt-6 bg-slate-800 text-white px-6 py-3 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto block hover:bg-slate-700 cursor-pointer transition-all duration-300"
      @click="submit"
    >
      {{ $t("button") }}
    </button>
  </div>
</template>

<script>
import ProgressBar from "./ProgressBar.vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";
export default {
  name: "QuestionTwo",
  components: { ProgressBar, LanguageSwitcher },
  data() {
    return {
      selected: null,
      errorMessage: "",
      eyeColorOptions: [
        {
          label: "A",
          text: "Bright Blue",
          value: "bright-blue",
          img: "/images/brightblue.png",
        },
        { label: "B", text: "Blue", value: "blue", img: "/images/blue.png" },
        {
          label: "C",
          text: "Dark Brown",
          value: "dark-brown",
          img: "/images/darkbrown.png",
        },
        {
          label: "D",
          text: "Green",
          value: "green",
          img: "/images/green.png",
        },
        { label: "E", text: "Grey", value: "grey", img: "/images/grey.png" },
        {
          label: "F",
          text: "Light Brown",
          value: "light-brown",
          img: "/images/lightbrown.png",
        },
        {
          label: "G",
          text: "Medium Brown",
          value: "medium-brown",
          img: "/images/mediumbrown.png",
        },
        {
          label: "H",
          text: "Blue Green",
          value: "blue-green",
          img: "/images/bluegreen.png",
        },
      ],
    };
  },
  computed: {
    isArabic() {
      return this.$i18n.locale === "ar";
    },
  },
  methods: {
    selectOption(option) {
      this.errorMessage = "";
      if (this.selected !== option.value) {
        this.selected = option.value;
      }
      localStorage.setItem("eyeColor", this.selected);
      setTimeout(() => {
        this.submit();
      }, 1000);
    },
    submit() {
      if (this.selected) {
        this.$router.push({
          name: "QuestionThree",
        });
      } else {
        this.errorMessage = this.$t("pleaseSelectOption");
      }
    },
  },
};
</script>
<style scoped>
@keyframes fade-slide-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-slide-in {
  animation: fade-slide-in 0.9s ease forwards;
}
</style>

<!-- 
<style scoped>
@keyframes fade-slide-in {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-fade-slide-in {
  animation: fade-slide-in 0.6s ease-out forwards;
}
</style> -->
