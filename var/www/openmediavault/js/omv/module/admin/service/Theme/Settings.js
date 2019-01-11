Ext.define('OMV.module.admin.service.theme.Settings', {
    extend: 'OMV.workspace.form.Panel',
    uses: [
        'OMV.Rpc',
        'OMV.data.Store',
        'OMV.data.Model',
        'OMV.data.proxy.Rpc'
    ],

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
            // The items array contains items inside the fieldset xtype.
            items: [
                {
                    xtype: 'combo',
                    name: 'mode',
                    fieldLabel: _('Standby Mode'),
                    mode: 'local',
                    store: new Ext.data.SimpleStore({
                        fields: [ 'value', 'text' ],
                        data: [
                            [ 'standby', _('Standby - ACPI state S1') ],
                            [ 'mem', _('Suspend-to-RAM - ACPI state S3') ],
                            [ 'disk', _('Suspend-to-Disk - ACPI state S4') ],
                            [ 'off', _('Poweroff - ACPI state S5') ],
                            [ 'no', _('No - Don\'t suspend. Sets RTC wakeup time only.') ],
                            [ 'on', _('On - Don\'t suspend but read RTC device until alarm time appears. This mode is useful for debugging.') ]
                        ]
                    }),
                    displayField: 'text',
                    valueField: 'value',
                    allowBlank: false,
                    editable: false,
                    triggerAction: 'all',
                    value: 2
                }
            ]
        }];
    }
});

OMV.WorkspaceManager.registerPanel({
    id: 'settings',
    path: '/service/theme',
    text: _('Settings'),
    position: 10,
    className: 'OMV.module.admin.service.theme.Settings'
});