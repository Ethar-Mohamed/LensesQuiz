<template>
  <div class="w-full mt-4 flex flex-col items-center">
    <div class="w-full h-2 bg-gray-200 rounded-full">
      <div
        class="h-2 rounded-full bg-slate-700 transition-all duration-500"
        :style="{ width: progressPercentage + '%' }"
      ></div>
    </div>

    <span class="mt-2 text-sm text-slate-700 font-semibold">
      {{ localizedCurrent }} {{ $t("of") }} {{ localizedTotal }}
    </span>
  </div>

  <div class="m-2 flex justify-between">
    <div
      class="flex items-center cursor-pointer"
      :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
      @click="$router.back()"
    >
      <i
        class="fa-solid fa-arrow-right p-2"
        :class="{ 'fa-flip-horizontal': $i18n.locale === 'en' }"
      ></i>
      <span class="text-lg font-bold text-slate-700">
        {{ $t("Go Back") }}
      </span>
    </div>

    <div class="flex items-center cursor-pointer">
      <LanguageSwitcher />
    </div>
  </div>
</template>

<script>
import LanguageSwitcher from "./LanguageSwitcher.vue";

export default {
  name: "ProgressBar",
  components: { LanguageSwitcher },
  props: {
    current: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      default: 7,
    },
  },
  computed: {
    progressPercentage() {
      return ((this.current - 1) / (this.total - 1)) * 100;
    },
    localizedCurrent() {
      return this.current.toLocaleString(
        this.$i18n.locale === "ar" ? "ar-EG" : "en-US"
      );
    },
    localizedTotal() {
      return this.total.toLocaleString(
        this.$i18n.locale === "ar" ? "ar-EG" : "en-US"
      );
    },
  },
};
</script>
