import React from 'react';
import styles from './index.less';

interface Props {
  style?: React.CSSProperties;
}

const Img = (props: Props) => {
  const { style } = props;
  return <div className={styles.gradientBg} style={style} id="layout_bg" />;
};

export default Img;
