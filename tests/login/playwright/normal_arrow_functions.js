import { test } from '@playwright/test';

test('this keyword scenarios in Playwright', async ({ page }) => {

  console.log("===== 1. Object method: normal vs arrow =====");

  const obj = {
    name: "Ganesh",

    normal: function () {
      console.log("normal:", this.name); // Ganesh
    },

    arrow: () => {
      console.log("arrow:", this.name); // undefined
    }
  };

  obj.normal();
  obj.arrow();


  console.log("\n===== 2. Losing this when function is extracted =====");

  const user = {
    name: "Ganesh",
    greet: function () {
      console.log("greet:", this.name);
    }
  };

  const fn = user.greet;
  fn(); // undefined

  // Fix using bind
  const fnBind = user.greet.bind(user);
  fnBind(); // Ganesh


  console.log("\n===== 3. setTimeout normal vs arrow =====");

  const timerObj = {
    name: "Ganesh",

    normal: function () {
      setTimeout(function () {
        console.log("setTimeout normal:", this.name); // undefined
      }, 500);
    },

    arrow: function () {
      setTimeout(() => {
        console.log("setTimeout arrow:", this.name); // Ganesh
      }, 500);
    }
  };

  timerObj.normal();
  timerObj.arrow();


  console.log("\n===== 4. Class (POM) usage =====");

  class LoginPage {
    constructor(page) {
      this.page = page;
    }

    async normalMethod() {
      console.log("normalMethod page exists:", this.page !== undefined);
    }

    arrowMethod = async () => {
      console.log("arrowMethod page exists:", this.page !== undefined);
    };
  }

  const loginPage = new LoginPage(page);

  await loginPage.normalMethod(); // true
  await loginPage.arrowMethod();  // true (works but not preferred)


  console.log("\n===== 5. Extracting class method =====");

  const extracted = loginPage.normalMethod;
  await extracted(); // ❌ this lost → error or undefined

  // Fix
  const fixed = loginPage.normalMethod.bind(loginPage);
  await fixed(); // works


  console.log("\n===== 6. Arrow inherits this from class =====");

  class Example {
    constructor() {
      this.value = "Hello";
    }

    test() {
      const inner = () => {
        console.log("inner arrow:", this.value); // Hello
      };
      inner();
    }
  }

  const ex = new Example();
  ex.test();


  console.log("\n===== 7. Global this behavior =====");

  var name = "Global";

  const globalArrow = () => {
    console.log("global arrow:", this.name); // Global (in non-strict browser)
  };

  globalArrow();


  console.log("\n===== 8. Playwright test block (arrow) =====");

  console.log("test block this:", this); // undefined


  console.log("\n===== END OF DEMO =====");

});