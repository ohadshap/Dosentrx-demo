import { observable, action, computed } from 'mobx';
import data from './Disease.json'

export class MainStore {
    @observable Diseases = [...data]
    @observable curKinds
    @observable relevantKind
    @observable PatientId
    @observable PatientName
    @observable PatientPhone
    @observable stage = 0
    @observable symptoms
    @observable allMeds = ["Xeljanz", "Otezla", "Lasix", "Digoxin", "Entresto"]
    @observable Meds = []

    @action setPatient = (id, name, num) => {
        this.PatientId = id
        this.PatientName = name
        this.PatientPhone = num
    }

    @action goNext = () => {
        this.stage++
    }

    @action goHome = () => {
        this.stage = 0
    }

    @action setCurDisease = (diseaseTitle) => {
        for(let des of this.Diseases) {
            if(des.title === diseaseTitle) {
                this.curKinds = des.kinds
                return des.kinds
            }
        }
    }

    @action setCurKind = (kindName) => {
        for(let kind of this.curKinds) {
            if(kind.name === kindName) {
                this.relevantKind = kind
                return kind
            }
        }
    }

    @action setSymptoms = (arr) => {
        this.symptoms = arr
    }

    @action addMed = (newMed) => {
        if(this.allMeds.includes(newMed) ){
            console.log(newMed)
            this.Meds.push(newMed)
        }
    }

}