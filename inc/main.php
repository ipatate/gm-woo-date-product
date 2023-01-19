<?php

namespace GMWooDateProduct\inc;

// core
require_once(dirname(__FILE__) . '/core/injectAssets.php');
require_once(dirname(__FILE__) . '/core/adminAssets.php');
require_once(dirname(__FILE__) . '/core/i18n.php');

// field
require_once(dirname(__FILE__) . '/field_custom.php');

// admin
require_once(dirname(__FILE__) . '/admin.php');


// main widget, first function call
function main()
{

  // load text domain
  core\i18n\load_textdomain('gm-woo-date-product');

  // on init
  add_action('init', __NAMESPACE__ . '\init');
}


// call on init action
function init()
{
  $name = 'gm-woo-date-product';
  core\injectAssets\useScripts($name);
  core\injectAssets\useModule($name);
  core\injectAssets\useStyles($name);
}
