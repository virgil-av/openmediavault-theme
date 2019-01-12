Ext.define('OMV.module.admin.service.theme.Settings', {
    extend: 'OMV.workspace.form.Panel',
    uses: [
        'OMV.Rpc',
        'OMV.data.Store',
        'OMV.data.Model',
        'OMV.data.proxy.Rpc',
        "OMV.window.Execute",
        "OMV.window.Upload"
    ],

    // This path tells which RPC module and methods this panel will call to get
    // and fetch its form values.
    rpcService: 'Theme',
    rpcGetMethod: 'getSettings',
    rpcSetMethod: 'setSettings',
    rpcRefreshPage: 'refreshPage',

    // getFormItems is a method which is automatically called in the
    // instantiation of the panel. This method returns all fields for
    // the panel.
    getFormItems: function() {
        var me = this;
        return [{
            // xtype defines the type of this entry. Some different types
            // is: fieldset, checkbox, textfield and numberfield.
            xtype: 'fieldset',
            title: _('Theme select'),
            fieldDefaults: {
                labelSeparator: ''
            },
            // The items array contains items inside the fieldset xtype.
            items: [
                {
                    xtype: 'combo',
                    name: 'theme_select',
                    fieldLabel: _('Standby Mode'),
                    mode: 'local',
                    store: new Ext.data.SimpleStore({
                        fields: [ 'value', 'text' ],
                        data: [
                            [ 'default', _('Default') ],
                            [ 'theme-blackish', _('Blackish') ],
                            [ 'theme-sour-cherry', _('Sour Cherry') ],
                            [ 'theme-green-peace', _('Green Peace') ],
                            [ 'theme-old-gold', _('Old Gold') ],
                            [ 'theme-condensed-black', _('Condensed Black') ],
                            [ 'theme-black-and-white', _('Black and White') ],
                            [ 'theme-santas-elf', _('Santa\'s elf') ],
                            [ 'theme-dracula', _('Dracula') ],

                        ]
                    }),
                    displayField: 'text',
                    valueField: 'value',
                    allowBlank: false,
                    editable: false,
                    triggerAction: 'all',
                    value: 2
                },
                {
                    xtype: 'button',
                    name: 'apply',
                    text: _('Apply theme'),
                    scope: this,
                    margin: '5 0 5 0',
                    handler: function() {
                        var me = this;
                        me.doSubmit();
                        OMV.MessageBox.show({
                            title: _('Confirmation'),
                            msg: _('Page refresh'),
                            buttons: Ext.Msg.YESNO,
                            fn: function(answer) {
                                if (answer !== 'yes')
                                    return;
                                OMV.Rpc.request({
                                    scope: me,
                                    rpcData: {
                                        service: 'theme',
                                        method: 'setSettings',
                                    },
                                    success: function(id, success, response) {
                                        OMV.confirmPageUnload = false;
                                        document.location.reload(true);
                                        OMV.MessageBox.hide();
                                    }
                                });
                            },
                            scope: me,
                            icon: Ext.Msg.QUESTION
                        });
                    }
                }
            ]
        }];
    },

    refreshPage: function() {
        Ext.MessageBox.show({
            title: _("Information"),
            msg: _("The page will reload now to let the changes take effect."),
            modal: true,
            icon: Ext.MessageBox.INFO,
            buttons: Ext.MessageBox.OK,
            fn: function() {
                // Reload the page.
                OMV.confirmPageUnload = false;
                document.location.reload(true);
            }
        });
    },


});

OMV.WorkspaceManager.registerPanel({
    id: 'settings',
    path: '/system/theme',
    text: _('Settings'),
    position: 10,
    className: 'OMV.module.admin.service.theme.Settings'
});