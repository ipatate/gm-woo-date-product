<?php

namespace GMWooDateProduct;

/**
 * The plugin bootstrap file
 *
 *
 * @since             0.0.1
 * @package           gm-woo-date-product
 *
 * @wordpress-plugin
 * Plugin Name:       GM Woo Date Product
 * Plugin URI:        gm-woo-date-product
 * Description:       Add field date to product front.
 * Version:           0.0.1
 * Author:
 * Author URI:
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       gm-woo-date-product
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
  die;
}

if (!defined('WP_ENV')) {
  define('WP_ENV', 'production');
}

require plugin_dir_path(__FILE__) . 'inc/main.php';

inc\main();
