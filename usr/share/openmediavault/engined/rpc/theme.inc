<?php

class OMVRpcServiceTheme extends \OMV\Rpc\ServiceAbstract
{
    /**
     * Get the name of the RPC service.
     *
     * @return string
     */
    public function getName()
    {
        return 'Theme';
    }
    /**
     * Initialize the RPC service. The RPC methods are registered in this
     * function with $this->registerMethod.
     *
     * @return void
     */
    public function initialize()
    {
        $this->registerMethod('getSettings');
        $this->registerMethod('genericScriptAndInput');
        $this->registerMethod('setTheme');
        $this->registerMethod('setLogo');
    }

    public function getSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);

        $db = \OMV\Config\Database::getInstance();
        $object = $db->get('conf.service.theme');

        return $object->getAssoc();
    }

    public function setupDatabase($params, $context){
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        // Validate the parameters of the RPC service method.
        $this->validateMethodParams($params, 'rpc.theme.settheme');

        // Get the existing configuration object.
        $db = \OMV\Config\Database::getInstance();
        $object = $db->get('conf.service.theme');
        $object->setAssoc($params);
        $db->set($object);
    }

    public function runScript($scriptName, $params, $paramName){
        // run script to apply theme
        $cmd = new \OMV\System\Process("omv-mkconf", $scriptName, escapeshellarg($params[$paramName]));
        $cmd->setRedirect2to1();
        $cmd->execute();
    }

    public function setTheme($params, $context)
    {
        $this->setupDatabase($params, $context);
        $this->runScript("apply_theme", $params, "theme_select");
    }

    public function setLogo($params, $context)
    {
        $this->setupDatabase($params, $context);
        $this->runScript("apply_logo", $params, "logo_url");
    }


}