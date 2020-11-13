/* const user = {
    name: "Вася",
    surName: "Васильев",
    get fullname() {
        return `${this.name} ${this.surName}`;
    },
    set fullname(value) {
        let arr = value.split(' ');
        this.name = arr[0];
        this.surName = arr[1];
    }
 }
 console.log(user.fullname);
 user.fullname = 'Петя Петров'

 console.log(user.fullname);
*/

const headerTimer = document.querySelector('.header__timer-extra');

function lvlTimer() {
    headerTimer.innerHTML++

    if (headerTimer.innerHTML < 50) {
        setTimeout(function () {
            lvlTimer();
        }, 130)
    } else if (headerTimer.innerHTML < 100) {
        setTimeout(function () {
            lvlTimer();
        }, 70)
    }
}
lvlTimer()


const products = {
    plainBurger: {
        name: 'Гамбургер простой',
        kcall: 400,
        price: 10000,
        amount: 0,
        get Sum() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        kcall: 500,
        price: 20500,
        amount: 0,
        get Sum() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        kcall: 700,
        price: 31900,
        amount: 0,
        get Sum() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
}

// объект ингредиентов
const extraProducts = {
    doubleMayonnaise: {
        name: "Двойной майонез",
        kcall: 50,
        price: 500,
    },
    lettuce: {
        name: "Салатный лист",
        kcall: 10,
        price: 300,
    },
    cheese: {
        name: "Сыр",
        kcall: 30,
        price: 400,
    }
}

// ------------------- подключаемся к + и -
const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');

for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener("click", function () {
        plusOrMinus(this)
    })
}


// closest() - возвращает родителя
function plusOrMinus(element) {
    const parent = element.closest('.main__product');
    // hasAttribute("name") - вернет true, если есть
    // setAttribute("name", "value") - изменить значение атрибута
    // removeAttribute("name") - удаляет атрибут
    // getAttribute("name") - вернет его значение

    const parentId = parent.getAttribute("id");
    const elemSymbol = element.getAttribute("data-symbol");

    if (elemSymbol == "+" && products[parentId].amount < 10) {
        products[parentId].amount++
    } else if (elemSymbol == "-" && products[parentId].amount > 0) {
        products[parentId].amount--
    }

    const out = parent.querySelector(".main__product-num"); // кол-во товара

    const prise = parent.querySelector(".main__product-price span"); // цена

    const kcall = parent.querySelector(".main__product-kcall span") // калории

    out.innerHTML = products[parentId].amount;

    prise.innerHTML = products[parentId].Sum;

    kcall.innerHTML = products[parentId].Kcall;
}


// ---------------------  чекбоксы ингредиентов
const checkExtraProducts = document.querySelectorAll('.main__product-checkbox');

for (let x = 0; x < checkExtraProducts.length; x++) {
    checkExtraProducts[x].addEventListener("click", function () {
        addExtraProduct(this);
    })
}

function addExtraProduct(element) {
    const parent = element.closest(".main__product");

    const parentId = parent.getAttribute("id");

    const elAtr = element.getAttribute("data-extra");

}