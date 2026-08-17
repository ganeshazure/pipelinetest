/*
===============================================================================
                     JAVASCRIPT vs TYPESCRIPT
              PLAYWRIGHT + TYPESCRIPT STUDENT NOTES
===============================================================================

IMPORTANT:

TypeScript is NOT a completely different language.

TypeScript is basically:

        JavaScript
             +
        Type System
             +
     Additional Features
             =
        TypeScript


We still use JavaScript concepts:

    Variables
    Arrays
    Objects
    Conditions
    Loops
    Functions
    Arrow Functions
    Classes
    Constructors
    Promises
    async / await
    Modules


TypeScript adds:

    Type Annotations
    Type Inference
    Interfaces
    Type Aliases
    Union Types
    readonly
    Access Modifiers
    Generics
    Better IntelliSense
    Compile-time type checking

===============================================================================
*/


// ============================================================================
// 1. JAVASCRIPT - DYNAMIC TYPING
// ============================================================================

/*
JavaScript is dynamically typed.

That means we don't have to tell JavaScript:

    "This variable can contain only numbers."

JavaScript decides the type at runtime.
*/

let jsAge = 30;

console.log(jsAge); // 30

// JavaScript allows us to assign another number
jsAge = 40;

console.log(jsAge); // 40

// JavaScript also allows us to assign a string
jsAge = "Thirty";

console.log(jsAge); // Thirty

// JavaScript also allows a boolean
jsAge = true;

console.log(jsAge); // true


/*
So the same variable can hold:

    number
    ↓
    string
    ↓
    boolean


This flexibility is useful.

BUT...

It can also allow programming mistakes.

For example:

    We thought age would always be a number,
    but somewhere in the program it became a string.

TypeScript helps us prevent this type of mistake.
*/


// ============================================================================
// 2. TYPESCRIPT - STATIC TYPE CHECKING
// ============================================================================

/*
Now TypeScript allows us to tell the compiler:

    "age should contain only numbers."
*/

let tsAge: number = 30;

// This is allowed because 40 is a number
tsAge = 40;


// The following will give a TypeScript error:
//
// tsAge = "Thirty";
//
// Error:
// Type 'string' is not assignable to type 'number'.


/*
IMPORTANT:

The following:

    : number

is called a TYPE ANNOTATION.

We are explicitly telling TypeScript:

    tsAge -> number


So:

    tsAge = 40        ✅
    tsAge = "Thirty"  ❌
    tsAge = true      ❌
*/


// ============================================================================
// 3. TYPE INFERENCE
// ============================================================================

/*
Now comes one of the MOST IMPORTANT TypeScript concepts.

Many beginners think:

    "In TypeScript I have to specify the type everywhere."

NO.

TypeScript can often automatically understand the type.

This is called:

    TYPE INFERENCE
*/


let studentName = "Ganesh";

/*
We did NOT write:

    let studentName: string = "Ganesh";


But TypeScript sees:

    "Ganesh"

and automatically understands:

    studentName -> string
*/


let studentAge = 30;

/*
TypeScript sees:

    30

and understands:

    studentAge -> number
*/


let isTrainer = true;

/*
TypeScript sees:

    true

and understands:

    isTrainer -> boolean
*/


/*
Therefore these are both valid:

EXPLICIT TYPE:

    let age: number = 30;


TYPE INFERENCE:

    let age = 30;


Both result in:

    age -> number


So we don't need to write the type everywhere.
*/


// ============================================================================
// 4. TYPE INFERENCE WITH ARRAYS
// ============================================================================

/*
Look at this:

    let names = ["Ganesh", "Ravi"];


TypeScript looks at the values:

    "Ganesh" -> string
    "Ravi"   -> string


Therefore TypeScript infers:

    names -> string[]
*/


let names = ["Ganesh", "Ravi"];


// Adding a string is allowed
names.push("Kiran");


