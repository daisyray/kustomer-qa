const consts = require('../lib/consts');

module.exports = {
    elements: {
        email: 'input[type="email"]',
        password: 'input[type="password"]',
        submit_btn: 'button[type="submit"]',
        cancel_shepherd_link: 'a.shepherd-cancel-link'
    },
    commands: [
        {
            get_url: function () {
                return this.launchUrl + consts.login_url_suffix;
            },

            login: function () {
                const url = this.get_url();
                this.navigate(this.get_url());
                this.waitForElementVisible('@email', consts.large_delay)
                    .setValue('@email', "raydaisy@gmail.com")
                    .setValue('@password', "test1234*")
                    .click('@submit_btn')
                    .waitForElementNotPresent('@email', consts.large_delay);
            },
            cancel_introduction_link: function () {
                this.waitForElementVisible('@cancel_shepherd_link', this.large_delay);
                this.click('@cancel_shepherd_link');
            }
        }
    ]
};