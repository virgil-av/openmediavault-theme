#!/bin/sh

set -e

. /usr/share/openmediavault/scripts/helper-functions

SERVICE_XPATH_NAME="theme"
SERVICE_XPATH="/config/services/${SERVICE_XPATH_NAME}"

if ! omv_config_exists "${SERVICE_XPATH}"; then
    omv_config_add_node "/config/services" "${SERVICE_XPATH_NAME}"
    omv_config_add_key "${SERVICE_XPATH}" "theme_select" "default"
    omv_config_add_key "${SERVICE_XPATH}" "logo_url" "https://i.ibb.co/vXk1SG2/logo.png"
    omv_config_add_key "${SERVICE_XPATH}" "header_text" "This is a test"
    omv_config_add_key "${SERVICE_XPATH}" "header_bg_color" "#ff00ff"
    omv_config_add_key "${SERVICE_XPATH}" "header_bg_image" "https://i.ibb.co/HKb9B7m/hi-tech-concepts-on-blue-background-header.jpg"
    omv_config_add_key "${SERVICE_XPATH}" "font_size" "16"
    omv_config_add_key "${SERVICE_XPATH}" "font_weight" "400"

fi

exit 0
