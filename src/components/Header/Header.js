import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SettingsIcon from '@mui/icons-material/Settings';

import CustomMenu from '../CustomMenu/CustomMenu';
import FavoritesMenu from '../FavoritesMenu/FavoritesMenu';
import Search from '../Search/Search';
import {  CartSvg } from '../Icons';

import styles from './header.module.scss';
import { Button } from '@mui/material';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { cart } = useSelector((state) => state.productReducer);

  const totalProductCount = cart.reduce((total, product) => (total += product.count), 0);



  return (
    <header className={styles.wrapper}>
      <div className={styles.wrapper__content}>
        <div className={styles['wrapper__content--logo']}>
          <Link to={'/'}>
          <Button>Ana Sayfa</Button>
          </Link>
        </div>
    
        <nav className={styles['wrapper__content--nav']}>
          <FavoritesMenu />
          <Link to={'/cart'}>
            <CartSvg />
            <span>
              {t('Sepetim')} {!!totalProductCount ? `(${totalProductCount})` : ''}
            </span>
          </Link>
       
        </nav>
      </div>
    </header>
  );
};

export default Header;
