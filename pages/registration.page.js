
class RegisterPage {
  constructor(page) {
    this.page = page;
  }
  async open() {
    await this.page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');
  }
  async registerUser() {
    await this.page.fill('#input-firstname', 'Ganesh');
    await this.page.fill('#input-lastname', 'QA');
    await this.page.fill('#input-email', `ganesh${Date.now()}@gmail.com`);
    await this.page.fill('#input-telephone', '9876543210');
    await this.page.fill('#input-password', 'Password123');
    await this.page.fill('#input-confirm', 'Password123');
    await this.page.check('input[name="agree"]');
    await this.page.click('input[value="Continue"]');
  }
}
module.exports = { RegisterPage };
