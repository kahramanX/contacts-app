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
        this.addUpdateButton = document.getElementsByClassName("submit-btn");
        this.form = document.getElementById("form").addEventListener("submit", this.saveUpdate.bind(this));
        this.personList = document.querySelector(".person-list");
        this.tableElement = document.getElementsByTagName("table")[0];
        this.repo = new Repo();
        console.log(this.tableElement);

    }

    saveUpdate(e) {
        e.preventDefault();
        console.log("its worked");

        const person = new Person(this.name.value, this.surname.value, this.email.value);
        let result = Util.freeSpacesCheck(person.name, person.surname, person.email);

        console.log(person.name);
        console.log(person.surname);
        console.log(person.email);

        // Tüm alanlar kontrol
        if (result) {
            console.log("Başarılı");
            this.addPersonToScreen(person)
            this.repo.addPerson();
        }else{
            console.log("Boş alan var");
        }
    }

    addPersonToScreen(person){

        let createElement=`
        <tr>
        <td>${person.name}</td>
        <td>${person.surname}</td>
        <td>${person.email}</td>
        <td> 
            <button class="edit-btn"><i class="far fa-edit"></i></button>
            <button class="delete-btn"><i class="far fa-trash-alt"></i></button>
        </td>
        </tr>`;

        this.tableElement.lastChild.innerHTML += createElement;

    }
}

class Util{
    static freeSpacesCheck(...spaces){
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

class Repo {
    constructor() {
        this.allPerson = this.bringDatas();
    }

    bringDatas() {
        let allPersonLocale;

        if (localStorage.getItem("allPerson") == null) {

            allPersonLocale = [];

        } else {
            allPersonLocale = JSON.parse(localStorage.getItem("allPerson"));
        }

        return allPersonLocale;
    }

    addPerson(person) {
        const allPersonLocale = this.bringDatas();

        allPersonLocale.push(person);

        localStorage.setItem("allPerson", JSON.stringify(allPersonLocale));
    }
}

// screen class'ının çalışmasını sağlıyor
document.addEventListener("DOMContentLoaded", function (e) {
    const screen = new Screen();
})