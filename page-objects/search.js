const consts = require('../lib/consts');

module.exports = {
    elements: {
    new_search_button: '.tour-search-new-button buttonSecondary__secondary___AEhYB button__genericButton___BslAT button__small___NvtKO',
    untitled_search_button: 'div.formField__field___Qcav0 .formField__fieldInput___quqc6 .InputKomponent__input___3RncR',
    save_button: 'div.buttonPrimary__primary___2lfrl .button__genericButton___BslAT.button__medium___1sVE2'

    }
    commands: [
            {
                get_url: function () {
                return this.api.launch_url + consts.login_url_suffix;
            },
                create_a_new_search: function() {
                    this.navigate(this.get_url());
                    this.waitForElementVisible('@new_search_button, consts.medium_delay').click(@new_search_button)

                }

        ]
    }
}