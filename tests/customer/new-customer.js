const uuidV4 = require('uuid/v4');
const consts = require('../../lib/consts');

const RANDOM_ID = uuidV4();
const SUFFIX = '-nw-tests';
const CUSTOMER_NAME = 'CN' + RANDOM_ID + SUFFIX;
const COMPANY_NAME = 'CPN' + RANDOM_ID + SUFFIX;
const EXTERNAL_ID = 'EXID' + RANDOM_ID + SUFFIX;

module.exports = {
    before: function (browser) {
        const login = browser.page.login();
        login.login();
        login.cancel_introduction_link();
    },

    after: function (browser) {
        browser.end();
    },

    'all elements in customer popup are present' : function(browser) {
        const customer = browser.page.kustomer();
        customer.bring_up_new_customer_popup();
        customer.assert.visible('@customer_name_box')
                .assert.visible('@company_name_box')
                .assert.visible('@customer_external_id')
                .open_phone_number_editor()
                .pick_home_option()
                .assert.visible('@phone_number_input');
    },

    'Add New Customer Icon is Found' : function (browser) {
        const kustomer = browser.page.kustomer();
        kustomer.navigate(kustomer.get_url());
        kustomer.waitForElementVisible('@create_new_customer_icon', consts.medium_delay);
    },

    'create new customer is ok': function (browser) {
        const values =  {
            customer_name: CUSTOMER_NAME,
            company_name: COMPANY_NAME,
            phone_number: '+10123456789',
            external_id: EXTERNAL_ID
        };
        browser.page.kustomer().create_new_customer(values);
    },

    'empty customer name should fail': function (browser) {
        const customer = browser.page.kustomer();
        customer.bring_up_new_customer_popup();

        customer.waitForElementVisible('@customer_name_box', consts.medium_delay)
                .setValue('@customer_name_box', '')
                .click('@save_changes_btn')
                .waitForElementVisible('@customer_name_box', consts.large_delay); // After an error, the popup should still exist
    }
};