Ext.define('OMV.module.admin.service.theme.About', {
    extend: 'OMV.workspace.form.Panel',
    rpcService: 'Theme',
    rpcGetMethod: 'getSettings',
    // hide the top save button
    hideOkButton: true,
    hideResetButton: true,

    initComponent: function() {
        var me = this;
        me.html = me.createBox("<div>Hi there Admin,</div><br><div>Thanks for your " +
            "interest in this plugin, below a few details about the source code and the author.</div><br><br><div>" +
            "This started as a pet project after building my first OMV server out of an old laptop, started as a fork " +
            "of Wolf2000Pi project and than slowly evolved it to what it is right now. </div><br><br><div> The project" +
            " consists of 2 parts omv-theme app and openmediavault-theme plugin: <br><ul> <li>omv-theme works as a " +
            "standalone app and can be accessed via terminal by calling omv-theme</li><li>openmediavault-theme will " +
            "only work if omv-theme is installed, omv-theme is the main engine</li></ul> </div><br><div> Compatibility: " +
            " <br><ul> <li>omv-theme: OMV v4.x and may also work with 3.x and 2.x unconfirmed</li><li>" +
            "openmediavault-theme: OMV v4.x</li></ul> </div><br><div> OMV-THEME useful links: <br><ul> <li>Github " +
            " repo: <a href='https://github.com/virgil-av/omv-theme'>https://github.com/virgil-av/omv-theme</a> " +
            "</li><li> Forum topic: <a href='https://forum.openmediavault.org/index.php/Thread/24286'>Unofficial OMV " +
            "Theme Changer tool</a></li></ul> </div><br><div> OPENMEDIAVAULT-THEME useful links: <br><ul> " +
            "<li>Github repo: <a href='https://github.com/virgil-av/openmediavault-theme'>https://github.com/virgil-av/openmediavault-theme</a> " +
            "</li></ul> </div><br><br><div> About me, well you may know my name already from the forum, if not " +
            " I am Virgil, I am Javascript Developer working somewhere in England as a front-end developer, I mostly " +
            "like to work with Angular framework and I despise ReactJS. I started working on this tool because I " +
            "thought it was a fun thing to do, and I also need to polish my css skills as I am good at logic and pure " +
            "technical but my artist side is kinda missing, hence the poor imagination on some themes. </div><br><br> " +
            "<div> How can you help me make this tool better, well simple, you know css build a theme, on my github " +
            "repo you will find the sass files for each theme already built, you can build your own css submit to me " +
            "via forum and I will introduce it to the list. Or if you have an idea on how to make the UI better just " +
            "post it via the forum if I see it being possible I will add it. </div><br><br><div> OpenMediaVault-theme " +
            "is free software and it is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; " +
            "without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. Use this tool " +
            "at your own risk, I take no responsibility if this tool damages your server in any way. </div>");
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
    position: 3,
    className: 'OMV.module.admin.service.theme.About'
});