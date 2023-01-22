import { defineStore } from "pinia";
import { onMounted, ref } from "vue";

/**
 * create random ID
 */
const createId = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

/**
 *
 * @param ({data: any, action: string})
 * @returns json
 */
const fetchAPI = async ({ data, action } = { action: null }) => {
  if (!action) return;

  const dataToSend = new FormData();
  dataToSend.append("action", action);
  if (data) {
    dataToSend.append("data", data);
  }
  try {
    const call = await fetch(window.ajaxurl, {
      method: "POST",
      credentials: "same-origin",
      body: dataToSend,
    });
    const response = await call.text();
    return JSON.parse(response.replace(/\\"/g, '"'));
  } catch (error) {
    console.log(error);
  }
};

export const useMainStore = defineStore("main", () => {
  const loading = ref(false);
  const isFirstTime = ref(true);
  const days = ref([]);
  const daysClosed = ref([]);
  const holidays = ref([]);
  const processing = ref(2);

  /**
   * add days in days array
   * @param {array|string} _days
   */
  function addDays(_days) {
    const d = !Array.isArray(_days) ? [_days] : _days;
    d.forEach((day) => {
      if (days.value.includes(day) === false) {
        days.value.push(day);
      }
    });
  }

  /**
   * remove day in days array
   * @param {string} _day
   */
  function removeDay(_day) {
    const i = days.value.findIndex((day) => {
      return day === _day;
    });
    if (i > -1) {
      days.value.splice(i, 1);
    }
  }

  /**
   * add holiday object
   */
  function addHoliday() {
    holidays.value.push({ id: createId(), start: "", end: "" });
  }

  /**
   * remove holiday object
   * @param {string} id
   */
  function removeHoliday(id) {
    // remove date in days if start and end
    const i = holidays.value.findIndex((v) => v.id === id);
    if (i > -1) {
      holidays.value.splice(i, 1);
    }
  }

  /**
   * complete date value in object holiday
   * @param {start|end} key
   * @param {Event} e
   * @param {string} id
   */
  function handlerDate(key, e, id) {
    const { value } = e.currentTarget;
    const i = holidays.value.findIndex((v) => v.id === id);
    if (i > -1) {
      holidays.value[i][key] = value;
    }
  }

  /**
   * fetch data on load
   */
  onMounted(async () => {
    loading.value = true;
    const cleanRes = await fetchAPI({ action: "get_gm_date_product_settings" });
    isFirstTime.value = !cleanRes;
    days.value = cleanRes?.days || days.value;
    daysClosed.value = cleanRes?.daysClosed || [];
    holidays.value = cleanRes?.holidays || [];
    processing.value = cleanRes?.processing || 2;
    loading.value = false;
  });

  /**
   * save the data
   */
  async function saveOptions() {
    loading.value = true;
    // remove holiday without start and set start date to end if is empty
    const holidaysCleaned = holidays.value
      .filter((h) => h.start !== "")
      .map((h) => {
        if (h.end === "") {
          h.end = h.start;
        }
        return h;
      });

    const cleanRes = await fetchAPI({
      action: "save_gm_date_product_settings",
      data: JSON.stringify({
        days: days.value,
        processing: processing.value,
        daysClosed: daysClosed.value,
        holidays: holidaysCleaned,
      }),
    });
    days.value = cleanRes.days;
    loading.value = false;
  }

  return {
    isFirstTime,
    loading,
    days,
    holidays,
    processing,
    daysClosed,
    addDays,
    removeDay,
    saveOptions,
    addHoliday,
    removeHoliday,
    handlerDate,
  };
});
