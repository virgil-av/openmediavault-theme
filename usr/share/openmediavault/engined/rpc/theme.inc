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
        $this->registerMethod('setSettings');
    }
    public function getSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);

        $db = \OMV\Config\Database::getInstance();
        $object = $db->get('conf.service.theme');

        return $object->getAssoc();
    }
    public function setSettings($params, $context)
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

        $cmd = 'echo '. $params['mode'] . ' >> /root/omv-theme/test';
        $process = new OMV\System\Process($cmd);
        $process->execute();

        // Return the configuration object.
        return $object->getAssoc();
    }
}