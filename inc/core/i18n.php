<?php

namespace GMWooDateProduct\inc\core\i18n;



/**
 * Load the plugin text domain for translation.
 *
 */ function load_textdomain($name)
{
  load_plugin_textdomain(
    $name,
    false,
    dirname(dirname(plugin_basename(__FILE__))) . '/../languages/'
  );
}
