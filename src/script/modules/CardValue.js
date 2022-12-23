// import fetchGetCard from "../async methods/fetchGetCard.js";
export default class CardValue {
  constructor(node) {
        this.node = node,
      this.doctor = this.findValue('doctor'),
      this.purpose = this.findValue('purpose'),
      this.urgency = this.findValue('urgency'),
      this.brief = this.findValue('brief'),
      this.name = this.findValue('name'),
      this.date = this.findValue('date'),
      this.age = this.findValue('age'),
      this.pressure = this.findValue('pressure'),
      this.bmi = this.findValue('bmi'),
      this.diseases = this.findValue('diseases'),
      this.id = this.findId('id');
  }
  findValue(input) {
    console.log(input);
    if (input === "doctor" || input === "name") {
      
      let value = this.node.querySelector(`[data-card-info="${input}"]`
      );
      console.log(value);
      return value.innerHTML;
    } else {
      let value = this.node.querySelector(
        `.list-group-item[data-card-info="${input}"]`
      );
      console.log(value);
      if (value === null){
        return
      }
      return value.innerHTML.split(": ")[1];
    }
  }
  findId() {
    let id = this.node.getAttribute(`data-card-id`);
    return id;
  }
}
