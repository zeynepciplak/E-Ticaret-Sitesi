import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import ProductCardCart from '../../components/ProductCards/ProductCardCart/ProductCardCart';
import { ArrowSvg } from '../../components/Icons';

import styles from './cart.module.scss';

const Cart = () => {
  const { cart } = useSelector((state) => state.productReducer);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const totalProductCount = cart.reduce((total, product) => (total += product.count), 0);
  const totalProductAmount = cart.reduce((total, product) => (total += product.price * product.count), 0).toFixed(2);
  const shippingCost = totalProductAmount > 1000 ? 0 : 19.99;

  const handleNavigateHome = () => navigate('/');

  return (
    <div className={styles.wrapper}>
      {!!cart.length && (
        <>
          <div className={styles.wrapper__content}>
            <div className={styles.title}>
              <span>
                {t('Sepetim')} ({totalProductCount})
              </span>
              <div className={styles.title__backward}>
                <Link to={'/'}>
                  <ArrowSvg />
                  <span>{t('Ana Sayfa')}</span>
                </Link>
              </div>
            </div>
            <div className={styles.items}>
              {cart.map((item) => (
                <ProductCardCart key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div className={styles.wrapper__bill}>
            <div className={styles.title}>
              <span>{t('Sipariş Özeti')}</span>
            </div>
            <div className={styles.info}>
              <div className={styles.info__product}>
                <span>{t('Ürün Fiyatı')}</span>
                <span>{totalProductAmount}₺</span>
              </div>
       
              <div className={styles.info__total}>
                <span>{t('Toplam Ücret')}</span>
                <span>{(parseFloat(totalProductAmount))}₺</span>
              </div>
            </div>
          </div>
        </>
      )}
      {!cart.length && (
        <div className={styles['not-found']}>
          <span>{t('Ürün Bulunamadı')}</span>
          <span>{t('Lütfen Bekleyiniz')}</span>
          <button onClick={handleNavigateHome}>
            <span>{t('Alışverişe devam et')}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
