import { useCallback } from 'react';
import ShippingForm from './ShippingForm.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);

  return (
    document.documentElement.setAttribute('data-bs-theme',`${theme}`),
        <div>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

function post(url, data) {
  // Imagine this sends a request...
  console.log('POST /' + url);
  console.log(data);
}
