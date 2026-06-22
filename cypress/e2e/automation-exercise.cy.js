describe('Homepage Load Verification', () => {
  beforeEach(() => {
   
    cy.visit('https://automationexercise.com');
  });

  it('TC_HP_001 - Should load the homepage successfully with key elements visible', () => {
    cy.url().should('include', 'automationexercise.com');
    cy.title().should('contain', 'Automation Exercise');
    cy.get('.logo img')
      .should('be.visible')
      .and('have.attr', 'alt', 'Website for automation practice');
    cy.get('.shop-menu')
      .should('be.visible');
    cy.get('.shop-menu a[href="/login"]')
      .should('be.visible')
      .and('contain.text', 'Signup / Login');

     cy.screenshot();  
  });
});



describe('User Registration Flow', () => {
  const uniqueId = Date.now();
  const username = `TestStudent${uniqueId}`;
  const email = `student${uniqueId}@test.com`;
  const password = 'Password123';

  it('TC_REG_001 - Should register a new user and delete the account at the end', () => {
    
    cy.visit('https://automationexercise.com');
    cy.url().should('include', 'automationexercise.com');
    cy.get('.shop-menu a[href="/login"]').click();  
    cy.get('[data-qa="signup-name"]').type(username);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
    cy.get('#id_gender1').check(); 
    cy.get('[data-qa="password"]').type(password);
    cy.get('[data-qa="days"]').select('15');
    cy.get('[data-qa="months"]').select('August');
    cy.get('[data-qa="years"]').select('2003');
    cy.get('#newsletter').check();
    cy.get('#optin').check();  
    cy.get('[data-qa="first_name"]').type('Blue');
    cy.get('[data-qa="last_name"]').type('Girama');
    cy.get('[data-qa="company"]').type('Blu bars');
    cy.get('[data-qa="address"]').type('123 kuria road');
    cy.get('[data-qa="address2"]').type('pickle 300');
    cy.get('[data-qa="country"]').select('India');
    cy.get('[data-qa="state"]').type('Nairobi');
    cy.get('[data-qa="city"]').type('Limuru');
    cy.get('[data-qa="zipcode"]').type('90001');
    cy.get('[data-qa="mobile_number"]').type('1234567890');
    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="account-created"]').should('be.visible');
    cy.contains('Account Created!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
    cy.get('.shop-menu').contains(`Logged in as ${username}`).should('be.visible');
    cy.get('.shop-menu a[href="/delete_account"]').click();
    cy.get('[data-qa="account-deleted"]').should('be.visible');
    cy.contains('Account Deleted!').should('be.visible'); 
    cy.get('[data-qa="continue-button"]').click();
    cy.url().should('include', 'automationexercise.com');
    cy.screenshot();

  });
});

describe('User Authentication - Login & Logout Flow', () => {
  const uniqueId = Date.now();
  const username = `AuthUser${uniqueId}`;
  const email = `auth_student${uniqueId}@test.com`;
  const password = 'Password567';

  before(() => {
    cy.visit('https://automationexercise.com');
    cy.get('.shop-menu a[href="/login"]').click();  
    cy.get('[data-qa="signup-name"]').type(username);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click(); 
    cy.get('#id_gender1').check();
    cy.get('[data-qa="password"]').type(password);
    cy.get('[data-qa="days"]').select('5');
    cy.get('[data-qa="months"]').select('January');
    cy.get('[data-qa="years"]').select('2000');
    cy.get('[data-qa="first_name"]').type('Luca');
    cy.get('[data-qa="last_name"]').type('Muimbi');
    cy.get('[data-qa="address"]').type('105 Muindi Road');
    cy.get('[data-qa="country"]').type('Kenya');
    cy.get('[data-qa="state"]').type('Nairobi');
    cy.get('[data-qa="city"]').type('Nyari');
    cy.get('[data-qa="zipcode"]').type('73301');
    cy.get('[data-qa="mobile_number"]').type('9876543210');
    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="continue-button"]').click();
    cy.get('.shop-menu a[href="/logout"]').click();
    cy.screenshot();
  });

  it('TC_AUTH_001 - Should log in with valid credentials and log out successfully', () => {
    cy.visit('https://automationexercise.com');
    cy.get('.shop-menu a[href="/login"]').click();
    cy.url().should('include', '/login');
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password);
    cy.get('[data-qa="login-button"]').click();
    cy.get('.shop-menu')
      .contains(`Logged in as ${username}`)
      .should('be.visible');
    cy.get('.shop-menu a[href="/logout"]').click();
    cy.url().should('include', '/login');
    cy.get('[data-qa="login-email"]').should('be.visible');
    cy.screenshot();
  });
});



