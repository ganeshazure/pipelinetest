/********************************************************************
 🧠 NORMAL FUNCTION vs ARROW FUNCTION (DEEP DEBUGGING FILE)
********************************************************************/

/********************************************************************
 1️⃣ BASIC DIFFERENCE
********************************************************************/

const obj1 = {
  name: 'Ganesh',

  normalFunc: function () {
    console.log('Normal Function this.name:', this.name); // ✅ Ganesh
  },

  arrowFunc: () => {
    console.log('Arrow Function this.name:', this.name); // ❌ undefined
  }
};

obj1.normalFunc();
obj1.arrowFunc();

/*
OUTPUT:
Normal Function this.name: Ganesh
Arrow Function this.name: undefined

WHY?
Normal → called by obj → this = obj
Arrow → created in global → this = global
*/


/********************************************************************
 2️⃣ PROBLEM: LOST `this` IN CALLBACK (setTimeout)
********************************************************************/

const obj2 = {
  name: 'Ganesh',

  show: function () {
    console.log('\nInside show() this.name:', this.name);

    setTimeout(function () {
      console.log('setTimeout Normal Function:', this.name); // ❌ undefined
    }, 1000);
  }
};

obj2.show();

/*
WHY?
setTimeout calls function
→ NOT obj2
→ this = global
*/


/********************************************************************
 3️⃣ SOLUTION: USE ARROW FUNCTION
********************************************************************/

const obj3 = {
  name: 'Ganesh',

  show: function () {
    setTimeout(() => {
      console.log('setTimeout Arrow Function:', this.name); // ✅ Ganesh
    }, 2000);
  }
};

obj3.show();

/*
WHY?
Arrow does NOT create new this
→ uses parent (show)
→ this = obj3
*/


/********************************************************************
 4️⃣ WHO CALLS THE FUNCTION?
********************************************************************/

function greet() {
  console.log('\nGreet this.name:', this.name);
}

greet(); // ❌ undefined

const user = { name: 'Ganesh' };

/*
WHY?
greet() → no object → this = global
*/


/********************************************************************
 5️⃣ FIX USING call()
********************************************************************/

greet.call(user); // ✅ Ganesh

/*
call(user)
→ manually sets this = user
*/


/********************************************************************
 6️⃣ APPLY (SIMILAR TO CALL)
********************************************************************/

function sum(a, b) {
  console.log('\nSum:', this.name, a + b);
}

sum.apply(user, [2, 3]); // Ganesh 5

/*
apply → same as call
→ arguments passed as array
*/


/********************************************************************
 7️⃣ BIND (VERY IMPORTANT)
********************************************************************/

function log() {
  console.log('\nLog this.name:', this.name);
}

setTimeout(log, 3000); // ❌ undefined

/*
WHY?
setTimeout calls function
→ no object → this = global
*/


// ✅ Fix using bind
const boundLog = log.bind(user);

setTimeout(boundLog, 4000); // ✅ Ganesh

/*
bind(user)
→ returns new function
→ permanently attaches this
*/


/********************************************************************
 8️⃣ PLAYWRIGHT STYLE EXAMPLE (SIMULATION)
********************************************************************/

function simulateTest(callback) {
  console.log('\nRunning test...');
  callback();
}

// ❌ Problem (normal function)
simulateTest(function () {
  console.log('Normal callback this:', this); // ❌ unexpected
});

// ✅ Correct (arrow function)
simulateTest(() => {
  console.log('Arrow callback this:', this); // ✅ stable
});


/********************************************************************
 9️⃣ CLASS / POM PROBLEM
********************************************************************/

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  // ❌ Problem
  loginWrong() {
    setTimeout(function () {
      console.log('\nWrong this.page:', this.page); // ❌ undefined
    }, 5000);
  }

  // ✅ Correct
  loginCorrect() {
    setTimeout(() => {
      console.log('Correct this.page:', this.page); // ✅ works
    }, 6000);
  }
}

const pageObj = new LoginPage('Playwright Page');

pageObj.loginWrong();
pageObj.loginCorrect();


/********************************************************************
 🔥 FINAL SUMMARY
********************************************************************/

console.log(`
==================================================
🎯 FINAL RULES

1. Normal Function:
   this = WHO CALLS

2. Arrow Function:
   this = WHERE CREATED

3. Use Normal Function:
   ✔ Object methods
   ✔ Classes

4. Use Arrow Function:
   ✔ Callbacks (setTimeout, promises)
   ✔ Playwright tests
   ✔ Async operations

5. call():
   → sets this immediately

6. apply():
   → same as call (args as array)

7. bind():
   → returns new function with fixed this

==================================================
`);