// The following gives a TypeScript error:
//
// names.push(100);
//
// Why?
//
// Because TypeScript already inferred:
//
// names -> string[]
//
// Therefore:
//
// string -> allowed
// number -> not allowed


console.log(names);


// ============================================================================
// 5. EXPLICIT ARRAY TYPE
// ============================================================================

/*
We can also explicitly tell TypeScript the type of the array.
*/

let employeeNames: string[] = ["Ganesh", "Ravi"];

// String -> allowed
employeeNames.push("Kiran");


// Number -> NOT allowed
//
// employeeNames.push(100);
//
// Error:
//
// Argument of type 'number' is not assignable
// to parameter of type 'string'.


/*
So these two are effectively giving TypeScript the same information:

    let names = ["Ganesh", "Ravi"];

    let names: string[] = ["Ganesh", "Ravi"];


In the first case:

    TypeScript INFERS the type.


In the second case:

    We EXPLICITLY specify the type.
*/


// ============================================================================
// 6. JAVASCRIPT ARRAY vs TYPESCRIPT ARRAY
// ============================================================================

/*
JAVASCRIPT:

    let names = ["Ganesh", "Ravi"];

    names.push("Kiran");  // Allowed

    names.push(100);      // JavaScript allows this


So the array could become:

    ["Ganesh", "Ravi", "Kiran", 100]


Now imagine:

    names.forEach(name => {
        console.log(name.toUpperCase());
    });


JavaScript may fail when it reaches:

    100.toUpperCase()


because numbers don't have toUpperCase().


TYPESCRIPT prevents this earlier.

    let names: string[] = ["Ganesh", "Ravi"];

    names.push(100); // ERROR


This is one of the major benefits of TypeScript.
*/


// ============================================================================
// 7. FUNCTION PARAMETERS
// ============================================================================

/*
This is another VERY IMPORTANT difference.

JavaScript:

    function login(username, password) {
    }


What type is username?

What type is password?

JavaScript doesn't require us to specify.


TypeScript with strict settings can complain:

    Parameter 'username' implicitly has an 'any' type.

    Parameter 'password' implicitly has an 'any' type.
*/


// Correct TypeScript version:

function login(username: string, password: string) {

    console.log("Username:", username);
    console.log("Password:", password);
}


// Correct usage:

login("Ganesh", "Password123");


/*
Now TypeScript knows:

    username -> string
    password -> string


Therefore this is NOT allowed:

    login(100, true);


If you uncomment the below line, VS Code will show an error:

*/

// login(100, true);


/*
WHY?

Because we explicitly defined:

    username: string
    password: string


This is called:

    TYPE ANNOTATION
*/


// ============================================================================
// 8. WHY CAN'T TYPESCRIPT ALWAYS INFER FUNCTION PARAMETERS?
// ============================================================================

/*
Consider:

    function login(username) {
    }


The function is waiting for someone else to provide the value.

For example:

    login("Ganesh");


or:

    login("Ravi");


or:

    login("John");


The value doesn't exist yet when the function is declared.

Therefore TypeScript needs us to define the expected type:

    function login(username: string) {


Think of a function parameter as an INPUT BOX.

        +-------------------+
        |     username      |
        +-------------------+
                 ↑
                 |
           value comes
           from outside


We tell TypeScript:

    "This input box accepts only strings."


Therefore:

    username: string
*/


// ============================================================================
// 9. FUNCTION RETURN TYPE
// ============================================================================

/*
TypeScript can also check what a function returns.
*/

function add(a: number, b: number) {

    return a + b;
}


/*
TypeScript already knows:

    a -> number
    b -> number

Therefore:

    a + b -> number


So TypeScript automatically INFERS:

    return type -> number


We could explicitly write:

*/

function addExplicit(a: number, b: number): number {

    return a + b;
}


/*
Both are valid.

Usually, when TypeScript can clearly infer the return type,
we don't have to explicitly specify it.

So this is common:

    function add(a: number, b: number) {
        return a + b;
    }
*/


