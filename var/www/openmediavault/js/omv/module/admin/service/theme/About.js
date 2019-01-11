Ext.define('OMV.module.admin.service.theme.About', {
    extend: 'OMV.workspace.form.Panel',

    // This path tells which RPC module and methods this panel will call to get
    // and fetch its form values.
    rpcService: 'Example',
    rpcGetMethod: 'getSettings',
    rpcSetMethod: 'setSettings',

    // getFormItems is a method which is automatically called in the
    // instantiation of the panel. This method returns all fields for
    // the panel.
    getFormItems: function() {
        return [{
            // xtype defines the type of this entry. Some different types
            // is: fieldset, checkbox, textfield and numberfield.
            xtype: 'fieldset',
            title: _('General'),
            fieldDefaults: {
                labelSeparator: ''
            },
            // The items array contains items inside the fieldset xtype.
            items: [{
                xtype: 'checkbox',
                // The name option is sent together with is value to RPC
                // and is also used when fetching from the RPC.
                name: 'enable',
                fieldLabel: _('Enable'),
                // checked sets the default value of a checkbox.
                checked: false
            },
                {
                    xtype: 'numberfield',
                    name: 'max_value',
                    fieldLabel: _('Max value'),
                    minValue: 0,
                    maxValue: 100,
                    allowDecimals: false,
                    allowBlank: true
                }]
        }];
    }
});


OMV.WorkspaceManager.registerPanel({
    id: 'about',
    path: '/service/theme',
    text: _('About'),
    position: 20,
    className: 'OMV.module.admin.service.theme.About'
});
