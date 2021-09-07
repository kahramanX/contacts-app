class Person {
    constructor(name, surname, email) {
        this.name = name;
        this.surname = surname;
        this.email = email;
    }
}

class Screen {
    constructor() {
        this.name = document.getElementById("Name");
        this.surname = document.getElementById("Surname");
        this.email = document.getElementById("Email");
        this.addUpdateButton = document.getElementsByClassName("submit-btn")[0];
        this.form = document.getElementById("form").addEventListener("submit", this.saveUpdate.bind(this));
        this.tableElement = document.querySelector(".person-list");
        this.tableElement.addEventListener("click", this.buttonFinder.bind(this));
        this.inputElement = document.getElementsByTagName("input");
        this.trElement = document.getElementsByTagName("tr").addEventListener("click", this.buttonFinder.bind(this));
        // this.repo = new Repo();
    }

    clearInput() {
        let clearArr = Array.from(this.inputElement);
        clearArr.forEach(arr => arr.value = "");
    }

    buttonFinder(e) {
        let clicked = e.target;

        if (clicked.classList.contains("delete-btn")) {

            console.log("delete worked");
            clicked.parentElement.parentElement.remove();

        }
        if (clicked.classList.contains("edit-btn")) {

            console.log("edit worked");

            this.addUpdateButton.textContent = "New Update";
            this.runEditButton(clicked);
            
        }

    }

    runEditButton(e) {
        let clicked = e;
        let tr = e.parentElement.parentElement.children;
        let arrTr = Array.from(tr);
        let popped = arrTr.pop();

        let newArr = [];
        arrTr.forEach(arr =>
            newArr.push(arr.innerHTML));

            console.log(clicked);
        this.addToInput(newArr, clicked);
    }

    addToInput(values, clicked) {

        console.log(values);
        let input = Array.from(this.inputElement);
        console.log(input);

        values.forEach((value, index) => {
            input[index].value = value;
        })

        clicked.parentElement.parentElement.remove();

    }

    saveUpdate(e) {
        e.preventDefault();
        console.log("its worked");

        const person = new Person(this.name.value, this.surname.value, this.email.value);
        let result = Util.freeSpacesCheck(person.name, person.surname, person.email);

        // Tüm alanlar kontrol
        if (result) {
            console.log("Başarılı");
            this.addPersonToScreen(person);
            this.clearInput();
            this.addUpdateButton.textContent = "SAVE";

            // this.repo.addPerson();
        } else {
            console.log("Boş alan var");
        }
    }

    addPersonToScreen(person) {

        let createElement = `
        <tr>
        <td>${person.name}</td>
        <td>${person.surname}</td>
        <td>${person.email}</td>
        <td> 
            <button class="edit-btn"><i class="far fa-edit"></i></button>
            <button class="delete-btn"><i class="far fa-trash-alt"></i></button>
        </td>
        </tr>`;

        this.tableElement.innerHTML += createElement;
    }

    deletePersonFromList() {

    }
}

class Util {
    static freeSpacesCheck(...spaces) {
        let result = true;

        spaces.forEach(space => {
            if (space.length === 0) {
                result = false;
                return false;
            }
        });
        return result;
    }
}

// screen class'ının çalışmasını sağlıyor
document.addEventListener("DOMContentLoaded", function (e) {
    const screen = new Screen();
})