// ============================================================================
// 10. ASYNC FUNCTIONS AND Promise<void>
// ============================================================================

/*
Playwright uses async/await heavily.

Example:
*/

async function main() {

    console.log("Running Playwright code...");

}


/*
Because main() is async, it returns a Promise.

Because there is no return value, TypeScript infers:

    Promise<void>


We can explicitly write:

*/

async function mainExplicit(): Promise<void> {

    console.log("Running Playwright code...");

}


/*
Both are valid:

    async function main() {

    }


and:

    async function main(): Promise<void> {

    }


The second version explicitly tells the reader:

    "This async function returns a Promise
     but does not return a value."

In many projects, explicit return types are used when they improve clarity.
*/


// ============================================================================
// 11. ARROW FUNCTIONS
// ============================================================================

/*
JavaScript:

    const add = (a, b) => {
        return a + b;
    };


TypeScript:

    const add = (a: number, b: number) => {
        return a + b;
    };


Again:

    Parameters need type information when TypeScript cannot infer them.

    Return type can often be inferred.
*/


const multiply = (a: number, b: number) => {

    return a * b;

};


/*
TypeScript understands:

    a -> number
    b -> number

Therefore:

    return -> number


We could explicitly write:

*/

const multiplyExplicit = (a: number, b: number): number => {

    return a * b;

};


// ============================================================================
// 12. OBJECTS
// ============================================================================

/*
JavaScript:

    const user = {
        name: "Ganesh",
        age: 30
    };


TypeScript can also infer the structure.
*/

const user = {

    name: "Ganesh",
    age: 30

};


/*
TypeScript understands:

    user.name -> string
    user.age  -> number


Therefore:

    user.name

is valid.


But:

    user.nmae

is not valid because the property does not exist.


If you uncomment this:

*/

// console.log(user.nmae);


/*
VS Code / TypeScript will show an error similar to:

    Property 'nmae' does not exist...


This helps us catch spelling mistakes.
*/


// ============================================================================
// 13. INTERFACE
// ============================================================================

/*
For larger applications/frameworks, we often define
the structure of an object.

This is where INTERFACE becomes useful.
*/

interface User {

    name: string;

    age: number;

    email: string;

}


/*
We are telling TypeScript:

Every User object must contain:

    name  -> string
    age   -> number
    email -> string
*/


const user1: User = {

    name: "Ganesh",

    age: 30,

    email: "ganesh@test.com"

};


/*
Now TypeScript knows the structure of user1.

For example:

    user1.name

is a string.


    user1.age

is a number.


    user1.email

is a string.
*/


// ============================================================================
// 14. WRONG OBJECT DATA
// ============================================================================

/*
The following would produce TypeScript errors:

    const user2: User = {

        name: "Ganesh",

        age: "Thirty",

        email: "test@test.com"

    };


Why?

Because:

    age -> number

but we provided:

    age -> string


Similarly, this would be a problem:

    const user3: User = {

        name: "Ganesh",

        age: 30

    };


because email is required.

This is how TypeScript protects our object structure.
*/


// ============================================================================
// 15. LOOPS - MOSTLY THE SAME AS JAVASCRIPT
// ============================================================================

/*
Very important for students:

TypeScript does NOT replace JavaScript syntax.

The loop syntax is almost exactly the same.
*/

for (let i = 0; i < 5; i++) {

    console.log(i);

}


/*
The above works in both:

    JavaScript
    TypeScript


The main difference is TypeScript can provide type information.
*/


const cities = ["Hyderabad", "Bangalore", "Chennai"];


for (const city of cities) {

    console.log(city);

}


/*
Because:

    cities -> string[]

TypeScript knows:

    city -> string
*/


// ============================================================================
// 16. IF / ELSE
// ============================================================================

/*
The syntax is also the same.
*/

let age = 25;


if (age >= 18) {

    console.log("Adult");

} else {

    console.log("Minor");

}


/*
This is normal JavaScript syntax.

TypeScript does not require a completely different syntax.
*/


