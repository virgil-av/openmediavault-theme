Ext.define('OMV.module.admin.service.theme.About', {
    extend: 'OMV.workspace.form.Panel',
    rpcService: 'Theme',
    rpcGetMethod: 'getSettings',
    // hide the top save button
    hideOkButton: true,
    hideResetButton: true,

    initComponent: function() {
        var me = this;
        me.html = me.createBox("This is the about page");
        me.callParent(arguments);
    },

    createBox: function(msg) {
        return [ '<div class="x-box-aboutbox">', msg, '</div>' ].join('');
    }
});

OMV.WorkspaceManager.registerPanel({
    id: 'about',
    path: '/system/theme',
    text: _('About'),
    position: 10,
    className: 'OMV.module.admin.service.theme.About'
});