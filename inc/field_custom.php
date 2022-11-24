<?php

namespace GMWooDateProduct\inc;



// Exit if accessed directly
if (!defined('ABSPATH')) {
  exit;
}

/**
 * Display the custom text field in product admin
 * settings for show or not the hidden field in product page front
 * @since 1.0.0
 */
function gm_create_custom_field()
{
  $args = array(
    'id'            => 'gm-show-selector',
    'label'         => __('Show date selector', 'gm-woo-date-product'),
    'class'          => 'gm-date-selector',
    'description'   => 'Show date selector on product',
  );
  woocommerce_wp_checkbox($args);
}
add_action('woocommerce_product_options_general_product_data', __NAMESPACE__ . '\gm_create_custom_field');


/**
 * Save the custom field admin
 * @since 1.0.0
 */
function gm_save_custom_field($post_id)
{
  $product = wc_get_product($post_id);
  $showField = isset($_POST['gm-show-selector']) ? 'yes' : 'no';
  if ($showField) {
    $product->update_meta_data('gm-show-selector', $showField);
    $product->save();
  }
}
add_action('woocommerce_process_product_meta', __NAMESPACE__ . '\gm_save_custom_field');


/**
 * Display custom field on the front end
 * The hidden field html in product front page
 * @since 1.0.0
 */
function gm_display_custom_field()
{
  global $post;
  // Check for the custom field value
  $product = wc_get_product($post->ID);
  $showCustom = $product->get_meta('gm-show-selector');
  if ($showCustom === 'yes') {
    // Only display our field if we've got a value for the field title
    echo '<div id="gm-woo-date-product-wrapper" data-value="' . (array_key_exists('gm-date-selector', $_POST) ? $_POST['gm-date-selector'] : '') . '" data-label="' . __('Desired date for removal', 'gm-woo-date-product') . '" data-placeholder="' . __('Choose a date', 'gm-woo-date-product') . '"></div>';
  }
}
add_action('woocommerce_before_add_to_cart_button', __NAMESPACE__ . '\gm_display_custom_field');


/**
 * Validate the text field
 * @since 1.0.0
 * @param Array 	$passed			Validation status.
 * @param Integer   $product_id     Product ID.
 * @param Boolean  	$quantity   		Quantity
 */
function gm_validate_custom_field($passed, $product_id, $quantity)
{
  $product = wc_get_product($product_id);
  $showCustom = $product->get_meta('gm-show-selector');
  if ($showCustom && empty($_POST['gm-date-selector'])) {
    // Fails validation
    // be carefull, if input is empty, the product is not added in cart
    // you can desactivate with $passed = true and remove notice
    $passed = false;
    wc_add_notice(__('Please choose a date in the date selector', 'gm-woo-date-product'), 'error');
  }
  return $passed;
}
add_filter('woocommerce_add_to_cart_validation', __NAMESPACE__ . '\gm_validate_custom_field', 10, 3);

/**
 * Add the text field as item data to the cart object
 * @since 1.0.0
 * @param Array 		$cart_item_data Cart item meta data.
 * @param Integer   $product_id     Product ID.
 * @param Integer   $variation_id   Variation ID.
 * @param Boolean  	$quantity   		Quantity
 */
function gm_add_custom_field_item_data($cart_item_data, $product_id, $variation_id, $quantity)
{
  if (!empty($_POST['gm-date-selector'])) {
    // Add the item data
    $cart_item_data['gm_date_field'] = $_POST['gm-date-selector'];
    $product = wc_get_product($product_id); // Expanded function
    // if modify price of product is necessary
    // $price = $product->get_price(); // Expanded function
    // $cart_item_data['total_price'] = $price + 100; // Expanded function
  }
  return $cart_item_data;
}
add_filter('woocommerce_add_cart_item_data', __NAMESPACE__ . '\gm_add_custom_field_item_data', 10, 4);

/**
 * Update the price in the cart
 * @since 1.0.0
 */
function gm_before_calculate_totals($cart_obj)
{
  if (is_admin() && !defined('DOING_AJAX')) {
    return;
  }
  // Iterate through each cart item
  foreach ($cart_obj->get_cart() as $key => $value) {
    if (isset($value['total_price'])) {
      $price = $value['total_price'];
      $value['data']->set_price(($price));
    }
  }
}
// add_action('woocommerce_before_calculate_totals', 'gm_before_calculate_totals', 10, 1);

/**
 * Display the custom field value in the cart
 * @since 1.0.0
 */
function gm_cart_item_custom($name, $cart_item, $cart_item_key)
{
  if (isset($cart_item['gm_date_field'])) {
    $name .= sprintf(
      '<p>%s : %s</p>',
      __('Desired date for removal', 'gm-woo-date-product'),
      esc_html($cart_item['gm_date_field'])
    );
  }
  return $name;
}
add_filter('woocommerce_cart_item_name', __NAMESPACE__ . '\gm_cart_item_custom', 10, 3);

/**
 * Add custom field to order object
 */
function gm_add_custom_data_to_order($item, $cart_item_key, $values, $order)
{
  foreach ($item as $cart_item_key => $values) {
    if (isset($values['gm_date_field'])) {
      $item->add_meta_data('gm_date_field', $values['gm_date_field'], true);
    }
  }
}
add_action('woocommerce_checkout_create_order_line_item', __NAMESPACE__ . '\gm_add_custom_data_to_order', 10, 4);
