<template>
  <div :class="['', isArabic ? 'text-left' : 'text-right']">
    <button
      @click="toggleLang"
      class="text-xl text-slate-700 hover:text-slate-900 cursor-pointer transition"
    >
      <i class="fa-solid fa-earth-americas"></i>
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    isArabic() {
      return this.$i18n.locale === "ar";
    },
  },
  methods: {
    toggleLang() {
      const newLang = this.isArabic ? "en" : "ar";
      this.$i18n.locale = newLang;
      document.documentElement.setAttribute(
        "dir",
        newLang === "ar" ? "rtl" : "ltr"
      );
      document.documentElement.setAttribute("lang", newLang);
    },
  },
  mounted() {
    const currentLang = this.$i18n.locale;
    document.documentElement.setAttribute(
      "dir",
      currentLang === "ar" ? "rtl" : "ltr"
    );
    document.documentElement.setAttribute("lang", currentLang);
  },
};
</script>
