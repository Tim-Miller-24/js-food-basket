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
        }, 70)
    } else if (headerTimer.innerHTML < 100) {
        setTimeout(function () {
            lvlTimer();
        }, 135)
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
        },
        img: "images/product2.jpg"
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
        },
        img: "images/product1.jpg"
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
        },
        img: "images/product3.jpg"
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
    // hasAttribute("name") - вернет true, если есть
    // setAttribute("name", "value") - изменить значение атрибута
    // removeAttribute("name") - удаляет атрибут
    // getAttribute("name") - вернет его значение

    const parent = element.closest('.main__product');
    const parentId = parent.getAttribute("id");
    const elemSymbol = element.getAttribute("data-symbol");

    if (elemSymbol == "+" && products[parentId].amount < 10) {
        products[parentId].amount++
    } else if (elemSymbol == "-" && products[parentId].amount > 0) {
        products[parentId].amount--
    }

    const out = parent.querySelector(".main__product-num"); // кол-во товара

    const Lastprice = parent.querySelector(".main__product-price span"); // цена

    const kcall = parent.querySelector(".main__product-kcall span") // калории

    out.innerHTML = products[parentId].amount;

    Lastprice.innerHTML = products[parentId].Sum;

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
    const parent = element.closest(".main__product"); // узнаем родителя

    const parentId = parent.getAttribute("id"); // id секции

    const elAtr = element.getAttribute("data-extra");

    const Lastprice = parent.querySelector(".main__product-price span"); // цена

    const kcall = parent.querySelector(".main__product-kcall span") // калории

    products[parentId][elAtr] = element.checked;

    if (products[parentId][elAtr] == true) {
        products[parentId].price += extraProducts[elAtr].price;
        products[parentId].kcall += extraProducts[elAtr].kcall;
    } else {
        products[parentId].price -= extraProducts[elAtr].price;
        products[parentId].kcall -= extraProducts[elAtr].kcall;
    }

    Lastprice.innerHTML = products[parentId].Sum;

    kcall.innerHTML = products[parentId].Kcall;
}



// заказать

const addCart = document.querySelector('.addCart');

const reciept = document.querySelector('.receipt'); // modal window

const receiptWindow = document.querySelector('.receipt__window'); // check form

const receiptOut = document.querySelector('.receipt__window-out') // check desc

const receiptBtn = document.querySelector('.receipt__window-btn') // check btn


let totalName = "";
let totalPrice = 0;
let totalKcall = 0;

const arrProducts = []


addCart.addEventListener("click", function () {
    for (const key in products) {
        const prObj = products[key];

        if (prObj.amount > 0) {
            arrProducts.push(prObj); // добавляем выбранный продукт в массив
            for (const infoKey in prObj) {      // перебор ключей продукта
                if (prObj[infoKey] === true) {     // доп. ингредиенты
                    prObj.name += "\n" + extraProducts[infoKey].name;
                }

                prObj.price = prObj.Sum;
                prObj.Kcall = prObj.Kcall;
            }
        }

        for (let i = 0; i < arrProducts.length; i++) {
            const el = arrProducts[i];

            totalPrice += el.price;
            totalKcall += el.kcall;
            totalName += "\n" + el.name + "\n";
        }
    }

    receiptOut.innerHTML = `Вы купили: \n ${totalName} \nКалорийность: ${totalKcall}
    \nСтоимость покупки: ${totalPrice}`;

    reciept.style.display = "flex";

    reciept.style.opacity = "1";

    receiptWindow.style.top = "0";
})









// Даблкик по картинке

const mainProdBlock = document.querySelectorAll('.main__product-info');

const view = document.querySelector('.view');     // окно с картинкой

const viewCloseBtn = document.querySelector('.view__close');        // кнопка закрытия окна

for (let j = 0; j < mainProdBlock.length; j++) {
    mainProdBlock[j].addEventListener("dblclick", function () {
        WindView(this);
    })
}

function WindView(el) {
    const parent = el.closest(".main__product"); // узнаем родителя

    const parentId = parent.getAttribute("id"); // id секции

    const windImg = document.querySelector('.view img'); // img в окне

    windImg.setAttribute("src", products[parentId].img);

    view.classList.add("active");

}

viewCloseBtn.addEventListener("click", function () {
    view.classList.remove("active");
})