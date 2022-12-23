import Visit from "./Visit.js";

export default class VisitDentist extends Visit {
  constructor(obj,formNode) {
    super()
    this.form = formNode,
      this.id = obj.id,
      this.doctor = obj.doctor,
      this.purpose = obj.purpose,
      this.urgency = obj.urgency,
      this.brief = obj.brief,
      this.name = obj.name,
      this.date = obj.date,
      this.status = obj.status
  }
  creatNode() {
    const newNode = document.createElement("li");
    newNode.classList.add("col-sm-3");
    newNode.classList.add("mt-2");
    newNode.innerHTML = `
        <div class="card" data-card="${this.id}" data-urgency="${this.urgency}" data-status="${this.status}" data-name="${this.name}">
          <div class="card-body">
          <button
                    type="button"
                    value=""
                    class="btn-close btn-remove"
                    aria-label="Close"
                  ></button>
            <h5 class="card-title text-capitalize">${this.name}</h5>
            <h6 class="card-text text-capitalize">${this.doctor}</h6>

              <ul class="collapse multi-collapse list-group list-group-flush mb-2" id="collapse${this.id}">
                <li class="list-group-item">Visit status: ${this.status}</li>
                <li class="list-group-item">Purpose of the visit: ${this.purpose}</li>
                <li class="list-group-item">Brief description of the visit: ${this.brief}</li>
                <li class="list-group-item">Urgency: ${this.urgency}</li>
                <li class="list-group-item">Date of last visit:  ${this.date}</li>
              </ul>
            <div class="d-grid gap-3 d-md-block">
            <button
                class="btn btn-secondary btn-sm"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse${this.id}"
                aria-expanded="false"
                aria-controls="collapse${this.id}"
              >
                More
              </button>
              <button
                      class="btn btn-outline-warning btn-sm"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#visitModal"
                    >
                    Edit
                    </button>
            </div>
          </div>
        </div>
      `;
    return newNode;
  }
  editNode() {
    const removeNode = document.querySelector(`[data-card="${this.id}"]`)
    removeNode.parentElement.remove()
    const newNode = document.createElement("li");
    newNode.classList.add("col-sm-3");
    newNode.classList.add("mt-2");
    newNode.innerHTML = `
    <div class="card " data-card="${this.id}" data-urgency="${this.urgency}" data-status="${this.status}">
      <div class="card-body">
      <button
                type="button"
                value=""
                class="btn-close btn-remove"
                aria-label="Close"
              ></button>
        <h5 class="card-title text-capitalize">${this.name}</h5>
        <h6 class="card-text text-capitalize">${this.doctor}</h6>
          <ul class="collapse multi-collapse list-group list-group-flush mb-2" id="collapse${this.id}">
            <li class="list-group-item">Purpose of the visit: ${this.purpose}</li>
            <li class="list-group-item">Brief description of the visit: ${this.brief}</li>
            <li class="list-group-item">Urgency: ${this.urgency}</li>
            <li class="list-group-item">Date of last visit:  ${this.date}</li>
          </ul>
        <div class="d-grid gap-3 d-md-block">
        <button
            class="btn btn-secondary btn-sm"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse${this.id}"
            aria-expanded="false"
            aria-controls="collapse${this.id}"
          >
            More
          </button>
          <button
                  class="btn btn-outline-warning btn-sm"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#visitModal"
                >
                Edit
                </button>
        </div>
      </div>
    </div>
  `;
    return newNode;
  }
  fillForm(){
    this.showInputs(this.doctor)
    this.form.doctor.value=this.doctor;
    this.form.status.value=this.status;
    this.form.purpose.value=this.purpose;
    this.form.urgency.value=this.urgency;
    this.form.brief.value=this.brief;
    this.form.name.value=this.name;
    this.form.date.value=this.date;
    this.form.setAttribute('data-id',`${this.id}`)
    const createButton = document.querySelector("#visit-submit");
    createButton.classList.add('d-none');
    const editButton = document.querySelector("#visit-edit");
    editButton.classList.remove('d-none');
  }
}
