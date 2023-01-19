<?php

namespace GMWooDateProduct\inc\admin;

function options_page()
{
  echo '<div id="gm-date-app"></div>';
}


function register_options_page()
{
  add_options_page('Date Pick Up product settings', 'Date PickUp settings', 'manage_options', 'gm-woo-date-product', __NAMESPACE__ . '\options_page');
}

add_action('admin_menu', __NAMESPACE__ . '\register_options_page');

// function wp_pageviews_scripts()
// {
//   if (is_single() && !is_user_logged_in()) {
//     wp_localize_script('wp_pageviews_scripts', 'wp_pageviews_ajax', array(
//       'ajax_url' => admin_url('admin-ajax.php'),
//       'nonce' => wp_create_nonce('wp-pageviews-nonce'),
//       'is_user_logged_in' => is_user_logged_in(),
//       'is_single' => is_single()
//     ));
//   }
// }

// add_action('wp_enqueue_scripts', 'wp_pageviews_scripts');


/** save values */
function save_gm_date_product_settings()
{
  $data = sanitize_text_field($_POST['data']);
  // update value
  if ($data) {
    update_option("gm_date_product_settings", $data);
  }
  // return new value
  echo (get_option("gm_date_product_settings"));

  wp_die();
}

add_action('wp_ajax_save_gm_date_product_settings', __NAMESPACE__ . '\save_gm_date_product_settings');

/** get values */
function get_gm_date_product_settings()
{
  // return value
  echo get_option("gm_date_product_settings");
  wp_die();
}

add_action('wp_ajax_get_gm_date_product_settings', __NAMESPACE__ . '\get_gm_date_product_settings');
