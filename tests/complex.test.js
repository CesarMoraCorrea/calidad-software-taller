const { processOrder } = require('../src/complex');

describe('processOrder tests', () => {
  test('invalid order throws error', () => {
    expect(() => processOrder(null)).toThrow('Invalid order');
  });

  test('order with standard items', () => {
    const order = {
      items: [{ price: 10, quantity: 2, type: 'standard' }],
    };
    expect(processOrder(order)).toBe(20.0);
  });

  test('order with taxable and standard', () => {
    const order = {
      items: [
        { price: 5, quantity: 4, type: 'taxable' },
        { price: 10, quantity: 1, type: 'standard' },
      ],
    };
    // 5*4*1.2 = 24, + 10*1 = 10 → 34.00
    expect(processOrder(order)).toBe(34.0);
  });

  test('order with discount items', () => {
    const order = {
      items: [{ price: 20, quantity: 1, type: 'discount' }],
    };
    // descuento: -20*1*0.1 = -2 → total = -2
    expect(processOrder(order)).toBe(-2.0);
  });

  test('order with coupon percentage', () => {
    const order = {
      items: [{ price: 100, quantity: 1, type: 'standard' }],
      coupon: { type: 'percentage', value: 0.2 },
    };
    // total = 100, con cupón 20% → 80
    expect(processOrder(order)).toBe(80.0);
  });

  test('order with coupon fixed', () => {
    const order = {
      items: [{ price: 50, quantity: 2, type: 'standard' }],
      coupon: { type: 'fixed', value: 15 },
    };
    // total = 100 - 15 = 85
    expect(processOrder(order)).toBe(85.0);
  });

  test('unknown type item', () => {
    const order = {
      items: [{ price: 10, quantity: 1, type: 'mystery' }],
    };
    // aplica regla default: 10*1*0.9 = 9
    expect(processOrder(order)).toBe(9.0);
  });
});
