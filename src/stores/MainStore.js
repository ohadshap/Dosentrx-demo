import { observable, action, computed } from 'mobx';

export class MainStore {
    @observable PatientId
    @observable PatientName
    @observable PatientPhone
    @observable stage = 0

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

}