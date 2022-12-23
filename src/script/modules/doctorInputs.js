const doctorInputs={
    dentist:{
      'form-1':{
        id:'visitDate',
        name:'date',
        type:'date',
        'label-text':'Date of last visit:',
        'data-doctor':"dentist"
      }
    },
    therapist:{
      'form-1':{
        id:"visitAge",
        name:'age',
        type:"text",
        'label-text':'Age:',
        'data-doctor':"dentist"
      }
    },
    cardiologist:{
      'form-4':{
        id:"visitAge",
        name:'age',
        type:"text",
        'label-text':'Age:',
        'data-doctor':"cardiologist"
      },
      'form-1':{
        id:"visitPressure",
        name:'pressure',
        type:"text",
        'label-text':'Normal pressure::',
        'data-doctor':"cardiologist"
      },
      'form-2':{
        id:"visitBMI",
        name:'bmi',
        type:"text",
        'label-text':'Body mass index:',
        'data-doctor':"cardiologist"
      },
      'form-3':{
        id:"visitDiseases",
        name:'diseases',
        type:"text",
        'label-text':'Past diseases of the cardiovascular system:',
        'data-doctor':"cardiologist"
      },
      
    }
  };

export default function creatInputs (doctor) {
  let htmlText = '';
  for (const doctortype in doctorInputs) {
    if (doctortype === doctor) {
      for (const form in doctorInputs[doctortype]) {
        htmlText += `<div class="mb-3" data-doctor="${doctorInputs[doctortype][form]['data-doctor']}"><label for="${doctorInputs[doctortype][form].id}" class="col-form-label">${doctorInputs[doctortype][form]['label-text']}</label><input type="${doctorInputs[doctortype][form].type}" class="form-control" name="${doctorInputs[doctortype][form].name}" id="${doctorInputs[doctortype][form].id}" required/><div class="invalid-feedback">
        Field is mandatory
      </div></div>`
      }
    }    
  }
  return htmlText
}

