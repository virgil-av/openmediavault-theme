Ext.define('OMV.module.admin.service.theme.About', {
    extend: 'OMV.workspace.form.Panel',

    // This path tells which RPC module and methods this panel will call to get
    // and fetch its form values.
    rpcService: 'Theme',
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
        }];
    }
});

OMV.WorkspaceManager.registerPanel({
    id: 'about',
    path: '/service/theme',
    text: _('About'),
    position: 10,
    className: 'OMV.module.admin.service.theme.About'
});