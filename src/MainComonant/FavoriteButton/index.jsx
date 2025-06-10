import { CiHeart } from "react-icons/ci";
import { toast } from "react-toastify";   
import { IoMdHeart } from "react-icons/io";
import styles from './index.module.css'
import { useFavorite } from "../../zustand-store/favorites";

export default function FavoriteButton({ productId }) {
  const { toggleFavorite, isFavorite } = useFavorite();
  const favorites = isFavorite(productId);

  const handleClick = (e) => {
    e.stopPropagation();
    toggleFavorite(productId);
    toast.success(favorites ? "تمت الازالة من المفضلة" : "تمت الاضافة للمفضلة");
  };



  return (
    <button onClick={handleClick} className={styles.BtnIcon}>
        {
            favorites ? <IoMdHeart className={styles.redIcon}/> : <CiHeart className={styles.grayIcon} />
        }
    </button>
  );
} 