// ============================================================================
// 17. SWITCH
// ============================================================================

let browser = "chrome";


switch (browser) {

    case "chrome":

        console.log("Chrome browser");

        break;


    case "firefox":

        console.log("Firefox browser");

        break;


    default:

        console.log("Unknown browser");

}


/*
Again:

    JavaScript syntax
        +
    TypeScript type checking
*/


// ============================================================================
// 18. CLASSES
// ============================================================================

/*
JavaScript class:

    class LoginPage {

        constructor(page) {

            this.page = page;

        }

    }


TypeScript gives us much stronger type information.
*/


/*
Playwright example:

    import { Page } from "@playwright/test";


    class LoginPage {

        page: Page;

        constructor(page: Page) {

            this.page = page;

        }

    }


Now TypeScript knows:

    page -> Playwright Page
*/


// ============================================================================
// 19. constructor(page: Page) - VERY IMPORTANT
// ============================================================================

/*
Let's understand:

    constructor(page: Page)


There are TWO different things here:

    page
    :
    Page


"page" is the variable/parameter name.

"Page" is the TYPE.


So:

    constructor(page: Page)


means:

    "The constructor accepts a parameter named page,
     and that parameter must be a Playwright Page object."


Compare with JavaScript:

    constructor(page)


JavaScript says:

    "Give me something called page."


TypeScript says:

    "Give me something called page,
     and it must be a Playwright Page."


This is the important difference.
*/


// ============================================================================
// 20. WHY PAGE TYPE IS IMPORTANT IN PLAYWRIGHT
// ============================================================================

/*
Suppose:

    constructor(page) {

        this.page = page;

    }


TypeScript doesn't know exactly what page is.


But if we write:

    constructor(page: Page) {

        this.page = page;

    }


TypeScript now knows:

    page -> Playwright Page


Therefore VS Code can provide IntelliSense.

When we write:

    page.


VS Code can suggest Playwright Page methods such as:

    goto()
    click()
    locator()
    title()
    screenshot()
    reload()
    goBack()
    etc.
*/


// ============================================================================
// 21. PLAYWRIGHT TYPES
// ============================================================================

/*
Playwright provides many TypeScript types.

For example:

    Page
    Locator
    Browser
    BrowserContext
    APIRequestContext
    Response
    Request
    etc.


Example import:
*/

/*
import {
    Page,
    Locator,
    Browser,
    BrowserContext
} from "@playwright/test";
*/


/*
Then we can define:

    let page: Page;

    let usernameInput: Locator;

    let browser: Browser;

    let context: BrowserContext;


This tells TypeScript exactly what each object represents.
*/


// ============================================================================
// 22. PAGE OBJECT MODEL - JAVASCRIPT
// ============================================================================

/*
JavaScript POM:
*/

/*

class LoginPage {

    constructor(page) {

        this.page = page;

        this.usernameInput = page.locator("#username");

        this.passwordInput = page.locator("#password");

        this.loginButton = page.locator("#login");

    }


    async navigate() {

        await this.page.goto(
            "https://example.com/login"
        );

    }


    async login(username, password) {

        await this.usernameInput.fill(username);

        await this.passwordInput.fill(password);

        await this.loginButton.click();

    }

}

*/const browser = await chromium.launch({
          headless: false
      });


// ============================================================================
// 23. PAGE OBJECT MODEL - TYPESCRIPT
// ============================================================================

/*
Now let's see the TypeScript version.

*/

import { Page, Locator } from "@playwright/test";


export class LoginPage {

    // page is a Playwright Page object
    readonly page: Page;


    // usernameInput is a Playwright Locator
    readonly usernameInput: Locator;


    // passwordInput is a Playwright Locator
    readonly passwordInput: Locator;


    // loginButton is a Playwright Locator
    readonly loginButton: Locator;


