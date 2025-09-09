 <template>
  <div
    class="w-full max-w-xl md:max-w-3xl mx-auto justify-center items-center bg-white shadow-2xl pl-6 pr-6 pb-6 overflow-hidden"
  >
    <ProgressBar :current="7" :total="7" />
    <img
      src="/2150427867.jpg"
      alt=""
      class="w-[120px] h-[120px] md:w-[180px] md:h-[180px] mx-auto rounded-full object-cover border-4 border-gray-300 shadow-md"
    />

    <div class="text-center mb-8">
      <p class="text-2xl font-bold text-slate-700 mt-4">
        {{ $t("contact_information") }}
      </p>
    </div>

    <div class="mb-6">
      <div class="flex gap-4 justify-center">
        <label class="flex text-xl font-bold gap-2 text-slate-700">
          <input type="checkbox" v-model="showEmail" />
          {{ $t("email_option") }}
        </label>
        <label class="flex text-xl font-bold gap-2 text-slate-700">
          <input type="checkbox" v-model="showPhone" />
          {{ $t("phone_option") }}
        </label>
      </div>
    </div>

    <div class="mb-4" v-if="showEmail">
      <label class="block font-bold mb-1 text-slate-700">
        <i class="fa-regular fa-envelope"></i>
        {{ $t("email_address") }}
      </label>
      <input
        type="email"
        v-model="email"
        @blur="validateEmail"
        class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
        :placeholder="$t('email_placeholder')"
      />
      <span v-if="emailError" class="text-red-600 text-sm mt-1 block">
        {{ $t("invalid_email") }}
      </span>
    </div>

    <div class="mb-4" v-if="showPhone">
      <label class="block font-bold mb-1 text-slate-700">
        <i class="fa-solid fa-phone"></i> {{ $t("mobile_number") }}
      </label>
      <div class="flex gap-2">
        <select
          v-model="countryCode"
          class="w-45 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="+20">
            {{ $t("egypt") }} {{ arabicNumber("+20") }}
          </option>
          <option value="+966">
            {{ $t("saudi") }} {{ arabicNumber("+966") }}
          </option>
          <option value="+971">
            {{ $t("uae") }} {{ arabicNumber("+971") }}
          </option>
          <option value="+1">
            {{ $t("usa") }} {{ arabicNumber("+1") }}
          </option>
        </select>

        <input
          type="tel"
          v-model="phoneNumber"
          @blur="validatePhone"
          :placeholder="$t('phone_placeholder')"
          :class="[
            'flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-slate-900',
            { 'text-right': $i18n.locale === 'ar' },
          ]"
        />
      </div>
      <span v-if="phoneError" class="text-red-600 text-sm mt-1 block">
        {{ $t("invalid_phone") }}
      </span>
    </div>

    <div class="mb-4 flex items-center">
      <input type="checkbox" id="whatsapp" v-model="whatsapp" />
      <i class="fa-brands fa-whatsapp px-2"></i>
      <label for="whatsapp" class="text-slate-700">{{
        $t("whatsapp_optin")
      }}</label>
    </div>

    <button
      class="mt-6 bg-slate-800 text-white px-6 py-3 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto block hover:bg-slate-700 cursor-pointer transition-all duration-300"
      @click="submit"
    >
      {{ $t("ok_button") }}
    </button>
  </div>
</template>
<script>
import ProgressBar from "./ProgressBar.vue";
import { db } from "../firebase";
import { ref, push } from "firebase/database";

export default {
  name: "ContactInfo",
  components: { ProgressBar },
  data() {
    return {
      email: "",
      countryCode: "+20",
      phoneNumber: "",
      whatsapp: false,
      emailError: false,
      phoneError: false,
      showEmail: false,
      showPhone: false,
    };
  },
  computed: {
    phone() {
      return this.countryCode + this.phoneNumber;
    },
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = this.email && !emailRegex.test(this.email);
    },
    validatePhone() {
      const regexMap = {
        "+20": /^1[0-9]{9}$/,
        "+966": /^5[0-9]{8}$/,
        "+971": /^5[0-9]{8}$/,
        "+1": /^[2-9][0-9]{9}$/,
      };
      const regex = regexMap[this.countryCode];
      this.phoneError =
        this.phoneNumber && !(regex && regex.test(this.phoneNumber));
    },
    arabicNumber(num) {
      if (this.$i18n.locale !== "ar") return num;
      const map = {
        0: "٠",
        1: "١",
        2: "٢",
        3: "٣",
        4: "٤",
        5: "٥",
        6: "٦",
        7: "٧",
        8: "٨",
        9: "٩",
        "+": "+",
      };
      return num
        .toString()
        .split("")
        .map((c) => map[c] || c)
        .join("");
    },
    async submit() {
      if (this.showEmail) this.validateEmail();
      if (this.showPhone) this.validatePhone();

      if (
        (this.showEmail && this.emailError) ||
        (this.showPhone && this.phoneError)
      ) {
        return;
      }

      if (
        this.showEmail &&
        !this.email &&
        this.showPhone &&
        !this.phoneNumber
      ) {
        this.emailError = this.showEmail;
        this.phoneError = this.showPhone;
        return;
      }
      const eyeColorKey = localStorage.getItem("eyeColor");
      const quizData = {
        [this.$t("fields.eyeColor")]: this.$t(
          `option.${localStorage.getItem("eyeColor")}`
        ),
        [this.$t("fields.skinColor")]: this.$t(
          `option.${localStorage.getItem("skinColor")}`
        ),
        [this.$t("fields.style")]: this.$t(
          `option.${localStorage.getItem("style")}`
        ),
        [this.$t("fields.comfortlevel")]: this.$t(
          `option.${localStorage.getItem("comfortlevel")}`
        ),
        [this.$t("fields.lensesmatch")]: this.$t(
          `option.${localStorage.getItem("lensesmatch")}`
        ),
        [this.$t("fields.wouldyouwear")]: JSON.parse(
          localStorage.getItem("wouldyouwear")
        ).map((item) => this.$t(`option.${item}`)),
        timestamp: new Date().toISOString(),
      };

      try {
        await push(ref(db, "quizAnswers"), quizData);

        const redirectMap = {
          "dark-brown": "/recommendations/dark-brown",
          "medium-brown": "/recommendations/medium-brown",
          "light-brown": "/recommendations/light-brown",
          blue: "/recommendations/blue",
          "bright-blue": "/recommendations/bright-blue",
          "blue-green": "/recommendations/blue-green",
          green: "/recommendations/green",
          grey: "/recommendations/grey",
        };

        const destination = redirectMap[eyeColorKey] || "/thank-you";
        this.$router.push(destination);
      } catch (error) {
        console.error("Error saving to Firebase:", error);
      }
    },
  },
};
</script>