describe('User Authentication - Negative Login Scenarios', () => {

  it('TC_AUTH_002 - Should display an error message when logging in with invalid credentials', () => {
   
    cy.visit('https://automationexercise.com');
    cy.get('a[href="/login"]').click();
    cy.url().should('include', '/login');
    cy.get('[data-qa="login-email"]').type('lupus@gmail.com');
    cy.get('[data-qa="login-password"]').type('WrongPassword123!');
    cy.get('[data-qa="login-button"]').click(); 
    cy.get('.login-form p')
      .should('be.visible')
      .and('contain.text', 'Your email or password is incorrect!');
    cy.screenshot();  
  });
});



describe('Product Search Functionality', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false; 
    });
  });

  it('TC_SRCH_001 - Should search for "dress" and verify results are visible and relevant', () => {
   
    cy.visit('https://automationexercise.com');
    cy.url().should('include', 'automationexercise.com');
    cy.get('.shop-menu a[href="/products"]').click({ force: true });
    cy.url().should('include', '/products');
    cy.get('.title').contains('All Products').should('be.visible');
    cy.get('#search_product').type('dress');
    cy.get('#submit_search').click({ force: true });
    cy.get('.title').contains('Searched Products').should('be.visible');
    cy.get('.single-products .productinfo')
      .should('have.length.gt', 0) 
      .then(($listOfProducts) => {
        const combinedResultsText = $listOfProducts.text().toLowerCase();       
        expect(combinedResultsText).to.include('dress');
    cy.screenshot();    
      });
  });
});


describe('Product Details Functionality', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false; 
    });
  });

  it('TC_DTL_001 - Should view the first product and verify all product details are visible', () => {
    
    cy.visit('https://automationexercise.com');
    cy.url().should('include', 'automationexercise.com');
    cy.get('.shop-menu a[href="/products"]').click({ force: true });
    cy.url().should('include', '/products');
    cy.get('.choose a[href^="/product_details"]').first().click({ force: true });
    cy.url().should('include', '/product_details/');
    cy.get('.product-information').should('be.visible').within(() => {
      cy.get('h2').should('be.visible').and('not.be.empty');
      cy.get('p').contains('Category:').should('be.visible');
      cy.get('span').contains('Rs.').should('be.visible');
      cy.get('b').contains('Availability:').should('be.visible');
      cy.root().contains('In Stock').should('be.visible');
      cy.get('b').contains('Condition:').should('be.visible');
      cy.root().contains('New').should('be.visible');
      cy.get('b').contains('Brand:').should('be.visible');
    cy.screenshot();  
    });
  });
});



describe('Cart Functionality - Add to Cart', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false; 
    });
  });

  it('TC_CRT_001 - Should successfully add a product to the cart and verify its details', () => {
   
    cy.visit('https://automationexercise.com');
    cy.url().should('include', 'automationexercise.com');
    cy.get('.shop-menu a[href="/products"]').click({ force: true });
    cy.url().should('include', '/products');
    cy.get('.productinfo .add-to-cart').first().click({ force: true });
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-body a[href="/view_cart"]').click({ force: true });
    cy.url().should('include', '/view_cart');
    cy.get('.active').contains('Shopping Cart').should('be.visible');
    cy.get('#cart_info_table tbody tr').should('have.length.gt', 0);
    cy.get('.cart_description h4 a').should('be.visible').and('not.be.empty');
    cy.get('.cart_price p').first().should('be.visible').and('contain.text', 'Rs.');
    cy.get('.cart_quantity .disabled').first().should('be.visible').and('not.be.empty');
    cy.screenshot();
  });
});


