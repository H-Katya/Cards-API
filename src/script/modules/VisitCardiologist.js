import Visit from "./Visit.js";


export default class VisitCardiologist extends Visit{
    constructor(doctor,purpose,urgency,brief,name,age,pressure,bmi,diseases,id){
        super(doctor,purpose,urgency,brief,name,age,pressure,bmi,diseases,id)
        this.age = age,
        this.pressure = pressure,
        this.bmi = bmi,
        this.diseases = diseases,
        this.id=id
    }
    creatNode(){
        const newNode = document.createElement('li')
        newNode.classList.add('col-sm-3')
        newNode.classList.add('mt-2')
        newNode.innerHTML = `
        <div class="card " data-card="${this.id}" data-urgency="${this.urgency}">
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
                <li class="list-group-item">Age: ${this.age}</li>
                <li class="list-group-item">Normal pressure: ${this.pressure}</li>
                <li class="list-group-item">Body mass index: ${this.bmi}</li>
                <li class="list-group-item">Past diseases of the cardiovascular system: ${this.diseases}</li>
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
                    >
                    Edit
                    </button>
            </div>
          </div>
        </div>
      `
        return newNode
    }
}
