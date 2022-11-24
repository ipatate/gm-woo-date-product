<?php

namespace GMWooDateProduct\inc;

// core
require_once(dirname(__FILE__) . '/core/injectAssets.php');
require_once(dirname(__FILE__) . '/core/i18n.php');

// field
require_once(dirname(__FILE__) . '/field_custom.php');

// main widget, first function call
function main()
{

  // load text domain
  load_textdomain('gm-woo-date-product');

  // on init
  add_action('init', __NAMESPACE__ . '\init');
}


// call on init action
function init()
{
  $name = 'gm-woo-date-product';
  useScripts($name);
  useModule($name);
  useStyles($name);
}