describe('Cart Functionality - Remove Product', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false; 
    });
  });

  it('TC_CRT_002 - Should successfully add a product and then remove it from the cart', () => {
    
    cy.visit('https://automationexercise.com');
    cy.get('.productinfo .add-to-cart').first().click({ force: true });
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-body a[href="/view_cart"]').click({ force: true });
    cy.url().should('include', '/view_cart');
    cy.get('#cart_info_table tbody tr').should('have.length', 1);
    cy.get('.cart_quantity_delete').first().click({ force: true });
    cy.get('#cart_info_table tbody tr').should('not.exist');
    cy.get('#empty_cart')
      .should('be.visible')
      .and('contain.text', 'Cart is empty!');
    cy.screenshot();  
  });
});



describe('Contact Us Form Functionality', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false; 
    });
  });

  it('TC_CON_001 - Should successfully submit the contact form with an attachment', () => {
  
    cy.visit('https://automationexercise.com');
    cy.url().should('include', 'automationexercise.com');
    cy.get('.shop-menu a[href="/contact_us"]').click({ force: true });
    cy.url().should('include', '/contact_us');
    cy.get('.contact-form .title').contains('Get In Touch').should('be.visible');
    cy.get('[data-qa="name"]').type('QA Student');
    cy.get('[data-qa="email"]').type('student_qa@test.com');
    cy.get('[data-qa="subject"]').type('Automation Query');
    cy.get('[data-qa="message"]').type('This is a message confirrming this works thank you.');
    cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/example.json');
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Press OK to proceed');
      return true;
    });
    cy.get('[data-qa="submit-button"]').click({ force: true });
    cy.get('.status.alert-success')
      .should('be.visible')
      .and('contain.text', 'Success! Your details have been submitted successfully.');
    cy.get('#contact-page .btn-success').contains('Home').click({ force: true });
    cy.url().should('include', 'automationexercise.com');
    cy.screenshot();
  });
});


describe('Cart Functionality - Add Multiple Products Challenge', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false; 
    });
  });

  it('TC_CHAL_001 - Should add a Dress and a Polo T-shirt to the cart and verify visibility', () => {
  
    cy.visit('https://automationexercise.com'); 
    cy.get('.shop-menu a[href="/products"]').click({ force: true });
    cy.url().should('include', '/products');
    cy.get('#search_product').clear();
    cy.get('#search_product').type('dress');
    cy.get('#submit_search').click({ force: true });  
    cy.get('.productinfo .add-to-cart').first().click({ force: true });
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-footer .close-modal').click({ force: true });
    cy.get('#search_product').clear();
    cy.get('#search_product').type('polo');
    cy.get('#submit_search').click({ force: true });  
    cy.get('.productinfo .add-to-cart').first().click({ force: true }); 
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-body a[href="/view_cart"]').click({ force: true });
    cy.url().should('include', '/view_cart');
    cy.get('#cart_info_table tbody tr').should('have.length', 2);
    cy.get('.cart_description').then(($cart) => {
      const cartText = $cart.text().toLowerCase();
      expect(cartText).to.include('dress');
      expect(cartText).to.include('polo');
    cy.screenshot();
    });
  });
});


describe('Category Navigation Functionality', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false; 
    });
  });

  it('TC_CAT_001 - Should expand Women category, select Dresses, and verify products load', () => {
   
    cy.visit('https://automationexercise.com');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('.left-sidebar').should('be.visible');
    cy.get('#accordian').should('be.visible');
    cy.get('#accordian').contains('Women').click({ force: true });
    cy.get('#Women').should('be.visible');
    cy.get('#Women a[href*="/category_products/1"]').click({ force: true });
    cy.url().should('include', '/category_products/1');
    cy.get('.title')
      .should('be.visible')
      .and('contain.text', 'Women - Dress Products');
    cy.get('.features_items .col-sm-4')
      .should('have.length.gt', 0);
    cy.screenshot();  
  });
});

  
  