    // Constructor receives a Playwright Page
    constructor(page: Page) {

        // Store the Page object
        this.page = page;


        // Create locator for username field
        this.usernameInput = page.locator("#username");


        // Create locator for password field
        this.passwordInput = page.locator("#password");


        // Create locator for login button
        this.loginButton = page.locator("#login");

    }


    // navigate() is an async method
    async navigate(): Promise<void> {

        // Navigate to login page
        await this.page.goto("https://example.com/login");

    }


    // username and password are strings
    async login(
        username: string,
        password: string
    ): Promise<void> {


        // Enter username
        await this.usernameInput.fill(username);


        // Enter password
        await this.passwordInput.fill(password);


        // Click login button
        await this.loginButton.click();

    }

}


/*
LOOK AT WHAT CHANGED FROM JAVASCRIPT:

JavaScript:

    constructor(page)

TypeScript:

    constructor(page: Page)


JavaScript:

    async login(username, password)

TypeScript:

    async login(
        username: string,
        password: string
    )


JavaScript:

    this.page

TypeScript:

    readonly page: Page


JavaScript doesn't tell us exactly what type these objects are.

TypeScript gives us that information.
*/


// ============================================================================
// 24. WHAT DOES readonly MEAN?
// ============================================================================

/*
Example:

    readonly page: Page;


readonly means:

    "Once this property is assigned,
     don't reassign it later."


We assign it inside constructor:

    this.page = page;


That is allowed.


But later:

    this.page = anotherPage;


would produce a TypeScript error.


In Page Object Model, readonly is useful because:

    page
    usernameInput
    passwordInput
    loginButton


usually should not be accidentally replaced.

*/


// ============================================================================
// 25. PLAYWRIGHT METHOD CHECKING
// ============================================================================

/*
This is another major advantage of TypeScript.

Suppose we write:

*/

const examplePage = {} as Page;


/*
Now TypeScript knows:

    examplePage -> Page


If we write:

    examplePage.goto(...)

VS Code knows that goto() is a Page method.


But if we accidentally write:

    examplePage.got(...)


TypeScript can tell us:

    Property 'got' does not exist on type 'Page'.


This is very useful in large Playwright frameworks.

Without strong typing, many such mistakes may only become obvious
when the test actually runs.
*/


// ============================================================================
// 26. JAVASCRIPT vs TYPESCRIPT - PRACTICAL PROBLEMS
// ============================================================================

/*
PROBLEM 1
---------

JavaScript:

    let names = ["Ganesh", "Ravi"];

    names.push(100);


JavaScript allows this.


TypeScript:

    let names: string[] = ["Ganesh", "Ravi"];

    names.push(100);


TypeScript gives an error.

------------------------------------------------------------

PROBLEM 2
---------

JavaScript:

    function login(username, password) {

    }


No type protection.

TypeScript:

    function login(
        username: string,
        password: string
    ) {

    }


Now incorrect arguments are detected.

------------------------------------------------------------

PROBLEM 3
---------

JavaScript:

    user.nmae;


Possible runtime problem.

TypeScript:

    user.nmae;


TypeScript can detect that the property doesn't exist.

------------------------------------------------------------

PROBLEM 4
---------

JavaScript:

    constructor(page) {

    }


TypeScript:

    constructor(page: Page) {

    }


Now TypeScript knows page must be a Playwright Page.

------------------------------------------------------------

PROBLEM 5
---------

JavaScript:

    page.got();


Potential runtime problem.

TypeScript:

    page.got();


If page is typed as Page, TypeScript can immediately tell us:

    got() does not exist on Page.

*/


// ============================================================================
// 27. DO WE LEARN JAVASCRIPT TOPICS IN TYPESCRIPT?
// ============================================================================

