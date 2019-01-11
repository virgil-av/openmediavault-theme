<?php

class OMVRpcServiceWol extends \OMV\Rpc\ServiceAbstract
{
    public function getName()
    {
        return 'theme';
    }

    public function initialize()
    {
        $this->registerMethod('getSystemList');
        $this->registerMethod('getSystem');
        $this->registerMethod('setSystem');
        $this->registerMethod('deleteSystem');

        $this->registerMethod('getWake');
        $this->registerMethod('setWake');

        $this->registerMethod('doSend');
        $this->registerMethod('doScan');
        $this->registerMethod('doWake');
    }

    public function getSystemList($params, $context)
    {

    }

    public function getSystem($params, $context)
    {

    }

    public function setSystem($params, $context)
    {

    }

    public function deleteSystem($params, $context)
    {

    }

    public function getWake($params, $context)
    {

    }

    public function setWake($params, $context)
    {

    }

    public function doSend($params, $context)
    {

    }

    public function doScan($params, $context)
    {

    }

    public function doWake($params, $context)
    {

    }
}
