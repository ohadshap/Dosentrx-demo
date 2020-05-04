import { observable, action, computed } from 'mobx';
import data from './Disease.json'
import tips from './Tips.json'

export class MainStore {
    @observable Diseases = [...data]
    @observable curKinds
    @observable curDisease
    @observable relevantKind
    @observable PatientId
    @observable PatientName
    @observable PatientPhone
    @observable stage = 0
    @observable symptoms
    @observable allMeds = ["Xeljanz", "Otezla", "Lasix", "Digoxin", "Entresto"]
    @observable Meds = []
    @observable allTips = [...tips]
    @observable Tips = []

    @action setPatient = (id, name, num) => {
        this.PatientId = id
        this.PatientName = name
        this.PatientPhone = num
    }

    @action goNext = () => {
        this.stage++
    }

    @action goHome = () => {
        this.curKinds = null
        this.relevantKind = null
        this.PatientId = null
        this.PatientName = null
        this.PatientPhone = null
        this.Meds = []
        this.Tips = []
        this.stage = 0
    }

    @action setCurDisease = (diseaseTitle) => {
        for(let des of this.Diseases) {
            if(des.title === diseaseTitle) {
                this.curKinds = des.kinds
                this.curDisease = des.title
                return des.kinds
            }
        }
    }

    @action setCurKind = (kindName) => {
        for(let kind of this.curKinds) {
            if(kind.name === kindName) {
                this.relevantKind = kind
                console.log(kind)
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

    @action addTip = (newTips, med) => {
        for(let t of newTips) {
            console.log(t)
            let theTip = {name: t.name, med: med}
            this.Tips.push(theTip)
        }
        
        
    }

}