import React from 'react';
import styles from './index.less';

interface Props {
  style: React.CSSProperties;
}

const Img = (props: Props) => {
  return <div className={styles.bg} id="layout_bg" />;
};

export default Img;
