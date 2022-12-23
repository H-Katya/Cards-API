
export default class PatientInfo{
    constructor(doctor,purpose,urgency,brief,name,date,age,pressure,bmi,diseases){
        this.doctor = doctor,
        this.purpose = purpose,
        this.urgency = urgency,
        this.brief = brief,
        this.name = name,
        this.date = date,
        this.age = age,
        this.pressure = pressure,
        this.bmi = bmi,
        this.diseases = diseases
    }
    cleanObj(){
        for (const key in this) {
            if (this[key] === undefined) {
              delete this[key]
            }
        }
    }
    
}