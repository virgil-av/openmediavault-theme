Ext.define('OMV.module.admin.service.theme.Update', {
    extend: 'OMV.workspace.form.Panel',
    rpcService: 'Theme',
    rpcGetMethod: 'getSettings',
    // hide the top save button
    hideOkButton: true,
    hideResetButton: true,

    initComponent: function() {
        var me = this;
        me.html = me.createBox("<div> <strong> Current version installed:</strong></div><br><div> <svg " +
            "xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='184' height='20'>" +
            "<linearGradient id='b' x2='0' y2='100%'><stop offset='0' stop-color='#bbb' stop-opacity='.1'/>" +
            "<stop offset='1' stop-opacity='.1'/></linearGradient><clipPath id='a'><rect width='184' height='20'" +
            " rx='3' fill='#fff'/></clipPath><g clip-path='url(#a)'><path fill='#555' d='M0 0h139v20H0z'/>" +
            "<path fill='#007ec6' d='M139 0h45v20H139z'/><path fill='url(#b)' d='M0 0h184v20H0z'/></g>" +
            "<g fill='#fff' text-anchor='middle' font-family='DejaVu Sans,Verdana,Geneva,sans-serif' font-size='110'>" +
            "<text x='705' y='150' fill='#010101' fill-opacity='.3' transform='scale(.1)' textLength='1290'>" +
            "openmediavault-theme</text><text x='705' y='140' transform='scale(.1)' textLength='1290'>" +
            "openmediavault-theme</text><text x='1605' y='150' fill='#010101' fill-opacity='.3' transform='scale(.1)' " +
            "textLength='350'>v0.5.0</text><text x='1605' y='140' transform='scale(.1)' textLength='350'>v0.5.0</text>" +
            "</g> </svg></div><div> <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' " +
            "width='118' height='20'><linearGradient id='b' x2='0' y2='100%'><stop offset='0' stop-color='#bbb' " +
            "stop-opacity='.1'/><stop offset='1' stop-opacity='.1'/></linearGradient><clipPath id='a'><rect width='118' " +
            "height='20' rx='3' fill='#fff'/></clipPath><g clip-path='url(#a)'><path fill='#555' d='M0 0h73v20H0z'/>" +
            "<path fill='#97CA00' d='M73 0h45v20H73z'/><path fill='url(#b)' d='M0 0h118v20H0z'/></g><g fill='#fff'" +
            " text-anchor='middle' font-family='DejaVu Sans,Verdana,Geneva,sans-serif' font-size='110'> <text x='375' " +
            "y='150' fill='#010101' fill-opacity='.3' transform='scale(.1)' textLength='630'>omv-theme</text>" +
            "<text x='375' y='140' transform='scale(.1)' textLength='630'>omv-theme</text><text x='945' y='150' " +
            "fill='#010101' fill-opacity='.3' transform='scale(.1)' textLength='350'>v3.0.0</text><text x='945' y='140' " +
            "transform='scale(.1)' textLength='350'>v3.0.0</text></g> </svg></div><br><br><div> <strong>Check the " +
            "forums for updates, if the forum version are higher than the above just press the update button above." +
            "</strong></div><br><br><div style='color: red; font-size:10px'> * Beware if you updated the omv-theme via " +
            "the terminal the UI will still display the old version, use the button above to update</div>");
        me.callParent(arguments);
    },

    createBox: function(msg) {
        return [ '<div class="x-box-aboutbox">', msg, '</div>' ].join('');
    },

    getFormItems: function() {
        var me = this;
        return [
            {
                // xtype defines the type of this entry. Some different types
                // is: fieldset, checkbox, textfield and numberfield.
                xtype: 'fieldset',
                title: _('Update ui plugin and omv-theme tool'),
                fieldDefaults: {
                    labelSeparator: ''
                },
                // The items array contains items inside the fieldset xtype.
                items: [
                    {
                        xtype: 'button',
                        name: 'update',
                        text: _('Update now'),
                        scope: this,
                        margin: '5 0 5 0',
                        handler: function() {
                            var me = this;

                            OMV.MessageBox.show({
                                title: _("Confirmation"),
                                msg: _("Do you really want to perform update ?"),
                                buttons: Ext.Msg.YESNO,
                                defaultFocus: "no",
                                fn: function(answer) {
                                    if (answer !== "yes")
                                        return;
                                    var wnd = Ext.create("OMV.window.Execute", {
                                        title: _("Performing update ..."),
                                        rpcService: "theme",
                                        rpcMethod: "performUpdate",
                                        rpcParams: { },
                                        rpcIgnoreErrors: true,
                                        hideStartButton: true,
                                        hideStopButton: true,
                                        killCmdBeforeDestroy: false,
                                        listeners: {
                                            scope: me,
                                            finish: function(wnd, response) {
                                                wnd.appendValue(_("Done ..."));
                                                wnd.setButtonDisabled("close", false);
                                            },
                                            exception: function(wnd, error) {
                                                OMV.MessageBox.error(null, error);
                                                wnd.setButtonDisabled("close", false);
                                            },
                                            close: function() {
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
                                            }
                                        }
                                    });
                                    wnd.setButtonDisabled("close", true);
                                    wnd.show();
                                    wnd.start();
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
    id: 'update',
    path: '/system/theme',
    text: _('Update'),
    position: 2,
    className: 'OMV.module.admin.service.theme.Update'
});