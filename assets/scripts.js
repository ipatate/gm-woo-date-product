import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import locale from "flatpickr/dist/l10n/fr.js";

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("gm-woo-date-product-wrapper");
  const bt = document.querySelector(".single_add_to_cart_button");
  const dateInput = document.getElementById("gm-datepicker-product");

  if (wrapper) {
    const defaultDate = wrapper.dataset.value;
    const settings = window.gm_date_product_settings;
    // holidays
    const periodes = settings.holidays.map((h) => {
      const from = new Date(h.start);
      const to = new Date(h.end);
      return {
        from: `${String(from.getDate()).padStart(2, "0")} ${String(
          from.getMonth() + 1
        ).padStart(2, "0")} ${from.getFullYear()}`,
        to: `${String(to.getDate()).padStart(2, "0")} ${String(
          to.getMonth() + 1
        ).padStart(2, "0")} ${to.getFullYear()}`,
      };
    });
    // bank days
    const days = settings.days.map((d) => {
      const dt = new Date(d);
      return `${String(dt.getDate()).padStart(2, "0")} ${String(
        dt.getMonth() + 1
      ).padStart(2, "0")} ${dt.getFullYear()}`;
    });

    flatpickr("#gm-datepicker-product", {
      locale: locale.fr,
      altFormat: "d m Y",
      dateFormat: "d m Y",
      minDate: new Date().fp_incr(+settings.processing),
      defaultDate,
      // maxDate: new Date().fp_incr(14), // 14 days from now
      disable: [
        function (date) {
          // return true to disable
          return settings.daysClosed.includes(date.getDay());
        },
        ...periodes,
        ...days,
      ],
    });

    // observe btn class
    const observer = new MutationObserver(function (event) {
      if (
        dateInput.value !== "" &&
        bt.classList.contains("disabled") === false
      ) {
        bt.removeAttribute("disabled");
      } else {
        bt.setAttribute("disabled", "true");
      }
    });

    observer.observe(bt, {
      attributes: true,
      attributeFilter: ["class"],
      childList: false,
      characterData: false,
    });

    // observe input date
    if (dateInput) {
      dateInput.addEventListener("input", (e) => {
        const elem = e.currentTarget;
        if (elem.value !== "" && bt.classList.contains("disabled") === false) {
          bt.removeAttribute("disabled");
        } else {
          bt.setAttribute("disabled", "true");
        }
      });
    }
    const e = new Event("input");
    dateInput.dispatchEvent(e);
  }
});
