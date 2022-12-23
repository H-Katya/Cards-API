import Visit from "./Visit.js";


export default class VisitTherapist extends Visit{
    constructor(doctor,purpose,urgency,brief,name,age,id){
        super(doctor,purpose,urgency,brief,name,age,id)
        this.age = age,
        this.id=id
    }
    creatNode(){
        const newNode = document.createElement('li')
        newNode.classList.add('col-sm-3')
        newNode.innerHTML = `
        <div class="card" data-card="${this.id}" data-urgency="${this.urgency}">
          <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            <h6 class="card-text">${this.doctor}</h6>
            <div class="collapse" id="collapseExample${this.id}">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Purpose of the visit: ${this.purpose}</li>
                <li class="list-group-item">Brief description of the visit: ${this.brief}</li>
                <li class="list-group-item">Urgency: ${this.urgency}</li>
                <li class="list-group-item">Age: ${this.age}</li>
              </ul>
            </div>
              <button
                class="btn btn-secondary btn-sm"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample${this.id}"
                aria-expanded="false"
                aria-controls="collapseExample${this.id}"
              >
                See more
              </button>
          </div>
        </div>
        `
        return newNode
    }
}