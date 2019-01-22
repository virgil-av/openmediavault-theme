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

    // hide the top save button
    hideOkButton: true,
    hideResetButton: true,

    // getFormItems is a method which is automatically called in the
    // instantiation of the panel. This method returns all fields for
    // the panel.
    getFormItems: function() {
        var me = this;
        return [
            {
            // xtype defines the type of this entry. Some different types
            // is: fieldset, checkbox, textfield and numberfield.
            xtype: 'fieldset',
            title: _('Theme selector'),
            fieldDefaults: {
                labelSeparator: ''
            },
            // The items array contains items inside the fieldset xtype.
            items: [
                {
                    xtype: 'combo',
                    name: 'theme_select',
                    fieldLabel: _('Theme list'),
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
                        // me.doSubmit();
                        OMV.MessageBox.show({
                            title: _('Confirmation'),
                            msg: _('Are you sure you want to apply this theme?'),
                            buttons: Ext.Msg.YESNO,
                            fn: function(answer) {
                                if (answer !== 'yes')
                                    return;
                                OMV.Rpc.request({
                                    scope: me,
                                    rpcData: {
                                        service: 'theme',
                                        method: 'setTheme',
                                        params: {
                                            theme_select: me.getForm().findField('theme_select').getValue()
                                        }
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
        },
            {
            // xtype defines the type of this entry. Some different types
            // is: fieldset, checkbox, textfield and numberfield.
            xtype: 'fieldset',
            title: _('Change logo'),
            fieldDefaults: {
                labelSeparator: ''
            },
            // The items array contains items inside the fieldset xtype.
            items: [
                {
                    xtype: "textfield",
                    name: "logo_url",
                    fieldLabel: _("Logo url"),
                    displayField: 'text',
                    value: "https://i.ibb.co/vXk1SG2/logo.png",
                    plugins: [{
                        ptype: "fieldinfo",
                        text: _("Image url should end in .jpg, .png or .gif")
                    }]

                },
                {
                    xtype: 'button',
                    name: 'applyLogo',
                    text: _('Apply custom logo'),
                    scope: this,
                    margin: '5 0 5 0',
                    handler: function() {
                        var me = this;
                        // me.doSubmit();
                        OMV.MessageBox.show({
                            title: _('Confirmation'),
                            msg: _('Are you sure you want to apply this logo?'),
                            buttons: Ext.Msg.YESNO,
                            fn: function(answer) {
                                if (answer !== 'yes')
                                    return;
                                OMV.Rpc.request({
                                    scope: me,
                                    rpcData: {
                                        service: 'theme',
                                        method: 'setLogo',
                                        params: {
                                            logo_url: me.getForm().findField('logo_url').getValue()
                                        }
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
                },
                {
                    xtype: 'button',
                    name: 'resetLogo',
                    text: _('Reset logo to default'),
                    scope: this,
                    margin: '5 0 5 5',
                    handler: function() {
                        var me = this;
                        // me.doSubmit();
                        OMV.MessageBox.show({
                            title: _('Confirmation'),
                            msg: _('Are you sure you want to reset logo to OMV default ?'),
                            buttons: Ext.Msg.YESNO,
                            fn: function(answer) {
                                if (answer !== 'yes')
                                    return;
                                OMV.Rpc.request({
                                    scope: me,
                                    rpcData: {
                                        service: 'theme',
                                        method: 'resetLogo'
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
        },
            {
            // xtype defines the type of this entry. Some different types
            // is: fieldset, checkbox, textfield and numberfield.
            xtype: 'fieldset',
            title: _('Change header text'),
            fieldDefaults: {
                labelSeparator: ''
            },
            // The items array contains items inside the fieldset xtype.
            items: [
                {
                    xtype: "textfield",
                    name: "header_text",
                    fieldLabel: _("Header text"),
                    displayField: 'text',
                    value: "This is a test"

                },
                {
                    xtype: 'button',
                    name: 'applyHeaderText',
                    text: _('Apply custom header text'),
                    scope: this,
                    margin: '5 0 5 0',
                    handler: function() {
                        var me = this;
                        // me.doSubmit();
                        OMV.MessageBox.show({
                            title: _('Confirmation'),
                            msg: _('Are you sure you want to apply this text to header?'),
                            buttons: Ext.Msg.YESNO,
                            fn: function(answer) {
                                if (answer !== 'yes')
                                    return;
                                OMV.Rpc.request({
                                    scope: me,
                                    rpcData: {
                                        service: 'theme',
                                        method: 'setHeaderText',
                                        params: {
                                            header_text: me.getForm().findField('header_text').getValue()
                                        }
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
                },
                {
                    xtype: 'button',
                    name: 'resetLogo',
                    text: _('Reset logo to default'),
                    scope: this,
                    margin: '5 0 5 5',
                    handler: function() {
                        var me = this;
                        // me.doSubmit();
                        OMV.MessageBox.show({
                            title: _('Confirmation'),
                            msg: _('Are you sure you want to reset logo to OMV default ?'),
                            buttons: Ext.Msg.YESNO,
                            fn: function(answer) {
                                if (answer !== 'yes')
                                    return;
                                OMV.Rpc.request({
                                    scope: me,
                                    rpcData: {
                                        service: 'theme',
                                        method: 'resetLogo'
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
        },
            {
            // xtype defines the type of this entry. Some different types
            // is: fieldset, checkbox, textfield and numberfield.
            xtype: 'fieldset',
            title: _('Change header background color'),
            fieldDefaults: {
                labelSeparator: ''
            },
            // The items array contains items inside the fieldset xtype.
            items: [
                {
                    xtype: "textfield",
                    name: "header_bg_color",
                    fieldLabel: _("HEX color code"),
                    displayField: 'text',
                    value: "#ff00ff"

                },
                {
                    xtype: 'button',
                    name: 'applyHeaderColor',
                    text: _('Apply custom header color'),
                    scope: this,
                    margin: '5 0 5 0',
                    handler: function() {
                        var me = this;
                        // me.doSubmit();
                        OMV.MessageBox.show({
                            title: _('Confirmation'),
                            msg: _('Are you sure you want to apply this color to header background ?'),
                            buttons: Ext.Msg.YESNO,
                            fn: function(answer) {
                                if (answer !== 'yes')
                                    return;
                                OMV.Rpc.request({
                                    scope: me,
                                    rpcData: {
                                        service: 'theme',
                                        method: 'setHeaderBgColor',
                                        params: {
                                            header_bg_color: me.getForm().findField('header_bg_color').getValue()
                                        }
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
                },
                {
                    xtype: 'button',
                    name: 'resetHeaderColour',
                    text: _('Reset Header Color To Default'),
                    scope: this,
                    margin: '5 0 5 5',
                    handler: function() {
                        var me = this;
                        // me.doSubmit();
                        OMV.MessageBox.show({
                            title: _('Confirmation'),
                            msg: _('Are you sure you want to reset header background color to default ?'),
                            buttons: Ext.Msg.YESNO,
                            fn: function(answer) {
                                if (answer !== 'yes')
                                    return;
                                OMV.Rpc.request({
                                    scope: me,
                                    rpcData: {
                                        service: 'theme',
                                        method: 'resetHeaderBgColor'
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
        },
            {
            // xtype defines the type of this entry. Some different types
            // is: fieldset, checkbox, textfield and numberfield.
            xtype: 'fieldset',
            title: _('Change header background image'),
            fieldDefaults: {
                labelSeparator: ''
            },
            // The items array contains items inside the fieldset xtype.
            items: [
                {
                    xtype: "textfield",
                    name: "header_bg_image",
                    fieldLabel: _("Image url"),
                    displayField: 'text',
                    value: "https://i.ibb.co/HKb9B7m/hi-tech-concepts-on-blue-background-header.jpg",
                    plugins: [{
                        ptype: "fieldinfo",
                        text: _("Image url should end in .jpg, .png or .gif")
                    }]

                },
                {
                    xtype: 'button',
                    name: 'applyHeaderBgImage',
                    text: _('Apply custom header image'),
                    scope: this,
                    margin: '5 0 5 0',
                    handler: function() {
                        var me = this;
                        // me.doSubmit();
                        OMV.MessageBox.show({
                            title: _('Confirmation'),
                            msg: _('Are you sure you want to apply this image to header background ?'),
                            buttons: Ext.Msg.YESNO,
                            fn: function(answer) {
                                if (answer !== 'yes')
                                    return;
                                OMV.Rpc.request({
                                    scope: me,
                                    rpcData: {
                                        service: 'theme',
                                        method: 'setHeaderBgImage',
                                        params: {
                                            header_bg_image: me.getForm().findField('header_bg_image').getValue()
                                        }
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
                },
                {
                    xtype: 'button',
                    name: 'resetHeaderBgImage',
                    text: _('Reset Header To Default'),
                    scope: this,
                    margin: '5 0 5 5',
                    handler: function() {
                        var me = this;
                        // me.doSubmit();
                        OMV.MessageBox.show({
                            title: _('Confirmation'),
                            msg: _('Are you sure you want to reset header background to default ?'),
                            buttons: Ext.Msg.YESNO,
                            fn: function(answer) {
                                if (answer !== 'yes')
                                    return;
                                OMV.Rpc.request({
                                    scope: me,
                                    rpcData: {
                                        service: 'theme',
                                        method: 'resetHeaderBgImage'
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
        },
            {
            // xtype defines the type of this entry. Some different types
            // is: fieldset, checkbox, textfield and numberfield.
            xtype: 'fieldset',
            title: _('Change font size and weight'),
            fieldDefaults: {
                labelSeparator: ''
            },
            // The items array contains items inside the fieldset xtype.
            items: [
                {
                    xtype: "numberfield",
                    name: "font_size",
                    fieldLabel: _("Font size"),
                    minValue: 1,
                    maxValue: 100,
                    allowDecimals: false,
                    allowBlank: false,
                    value: 16

                },
                {
                    xtype: 'combo',
                    name: 'font_weight',
                    fieldLabel: _('Font weight'),
                    mode: 'local',
                    store: new Ext.data.SimpleStore({
                        fields: [ 'value', 'text' ],
                        data: [
                            [ '100', _('Lightest') ],
                            [ '200', _('200') ],
                            [ '300', _('300') ],
                            [ '400', _('Normal') ],
                            [ '500', _('500') ],
                            [ '600', _('600') ],
                            [ '700', _('Bold') ],
                            [ '800', _('800') ],
                            [ '900', _('Boldest') ],
                        ]
                    }),
                    displayField: 'text',
                    valueField: 'value',
                    allowBlank: false,
                    editable: false,
                    triggerAction: 'all',
                    value: 100
                },
                {
                    xtype: 'button',
                    name: 'applyFontSizeAndWeight',
                    text: _('Apply custom font size and weight'),
                    scope: this,
                    margin: '5 0 5 0',
                    handler: function() {
                        var me = this;
                        // me.doSubmit();
                        OMV.MessageBox.show({
                            title: _('Confirmation'),
                            msg: _('Are you sure you want to apply font size and weight ?'),
                            buttons: Ext.Msg.YESNO,
                            fn: function(answer) {
                                if (answer !== 'yes')
                                    return;
                                OMV.Rpc.request({
                                    scope: me,
                                    rpcData: {
                                        service: 'theme',
                                        method: 'setFont',
                                        params: {
                                            font_size: me.getForm().findField('font_size').getValue(),
                                            font_weight: me.getForm().findField('font_weight').getValue()
                                        }
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
                },
                {
                    xtype: 'button',
                    name: 'resetHeaderBgImage',
                    text: _('Reset font to theme default'),
                    scope: this,
                    margin: '5 0 5 5',
                    handler: function() {
                        var me = this;
                        // me.doSubmit();
                        OMV.MessageBox.show({
                            title: _('Confirmation'),
                            msg: _('Are you sure you want to reset font to theme default ?'),
                            buttons: Ext.Msg.YESNO,
                            fn: function(answer) {
                                if (answer !== 'yes')
                                    return;
                                OMV.Rpc.request({
                                    scope: me,
                                    rpcData: {
                                        service: 'theme',
                                        method: 'resetFont'
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
        },
    ];
},


});

OMV.WorkspaceManager.registerPanel({
    id: 'settings',
    path: '/system/theme',
    text: _('Settings'),
    position: 1,
    className: 'OMV.module.admin.service.theme.Settings'
});