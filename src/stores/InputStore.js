import { observable, action } from "mobx";


export class Inputs {
    @observable name
    @observable num
    @observable pId

    @observable disease
    @observable diseaseKind

    @observable med
    @observable tip

    @action handleInput = (name, val) => {
        console.log(name);
        console.log(val);
        this[name] = val
    }
}