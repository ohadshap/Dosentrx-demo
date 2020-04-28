import { observable, action } from "mobx";


export class Inputs {
    @observable name
    @observable num
    @observable pId

    @action handleInput = (name, val) => {
        // console.log(name);
        // console.log(val);
        this[name] = val
    }
}