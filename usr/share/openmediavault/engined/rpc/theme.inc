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
        $this->registerMethod('setTheme');
        $this->registerMethod('setLogo');
        $this->registerMethod('resetLogo');
    }

    public function getSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);

        $db = \OMV\Config\Database::getInstance();
        $object = $db->get('conf.service.theme');

        return $object->getAssoc();
    }

    public function setTheme($params, $context)
    {
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        // Validate the parameters of the RPC service method.
        $this->validateMethodParams($params, 'rpc.theme.settheme');

        // Get the existing configuration object.
        $db = \OMV\Config\Database::getInstance();
        $object = $db->get('conf.service.theme');
        $object->setAssoc($params);
        $db->set($object);

        // run script to apply theme
        $cmd = new \OMV\System\Process("omv-mkconf", "apply_theme", escapeshellarg($params['theme_select']));
        $cmd->setRedirect2to1();
        $cmd->execute();

        // Return the configuration object.
        return $object->getAssoc();
    }

    public function setLogo($params, $context)
    {
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        // Validate the parameters of the RPC service method.
        $this->validateMethodParams($params, 'rpc.theme.settheme');

        // Get the existing configuration object.
        $db = \OMV\Config\Database::getInstance();
        $object = $db->get('conf.service.theme');
        $object->setAssoc($params);
        $db->set($object);

        // run script to apply logo
        $cmd = new \OMV\System\Process("omv-mkconf", "apply_logo", escapeshellarg($params["logo_url"]));
        $cmd->setRedirect2to1();
        $cmd->execute();

        return $object->getAssoc();
    }

    public function resetLogo($params, $context)
    {
        // run script to reset
        $cmd = new \OMV\System\Process("omv-mkconf", "apply_logo", escapeshellarg($params["logo_url"]));
        $cmd->setRedirect2to1();
        $cmd->execute();
    }


}