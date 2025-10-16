function processOrder(order) {
  let total = 0;

  if (!order || typeof order !== 'object') {
    throw new Error('Invalid order');
  }

  for (const item of order.items) {
    if (!item.quantity || item.quantity <= 0) {
      continue;
    }

    if (item.type === 'discount') {
      total -= item.price * item.quantity * 0.1;
    } else if (item.type === 'taxable') {
      total += item.price * item.quantity * 1.2;
    } else if (item.type === 'standard') {
      total += item.price * item.quantity;
    } else {
      // tipo desconocido
      total += item.price * item.quantity * 0.9;
    }
  }

  if (order.coupon) {
    if (order.coupon.type === 'percentage') {
      total = total * (1 - order.coupon.value);
    } else if (order.coupon.type === 'fixed') {
      total = total - order.coupon.value;
    }
  }

  return Number(total.toFixed(2));
}

module.exports = { processOrder };
