const assert = require('assert');
const consts = require('../lib/consts');


const PHONE_TYPE_SELECT = 'div.four.wide.field select';

module.exports = {
    elements: {
        create_new_customer_icon: 'i.icon-create-new',
        customer_name_box: {
            selector: '//form//input[@placeholder="Customer Name"]',
            locateStrategy: 'xpath'
        },
        company_name_box:'form div.Select-input input',
        customer_external_id: {
            selector: '//form//input[@placeholder="Customer External ID"]',
            locateStrategy: 'xpath'
        },
        phone_number_open_icon: {
            selector: '.plus-outline',
            index: 0
        },
        phone_number_type: {
            selector: 'div.four.wide.field select',
            index: 0
        },
        phone_number_home_option: {
            selector: PHONE_TYPE_SELECT,
            index: 1
        },
        phone_number_input: {
            selector: '//form//input[@placeholder="Phone Number"]',
            locateStrategy: 'xpath'
        },
        save_changes_btn: {
            selector: '//span[text()="Save changes"]',
            locateStrategy: 'xpath'
        }
    },
    commands: [
        {
            get_url: function () {
                return this.launchUrl + consts.home_page_url_suffix
            },
            bring_up_new_customer_popup: function () {
                this.navigate(this.get_url());
                this.waitForElementVisible('@create_new_customer_icon', consts.large_delay)
                    .click('@create_new_customer_icon')
                    .api.pause(consts.medium_delay);
                return this;
            },
            
            create_new_customer: function(values) {
                this.bring_up_new_customer_popup();
                this.waitForElementVisible('@customer_name_box', consts.medium_delay)
                    .setValue('@customer_name_box', values.customer_name)
                    .click('form div.Select-placeholder')
                    .api.pause(consts.small_delay);
                this.setValue('@company_name_box', values.company_name)
                    .setValue('@customer_external_id', values.external_id)
                    .open_phone_number_editor()
                    .pick_home_option()
                    .setValue('@phone_number_input', values.phone_number)
                    .api.pause(consts.large_delay) // debug only
                    .click('@save_changes_btn')
            },

            open_phone_number_editor: function () {
                this.waitForElementVisible('@phone_number_open_icon', consts.medium_delay)
                    .click('@phone_number_open_icon');
                return this;
            },
            pick_home_option: function() {
                const self = this;
                this.waitForElementVisible('@phone_number_type', consts.medium_delay);
                this.api.elements('css selector', PHONE_TYPE_SELECT, function(elements) {
                   if (elements.value.length > 0) {
                       self.api.elementIdValue(elements.value[0].ELEMENT, 'home', consts.empty_fn);
                   } else {
                       assert(false, 'Cannot find ' + PHONE_TYPE_SELECT);
                   }
                });
                return this;
            }
        }
    ]
};