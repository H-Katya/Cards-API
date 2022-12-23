export default class Visit {
  constructor() {
    this.additionalInputs = {
      dentist: {
        date: "date",
      },
      therapist: {
        age: "age",
      },
      cardiologist: {
        age: "age",
        bmi: "bmi",
        diseases: "diseases",
        pressure: "pressure",
      },
      all: {
        age: "age",
        bmi: "bmi",
        diseases: "diseases",
        pressure: "pressure",
        date: "date",
      },
    };
  }
  showInputs(doctor) {
    for (const doctorType in this.additionalInputs) {
      if (doctor === doctorType) {
        for (const key in this.additionalInputs[doctorType]) {
          let input = document.querySelector(`[data-visit="${key}"]`);
          input.parentElement.classList.remove("d-none");
          if (!input.hasAttribute("required")) {
            input.setAttribute("required", true);
          }
        }
      }
    }
  }
  hideInputs() {
    for (const key in this.additionalInputs.all) {
      let input = document.querySelector(`[data-visit="${key}"]`);
      if (input.hasAttribute("required")) {
        input.removeAttribute("required");
      }
      if (!input.parentElement.classList.contains("d-none")) {
        input.parentElement.classList.add("d-none");
      }
    }
  }
}