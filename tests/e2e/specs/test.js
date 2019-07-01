// https://docs.cypress.io/api/introduction/api.html

class Scenario {
  run (entry) {
    throw new Error('Not implemented')
  }
}

class Page {
  run (scenario) {
    return scenario.run(this)
  }
}

class Component {
  constructor (root) {
    this.root = root
  }
}

class BasePage extends Page {
  goToHomePage () {
    return new HomePage()
  }
  goToAboutPage () {
    return new AboutPage()
  }
  goToLoginPage () {
    return new LoginPage()
  }
}

class HomePage extends BasePage {
  constructor () {
    super()
    cy.visit('/#/')
  }

  assertContainsPageTitle () {
    cy.contains('h1', 'Welcome to Your Vue.js App')
    return this
  }
}

class AboutPage extends BasePage {
  constructor () {
    super()
    cy.visit('/#/about')
  }

  assertContainsPageTitle () {
    const about = new AboutComponent(cy.get('div.about'))
    about.assertContainsProperHeader()
    return this
  }
}

class LoginPage extends BasePage {
  constructor () {
    super()
    cy.visit('/#/login')
  }

  enterCredentials (username, password) {
    cy.get('input[name="username"]').type(username)
    cy.get('input[name="password"]').type(password)
    return this
  }

  clickLogin () {
    cy.get('button[name="login"]').click()
    return new HomePage()
  }
}

class AboutComponent extends Component {
  assertContainsProperHeader () {
    this.root.contains('h1', 'This is an about page')
  }
}

class ValidateMainPagesScenario extends Scenario {
  run (entry) {
    return entry
      .goToHomePage()
      .assertContainsPageTitle()
      .goToAboutPage()
      .assertContainsPageTitle()
  }
}

class LoginScenario extends Scenario {
  constructor () {
    super()
    this.username = 'johndoe'
    this.password = 'secret123'
  }

  withUsername (username) {
    this.username = username
    return this
  }

  withPassword (password) {
    this.password = password
    return this
  }

  run (entry) {
    return entry
      .goToLoginPage()
      .enterCredentials(this.username, this.password)
      .clickLogin()
      .assertContainsPageTitle()
  }
}

describe('My First Test', () => {
  it('Validate main pages', () => {
    new HomePage()
      .run(new ValidateMainPagesScenario())
      .run(new LoginScenario().withUsername('janesmith').withPassword('janesecret6645'))
  })
})