/*
YES!


When learning Playwright with TypeScript,
students STILL need JavaScript fundamentals.


You should teach:

    1. Variables

    2. Data Types

    3. Operators

    4. if / else

    5. switch

    6. for loop

    7. while loop

    8. for...of

    9. Arrays

    10. Array methods

    11. Objects

    12. Functions

    13. Arrow Functions

    14. Classes

    15. Constructors

    16. Inheritance

    17. Modules

    18. Promises

    19. async / await


Then add TypeScript:

    20. Type Annotations

    21. Type Inference

    22. Interfaces

    23. Type Aliases

    24. Union Types

    25. Optional Properties

    26. readonly

    27. public/private/protected

    28. Generics

    29. Type Assertions


So:

    JavaScript Fundamentals
              +
    TypeScript Type System
              +
    Playwright
              =
    Playwright Automation Framework
*/


// ============================================================================
// 28. TYPE INFERENCE vs EXPLICIT TYPE - CHEAT SHEET
// ============================================================================

/*
------------------------------------------------------------
VARIABLE
------------------------------------------------------------

    let age = 30;

TypeScript infers:

    number


Explicit:

    let age: number = 30;


------------------------------------------------------------
STRING
------------------------------------------------------------

    let name = "Ganesh";

TypeScript infers:

    string


Explicit:

    let name: string = "Ganesh";


------------------------------------------------------------
ARRAY
------------------------------------------------------------

    let names = ["Ganesh", "Ravi"];

TypeScript infers:

    string[]


Explicit:

    let names: string[] = ["Ganesh", "Ravi"];


------------------------------------------------------------
FUNCTION RETURN
------------------------------------------------------------

    function add(a: number, b: number) {

        return a + b;

    }


TypeScript infers:

    number


Explicit:

    function add(
        a: number,
        b: number
    ): number {

        return a + b;

    }


------------------------------------------------------------
FUNCTION PARAMETER
------------------------------------------------------------

Usually explicitly type it:

    function login(username: string) {

    }


------------------------------------------------------------
CONSTRUCTOR PARAMETER
------------------------------------------------------------

Usually explicitly type it:

    constructor(page: Page) {

    }


------------------------------------------------------------
PROPERTY
------------------------------------------------------------

Useful to explicitly type:

    readonly page: Page;

*/


// ============================================================================
// 29. SIMPLE RULE FOR STUDENTS
// ============================================================================

/*
Remember this:

        CAN TYPESCRIPT SEE THE VALUE?
                  |
          +-------+-------+
          |               |
         YES              NO
          |               |
          v               v
      INFERENCE       EXPLICIT TYPE
          |               |
          v               v
    let age = 30     let page: Page


Example:

    let age = 30;

TypeScript can see 30.

Therefore:

    age -> number


But:

    function login(username) {

    }


TypeScript doesn't know what somebody will pass.

Therefore:

    function login(username: string) {

    }


Another example:

    constructor(page: Page)

The page comes from outside.

So we explicitly tell TypeScript:

    page -> Playwright Page
*/


// ============================================================================
// 30. FINAL STUDENT EXPLANATION
// ============================================================================

/*
You can explain to students:

    "TypeScript is JavaScript plus a type system.

     We don't throw away JavaScript concepts.

     We still use variables, arrays, objects, loops,
     functions, classes, promises and async/await.

     TypeScript adds type safety.

     If TypeScript can understand the type from the value,
     it can INFER the type.

     If the value comes from outside, such as a function parameter
     or constructor parameter, we often explicitly specify the type.

     This gives us:

         Better IntelliSense
         Earlier error detection
         Safer refactoring
         Better maintainability
         Fewer runtime type-related bugs

     This becomes especially useful in large Playwright frameworks."


===============================================================================
                        FINAL MENTAL MODEL
===============================================================================

                    JAVASCRIPT
                        |
                        +
                 TYPE SYSTEM
                        |
                        +
             TYPESCRIPT FEATURES
                        |
                        v
                   TYPESCRIPT
                        |
                        v
               PLAYWRIGHT + TS
                        |
                        v
             AUTOMATION FRAMEWORK


===============================================================================
IMPORTANT:

TypeScript does NOT mean:

    "Write types everywhere."


Instead:

    "Let TypeScript infer when it can,
     and explicitly define types when necessary."

===============================================================================
*/