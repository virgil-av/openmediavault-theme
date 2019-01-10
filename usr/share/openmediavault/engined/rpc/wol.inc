<?php
/**
 * @license   http://www.gnu.org/licenses/gpl.html GPL Version 3
 * @author    Volker Theile <volker.theile@openmediavault.org>
 * @copyright Copyright (c) 2009-2013 Volker Theile
 * @copyright Copyright (c) 2013-2018 OpenMediaVault Plugin Developers
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

class OMVRpcServiceWol extends \OMV\Rpc\ServiceAbstract
{
    public function getName()
    {
        return 'wol';
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
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        // Validate the parameters of the RPC service method.
        $this->validateMethodParams($params, 'rpc.common.getlist');
        // Get configuration data.
        $db = \OMV\Config\Database::getInstance();
        $objects = $db->getAssoc('conf.service.wol.system');
        // Filter the result.
        return $this->applyFilter($objects, $params['start'], $params['limit'],
            $params['sortfield'], $params['sortdir']);
    }

    public function getSystem($params, $context)
    {
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        // Validate the parameters of the RPC service method.
        $this->validateMethodParams($params, 'rpc.common.objectuuid');
        // Get the configuration object.
        $db = \OMV\Config\Database::getInstance();
        return $db->getAssoc('conf.service.wol.system', $params['uuid']);
    }

    public function setSystem($params, $context)
    {
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        // Validate the parameters of the RPC service method.
        $this->validateMethodParams($params, 'rpc.wol.setsystem');
        // Prepare the configuration object.
        $object = new \OMV\Config\ConfigObject('conf.service.wol.system');
        $object->setAssoc($params);
        // Set the configuration object.
        $isNew = $object->isNew();
        $db = \OMV\Config\Database::getInstance();
        if (TRUE === $isNew) {
            // Check uniqueness - name, mac, ip
            $db->assertIsUnique($object, 'name');
            $db->assertIsUnique($object, 'mac');
            $db->assertIsUnique($object, 'ip');
        }
        $db->set($object);
        // Return the configuration object.
        return $object->getAssoc();
    }

    public function deleteSystem($params, $context)
    {
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        // Validate the parameters of the RPC service method.
        $this->validateMethodParams($params, 'rpc.common.objectuuid');
        // Delete the configuration object.
        $db = \OMV\Config\Database::getInstance();
        $object = $db->get('conf.service.wol.system', $params['uuid']);
        $db->delete($object);
        // Return the deleted configuration object.
        return $object->getAssoc();
    }

    public function getWake($params, $context)
    {
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        // Get the configuration object.
        $db = \OMV\Config\Database::getInstance();
        $object = $db->get('conf.service.wol');
        // Remove useless properties from the object.
        $object->remove('systems');
        return $object->getAssoc();
    }

    public function setWake($params, $context)
    {
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        // Validate the parameters of the RPC service method.
        $this->validateMethodParams($params, 'rpc.wol.setwake');
        // Get the existing configuration object.
        $db = \OMV\Config\Database::getInstance();
        $object = $db->get('conf.service.wol');
        $object->setAssoc($params);
        $db->set($object);
        // Remove useless properties from the object.
        $object->remove('systems');
        // Return the configuration object.
        return $object->getAssoc();
    }

    public function doSend($params, $context)
    {
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        // Validate the parameters of the RPC service method.
        $this->validateMethodParams($params, 'rpc.wol.send');
        // Delete the configuration object.
        $db = \OMV\Config\Database::getInstance();
        $object = $db->get('conf.service.wol.system', $params['uuid']);

        $mac = $object->get('mac');
        $ip = $object->get('ip');
        $cmd1 = false;
        $cmd2 = false;
        $interface = sprintf('-i %s', $params['deviceName']);

        if ( strlen($mac) == 17 ) {
            $cmd1 = true;
            $cmd2 = true;
        } elseif ( strlen($ip) > 7 ) {
            $cmd1 = true;
        }
        if ( $cmd1 === true ) {
            $cmd = new \OMV\System\Process('etherwake', $interface, $mac);
            $cmd->execute();
        }
        if ( $cmd2 === true ) {
            $cmd = new \OMV\System\Process('wakeonlan', $mac);
            $cmd->execute();
        }
    }

    public function doScan($params, $context)
    {
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);

        $cmdArgs = [];
        $cmdArgs = '-m';
        if (!empty($params['devicename'])) {
            $cmdArgs = sprintf('-i %s', $params['deviceName']);
        }
        $cmd = new \OMV\System\Process('nast', $cmdArgs);
        $cmd->execute($output);

        foreach ($output as $line) {
            if( substr($line,2,1) != ':' ) {
                continue;
            }
            $pieces = explode(' ', str_replace('(', '', str_replace(')', '', $line)));

            if( trim($pieces[2]) == '' ) {
                $pieces[2] = gettext("n/a");
            }
            $this->callMethod('setSystem', [
                'uuid' => \OMV\Environment::get('OMV_CONFIGOBJECT_NEW_UUID'),
                'name' => trim($pieces[2]),
                'mac'  => trim($pieces[0]),
                'ip'   => trim($pieces[1])
            ], $context);
        }
    }

    public function doWake($params, $context)
    {
        // Validate the RPC caller context.
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        // Validate the parameters of the RPC service method.
        $this->validateMethodParams($params, 'rpc.wol.setwake');

        $hour = intval($params['standbyhour']);
        $min = intval($params['standbyminute']);
        $time = strtotime(sprintf('%s:%s', $hour, $min));

        $cmdArgs = [];
        $cmdArgs[] = '-a';
        $cmdArgs[] = sprintf('-t %s', $time);
        $cmdArgs[] = sprintf('-m %s', $params['mode']);

        $cmd = new \OMV\System\Process('rtcwake', $cmdArgs);
        $cmd->execute();
    }
}
