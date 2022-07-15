class Login {
    constructor() {
    }

    validateInputs() {
        let inputArray = document.querySelector('form');
        let requiredElements = inputArray.querySelector('[required]');
        console.log(requiredElements);
    }
}