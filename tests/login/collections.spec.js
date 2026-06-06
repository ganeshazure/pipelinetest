// ====================================
// 1️⃣ TEST DATA (OBJECT)
// ====================================

const testData = {
  login: {
    email: 'test@mail.com',
    password: '123456'
  },
  searchKeyword: 'phone',
  expectedProducts: ['iPhone', 'Samsung']
};


// ====================================
// 2️⃣ LOCATOR MAP (MAP)
// ====================================


const locators = new Map([
  ['email', '#email'],
  ['password', '#password'],
  ['loginBtn', 'button[type="submit"]'],
  ['productTitle', '.product-title'],
  ['productCard', '.product-card'],
  ['addToCart', 'Add to Cart'],
  ['cartItems', '.cart-item'],
  ['price', '.price']
]);


// ====================================
// 3️⃣ TEST FLOW
// ====================================

test('E2E Shopping Flow', async ({ page }) => {

  // 🔐 LOGIN USING OBJECT + MAP
  await page.fill(locators.get('email'), testData.login.email);
  await page.fill(locators.get('password'), testData.login.password);
  await page.click(locators.get('loginBtn'));


  // ====================================
  // 4️⃣ GET PRODUCTS (ARRAY)
  // ====================================

  const products = await page.locator(locators.get('productTitle')).allTextContents();

  console.log('All Products:', products);


  // ====================================
  // 5️⃣ REMOVE DUPLICATES (SET)
  // ====================================

  const uniqueProducts = [...new Set(products)];

  console.log('Unique Products:', uniqueProducts);


  // ====================================
  // 6️⃣ FILTER REQUIRED PRODUCTS (ARRAY)
  // ====================================

  const filteredProducts = uniqueProducts.filter(p =>
    testData.expectedProducts.some(exp => p.includes(exp))
  );

  console.log('Filtered Products:', filteredProducts);


  // ====================================
  // 7️⃣ ADD TO CART (ARRAY LOOP)
  // ====================================

  for (let product of filteredProducts) {
    await page.locator(locators.get('productCard'), { hasText: product })
      .getByRole('button', { name: locators.get('addToCart') })
      .click();
  }


  // ====================================
  // 8️⃣ VALIDATE CART (ARRAY + INCLUDES)
  // ====================================

  const cartItems = await page.locator(locators.get('cartItems')).allTextContents();

  filteredProducts.forEach(product => {
    console.log(`Checking ${product}:`, cartItems.includes(product));
  });


  // ====================================
  // 9️⃣ GET PRICES (ARRAY)
  // ====================================

  const priceTexts = await page.locator(locators.get('price')).allTextContents();


  // Convert to numbers
  const prices = priceTexts.map(p => Number(p.replace('$', '')));


  // ====================================
  // 🔟 MAP (PRODUCT → PRICE)
  // ====================================

  const productPriceMap = new Map();

  filteredProducts.forEach((product, index) => {
    productPriceMap.set(product, prices[index]);
  });

  console.log('Product Price Map:', productPriceMap);


  // ====================================
  // 1️⃣1️⃣ TOTAL PRICE (REDUCE)
  // ====================================

  const total = prices.reduce((sum, price) => sum + price, 0);

  console.log('Total Price:', total);


  // ====================================
  // 1️⃣2️⃣ FINAL VALIDATION
  // ====================================

  expect(cartItems.length).toBe(filteredProducts.length);
  expect(total).toBeGreaterThan(0);

});